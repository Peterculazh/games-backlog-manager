import Item from "./Item";
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import '../../styles/components/DragDrop/column.sass';
import { IColumn } from "src/redux/reducers/games";
interface IColumnProps {
    column: IColumn,
}


export default function Column({ column }: IColumnProps) {
    return (
        <>
            <div
                className="column-games"
            >
                <h3>{column.name}</h3>

                <Droppable
                    droppableId={column.name}
                >
                    {(provided: DroppableProvided) =>
                        <div

                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="column-games-list">
                            {column.items.map((item, index) => <Item index={index} item={item} key={item.name} />)}
                            {provided.placeholder}
                        </div>

                    }
                </Droppable>
            </div>


        </>
    )
}