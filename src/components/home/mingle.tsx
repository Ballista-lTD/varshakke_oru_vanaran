import Build from "../../images/build.svg";
import LoveIcon from "../../images/qstnIcon.svg";

import Typography from "@mui/material/Typography";
import Fire from "../../images/fire.svg";
import React from "react";

import {styled} from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {List, ListItem, ListItemAvatar} from "@mui/material";


import Slider from "../utils/slider/slider";

interface questionsPropss
{
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
                <div className="d-flex flex-row justify-content-start">
                    <img src={Build} className="align-self-start position-absolute w-75" alt="img"/>
                </div>
                <div className="d-flex justify-content-center w-full">
                    <Typography fontFamily="Poppins" className="align-self-center mt-5 pt-3 pe-4 w-full"
                        fontWeight="bold"
                        fontSize="28px" zIndex={1}>
                        FILL TO MINGLE
                    </Typography>
                </div>
                <div className="py-0 pt-3 d-flex justify-content-center flex-column align-items-center">
                    <Typography fontFamily="Poppins" className="align-self-end mt-5 pt-3 w-100 text-wrap"
                        fontSize="21px" color="#949494">
                        <List className={"d-flex flex-column justify-content-center align-items-center"}>
                            {questions.map((qstn: questionsPropss) =>
                                (

                                    <ListItem key={qstn.qstn} className={"d-flex justify-content-center align-items-center"}>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex flex-row">
                                                <ListItemAvatar>
                                                    <img src={LoveIcon} alt="icon"/>
                                                </ListItemAvatar>
                                                {qstn.qstn}
                                            </div>
                                            <StyledRating
                                                name="customized-color"
                                                className="d-flex align-self-center"
                                                defaultValue={2}
                                                getLabelText={(value: number) => `${value} Heart${value !== 1 ? "s" : ""}`}
                                                precision={1}
                                                icon={<FavoriteIcon fontSize="inherit"/>}
                                                emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
                                            />
                                        </div>
                                    </ListItem>

                                ))}
                        </List></Typography>
                    <div className="w-50">
                        <Slider text="Send" color="#fff" text_unlocked="Happy Dating"/>
                    </div>
                    <img className="w-75 align-bottom py-0" src={Fire} alt="button"/>
                </div>
            </div>);
    }
}
