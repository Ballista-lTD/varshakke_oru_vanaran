import {getItemStyle, getListStyle} from "./utils";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {PartnerTokenObject} from "../../api/model";
import Lovetitle from "../../images/lovetitle.svg";
import LoveIcon from "../../images/loveIcon.svg";

export function Dropper({list, droppableId}: {list: PartnerTokenObject[], droppableId: string})
{
    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className="rank_width" >
                    {list.length > 0 && list.map((item, index) => (
                        <Draggable
                            key={item.name}
                            draggableId={String(item.name)}

                            index={index}>
                            {(provided, snapshot) => (
                                <div >
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
                                                <span style={{fontWeight:"700", color:"#C20A00"}}>1</span>
                                            </div>
                                            <div className="d-flex flex-row justify-content-between">
                                                <span className="text-nowrap px-3">🧠5  <img src={LoveIcon} alt="love"/></span>
                                                <span className="text-nowrap px-3">💪5 <img src={LoveIcon} alt="love"/></span>
                                                <span className="text-nowrap px-3">🤑5 <img src={LoveIcon} alt="love"/></span>
                                                <span className="text-nowrap px-3">🗽5 <img src={LoveIcon} alt="love"/></span>
                                            </div>
                                            <div className="d-flex flex-row justify-content-between">
                                                <span className="text-nowrap px-3">✨5 <img src={LoveIcon} alt="love"/></span>
                                                <span className="text-nowrap px-3">🙏5 <img src={LoveIcon} alt="love"/></span>
                                                <span className="text-nowrap px-3">🤗5 <img src={LoveIcon} alt="love"/></span>
                                                <span className="text-nowrap px-3">🤝5 <img src={LoveIcon} alt="love"/></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
