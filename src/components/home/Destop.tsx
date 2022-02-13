import React from "react";
import "./style.css";
import {Balloon} from "./Home";
import {Page1} from "../page1";
import banner from "../../images/bannersvg.svg";

export class Desktop extends React.Component 
{
    render() 
    {
        return (
            <>
                <div className="p-0 d-flex overflow-hidden">
                    <div className='left-box '>

                        <Balloon/>
                        <h2 className="sub-head mx-2">
                            ITHINE KURICH ORU VAKK
                        </h2>
                        <h4 className="text-white ">
                            You are now in a complete anonymous place where neither your sex nor your religion matters,
                            all you need is brain😂 as your time is damn important for us now slide right, explore and
                            get mingled😎✨ <br/>
                            <span>Fill the form and get mingled.</span>
                        </h4>
                    </div>
                    <div className='right-box d-inline '>
                        <img src={banner} alt={"banner"} className={"banner-image"}/>
                    </div>
                    <div>

                        <Page1 showBanner={false}/>

                    </div>
                </div>


            </>
        );
    }
}


