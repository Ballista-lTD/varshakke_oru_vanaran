import React from "react";
import "./style.css";
import {Balloon} from "./Home";
import banner from "./banner.png";

export class Desktop extends React.Component {
    render() {
        return (
            <>
                <div className="p-0 d-flex">
                    <div className='left-box '>

                        <Balloon/>
                        <h2 className="sub-head mx-2">
                            ITHINE KURICH ORU VAKK
                        </h2>
                        <h4 className="text-white ">
                            ith oru mikacha oru ithanu. ithine kurich parayukayanengil namukk orupad parayan ind but
                            nammak
                            ponde so poyi
                            form fill akku and get mingled.
                        </h4>
                    </div>
                    <div className='right-box d-inline '>
                        <img src={banner} alt={"banner"} className={"banner-image"} />
                    </div>
                </div>

            </>
        );
    }
}


