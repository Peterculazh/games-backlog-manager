import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import gameManager from "./reducers/games";
import { reducer as formReducer } from 'redux-form';

export const store = configureStore({
    reducer: {
        gameManager,
        form: formReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>