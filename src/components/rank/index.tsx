import "./index.css";

import {AuthComponent, AuthPropsLoc, AuthState, getAuth} from "../../api/auth";
import {PartnerToken, PartnerTokenObject} from "../../api/model";
import {toast, ToastContainer} from "react-toastify";
import {withRouter} from "react-router";
import Loader from "react-loader-spinner";
import {Container, Fab} from "@mui/material";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {move, reorder} from "./utils";
import {Dropper} from "./Dropper";
import IconButton from "@mui/material/IconButton";
import NavigationIcon from "@mui/icons-material/Navigation";

import Slider from "@mui/material/Slider";
import {baseUrl, patch} from "../../api/api";
import {uniq} from "lodash";


export const filterButtons = [
    {icon: "🧠", key: "intelligence"},
    {icon: "💪", key: "strength"},
    {icon: "💄", key: "beauty"},
    {icon: "✨", key: "charisma"},
    {icon: "🤑", key: "wealth"},
    {icon: "🤝", key: "will_help_poor"},
    {icon: "🙏", key: "religiousity"},
    {icon: "🗽", key: "liberal"}
];

interface RankState extends AuthState {
    unFilteredPartners: PartnerTokenObject[]
    partnerList: PartnerTokenObject[]
    selectedTokens: PartnerTokenObject[]
    filters: Record<string, number[]>
    filterKey: string
    slider: boolean
    ready: boolean
}

class RankLoc extends AuthComponent<AuthPropsLoc, RankState> 
{
    initialFilters: Record<string, number[]>;

    constructor(props: AuthPropsLoc) 
    {
        super(props);
        this.initialFilters = {".": [0, 5]};

        for(const {key} of filterButtons)
            this.initialFilters[key] = [0, 5];

        this.state = {
            ...this.state,
            selectedTokens: [],
            slider: false,
            filterKey: ".",
            filters: this.initialFilters,
            ready: false
        };
    }

    async componentDidMount() 
    {
        super.componentDidMount();
        if (!this.state.user?.tokens)
            return this.performAuth();

        const {results} = await PartnerToken.filter({}, true);

        this.setState({partnerList: results, unFilteredPartners: results, ready: true});
    }

    handleSubmit = async () => 
    {
        try 
        {
            const priority = uniq<string>([
                ...this.state.selectedTokens.map(({name}) => name),
                ...this.state.unFilteredPartners.map(({name}) => name)
            ]);

            const headers = {"Authorization": `Bearer ${getAuth()}`};
            await patch(`${baseUrl}/auth/token/${this.state.user?.tokens.id}/`, {priority}, headers);

            toast("Ok set 14 midnight ne vanne chat cheyth polikke. Venam enkil page refresh cheyth again option register cheyyam.");
        }
        catch (e) 
        {
            toast.error("Sathyathil prashnam enikk ano atho thanikko ?");
        }
    };

    onDragEnd = (result: DropResult) => 
    {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination)
            return;

        if (source.droppableId === destination.droppableId) 
        {
            const items = reorder(
                this.state.partnerList,
                source.index,
                destination.index
            );

            if (source.droppableId === "selectedTokens")
                this.setState({selectedTokens: items as PartnerTokenObject[]});
            else
                this.setState({partnerList: items as PartnerTokenObject[]});
        }
        else 
        {
            const {sourceClone, destClone} = move(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.state[source.droppableId],
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.state[destination.droppableId],
                source,
                destination
            );

            const state: Record<string, unknown> = {};

            state[source.droppableId] = sourceClone;
            state[destination.droppableId] = destClone;

            this.setState(state as unknown as RankState);
        }
    };

    filterEntries = (min: number, max: number) =>
    {
        this.setState({filters: {...this.state.filters, [this.state.filterKey]: [min, max]}});

        let filtered = this.state.unFilteredPartners.filter(x => !this.state.selectedTokens.find(({name}) => name === x.name));

        Object.keys(this.state.filters).forEach((key) => 
        {
            const [lower, upper] = this.state.filters[key];
            if(key !== ".")
                filtered = filtered.filter((obj) => obj.getValue(key) >= lower && obj.getValue(key) <= upper);
        });

        filtered.sort((a, b) =>
            a.getValue(this.state.filterKey) > b.getValue(this.state.filterKey) ? -1 : 1);

        this.setState({partnerList: filtered});
    };

    moveUp = () =>
    {
        const selected = [...this.state.selectedTokens, ...this.state.partnerList];
        this.setState({partnerList: [], selectedTokens: selected});
        const [min, max] = this.state.filters[this.state.filterKey];
        this.filterEntries(min, max);
    };

    render() 
    {
        if (!this.state.user) 
        {
            this.performAuth();
            return <></>;
        }

        if (!this.state.ready)
            return (
                <Container className="mt-5 pt-5">
                    <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
                </Container>
            );

        return (
            <>
                <ToastContainer
                    position="top-center"
                    autoClose={15000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="d-flex flex-row justify-content-center">
                    <button className="p-1 m-2 rank_submit" onClick={this.handleSubmit}>SUBMIT</button>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Dropper list={this.state.selectedTokens} droppableId={"selectedTokens"} noMaxSize/>
                    <div className="rank_filter_container w-100">
                        <h5>Filters</h5>
                        {filterButtons.map(({icon, key}, index) => (
                            <IconButton key={index}
                                onClick={() => this.setState({
                                    filterKey: this.state.filterKey !== key ? key : ".",
                                    slider: this.state.filterKey !== key})
                                }>
                                {index !== 0 && "|"} {icon}
                            </IconButton>
                        ))}
                    </div>
                    <Fab variant="extended" color="primary" className="position-fixed" sx={{bottom: "20px", right: "10px"}}
                        onClick={this.moveUp}>
                        <NavigationIcon sx={{ mr: 1 }} />
                        Add Current
                    </Fab>
                    <Container>
                        {filterButtons.find(({key}) => key === this.state.filterKey)?.icon}
                        {filterButtons.find(({key}) => key === this.state.filterKey)?.key}
                        <Slider
                            hidden={!this.state.slider}
                            getAriaLabel={() => "Filter Points"}
                            value={this.state.filters[this.state.filterKey]}
                            onChange={(e, value) => typeof value !== "number" &&
                                this.filterEntries(value[0], value[1])}
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                            step={1}
                            disableSwap
                        />
                    </Container>
                    <Dropper list={this.state.partnerList} droppableId={"partnerList"}/>
                </DragDropContext>
            </>
        );
    }
}

export default withRouter(RankLoc);
