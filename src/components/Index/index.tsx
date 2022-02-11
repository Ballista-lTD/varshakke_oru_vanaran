import React from "react";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

import "./index.css";
import {getParam} from "../../api/QueryCreator";
import {Desktop} from "../home/Destop";
import {Homepage} from "../home/Home";


interface IndexState extends AuthState
{
    display: boolean
    lat?: string,
    lng?: string,
    activestep: number,
}

/**
 * @extends  AuthComponent<AuthPropsLoc, IndexState>
 */

class IndexLoc extends AuthComponent<AuthPropsLoc, IndexState>
{

    constructor(props: AuthPropsLoc)
    {
        super(props);
        const lat = getParam("lat",); // Obtain value Of lat stored in local storage during previous query
        const lng = getParam("lng",);
        this.state = {
            ...this.state,
            display: true,
            lat, lng,
            activestep: 0,
        };
    }

    handleStepChange = (step: number) =>
    {
        this.setState({activestep: step});
    };

    /**
     * Descibes the Index page including swipable carousels
     * @returns { JSX.Element } index Component
     */

    render()
    {

        if (this.state.width > 300)
        
            return (
                <Desktop/>
            );
        
        return (
            <Homepage/>
        );

    }
}
export  const Index = withRouter(IndexLoc);
