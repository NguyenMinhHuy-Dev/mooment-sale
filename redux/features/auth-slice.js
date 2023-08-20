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
        },

        addToFavourite: (state, action) => {
            const newItem = action.payload;
            // state.value.user.favourite.map((item) => {
            //     console.log(item)
            // })
            // if (!existingItem) {
            //     state.value.user.favourite.push({_id: action.payload})
            //     console.log(newItem);
            // }
            // else {
                
                console.log(state.value.user);
            // }
        },
    }
});

export const { signIn, logOut, addToFavourite, addToLately } = auth.actions;
export default auth.reducer;