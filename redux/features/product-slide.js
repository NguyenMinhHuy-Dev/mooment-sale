'use clent'
import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    list: [],
}

export const product = createSlice({
    name: 'product',
    initialState,
    reducers: { 
        reset: () => {
            return {
              list: [], 
            }
          },
        addToLately: (state, action) => {
            const newItem = action.payload;
            const index = state.list.findIndex((item) => item._id === newItem._id);
            if (index === -1) {
                state.list.push(newItem);
            }    
        }
    }
});

export const { addToLately, reset } = product.actions;
export default product.reducer;

