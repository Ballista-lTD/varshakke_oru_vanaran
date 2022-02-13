import {getItemStyle, getListStyle} from "./utils";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {PartnerTokenObject} from "../../api/model";

export function Dropper({list, droppableId}: {list: PartnerTokenObject[], droppableId: string})
{
    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} >
                    {list.length > 0 && list.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={String(item.id)}
                            index={index}>
                            {(provided, snapshot) => (
                                <div>
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging, provided.draggableProps.style)}
                                    >
                                        <div
                                            style={{
                                                float: "right",
                                                marginTop: "-9px"
                                            }}>
                                            <div className="rank_menu"/>
                                            <div className="rank_menu"/>
                                            <div className="rank_menu"/>
                                        </div>
                                        {item.name || "No name"}
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
