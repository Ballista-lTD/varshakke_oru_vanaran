import {ResponsiveComponent, ResponsiveState} from "../components/ResponsiveComponent";
import {RouteComponentProps, withRouter} from "react-router";
import {getParam, getQueryVariable} from "./QueryCreator";
import {baseUrl, post} from "./api";
import {Container} from "@mui/material";
import Loader from "react-loader-spinner";
import React from "react";
import {toast} from "react-toastify";
import localForage from "localforage";


const client_id = "V2EFP5NXXHNLkL1fLHzTJdcwtwSbP9h6jPCpp9vd";
export const reactUrl = process.env.REACT_URL;

const redirect_uri = reactUrl + "/set_token/";

export function getAuth() 
{
    return localStorage.getItem("accessToken");
}

function setAuth(token: string) 
{
    localStorage.setItem("accessToken", token);
}

function getRefresh() 
{
    return localStorage.getItem("refreshToken");
}

function setRefresh(token: string) 
{
    localStorage.setItem("refreshToken", token);

}

async function refreshToken() 
{
    const state = getQueryVariable("state");
    const refresh_token = getRefresh();
    const kwargs = {
        client_id,
        redirect_uri,
        state,
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        response_type: "token"
    };
    await post(`${baseUrl}/auth/o/token/`, kwargs).then((response) => 
    {
        setRefresh(response.refresh_token);
        setAuth(response.access_token);
        timer = Date.now();
    });
}

export function refresh_user(tries = 0) 
{
    const access_token = getAuth();

    post(`${baseUrl}/auth/users/me/`, {}, {"Authorization": `Bearer ${access_token}`}).then((response) => 
    {
        setObj("user", response.results[0]);
    }).catch((error) => 
    {
        console.log(error);
        if (tries < 1)

            refreshToken().then(() => 
            {
                refresh_user(1);
            });

    });


}

export function setObj(str: string, data: Record<string, unknown> | null) 
{
    localStorage.setItem(str, JSON.stringify(data));

}

export function getObj(str: string) 
{
    const item = localStorage.getItem(str);
    return JSON.parse(item || "{}");
}

let timer = Date.now();

function makeid(length: number) 
{
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++)

        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));

    return result;
}


export type AuthPropsLoc = RouteComponentProps<Record<string, string | undefined>>

export interface Friend {
    token: string,
    name: string,
    last_seen?: string
    bundle: boolean
}


type token = {
    id: number,
    private_token: string,
    user: number,
    total: number
    chat_friends?: Friend[]
}

export interface AuthState extends ResponsiveState {
    width: number
    refresh_view: boolean
    auth: string | null
    refresh: string | null
    user?: {
        id: number,
        tokens: token,
        email: string,
        username: string,
        first_name: string,
        last_name: string,
        friends?: Friend[],
        invited?: Friend[]
    } | null
}

export class AuthComponent<P, S extends AuthState>
    extends ResponsiveComponent <P, S> 
{
    constructor(props: P) 
    {
        super(props);
        const auth = getAuth();
        const refresh = getRefresh();
        const user = getObj("user");
        const diff = Date.now() - timer;
        if (diff > 36000 * 1000)
            this.refreshAuth();

        this.state = {
            ...this.state,
            refresh_view: false,
            auth,
            refresh,
            user
        };

    }

    refresh = (callbackFn?: () => void) => 
    {
        const auth = getAuth();
        const refresh = getRefresh();
        const user = getObj("user");
        console.log(user);
        this.setState({
            // width: 0,
            refresh_view: !this.state.refresh_view,
            auth, refresh, user
        }, callbackFn);

    };

    performAuth = () => 
    {
        const state = "st" + makeid(5);
        const invite = getParam("invite", "", false);
        const kwargs = {
            client_id,
            redirect_uri,
            state,
            response_type: "code",
            invite

        };
        let pathname = window.location.pathname;
        if (pathname.includes("invite"))

            pathname = "/";

        localStorage.setItem(state, pathname + window.location.search);
        window.location.href = `${baseUrl}/auth/o/authorize/?` + new URLSearchParams(kwargs);
    };

    removeAuth = () => 
    {

        setRefresh("");
        setAuth("");
        setObj("user", null);
        return localForage.clear().then(() => true);
    };

    refreshAuth = () => 
    {
        const state = getQueryVariable("state");
        const refresh_token = getRefresh();
        const kwargs = {
            client_id,
            redirect_uri,
            state,
            grant_type: "refresh_token",
            refresh_token: refresh_token,
            response_type: "token"
        };
        return post(`${baseUrl}/auth/o/token/`, kwargs).then((response) =>
        {
            setRefresh(response.refresh_token);
            setAuth(response.access_token);
            timer = Date.now();
            return post(`${baseUrl}/auth/users/me/`, {}, {"Authorization": `Bearer ${response.access_token}`}).then((response) =>
            {
                setObj("user", response.results[0]);
            });
        });
    };
}


export class HandleTokenLoc extends AuthComponent<AuthPropsLoc, AuthState> 
{
    componentDidMount() 
    {
        super.componentDidMount();
        const code = getQueryVariable("code");
        const state = getQueryVariable("state");
        const error = getQueryVariable("error");
        if (error)

            this.props.history.push("/");

        const kwargs = {
            client_id,
            redirect_uri,
            state,
            grant_type: "authorization_code",
            code: code,
            response_type: "token"
        };


        timer = Date.now();
        post(`${baseUrl}/auth/o/token/`, kwargs).then((response) => 
        {
            setAuth(response.access_token);
            setRefresh(response.refresh_token);
            const location = localStorage.getItem(state as string);

            post(`${baseUrl}/auth/users/me/`, {}, {"Authorization": `Bearer ${response.access_token}`}).then((response) => 
            {
                setObj("user", response.results[0]);
                if (location)

                    this.props.history.push("/mingle");

                else

                    this.props.history.push("/mingle");

            }).catch(() => 
            {
                toast.error("Oops something went wrong", {
                    position: "bottom-center"
                });
                setTimeout(this.props.history.push, 1000, "/");
            });


        }).catch(reason => 
        {
            console.log(reason);
            refresh_user();
        });

    }

    render() 
    {
        return (
            <Container className="mt-5 pt-5">
                <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
            </Container>
        );
    }
}

export const HandleToken = withRouter(HandleTokenLoc);

export class HandleInviteLoc extends AuthComponent<AuthPropsLoc, AuthState> 
{
    componentDidMount() 
    {
        super.componentDidMount();
        console.log(this.props.location);
        getParam("invite", "", true);
        this.performAuth();

    }

    render() 
    {
        return (
            <Container className="mt-5 pt-5">
                <Loader type="Bars" color="#3a77ff" height={50} width={50}/>
            </Container>
        );
    }
}


export const HandleInvite = withRouter(HandleInviteLoc);
