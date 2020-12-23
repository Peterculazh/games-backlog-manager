import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import gameManager from "./reducers/games";

export const store = configureStore({
    reducer: {
        gameManager
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>