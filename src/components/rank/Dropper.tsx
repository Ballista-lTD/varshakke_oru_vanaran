import {getItemStyle, getListStyle} from "./utils";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {PartnerTokenObject} from "../../api/model";
import Lovetitle from "../../images/lovetitle.svg";
import LoveIcon from "../../images/loveIcon.svg";
import {filterButtons} from "./index";
import {useEffect, useState} from "react";

function Card({item, index}: {item: PartnerTokenObject, index: number})
{

    return(
        <Draggable
            key={item.name}
            draggableId={String(item.name)}
            index={index}
        >
            {(provided, snapshot) => (
                <div id={String(item.id)}>
                    <div className="rank_item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                        <div
                            style={{
                                float: "right",
                                marginTop: "-9px"
                            }}>

                        </div>
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-between">
                                <div>
                                    <img src={Lovetitle} alt="love"/>
                                    <span className="rank_text px-2" >{item.name || "No name"}</span>
                                </div>
                                <span style={{fontWeight:"700", color:"#C20A00"}}>{index+1}</span>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                {filterButtons.map(({icon, key}, index) => ( index < 4 &&
                                    <span key={index} className="text-nowrap px-3">{icon}&nbsp;{item.getValue(key)}
                                        &nbsp;&nbsp;<img src={LoveIcon} alt="love"/>
                                    </span>
                                ))}
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                {filterButtons.map(({icon, key}, index) => ( index > 3 &&
                                    <span key={index} className="text-nowrap px-3">{icon}{item.getValue(key)}
                                        &nbsp;&nbsp;<img src={LoveIcon} alt="love"/>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export function Dropper({list, droppableId, noMaxSize}: {list: PartnerTokenObject[], droppableId: string, noMaxSize?: boolean})
{
    const [display, setDisplay] = useState(list);

    useEffect(() =>
    {
        if(!noMaxSize)
            setDisplay(list.slice(0, Math.min(20, list.length)));
        else
            setDisplay(list);

    }, [list]);

    return (
        <Droppable droppableId={droppableId} >
            {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className="rank_width" >
                    {display.length > 0 && display.map((item, index) =>
                        <Card item={item} index={index} key={index}/>)}
                    {display.length === 0 && <h3 className="p-5">Drag Cards here to create priority list</h3>}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
