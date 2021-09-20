import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/products';

// Async action creator -- API call
export const loadItems = createAsyncThunk('itemBrowser/loadItems', async (params, thunkAPI) => {
    const response = await fetchProducts();
    const jsonData = await response.json();
    
    return jsonData;

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