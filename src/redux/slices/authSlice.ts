import { AppDispatch, RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
    userInfo: {},
    userToken: null,
    registerLoading: false,
    registerSuccess: false,
    registerfailure: false,
    loginLoading: false,
    loginSuccess: false,
    loginfailure: false,
    otpLoading: false,
    otpSuccess: false,
    otpfailure: false,
    otperror: null,
    resendLoading: false,
    resendSuccess: false,
    resendFailure: false,
    resendError: null,
    verifyloading: false,
    verifyOtpsuccess: false,
    verifyOtpfailure: false,
    screenNumber:0
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerrequest: (state, action) => {
            state.registerLoading = true;
        },
        registerSuccess: (state, action) => {
            state.registerLoading = false;
            state.registerSuccess = true;
            state.registerfailure = false;
        },
        registerFailure: (state, action) => {
            state.registerLoading = false;
            state.registerfailure = true;
            state.registerSuccess = false;
        },
        loginRequest:(state,action)=>{
            state.loginLoading = true
        },
        loginSuccess:(state)=>{
            state.loginLoading = false,
            state.loginSuccess = true,
            state.loginfailure = false
        },
        loginFailure:(state)=>{
            state.loginLoading = false,
            state.loginSuccess = false,
            state.loginfailure = true
        },
        otpRequest: (state, { payload }) => {
            state.otpLoading = true;
            state.otperror = null;
        },
        otpRequestSuccess: (state, action) => {
            state.otpLoading = false;
            state.otpSuccess = true;
            state.otpfailure = false;
            state.otperror = null;
        },
        otpRequestFailure: (state, action) => {
            state.otpLoading = false;
            state.otpfailure = true;
            state.otpSuccess = false;
            state.otperror = action.payload;
        },
        otpResendRequest: (state, action) => {
            state.resendLoading = true;
        },
        otpResendSuccess: (state) => {
            state.resendLoading = false;
            state.resendError = null;
            state.resendSuccess = true;
            state.resendFailure = false;
        },
        otpResendFailure: (state) => {
            state.resendLoading = false;
            state.resendSuccess = false;
            state.resendFailure = true;
        },
        verifyRequest: (state, action) => {
            state.verifyloading = true
        },
        verifySuccess: (state,action) => {
            state.verifyloading = false,
            state.verifyOtpsuccess = true,
            state.verifyOtpfailure = false
            state.userToken = action.payload
        },
        verifyFailure: (state) => {
            state.verifyloading = false,
            state.verifyOtpsuccess = false,
            state.verifyOtpfailure = true
        },
        cleanData: (state, action) => {
            state = initialState
        },
        screenUpdate:(state, action)=>{
            state.screenNumber = action.payload
        },
    },
    //   extraReducers: builder => {
    //     builder.addCase(registerrequest, (state, action) => {
    //       console.log(action.payload, 'ACTION');
    //     });
    //   },
});
export const {
    registerFailure,
    registerSuccess,
    registerrequest,
    otpRequest,
    otpRequestSuccess,
    otpRequestFailure,
    otpResendFailure,
    otpResendRequest,
    otpResendSuccess,
    verifyRequest,
    verifySuccess,
    verifyFailure,
    cleanData,
    loginRequest,
    loginSuccess,
    loginFailure,
    screenUpdate
} = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
export const selectToken = (state: RootState) => state.auth.userToken;
