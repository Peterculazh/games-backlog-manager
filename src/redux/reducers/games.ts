import { createSlice } from "@reduxjs/toolkit";

export interface IItem {
    id: string,
    name: string,
    addedAt: Date,
}

export interface IColumn {
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
    reducers: {},
});

export default gameManager.reducer;