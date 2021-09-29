import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { fetchProducts } from '../../api/products';

// Async action creator -- API call
export const loadItems = createAsyncThunk('itemBrowser/loadItems', async (params, thunkAPI) => {
    const response = await fetch("http://localhost:4001/api/products/all", {mode: 'cors'});
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
})

// Async action creator -- API call
export const loadCategories = createAsyncThunk('itemBrowser/loadCategories', async (params, thunkAPI) => {
    const response = await fetch("http://localhost:4001/api/products/categories", {mode: 'cors'});
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
})


// create slice
const options = {
    name: 'itemBrowser',
    initialState: {
        items: [{
            id: "",
            name: "",
            price: "",
            inventory: "",
            categoryid: "",
            image_url: "",
            description: ""
        }],  // need to add initial state so component can have correct properties on first render
        categories: [{
            id: "",
            category: ""
        }],
        isLoading: false,
        hasError: false
    },
    reducers: {
        resetState: (state, action) => {
            state.items = [{
                id: "",
                name: "",
                price: "",
                inventory: "",
                categoryid: "",
                image_url: "",
                description: ""
            }];
            state.categories = [{
                id: "",
                category: ""
            }];
            state.isLoading = false;
            state.hasError = false;
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
        },
        // keep going here
        [loadCategories.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError= false;
        },
        [loadCategories.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError= false;
            state.categories=action.payload;
        },
        [loadCategories.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError= true;
        }
    }
};

const itemBrowserSlice = createSlice(options);

// Define selectors
export const selectItems = (state) => state.itemBrowser.items;
export const selectCategories = (state) => state.itemBrowser.categories;

// Export actions 
export default itemBrowserSlice.reducer;

// export test
export const {resetState} = itemBrowserSlice.actions;