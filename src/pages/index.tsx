import { DragDropContext, DropResult, resetServerContext } from 'react-beautiful-dnd';
import { InferGetServerSidePropsType } from 'next'
import Column from "src/components/DragDrop/Column";
import '../styles/pages/index.sass';
import { useDispatch, useSelector } from "react-redux";
import { getAllColumns, setAllColumns } from "src/redux/reducers/games";
import { RootState } from "src/redux/store";
import AddGame from 'src/components/Forms/SaveGame';

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
    dispatch(setAllColumns(columns));

    const columnsData = useSelector((state: RootState) => getAllColumns(state));


    const onDragEnd = (_: DropResult) => {

    }

    const handleSaveGame = (data: any) => {
        console.log(data);
    }

    return (
        <>
            {
                columnsData?.length ?
                    <>
                        <div className="save-game-wrapper">
                            <AddGame onSubmit={handleSaveGame} columns={columnsData} />
                        </div>
                        <DragDropContext
                            onDragEnd={onDragEnd}
                        >
                            <div className="drag-wrapper">
                                {
                                    columnsData.map(column => <Column key={column.name} column={column} />)
                                }
                            </div>
                        </DragDropContext>
                    </>
                    : <div>No data</div>
            }

        </>
    )
}
