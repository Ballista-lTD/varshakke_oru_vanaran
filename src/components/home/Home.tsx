import "./style.css";
import bgimg from "../../images/home_love.png";
import bg2 from "../../images/love2.png";
import Slider from "../utils/slider/slider";
import {AuthComponent, AuthPropsLoc, AuthState} from "../../api/auth";
import {withRouter} from "react-router";
import * as React from "react";
import {Theme, useTheme} from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    "Agender",
    "Androgyne",
    "Androgynous",
    "Bigender",
    "Cis",
    "Cisgender",
    "Female to Male",
    "FTM",
    "Gender Fluid",
    "Gender Nonconforming",
    "Gender Questioning",
    "Gender Variant",
    "Genderqueer",
    "Intersex",
    "Male to Female",
    "MTF",
    "Neither",
    "Neutrois",
    "Non-binary",
    "Other",
    "Pangender",
    "Trans",
    "Trans*",
    "Trans Female",
    "Trans* Female",
    "Trans Male",
    "Trans* Male",
    "Trans Man",
    "Trans* Man",
    "Trans Person",
    "Trans* Person",
    "Trans Woman",
    "Trans* Woman",
    "Transfeminine",
    "Transgender",
    "Transgender Female",
    "Transgender Male",
    "Transgender Man",
    "Transgender Person",
    "Transgender Woman",
    "Transmasculine",
    "Transsexual",
    "Transsexual Female",
    "Transsexual Male",
    "Transsexual Man",
    "Transsexual Person",
    "Transsexual Woman",
    "Two-Spirit",
    "Cis Female",
    "Cis Male",
    "Cis Man",
    "Cis Woman",
    "Cisgender Female",
    "Cisgender Male",
    "Cisgender Man",
    "Cisgender Woman"
];

function getStyles(name: string, personName: string | any[], theme: Theme) 
{
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function MultipleSelect() 
{
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event: { target: { value: any; }; }) => 
    {
        const {
            target: {value},
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value,
        );
    };

    return (
        <div>
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-multiple-name-label">Preferred gender</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Preferred gender"/>}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export class Balloon extends React.Component 
{
    render() 
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
                        Congratulation you have passed the first round now. <br/>
                        <span>Please rank your options in order</span>
                    </p>
                    <MultipleSelect/>
                    <Slider text="Option mukyam " color="#fff" text_unlocked="Go on"
                        onSuccess={() => !this.state.user ? this.performAuth() : this.props.history.push("/mingle")}/>
                </div>

            </>
        );
    }
}

export const Homepage = withRouter(HomepageLoc);
