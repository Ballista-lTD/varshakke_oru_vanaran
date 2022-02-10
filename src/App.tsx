import "./bootstrap.min.css";
// import {Index} from "./components/Index";
import React from "react";
import {Route, RouteComponentProps, Switch, withRouter} from "react-router";
import {getParam} from "./api/QueryCreator";
import {HandleToken, refresh_user} from "./api/auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./App.css";

import {ThemeProvider} from "@mui/styles";
import {green, pink} from "@mui/material/colors";

import {createTheme} from "@mui/material/styles";

import Chat from "./components/Chat";
import Swiper from "./components/Chat/Swiper";
import Homepage from "./components/home/Home";



const theme = createTheme({
    palette: {
        primary: {
            main: "#0091ea",
        },
        secondary: pink,
        success: green,
    }
});

interface AppRouterProps
{
    title: string;   // This one is coming from the router

}

type AppProps = RouteComponentProps<AppRouterProps>


class AppLoc extends React.Component<AppProps>
{
    /**
     * Initialize props
     * Set the location into history stack
     */

    constructor(props: AppProps)
    {
        super(props);
        const location = this.props.location.pathname + this.props.location.search;
        this.props.history.replace(location);
        refresh_user();
    }

    /**
     * componentDidMount() method allows us to execute the React code even after component is rendered
     */
    componentDidMount()
    {
        getParam("lat", "", true);
        getParam("lng", "", true);
        getParam("loc", "Search Location", true);
        getParam("query", "Search Hospital", true);
    }

    /**
     * componentDidUpdate() method use to execute the code when the state of component changes
     */
    componentDidUpdate()
    {
        getParam("lat", "", true);
        getParam("lng", "", true);
        getParam("loc", "Search Location", true);
        getParam("query", "Search Hospital", true);
    }

    render()
    {


        return (
            <div className="App">
                <ThemeProvider theme={theme}>

                    <Switch>
                        <Route path="/chat/:chatId"><Chat/></Route>
                        <Route path="/chat"><Swiper/></Route>
                        <Route path="/set_token/">
                            <HandleToken/>
                        </Route>
                        <Route path="/">
                            {/*<Index/>*/}
                            <Homepage/>
                        </Route>
                    </Switch>
                </ThemeProvider>
            </div>
        );
    }
}

const App = withRouter(AppLoc);
export default App;
