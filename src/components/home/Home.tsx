import React from "react";
import "./style.css";
import bgimg from "./home_love.png";
import bg2 from "./love2.png";

export  class Balloon extends React.Component
{
    render()
    {
        return (
            <div>
                <h2 className='heading'>
                    Varshakkoru Vanaran
                </h2>
                <img className="bg1-img" src={bg2} alt="love"/>
                <div className="bg-image-container">

                    <img className="bg-img" src={bgimg} alt="love"/>
                </div>
            </div>
        );
    }
}


export class Homepage extends React.Component
{
    render()
    {
        return (
            <>
                <div className='Home-bg'>
                    <Balloon/>

                </div>
                <div className="p-2 px-5">
                    <h2 className="sub-head">
                        ITHINE KURICH ORU VAKK
                    </h2>
                    <p className="description">
                        ith oru mikacha oru ithanu. ithine kurich parayukayanengil namukk orupad parayan ind but nammak
                        samayam illa so poyi <br/>
                        <span>form fill akku and get mingled.</span>
                    </p>
                </div>
            </>
        );
    }
}
