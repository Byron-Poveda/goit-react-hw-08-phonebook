import { createSlice } from '@reduxjs/toolkit';
import {
    loginUser,
    signUpUser,
    logOutUser,
} from './thunks';

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('userCurrent')) || {},
    token: localStorage.getItem('token') || '',
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
  extraReducers: builder => {
    builder
      // loginUser
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userInfo = action.payload.userData;
        state.currentUser = action.payload.currentUser;
        localStorage.setItem('token', action.payload.token);
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // signUpUser
      .addCase(signUpUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userInfo = action.payload.currentUser;
        localStorage.setItem('token', action.payload.token);
        state.isLoading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // logOutUser
      .addCase(logOutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
        state.isLoading = false;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
  },
});

// export const { } = authSlice.actions;

export default authSlice.reducer;
