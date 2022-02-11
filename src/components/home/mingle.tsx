import LeftGarland from "../../images/leftGarland.svg";
import RightGarland from "../../images/rightGarland.svg";

import LoveIcon from "../../images/qstnIcon.svg";

import Typography from "@mui/material/Typography";
import Fire from "../../images/minglec.svg";
import React from "react";

import {styled} from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {List, ListItem, ListItemAvatar} from "@mui/material";


import Slider from "../utils/slider/slider";

interface questionsPropss {
    qstn: string;
}

const questions: questionsPropss[] = [{qstn: "You Smart? \n(0: Brain Potato, 5: Omniscient"},
    {qstn: "Show me your biceps. \n(0: pappadavaanam, 5: Hercules)"},
    {qstn: "Beauty undo?. \n(0: Mirrors scare me, 5:Cleopatra)"},
    {qstn: "Your Charisma. \n(0:Bed is my valentine) \n(5:I sell sand in Sahara)"},
    {qstn: "How much money you burn. \n(0: Starving to Death) \n(5:I pave golden roads)"},
    {qstn: "Generosity, yes rate it. \n(0: I burn orphanages, 5:Karl Marx)"},
    {qstn: "You die for God? I am become Death. \n(0:-J Robert Oppenheimer, 5: -Krishna)"},
    {qstn: "Your connection with Liberalism🧐 \n(0:Girls? No School!!) \n(5:Martin Luther King)"}, ];

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#EF3E5C",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
});


export class Mingle extends React.Component 
{
    render() 
    {
        return (
            <div className=" mb-5" color="black">
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
                        fontSize="21px" color="#949494">
                        <List className={"d-flex flex-column text-left ps-3"}>
                            {questions.map((qstn: questionsPropss) =>
                                (

                                    <ListItem key={qstn.qstn} className={"d-flex align-items-start flex-column"}>
                                        <div className="d-flex flex-row">
                                            <ListItemAvatar>
                                                <img src={LoveIcon} alt="icon"/>
                                            </ListItemAvatar>
                                            <span   style={{fontSize:"16px", whiteSpace:"pre"}}>{qstn.qstn}</span>
                                        </div>
                                        <div className={"ps-5  w-75"}>

                                            <StyledRating
                                                name="customized-color"
                                                className="d-flex w-100 align-self-center "
                                                defaultValue={2}
                                                getLabelText={(value: number) => `${value} Heart${value !== 1 ? "s" : ""}`}
                                                precision={1}
                                                icon={<FavoriteIcon className={"mx-2 me-3"} fontSize="inherit"/>}
                                                emptyIcon={<FavoriteIcon className={"mx-2 me-3"} fontSize="inherit"/>}
                                            />
                                        </div>
                                    </ListItem>
                                ))}
                        </List></Typography>
                    <div className="w-75">
                        <Slider text="Send" color="#fff" text_unlocked="Happy Dating"/>
                    </div>
                </div>
            </div>);
    }
}
