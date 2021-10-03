import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { fetchProducts } from '../../api/products';

// Async action creator -- API call
export const login = createAsyncThunk('login/login', async (payload, thunkAPI) => {
    try {

        const response = await fetch("/api/login", {
            method: 'POST',
            credentials: 'include',  // testing keeping session
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload) // add body to the request:  product_id & quantity
        });
        const jsonData = await response.json();
        if(jsonData){
            return jsonData
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
})


// Async action creator -- API call
export const updateUser = createAsyncThunk('login/updateUser', async (params, thunkAPI) => {
    try {

        const response = await fetch("/api/users/myprofile", {
            method: 'GET',
            credentials: 'include',  // testing keeping session
            mode: 'cors'
        });
        const jsonData = await response.json();
        if(jsonData){
            return jsonData
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
})


// create slice
const options = {
    name: 'login',
    initialState: {
        isLoggedIn: false,  // need to add initial state so component can have correct properties on first render
        isAuthenticating: false,
        incorrectCreds: false,
        hasError: false,
        profile: {
            first: "",
            last: "",
            email: ""
        }
    },
    reducers: {
        resetState: (state, action) => {
            state.isLoggedIn = false;
            state.isAuthenticating = false;
            state.incorrectCreds = false;
            state.hasError = false;
            state.profile = {
                first: "",
                last: "",
                email: ""
            }
        }    
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.isAuthenticating = true;
            state.hasError = false;
        },
        [login.fulfilled]: (state, action) => {
            state.isAuthenticating = false;
            state.hasError = false;
            if (action.payload){
                state.profile = {
                    first: action.payload.first_name,
                    last: action.payload.last_name,
                    email: action.payload.email
                };
                state.isLoggedIn = true;
                state.incorrectCreds = false;
            } else {
                state.isLoggedIn = action.payload;
                state.incorrectCreds = !action.payload;
            }
        },
        [login.rejected]: (state, action) => {
            state.isAuthenticating = false;
            state.hasError= true;
        },
        [updateUser.pending]: (state, action) => {
            state.isAuthenticating = true;
            state.hasError = false;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.isAuthenticating = false;
            state.hasError = false;
            if (action.payload){
                state.profile = {
                    first: action.payload.first_name,
                    last: action.payload.last_name,
                    email: action.payload.email
                };
                state.isLoggedIn = true;
                state.incorrectCreds = false;
            } else {
                state.isLoggedIn = action.payload;
                state.incorrectCreds = !action.payload;
            }
        },
        [updateUser.rejected]: (state, action) => {
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