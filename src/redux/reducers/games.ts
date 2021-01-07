import { createSlice } from "@reduxjs/toolkit";
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
    columns: IColumn[]
}

const initialState: IManagerGames = {
    columns: []
}

export const gameManager = createSlice({
    name: "gameManager",
    initialState,
    reducers: {
        setAllColumns(state, action) {
            state.columns = action.payload;
        }
    },
});

export const { setAllColumns } = gameManager.actions;

export const getAllColumns = (state: RootState) => state.gameManager.columns;

export default gameManager.reducer;