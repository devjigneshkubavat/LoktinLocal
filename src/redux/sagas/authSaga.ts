import {take, put, call, fork, takeLatest} from 'redux-saga/effects';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  otpRequest,
  otpRequestFailure,
  otpRequestSuccess,
  otpResendFailure,
  otpResendRequest,
  otpResendSuccess,
  registerFailure,
  registerrequest,
  registerSuccess,
  verifyFailure,
  verifyRequest,
  verifySuccess,
} from '../slices/authSlice';

import baseApi from '@/api/baseApi';
import {addPrefixToPhone, showToast} from '@/utils/helper';
import {navigate} from '@/navigation/rootNavigation';
import {NAMES} from '@/navigation/name';
import {setUserdata} from '../slices/userSlice';

interface ApiResponse {
  [key: string]: any;
}

function* watchRegisterRequest() {
  while (true) {
    const {payload} = yield take(registerrequest);
    console.log(payload, 'payload');

    try {
      const response: ApiResponse = yield call(
        baseApi.post,
        payload.url,
        payload.data,
      );
      showToast(response);
      yield put(registerSuccess({}));
      if (response.status === 200) {
        navigate(NAMES.verify, {
          userData: {...payload.data, userId: response.response.data.userId},
        });
      }
    } catch (error) {
      console.log(error, 'err');
      showToast(error);
      yield put(registerFailure({}));
    }
  }
}
function* watchOtpsendRequest() {
  while (true) {
    const {payload} = yield take(otpRequest);
    try {
      const response: ApiResponse = yield call(
        baseApi.post,
        payload.url,
        payload.data,
      );
      yield put(otpRequestSuccess(response));
      console.log(response, 'RESPONSSE');
    } catch (error) {
      yield put(otpRequestFailure(error));
    }
  }
}
function* watchResendOtp() {
  while (true) {
    const {payload} = yield take(otpResendRequest);
    const {onSuccess} = payload;

    try {
      const response: ApiResponse = yield call(
        baseApi.post,
        payload.url,
        payload.data,
      );
      showToast(response);
      yield put(otpResendSuccess());
      if (onSuccess) onSuccess(response);

      console.log(response, 'RESPONSSE');
    } catch (error) {
      showToast(error);
      if (onSuccess) onSuccess(error);
      yield put(otpResendFailure());
    }
  }
}
// function* watchVerifyOtp() {
//   while (true) {
//     const {payload} = yield take(verifyRequest);
//     console.log(payload);

//     try {
//       const response: ApiResponse = yield call(
//         baseApi.post,
//         payload.url,
//         payload.data,
//       );
//       showToast(response);
//       yield put(verifySuccess({}));
//       if (response.status === 200) {
//         yield put(setUserdata(response.response.data));
//         navigate(NAMES.onboardingThree, {userData: response.response.data});
//       }
//       console.log(response, 'RESPONSSE');
//     } catch (error) {
//       showToast(error);
//       yield put(verifyFailure());
//     }
//   }
// }
function* watchLoginRequest() {
  while (true) {
    const {payload} = yield take(loginRequest);
    console.log(payload, 'payload');

    try {
      const response: ApiResponse = yield call(
        baseApi.post,
        payload.url,
        payload.data,
      );
      showToast(response);
      yield put(loginSuccess());
      if (response.status === 200) {
        navigate(NAMES.verify, {
          userData: {...payload.data},
          isSignin: true,
        });
      }
    } catch (error) {
      console.log(error, 'err');
      showToast(error);
      yield put(loginFailure());
    }
  }
}
function* watchSignOut() {
    try {
        
    } catch (error) {
        
    }
}
export default function* auth() {
  yield fork(watchRegisterRequest);
  yield fork(watchLoginRequest);
  yield fork(watchOtpsendRequest);
  //   yield fork(watchResendOtp);
  //   yield fork(watchVerifyOtp);
}
