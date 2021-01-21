import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface IItem {
    id: number,
    name: string,
    addedAt: Date,
}

export interface IColumn {
    id: number,
    name: string,
    items: IItem[]
}

export interface IManagerGames {
    columns: IColumn[],
    status: string,
}

const initialState: IManagerGames = {
    columns: [],
    status: "idle",
}

export const addGame = createAsyncThunk('gameManager/addGame',
    async (data: { name: string, columnId: string }) => {
        const result = await axios.post('/api/games/add', data);
        return result.data.data.game;
    }
);

export const moveGame = createAsyncThunk('gameManager/moveGame',
    async (data: {
        sourceIndex: number;
        sourceColumnId: number;
        draggableId: number;
        targetColumnId: number;
        destinationIndex: number;
    }) => {
        const result = await axios.post('/api/games/move', data);
        console.log("result", result.data.data.success);
        return result.data.result;
    }
);

export const gameManager = createSlice({
    name: "gameManager",
    initialState,
    reducers: {
        setAllColumns(state, action) {
            state.columns = action.payload;
        },
        moveToColumn(state, action) {
            const { sourceColumnId, draggableId, targetColumnId, destinationIndex } = action.payload;
            const sourceColumn = state.columns.find(column => column.id === sourceColumnId);
            const game = sourceColumn?.items.splice(sourceColumn.items.findIndex(item => item.id === draggableId), 1)[0];
            if (game) {
                const targetColumn = state.columns.find(column => column.id === targetColumnId);
                targetColumn?.items.splice(destinationIndex, 0, game);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addGame.pending, (state: IManagerGames, _action) => {
            // state.status = "loading";
        });
        builder.addCase(addGame.fulfilled, (state: IManagerGames, action) => {
            const game = action.payload;
            const columnIndex = state.columns.findIndex(column => column.id === game.column.id);
            delete game.column;
            const customColumns = state.columns.slice();
            customColumns[columnIndex].items.push(game);
            state.columns = customColumns;
            state.status = "succeeded";
        });
    }
});

export const { setAllColumns, moveToColumn } = gameManager.actions;

export const getAllColumns = (state: RootState) => state.gameManager.columns;
export const getStatus = (state: RootState) => state.gameManager.status;

export default gameManager.reducer;