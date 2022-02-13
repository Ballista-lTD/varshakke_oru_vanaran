import "./index.css";

import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {PartnerToken, PartnerTokenObject} from "../../api/model";
import {toast} from "react-toastify";
import {withRouter} from "react-router";
import Loader from "react-loader-spinner";
import {Container} from "@mui/material";
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import {getItemStyle, getListStyle, move, reorder} from "./utils";
import {Dropper} from "./Dropper";


interface RankState extends AuthState {
    priority: string[]
    partnerList: PartnerTokenObject[]
    selectedTokens: PartnerTokenObject[]
    ready: boolean
}

class RankLoc extends AuthComponent<AuthPropsLoc, RankState>
{
    constructor(props: AuthPropsLoc) 
    {
        super(props);
        this.state = {
            ...this.state,
            selectedTokens: [],
            ready: false
        };
    }

    async componentDidMount()
    {
        super.componentDidMount();

        if (!this.state.user?.tokens)
            return this.performAuth();

        const {results} = await PartnerToken.filter({}, true);

        this.setState({partnerList: results, ready: true});
    }

    handleSubmit = async () =>
    {
        try
        {
            await PartnerToken.modify({priority: this.state.priority});
            toast.success("Ok set 14 midnight ne vanne chat cheyth polikke");
        }
        catch (e)
        {
            toast.error("Sathyathil prashnam enikk ano atho ninekko ?");
        }
    };

    onDragEnd = (result: DropResult) =>
    {
        const { source, destination } = result;

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
                this.state[source.droppableId],
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

    render() 
    {
        if (!this.state.user) 
        {
            this.performAuth();
            return <></>;
        }

        console.log(this.state.ready);

        if(!this.state.ready)
            return (
                <Container className="mt-5 pt-5">
                    <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
                </Container>
            );

        return (
            <>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Dropper list={this.state.selectedTokens} droppableId={"selectedTokens"}/>
                    <Dropper list={this.state.partnerList} droppableId={"partnerList"}/>
                </DragDropContext>
            </>
        );
    }
}

export default withRouter(RankLoc);