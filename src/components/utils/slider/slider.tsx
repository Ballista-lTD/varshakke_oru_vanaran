import {ResponsiveComponent, ResponsiveState} from "../../ResponsiveComponent";
import "./slider.css";
import React from "react";

const slider = React.createRef<any>();
const container = React.createRef<any>();
const isTouchDevice = "ontouchstart" in document.documentElement;

interface SliderProps {
    onSuccess?: () => void;
    onFailure?: () => void;
    color: string;
    text_unlocked: string;
    text: string;

}

interface SliderState extends ResponsiveState {
    isDragging: boolean;
    unlocked: boolean;

}

export default class Slider extends ResponsiveComponent<SliderProps, SliderState> 
{

    isDragging = false;
    sliderLeft = 0;


    private containerWidth?: number;
    private unmounted: boolean | undefined;
    private startX: number;

    constructor(props: SliderProps) 
    {

        super(props);
        this.startX = 0;
    }


    componentDidMount() 
    {
        if (isTouchDevice) 
        {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.addEventListener("touchmove", this.onDrag);
            document.addEventListener("touchend", this.stopDrag);
        }
        else 
        {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.addEventListener("mousemove", this.onDrag);
            document.addEventListener("mouseup", this.stopDrag);
        }
        this.containerWidth = container.current.clientWidth - 70;
    }

    onDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => 
    {
        if (this.unmounted || this.state.unlocked) return;
        if (this.isDragging) 
        {
            if (isTouchDevice)

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.sliderLeft = Math.min(Math.max(0, e?.touches[0].clientX - this.startX), this.containerWidth as number);


            else

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.sliderLeft = Math.min(Math.max(0, e?.clientX - this.startX), this.containerWidth as number);


            this.updateSliderStyle();
        }
    };

    updateSliderStyle = () => 
    {
        if (this.unmounted || this.state.unlocked) return;
        slider.current.style.left = (this.sliderLeft) + "px";
    };

    stopDrag = () => 
    {
        if (this.unmounted || this.state.unlocked) return;
        if (this.isDragging) 
        {
            this.isDragging = false;
            if (this.state.isDragging)
                this.setState({isDragging: false});

            if (this.sliderLeft > Number(this.containerWidth) * 0.9) 
            {
                this.sliderLeft = this.containerWidth as number;
                this.onSuccess();
                if (this.props.onSuccess)

                    this.props.onSuccess();


            }
            else 
            {
                this.sliderLeft = 0;

                if (this.props.onFailure)
                    this.props.onFailure();


            }
            this.updateSliderStyle();
        }
    };

    startDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => 
    {
        if (this.unmounted || this.state.unlocked) return;
        this.isDragging = true;
        if (!this.state.isDragging)

            this.setState({isDragging: true});

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.startX = e?.touches[0] ? e.touches[0].clientX : e?.clientX;


    };

    onSuccess = () => 
    {
        container.current.style.width = container.current.clientWidth + "px";
        this.setState({
            unlocked: true
        });
    };

    getText = () => 
    {
        return this.state.unlocked ? (this.props.text_unlocked || "UNLOCKED") : (this.props.text || "SLIDE");
    };

    reset = () => 
    {
        if (this.unmounted) return;
        this.setState({unlocked: false}, () => 
        {
            this.sliderLeft = 0;
            this.updateSliderStyle();
        });
    };

    componentWillUnmount() 
    {
        this.unmounted = true;
    }

    render() 
    {
        return (
            <div className={`ReactSwipeButton ${this.state.unlocked ? "rsbContainerUnlocked " : ""}`}>
                <div className={`rsbContainer ${this.state.unlocked ? "rsbContainerUnlocked " : ""}`}
                    ref={container}>
                    <div role="none" className={`rsbcSlider ${this.state.isDragging ? "unRoundRight" : ""}`}
                        ref={slider}
                        onMouseDown={this.startDrag}
                        style={{background: this.props.color}}
                        onTouchStart={this.startDrag}>
                        <span className="rsbcSliderText">{this.getText()}</span>
                        {!this.state.unlocked &&
                            <span className={"rsbcSliderArrow"}/>
                        }
                        <span className={`rsbcSliderCircle ${this.state.isDragging ? "unRoundLeft" : ""}`}
                            style={{background: this.props.color}}/>
                    </div>
                    <div className={"rsbcText"}>{this.getText()}</div>
                </div>
            </div>
        );
    }
}
