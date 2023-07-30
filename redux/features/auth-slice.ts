'use clent'

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: AuthState;
};

type UserState = {
    uid: string,
    email: string,
    fullName: string
}

type AuthState = {
    isAuth: boolean,
    user: UserState,
    isModerator: boolean,
};

const initialState = {
    value: {
        isAuth: false,
        user: {},
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

        signIn: (state, action: PayloadAction<UserState>) => {
            return {
                value: {
                    isAuth: true,
                    user: action.payload,
                    isModerator: false,
                }
            }
        }
    }
});

export const { signIn, logOut } = auth.actions;
export default auth.reducer;