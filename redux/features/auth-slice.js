'use clent'

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: {
        isAuth: false,
        user: {},
        isModerator: false,
    },
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },

        signIn: (state, action) => {
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