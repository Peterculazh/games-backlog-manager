import { DragDropContext, DropResult, resetServerContext } from 'react-beautiful-dnd';
import { InferGetServerSidePropsType } from 'next'
import Column from "src/components/DragDrop/Column";
import '../styles/pages/index.sass';
import { useDispatch, useSelector } from "react-redux";
import { addGame, getAllColumns, getStatus, moveToColumn, setAllColumns } from "src/redux/reducers/games";
import { RootState } from "src/redux/store";
import AddGame from 'src/components/Forms/SaveGame';
import { useEffect } from 'react';

export const getServerSideProps = async (context: any) => {
    resetServerContext();
    return {
        props: {
            columns: context.query.ssrData.columns
        }
    }
}

export default function Home({ columns }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const dispatch = useDispatch();
    // setTimeout(() => dispatch(setAllColumns(columns)), 3000); // Long fetching simulate
    useEffect(() => {
        dispatch(setAllColumns(columns));
    }, []);

    const columnsData = useSelector((state: RootState) => getAllColumns(state));
    const status = useSelector((state: RootState) => getStatus(state));

    const onDragEnd = (dragEnd: DropResult) => {
        if (dragEnd.destination?.droppableId) {
            dispatch(moveToColumn({
                sourceColumnId: parseInt(dragEnd.source.droppableId),
                draggableId: parseInt(dragEnd.draggableId),
                targetColumnId: parseInt(dragEnd.destination.droppableId),
                destinationIndex: dragEnd.destination.index
            }));
        }
    }

    const handleSaveGame = (data: any) => {
        dispatch(addGame(data));
    }

    return (
        <>
            {
                columnsData?.length ?
                    <>
                        {status === "loading" ?
                            <div className="save-game-wrapper">
                                Sending data
                        </div>
                            :
                            <div className="save-game-wrapper">
                                <AddGame onSubmit={handleSaveGame} />
                            </div>
                        }
                        <DragDropContext
                            onDragEnd={onDragEnd}
                        >
                            <div className="drag-wrapper">
                                {
                                    columnsData.map(column => <Column key={column.id} column={column} />)
                                }
                            </div>
                        </DragDropContext>
                    </>
                    : <div>No data</div>
            }

        </>
    )
}
