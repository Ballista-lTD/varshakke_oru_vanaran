import "./bootstrap.min.css";
import {Route, RouteComponentProps, Switch, withRouter} from "react-router";
import {AuthComponent, AuthState, HandleToken} from "./api/auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./App.css";

import {ThemeProvider} from "@mui/styles";
import {green, pink} from "@mui/material/colors";

import {createTheme} from "@mui/material/styles";

import Chat from "./components/Chat";
import Rank from "./components/rank";
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


class AppLoc extends AuthComponent<AppProps, AuthState>
{
    /**
     * Initialize props
     * Set the location into history stack
     */

    constructor(props: AppProps)
    {
        super(props);

    }

    render()
    {

        return (
            <div className="App">
                <ThemeProvider theme={theme}>

                    <Switch>
                        <Route path="/chat"><Chat/></Route>
                        <Route path="/set_token/" component={HandleToken} />
                        <Route path="/" component={Homepage} />

                    </Switch>
                </ThemeProvider>
            </div>
        );
    }
}

const App = withRouter(AppLoc);
export default App;
