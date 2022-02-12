import LeftGarland from "../../images/leftGarland.svg";
import RightGarland from "../../images/rightGarland.svg";

import LoveIcon from "../../images/qstnIcon.svg";

import Typography from "@mui/material/Typography";
import Fire from "../../images/minglec.svg";

import {styled} from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {Fab, List, ListItem, ListItemAvatar} from "@mui/material";

import Slider from "../utils/slider/slider";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {toast, ToastContainer} from "react-toastify";
import {Token} from "../../api/model";
import {withRouter} from "react-router";

const questions = [
    {qstn: "Rate your Brains.🧠 \n(0: Brain Potato, 5: Omniscient", key: "intelligence"},
    {qstn: "Show me your biceps.💪 \n(0: Pappadam, 5: Hercules)", key: "strength"},
    {qstn: "Beauty undo?. \n(0: Mirrors scare me, 5:Cleopatra)", key: "beauty"},
    {qstn: "How Charismatic you are? \n(0:Bed is my valentine) \n(5:I sell sand in Sahara)", key: "charisma"},
    {qstn: "How much money you burn?🤑\t \n(0: Starving to Death) \n(5:I pave golden roads)", key: "wealth"},
    {qstn: "Generosity, yes rate it.😇\t \n(0: I burn orphanages, 5:Karl Marx)", key: "will_help_poor"},
    {qstn: "You die for God? \n(0: I am become Death. -J Robert Oppenheimer) \n(5: I am become Death. -Krishna)", key: "religiousity"},
    {qstn: "Your connection with Liberalism🧐 \n(0:Girls? No School!!) \n(5:Martin Luther King)", key: "liberal"}
];


const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#EF3E5C",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
});

type optionsType = "intelligence|strength|beauty|charisma|wealth|will_help_poor|religiousity|liberal|total";

type MingleState = AuthState & {
    response: {
        [key in optionsType]?: number;
    },
    done: boolean,
    sub_total:number

};

class MingleLoc extends AuthComponent<AuthPropsLoc, MingleState>
{
    constructor(props: AuthPropsLoc) 
    {
        super(props);

        this.refreshAuth();
        // refresh_user();

        const t = this.state.user?.tokens;

        console.log(t);

        if (t) 
        {
            t.user = 0;
            t.total = 0;
            t.id = 0;

            console.log(this.state.user?.tokens.total);
            this.state = {
                ...this.state,
                response: t as { [key in optionsType]?: number },
                done: (this.state.user?.tokens.total || 0) > 0
            };
        }
    }

    componentDidMount() 
    {
        super.componentDidMount();

        if (!this.state.user)
            this.performAuth();

        this.refresh(() => 
        {
            if (this.state.user?.tokens?.total && this.state.user.tokens.total > 0)
                this.setState({done: true, sub_total : 20-this.state.user?.tokens?.total });

        });
    }

    validate = (key?: string, value?: number) => 
    {
        const val = -(this.state.response[key as optionsType] || 0) + (value || 0);

        const points = Object.keys(this.state.response)
            .reduce((total, key) => total + (this.state.response[key as optionsType] || 0), 0) + val;

        if (points <= 20) 
        {
            this.setState({response: {...this.state.response, [key as optionsType]: value}, sub_total:20-points});
            if (points === 20)
                toast("20 hearts set, eni submit adicho");

            return true;
        }

        toast.error("Edo thanik ennan arille ? Maximum 20 point ne kuthi submit adikk.");

        return false;
    };

    handleSubmit = async () => 
    {
        try 
        {
            await Token.modify({...this.state.response, id: this.state.user?.tokens?.id || 0});
            toast.success("Set ayi mone... 😘! Feb 14 ne vaa namukke mingilam");
            this.setState({done: true});
        }
        catch (e) 
        {
            toast.error("Nee enda ee kanikkunne 🙆");
            this.setState({done: false});
        }
    };

    render() 
    {
        if (!this.state.user)
        {
            this.performAuth();
            return <></>;
        }
        return (
            <div className=" mb-5" color="black">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="vw-100 h-25 d-flex flex-row justify-content justify-content-between position-relative">
                    <div>

                        <img src={LeftGarland} className="align-self-start position-absolute " alt="img"/>
                    </div>
                    <div>
                        <img src={RightGarland} style={{right: 0}} className="align-self-start  position-absolute "
                            alt="img"/>
                    </div>
                </div>
                <div className="d-flex justify-content-center w-full">
                    <Typography fontFamily="Poppins" className="align-self-center mt-5 pt-4 pe-4 w-full"
                        color="#464646"
                        fontSize="28px"
                        zIndex={1}
                        style={{fontWeight: "900"}}>
                        FILL TO MINGLE
                    </Typography>
                </div>

                <div className="py-0 pt-3 d-flex justify-content-center flex-column align-items-center">
                    <img className="w-100 align-bottom py-0 position-absolute" src={Fire} alt="button"/>

                    <Typography fontFamily="Poppins" className="align-self-end pt-1 w-100 text-wrap"
                        fontSize="21px">
                        <List className={"d-flex flex-column text-left ps-3"}>
                            {questions.map(({qstn, key}) =>
                                (

                                    <ListItem key={key} className={"d-flex align-items-start flex-column"}>
                                        <div className="d-flex flex-row">
                                            <ListItemAvatar>
                                                <img src={LoveIcon} alt="icon"/>
                                            </ListItemAvatar>
                                            <span style={{fontSize: "16px", whiteSpace: "pre"}}>{qstn}</span>
                                        </div>
                                        <div className={"ps-5  w-75"}>
                                            <StyledRating
                                                name="customized-color"
                                                className="d-flex w-100 align-self-center "
                                                precision={1}
                                                value={this.state.response[key as optionsType]}
                                                onChange={(e, value) => this.validate(key, value || 0)}
                                                icon={<FavoriteIcon className={"mx-2 me-3"} fontSize="inherit"/>}
                                                emptyIcon={<FavoriteIcon className={"mx-2 me-3"} fontSize="inherit"/>}
                                            />
                                        </div>
                                    </ListItem>
                                ))}
                        </List></Typography>

                    <div className="w-75">
                        <Slider unlocked={this.state.done}
                            onSuccess={this.handleSubmit} text="Send" color="#fff" text_unlocked="Happy Dating"/>

                    </div>
                </div>
                <div  className='right-fixed' >
                    <Fab aria-label="add">
                        {this.state.sub_total}<FavoriteIcon color="primary"/>
                    </Fab>
                </div>

            </div>);
    }
}

export const Mingle = withRouter(MingleLoc);
