import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { IItem } from "src/redux/reducers/games";
import '../../styles/components/DragDrop/item.sass';

interface IItemProps {
    index: number,
    item: IItem
}

export default function Item({ index, item }: IItemProps) {
    return (
        <Draggable
            index={index}
            draggableId={item.id}
        >
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) =>
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`item ${snapshot.isDragging ? "item-dragging" : ""}`}
                >
                    {item.name}
                </div>
            }
        </Draggable>
    )
}