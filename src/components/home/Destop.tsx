import React from "react";
import "./style.css";
import {Balloon} from "./Home";

export class Desktop extends React.Component {
    render()
    {
        return (
            <>
                <div>
                    <div className='left-box'>
                        <Balloon/>/
                    </div>
                    <div className='right-box'>
                    </div>
                </div>

            </>
        );
    }
}


