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

interface ruless {
    rule: string;
    icon: string;

}
const rules: ruless[] = [{rule: "Never lie to your doctor \nand a̶t̶t̶o̶r̶n̶e̶y̶, Valentine!", icon: Luv}, {rule: "Adhikam thallanda max 20 \npointse kayyilollu", icon: Luv1}, {rule: "Come back on Feb14 to \nchat with your Valentine🎉🎉  \nEnnaa pinne Minglikko..", icon: Luv2}];


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
                <div className={`d-flex flex-row justify-content-between ${!this.props.showBanner ? "pt-5 mt-5 justify-content-center" : ""}`}>
                    {this.props.showBanner &&
                        <div>
                            <div>
                                <img src={Build} className="align-self-start position-absolute w-75" alt="fire"/>
                            </div>

                            <Typography fontFamily="Poppins" className="mt-5 pt-3 text-wrap pe-4"
                                fontWeight="bolder"
                                fontSize="28px" width="230px">HACKS
                                TO GET MINGLED</Typography>
                        </div>}
                </div>
                <div className="d-flex justify-content-center flex-column align-items-center">
                    {!this.props.showBanner &&
                        <div>
                            <div>
                                <img src={Build} className="fixed-top position-absolute w-50" alt="fire"/>
                            </div>

                            <Typography fontFamily="Poppins" className="text-wrap pe-4"
                                fontWeight="bolder"
                                fontSize="28px" width="230px">HACKS
                                TO GET MINGLED</Typography>
                        </div>}
                    <Typography fontFamily="Poppins" className="align-self-end mt-5 pt-3 w-100 text-wrap"
                        fontSize="21px">
                        <List className={"d-flex flex-column justify-content-center align-items-center"}>
                            {rules.map((rule: ruless) =>
                                (
                                    <ListItem key={rule.rule} style={{left:0, whiteSpace:"pre"}}>
                                        <ListItemAvatar>
                                            <Avatar alt="Cindy Baker" src={rule.icon}/>
                                        </ListItemAvatar>
                                        {rule.rule}


                                    </ListItem>
                                ))}
                        </List></Typography>
                    <div className={"w-100 position-relative d-flex flex-column align-items-center overflow-visible"}>
                        <img className="vw-100 align-bottom position-absolute py-0 " src={Fire} alt="fire"/>
                        <div className={"w-75 pt-5 mt-3"}>
                            <Slider text="Oo Sammathiche" text_unlocked="poda pulle" color="#fff"
                                onSuccess={() =>
                                {

                                    if (!this.state.user)
                                        this.performAuth();
                                    else
                                    

                                        setTimeout(() =>
                                        {
                                            this.props.history.push("/mingle");
                                        }, 500);
                                    
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>);
    }
}
export const Page1 = withRouter(Page1Loc);
