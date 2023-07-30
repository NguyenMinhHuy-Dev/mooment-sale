'use clent'

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: AuthState;
};

type AuthState = {
    isAuth: boolean,
    email: string,
    uid: string,
    isModerator: boolean,
};

const initialState = {
    value: {
        isAuth: false,
        email: "",
        uid: "",
        isModerator: false,
    } as AuthState,
} as InitialState;

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },

        signIn: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    isAuth: true,
                    email: action.payload,
                    uid: "alsdfkaslasdfasdfasdf",
                    isModerator: false,
                }
            }
        }
    }
});

export const { signIn, logOut } = auth.actions;
export default auth.reducer;