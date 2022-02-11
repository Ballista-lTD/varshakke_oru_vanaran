import React from "react";
import "./style.css";
import bgimg from "./home_love.png";
import bg2 from "./love2.png";
import Slider from "../utils/slider/slider";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

export  class Balloon extends React.Component
{
    render()
    {
        return (
            <div>
                <h2 className='heading'>
                    Minglikko
                </h2>
                <img className="bg1-img" src={bg2} alt="love"/>
                <div className="bg-image-container">

                    <img className="bg-img" src={bgimg} alt="love"/>
                </div>
            </div>
        );
    }
}


export class HomepageLoc extends AuthComponent<AuthPropsLoc, AuthState>
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
                        Place to find your valentines <br/>
                        <span>form fill akku and get mingled.</span>
                    </p>
                    <Slider text="Get Started" color="#fff" text_unlocked="Go on"
                        onSuccess={() => this.state.user? this.performAuth() : this.props.history.push("/page1")}/>
                </div>

            </>
        );
    }
}

export  const Homepage = withRouter(HomepageLoc);
