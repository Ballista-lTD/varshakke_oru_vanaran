import "./index.css";

import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {PartnerToken, PartnerTokenObject} from "../../api/model";
import {toast} from "react-toastify";
import {withRouter} from "react-router";
import Loader from "react-loader-spinner";
import {Container} from "@mui/material";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {move, reorder} from "./utils";
import {Dropper} from "./Dropper";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";


const filterButtons = [
    {icon: "🧠", key: "intelligence"},
    {icon: "💪", key: "strength"},
    {icon: "✨", key: "beauty"},
    {icon: "💀", key: "charisma"},
    {icon: "💀", key: "wealth"},
    {icon: "💀", key: "will_help_poor"},
    {icon: "💀", key: "religiousity"},
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
            const priority = [
                ...this.state.selectedTokens.map(({name}) => name),
                ...this.state.partnerList.map(({name}) => name)
            ];
            await PartnerToken.modify({priority});
            toast.success("Ok set 14 midnight ne vanne chat cheyth polikke");
        }
        catch (e) 
        {
            toast.error("Sathyathil prashnam enikk ano atho ninekko ?");
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
        console.log(min, max);
        this.setState({filters: {...this.state.filters, [this.state.filterKey]: [min, max]}});

        let filtered = this.state.unFilteredPartners;

        Object.keys(this.state.filters).forEach((key) => 
        {
            const [lower, upper] = this.state.filters[key];
            if(key !== ".")
                filtered = filtered.filter((obj) => obj.getValue(key) >= lower && obj.getValue(key) <= upper);
        });

        this.setState({partnerList: filtered});
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
                <button onClick={this.handleSubmit} style={{color: "#949494"}}>Select your priority</button>
                <Container className="rank_filter_container w-100">
                    {filterButtons.map(({icon, key}, index) => (
                        <IconButton key={index}
                            onClick={() => this.setState({filterKey: key, slider: this.state.filterKey !== key})}>
                            {icon}
                        </IconButton>
                    ))}
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
                <hr/><hr/>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Dropper list={this.state.selectedTokens} droppableId={"selectedTokens"}/>
                    <hr/>
                    <Dropper list={this.state.partnerList} droppableId={"partnerList"}/>
                </DragDropContext>
            </>
        );
    }
}

export default withRouter(RankLoc);
