import {DraggableLocation, DraggingStyle, NotDraggingStyle} from "react-beautiful-dnd";
import {CSSProperties} from "react";

const grid = 8;

export const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined): CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "#FFDABB" : "#FFEFE4",

    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "#FAA677" : "none",
    padding: grid,
    width: 250
});

export const reorder = (list: Iterable<unknown> | ArrayLike<unknown>, startIndex: number, endIndex: number) =>
{
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const move = (source: Iterable<unknown> | ArrayLike<unknown>, destination: Iterable<unknown> | ArrayLike<unknown>, droppableSource: DraggableLocation, droppableDestination: DraggableLocation) =>
{
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    return {sourceClone, destClone};
};

export function unique<T>(arr: T[])
{
    const u: Record<symbol, unknown> = {}, a: T[] = [];

    for(let i = 0, l = arr.length; i < l; ++i)
        if(!u.hasOwnProperty(arr[i] as unknown as symbol))
        {
            a.push(arr[i]);
            u[arr[i] as unknown as symbol] = 1;
        }
    
    return a;
}
