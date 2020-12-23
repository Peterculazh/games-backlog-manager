import { useState } from "react";
import { DragDropContext, DropResult, resetServerContext } from 'react-beautiful-dnd';
import Column from "src/components/DragDrop/Column";
import '../styles/pages/index.sass';

export const getServerSideProps = async (context: any) => {
    resetServerContext();
    return {
        props: {
            ...context.query
        }
    }
}

const initialState = {
    columns: [
        {
            name: 'Backlog',
            items: [
                {
                    id: "1",
                    name: 'Witcher 3',
                    addedAt: new Date()
                },
                {
                    id: "2",
                    name: 'MGS 5',
                    addedAt: new Date()
                },
                {
                    id: "3",
                    name: 'Witcher 1',
                    addedAt: new Date()
                },
                {
                    id: "4",
                    name: 'Witcher 2',
                    addedAt: new Date()
                }
            ]
        },
        {
            name: 'In progress',
            items: [

            ]
        },
        {
            name: "Finished",
            items: [

            ]
        }
    ]
}


export default function Home() {

    const [app, setApp] = useState(initialState);

    const onDragEnd = (result: DropResult) => {
        console.log(result);

    }

    return (
        <>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <div className="drag-wrapper">
                    {
                        app.columns.map(column => <Column key={column.name} column={column} />)
                    }
                </div>
            </DragDropContext>
        </>
    )
}
