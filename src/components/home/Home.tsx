import "./style.css";
import bgimg from "../../images/home_love.png";
import bg2 from "../../images/love2.png";
import Slider from "../utils/slider/slider";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";

export function Balloon()
{
    return (
        <div>
            <h2 className='heading'>
                    Minglikko </h2>
            <img className="bg1-img" src={bg2} alt="love"/>
            <div className="bg-image-container">

                <img className="bg-img" src={bgimg} alt="love"/>
            </div>
        </div>
    );
}


export class HomepageLoc extends AuthComponent<AuthPropsLoc, AuthState> 
{

    constructor(props:AuthPropsLoc)
    {
        super(props);
        localStorage.clear();
        this.state = {
            ...this.state,
            user:null
        };
    }

    render() 
    {
        return (
            <>
                <div className='Home-bg'>
                    <Balloon/>

                </div>
                <div className="p-2 px-5">
                    <h2 className="sub-head">
                        Welcome back
                    </h2>
                    <p className="description">
                        Finally you are there, your partner is waiting for you. <br/>
                    </p>
                    <Slider text="Get Set Chat" color="#fff" text_unlocked="Go on"
                        onSuccess={() => this.props.history.push("/chat")}/>
                </div>

            </>
        );
    }
}

export default withRouter(HomepageLoc);
