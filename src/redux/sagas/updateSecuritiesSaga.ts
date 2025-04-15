import baseApi from "@/api/baseApi";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getChatsListRequest,
  getMessageListRequest,
  setChatList,
  setMessageList,
} from "../slices/chatSlice";
import {
  addPhoneNumberRequest,
  addPhoneNumberSuccess,
  securityVerifyPhoneRequest,
  updateSecuritySettingsRequest,
} from "../slices/updateSecuritiesSlice";
import { showToast } from "@/utils/helper";
import { ICONS } from "@/constants";
import Toast from "react-native-toast-message";
import { goBack } from "@/navigation/rootNavigation";

interface ApiResponse {
  [key: string]: any;
}

function* addPhoneNumber(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(
      baseApi.post,
      payload.url,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${payload.userToken}`,
        },
      }
    );
    console.log("response ::------->", response);
    showToast({...response,status:200})
    yield put(addPhoneNumberSuccess(response));
    goBack()
  } catch (error) {
    console.error("Error adding comment:", error);
    showToast(error);
  }
}

function* securityVerifyPhone(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(
      baseApi.post,
      payload.url,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${payload.userToken}`,
        },
      }
    );
    showToast(response);
  } catch (error) {
    showToast(error);
  }
}

function* updateSecuritySettings(action: any) {
  const { payload } = action;

  try {
    const response: ApiResponse = yield call(
      baseApi.put,
      payload.url,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${payload.userToken}`,
        },
      }
    );
    console.log(response);
    showToast({...response,status:200})
    // Toast.show({
    //       type: "success",
    //       text1: response.message ?? response.toString(),
    //       position: 'bottom',
    //       visibilityTime: 2000,
    //       swipeable: false,
    //       props: { icon: ICONS.successIcon },
    //     });
  } catch (error) {
    showToast(error);
  }
}

export default function* updateSecuritiesSaga() {
  yield takeLatest(addPhoneNumberRequest.type, addPhoneNumber);
  yield takeLatest(securityVerifyPhoneRequest.type, securityVerifyPhone);
  yield takeLatest(updateSecuritySettingsRequest.type, updateSecuritySettings);
}
