import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { fetchProducts } from '../../api/products';

// Async action creator -- API call
export const login = createAsyncThunk('login/login', async (params, thunkAPI) => {
    const response = await fetch("http://localhost:4001/api/login", {
        method: 'POST',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({'username': "Andres.Correa11@test.com", 'password': "123456789"}) // add body to the request:  product_id & quantity
    });
    const jsonData = await response.json();
    console.log(jsonData);
    if(jsonData){
        return true
    }
    return false;
})


// create slice
const options = {
    name: 'login',
    initialState: {
        isLoggedIn: false,  // need to add initial state so component can have correct properties on first render
        isAuthenticating: false,
        hasError: false
    },
    reducers: {
        resetState: (state, action) => {
            state.isLoggedIn = false;
            state.isLoading = false;
            state.hasError = false;
        }    
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.Authenticating = true;
            state.hasError = false;
        },
        [login.fulfilled]: (state, action) => {
            state.Authenticating = false;
            state.hasError = false;
            state.isLoggedIn = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.isAuthenticating = false;
            state.hasError= true;
        }
    }
};

const loginSlice = createSlice(options);

// Export actions 
export default loginSlice.reducer;

// export test
export const {resetState} = loginSlice.actions;