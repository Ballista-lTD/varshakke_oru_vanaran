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

const questions: questionsPropss[] = [{qstn: "Ningalk ethra budhi ind"}, {qstn: "Ningalk ichiri kannil chora indo"}, {qstn: "Ningal ethra dayalu anh"}, {qstn: "Ningalk etra deshyam ond"}, {qstn: "NNingalk etra nalla chiri und"}];

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
            <div className=" overflow-hidden" color="black">
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
                                            {qstn.qstn}
                                        </div>
                                        <div className={"ps-5  w-75"}>

                                            <StyledRating
                                                name="customized-color"
                                                className="d-flex w-100 align-self-center "
                                                defaultValue={2}
                                                getLabelText={(value: number) => `${value} Heart${value !== 1 ? "s" : ""}`}
                                                precision={1}
                                                icon={<FavoriteIcon className={"mx-2 me-3"}  fontSize="inherit"/>}
                                                emptyIcon={<FavoriteIcon  className={"mx-2 me-3"} fontSize="inherit"/>}
                                            />
                                        </div>
                                    </ListItem>

                                ))}
                        </List></Typography>
                    <div className="w-75">
                        <Slider text="Send" color="#fff" text_unlocked="Happy Dating"/>
                    </div>
                    <img className="w-100 align-bottom py-0" src={Fire} alt="button"/>
                </div>
            </div>);
    }
}
