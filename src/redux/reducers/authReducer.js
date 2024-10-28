import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../database/firebaseConfig";


const initialState = {
    user: null,
    loading: true,
    error: null,
}


export const signUpUser = createAsyncThunk("user/register", async(newUser, thunkAPI) => {
    try {
        return await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const signInUser = createAsyncThunk("user/login", async(user, thunkAPI) => {
    try {
        return await signInWithEmailAndPassword(auth, user.email, user.password);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logout = createAsyncThunk("user/logout", async(_, thunkAPI) => {
    try {
        return signOut(auth);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        resetUser: (state, action) => {
            state.user = null;
            state.loading = true;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.rejected, (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        }).addCase(signInUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }).addCase(logout.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
    }
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

export const userSelector = (state) => state.userReducer;
