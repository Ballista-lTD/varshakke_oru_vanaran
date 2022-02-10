import Build from "../../images/build.svg";
import Typography from "@mui/material/Typography";
import Fire from "../../images/fire.svg";
import React from "react";
import {Avatar, List, ListItem, ListItemAvatar} from "@mui/material";
import Luv from "../../images/luv.svg";
import Luv1 from "../../images/luv1.svg";
import Luv2 from "../../images/luv2.svg";
import Slider from "../utils/slider/slider";

interface ruless {
    rule : string;
    icon : string;
}
const rules: ruless[] = [{rule: "maryadak ullathu ole parayanam", icon: Luv}, {rule: "maryadak ullathu ole parayanam", icon: Luv1}, {rule: "maryadak ullathu ole parayanam", icon: Luv2}];


export class Page1 extends React.Component
{
    render()
    {
        return (
            <div className=" overflow-hidden" color="black">
                <div className="d-flex flex-row justify-content-between">
                    <div>

                        <img src={Build} className="align-self-start position-absolute w-75" alt="fire"/>
                    </div>
                    <Typography fontFamily="Poppins" className="align-self-end mt-5 pt-3 text-wrap pe-4" fontWeight="bold"
                        fontSize="28px" width="230px">HACKS
                        TO GET MINGLED</Typography>
                </div>
                <div className="py-0 pt-3 d-flex justify-content-center flex-column align-items-center">
                    <Typography fontFamily="Poppins" className="align-self-end mt-5 pt-3 w-100 text-wrap"  fontSize="21px">
                        <List className={"d-flex flex-column justify-content-center align-items-center"}>
                            {rules.map((rule: ruless) =>
                                (
                                    <ListItem key={rule.rule} className={"justify-content-center align-items-center"}>
                                        <ListItemAvatar>
                                            <Avatar alt="Cindy Baker" src={rule.icon}/>
                                        </ListItemAvatar>
                                        {rule.rule}


                                    </ListItem>
                                ))}
                        </List></Typography>
                    <Slider text=" "/>
                    <img className="w-75 align-bottom py-0" src={Fire} alt="fire"/>
                </div>
            </div>);
    }
}
