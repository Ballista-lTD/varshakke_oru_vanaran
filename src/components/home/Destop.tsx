import React from "react";
import "./style.css";
import {Balloon} from "./Home";
import {Page1} from "./page1";
import banner from "./bannersvg.svg";

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
                            Heyyyy beautiful people out there!, wanna try something different???
                            Are you ready to celebrate this valentine&apos;s day with an algorithmically chosen valentine❤️
                            All that you need to do is login to the site &ldquo;Minglikko.com&rdquo;😂, test yourself (be honest),
                            and get a blast with your valentine🥳 <br/>
                            <span>Fill the form and get mingled.</span>
                        </h4>
                    </div>
                    <div className='right-box d-inline '>
                        <img src={banner} alt={"banner"} className={"banner-image"} />
                    </div>
                    <div >

                        <Page1 showBanner={false}/>

                    </div>
                </div>


            </>
        );
    }
}


