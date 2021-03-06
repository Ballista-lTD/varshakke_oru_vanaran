import {AuthComponent, AuthPropsLoc, AuthState, Friend} from "../../api/auth";
import {withRouter} from "react-router";

import SignalConnection, {ChatMessage} from "./lib";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import IconButton from "@mui/material/IconButton";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import InputBase from "@mui/material/InputBase";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import "./Swiper.css";
import DoneIcon from "@mui/icons-material/Done";
import React, {ChangeEvent, createRef, CSSProperties} from "react";
import localForage from "localforage";
import Typography from "@mui/material/Typography";
import Popper from "@mui/material/Popper";
import PopupState, {bindToggle, bindPopper} from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Picker from "emoji-picker-react";

import Vanaran from "../../images/vanaran.png";


interface ChatState extends AuthState
{
    chat: string;
    messages: Array<ChatMessage>;
    chatUser?: Friend;
    connection: SignalConnection;
    mime?: string;
    showPicker: boolean;
}

const messageStyle = {
    sent: {background: "#f7924a", color: "#F7F7F7"},
    received: {background: "#F7F7F7", color: "#ff724a"},
};


class ChatLoc extends AuthComponent<AuthPropsLoc, ChatState>
{

    private readonly messagesEndRef = createRef<HTMLDivElement>();
    private readonly fileInput = createRef<HTMLInputElement>();
    private readonly imageInput = createRef<HTMLInputElement>();

    constructor(props: AuthPropsLoc)
    {
        super(props);

        this.state = {
            ...this.state,
            chat: "",
            messages: [],
            showPicker: false,
        };
    }

    onMessage = (messages: Array<ChatMessage>) => this.setState({messages}, () => this.scrollToBottom());

    scrollToBottom = () => this.messagesEndRef.current?.scrollIntoView({behavior: "smooth"});

    async componentDidMount()
    {
        super.componentDidMount();

        await this.refreshAuth();

        if (!this.state.user?.tokens?.private_token || !this.state.user?.tokens?.chat_friends?.[0])
            return this.performAuth();

        this.setState({chatUser: this.state.user.tokens.chat_friends[0]});

        const friend = this.state.user.tokens.chat_friends[0];

        this.onMessage(await localForage.getItem("messages-transferred") || []);
        this.setState({
            connection: new SignalConnection(this.state.user.tokens.private_token,
                friend.token, friend.bundle, this.onMessage)
        });
    }

    componentWillUnmount()
    {
        super.componentWillUnmount();
        this.state.connection.tareDown();
    }

    sendMessage = async () =>
    {
        if (this.state.chat)

            await this.state.connection?.sendMessage(this.state.chat, this.state.mime);



        this.setState({chat: "", mime: undefined});
    };

    uploadFile = async (event: ChangeEvent<HTMLInputElement>) =>
    {
        const reader = new FileReader();
        const read = new Promise((resolve, reject) =>
        {
            reader.onloadend = resolve;
            reader.onerror = reject;
        });

        const file = event.target.files?.[0];

        if (file)
        {
            reader.readAsDataURL(file);
            await read;

            this.setState({
                mime: file?.type || "application/octet-stream",
                chat: reader.result?.toString() || ""
            });

            await this.sendMessage();
        }
    };

    render()
    {
        return (
            <>
                <div style={{height: "90vh"}}>
                    <div style={{
                        boxShadow: "0px 10px 60px rgba(0, 0, 0, 0.0625)",
                        position: "sticky",
                        top: "0",
                        background: "#fff",
                        zIndex: 1000,
                    }} className="d-flex px-3 align-items-center">
                        <Link style={{textDecoration: "none"}} to="/"><ArrowBackIcon
                            sx={{color: "#4F5E7B"}}/></Link>

                        <img style={{borderRadius: "50%", marginLeft: "1rem", width: "3rem"}} src={Vanaran} alt=""/>
                        <div style={{marginLeft: "1rem", paddingTop: "1rem"}} className="d-flex flex-column text-start">
                            <div className="h5 m-0 fw-bold">{this.state.chatUser?.name || "Angry Server"}</div>
                            <div>Last seen on {this.state.chatUser?.last_seen || "Never"}</div>
                        </div>
                    </div>


                    <div className="chat-main" style={{
                        height: "89%",
                        position: "relative",
                        overflowY: "auto",
                        zIndex: 100,
                        marginBottom: "3.5rem",
                    }}>
                        <p style={{margin: ".5rem", fontSize: "10px", color: "#A1A1BC"}}>Message Now</p>

                        {this.state.messages.map(({content, type, time, attachment}, i) =>
                        {

                            const next = this.state.messages[i + 1];
                            const prev = this.state.messages[i - 1];
                            const corner_top = (prev?.type === type) ? "8px" : "25px";
                            const corner_bottom = (next?.type === type) ? "8px" : "25px";

                            const border: CSSProperties = type !== "sent" ? {
                                borderTopLeftRadius: corner_top,
                                borderBottomLeftRadius: corner_bottom,

                            } : {
                                borderTopRightRadius: corner_top,
                                borderBottomRightRadius: corner_bottom
                            };
                            if(attachment)
                            
                                border.position = "relative";
                            
                            else
                            {
                                border.padding = ".25rem";
                                border.paddingLeft = "1rem";
                                border.paddingRight = "1rem";
                                border.paddingTop = ".5rem";
                            }

                            const timeStyle: CSSProperties = content? {display: "flex", alignSelf: "end"} :
                                {display: "flex", alignSelf: "end", position: "absolute",
                                    bottom: "4px",
                                    right: "4px",
                                    opacity: "1"};
                            return (
                                <div ref={this.messagesEndRef} className={`d-flex align-items-center mb-1 mx-2 ${prev?.type !== type ? "mt-4" : "mt-0"} ${type === "sent" ? "justify-content-end" : "justify-content-start"}`}

                                    key={i}>
                                    <div style={{
                                        ...messageStyle[type],
                                        width: "fit-content",
                                        maxWidth: "85%",
                                        minWidth: "10%",
                                        borderRadius: "25px",
                                        ...border,
                                        wordBreak: "break-word",
                                        textAlign: "left",

                                    }} className="d-flex flex-column">
                                        {content ? <div>{content}</div> :
                                            // <a download="chat_message" className={"text-white"} href={attachment}>
                                            <img
                                                style={{
                                                    width: "100%",
                                                    borderRadius: "25px", ...border,
                                                    marginLeft: "0",
                                                    marginRight: "0",
                                                    position: "relative"
                                                }} src={attachment} alt={"download"}/>
                                            //</a>
                                        }
                                        <div className="ms-1" style={timeStyle}>


                                            <p style={{
                                                marginBottom: "0",
                                                fontSize: "8px",
                                                marginLeft: "auto",
                                            }}>{time}</p>
                                            {type === "sent" && <DoneIcon sx={{height: "12px"}}/>
                                                // <DoneAllIcon sx={{height: "12px"}}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{position: "sticky", bottom: "4rem"}}>
                    {this.state.showPicker && (
                        <Picker pickerStyle={{width: "100%"}} onEmojiClick={(event, emojiObject) => this.setState({chat: this.state.chat + emojiObject.emoji})}/>
                    )}

                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        boxShadow: "0",
                        position: "fixed",
                        bottom: "0",
                        width: "100%",
                        height: "4rem",
                        zIndex: 200,
                        background: "#fff",
                    }}
                >
                    <IconButton sx={{p: "10px"}} aria-label="menu"
                        onClick={() => this.setState({showPicker: !this.state.showPicker})}>
                        <SentimentSatisfiedAltIcon />
                    </IconButton>
                    <InputBase
                        sx={{ml: 1, flex: 1}}
                        value={this.state.chat}
                        placeholder="Write a message..."
                        onChange={({target}) => this.setState({chat: target.value})}
                    />
                    <PopupState variant="popper" popupId="demo-popup-popper">
                        {(popupState) => (
                            <div>
                                <IconButton sx={{p: "10px"}} {...bindToggle(popupState)} >
                                    <AttachFileIcon/>
                                </IconButton>
                                <Popper className="d-flex justify-content-center align-items-center" style={{zIndex: 1000, width: "100vw"}} {...bindPopper(popupState)} transition>
                                    {({TransitionProps}) => (
                                        <Fade style={{width: "95vw", height: "6rem", }} {...TransitionProps} timeout={350}>
                                            <Paper className="d-flex align-items-center justify-content-around mb-3">
                                                <Typography sx={{p: 2}}><InsertDriveFileIcon
                                                    sx={{color: "#5157ae", fontSize: "2rem"}}
                                                    onClick={() => this.fileInput.current?.click()}/><p
                                                    style={{fontSize: "13px", marginBottom: "0"}}>Document</p>
                                                </Typography>
                                                <Typography sx={{p: 2}}><PermMediaIcon
                                                    sx={{color: "#b462cf", fontSize: "2rem"}}
                                                    onClick={() => this.imageInput.current?.click()}/><p
                                                    style={{fontSize: "13px", marginBottom: "0"}}>Media</p></Typography>
                                                <Typography sx={{p: 2}}><CameraAltIcon
                                                    sx={{color: "#d44a6d", fontSize: "2rem"}}
                                                    onClick={() => this.imageInput.current?.click()}/><p
                                                    style={{fontSize: "13px", marginBottom: "0"}}>Camera</p>
                                                </Typography>
                                            </Paper>
                                        </Fade>
                                    )}
                                </Popper>
                            </div>
                        )}
                    </PopupState>
                    <IconButton onClick={this.sendMessage} sx={{
                        p: "10px",
                        m: "10px",
                        background: "#f7724a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {backgroundColor: "#f7924a"}
                    }}>
                        <SendIcon sx={{color: "#fff"}}/>
                    </IconButton>
                    <input type="file" hidden onChange={this.uploadFile} accept="video/*,image/*"
                        ref={this.imageInput}/>
                    <input type="file" hidden onChange={this.uploadFile} accept="*" ref={this.fileInput}/>
                </div>
            </>
        );
    }
}

export default withRouter(ChatLoc);
