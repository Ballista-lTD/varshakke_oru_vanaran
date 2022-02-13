import Build from "../../images/build.svg";
import Typography from "@mui/material/Typography";
import Fire from "../../images/fire.svg";
import React from "react";
import {Avatar, List, ListItem, ListItemAvatar} from "@mui/material";
import Luv from "../../images/luv.svg";
import Luv1 from "../../images/luv1.svg";
import Luv2 from "../../images/luv2.svg";
import Slider from "../utils/slider/slider";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";
import {toast, ToastContainer} from "react-toastify";

interface ruless {
    rule: string;
    icon: string;

}
const rules: ruless[] = [
    {rule: "Never lie to your doctor and a̶t̶t̶o̶r̶n̶e̶y̶, Valentine!", icon: Luv},
    {rule: "Adhikam thallanda max 20 pointse kayyilollu", icon: Luv1},
    {rule: "Come back after 13 th midnight for a round of match making", icon: Luv2},
    {rule: "14 ne sambavam set avum mone....", icon: Luv1}
];


interface Page1Props extends AuthPropsLoc {
    showBanner?: boolean
}

class Page1Loc extends AuthComponent<Page1Props, AuthState>
{
    render()
    {

        if (!this.state.user)
            this.performAuth();


        return (
            <div className=" overflow-hidden vh-100 " color="black">
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
                <div className={`d-flex flex-row justify-content-between ${!this.props.showBanner ? "pt-5 mt-5 justify-content-center" : ""}`}>
                    {this.props.showBanner &&
                        <>
                            <div>
                                <img src={Build} className="align-self-start  position-absolute  w-75" alt="fire"/>
                            </div>

                            <Typography
                                className="align-self-end mt-5 pt-4 text-wrap pe-4 "
                                sx={{zIndex: "10"}}
                                fontFamily="Poppins"
                                fontWeight="bolder"
                                fontSize="28px" width="230px">
                                HACKS TO GET MINGLED
                            </Typography>
                        </>}
                </div>
                <div className="py-0 pt-3 d-flex justify-content-center flex-column align-items-center">
                    {!this.props.showBanner &&
                        <Typography fontFamily="Poppins" className="align-self-end mt-5 pt-3 text-wrap pe-4"
                            fontWeight="bolder"
                            fontSize="28px" width="230px">HACKS
                            TO GET MINGLED</Typography>}
                    <Typography fontFamily="Poppins" className="align-self-end mt-5 pt-3 w-100"
                        fontSize="21px">
                        <List className={"d-flex flex-column justify-content-center align-items-center"}>
                            {rules.map((rule: ruless) =>
                                (
                                    <ListItem key={rule.rule} style={{left:0, whiteSpace:"pre"}}>
                                        <ListItemAvatar>
                                            <Avatar alt="Cindy Baker" src={rule.icon}/>
                                        </ListItemAvatar>
                                        <Typography className="text-wrap">
                                            {rule.rule}
                                        </Typography>
                                    </ListItem>
                                ))}
                        </List></Typography>
                    <div className={"w-100 position-relative d-flex flex-column align-items-center overflow-visible"}>
                        <img className="vw-100 align-bottom position-absolute py-0 " src={Fire} alt="fire"/>
                        <div className={"w-75 pt-5 mt-3"}>
                            <Slider text="Oo Sammathiche" text_unlocked="okey " color="#fff"
                                onSuccess={() => toast.error("Registration closed")}
                            />
                        </div>
                    </div>
                </div>
            </div>);
    }
}
export const Page1 = withRouter(Page1Loc);
