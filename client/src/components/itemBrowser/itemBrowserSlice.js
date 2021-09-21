import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/products';

// Async action creator -- API call
export const loadItems = createAsyncThunk('itemBrowser/loadItems', async (params, thunkAPI) => {
    const response = await fetch("http://localhost:4001/api/products/all", {mode: 'cors'});
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
//    return response;
//    return ["test thunk"];
    // const response = await fetchProducts();
    // console.log(response);
    // return response;

})


// create slice
const options = {
    name: 'itemBrowser',
    initialState: {
        items: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        testAction: (state, action) => {
            state.items = ["test state"];
            state.isLoading = true;
        }    
    },
    extraReducers: {
        [loadItems.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [loadItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.items = action.payload;
        },
        [loadItems.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError= true;
        }
    }
};

const itemBrowserSlice = createSlice(options);

// Define selectors
export const selectItems = (state) => state.itemBrowser.items;

// Export actions 
export default itemBrowserSlice.reducer;

// export test
export const {testAction} = itemBrowserSlice.actions;