import baseApi from "@/api/baseApi";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  clearChatRequest,
  deleteMessageRequest,
  getChatsListRequest,
  getMessageListRequest,
  sendMessageRequest,
  setChatList,
  setMessageList,
  updateMessageRequest,
} from "../slices/chatSlice";
import { showToast } from "@/utils/helper";
import Toast from "react-native-toast-message";
import { ICONS } from "@/constants";

interface ApiResponse {
  [key: string]: any;
}

function* getChatsList(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    yield put(setChatList(response.conversations));
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}

function* getMessageList(action: any) {
  const { payload } = action;

  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
      query: payload.params,
    });
    console.log("response of messageList ::: ", response);

    yield put(setMessageList(response));
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}

function* sendMessage(action: any) {
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
    showToast(response, {position: "top", icon: ICONS.successIcon});
    console.log("response of sendMessage ::: ", response);
  } catch (error) {
    console.error("Error adding sendMessage:", error);
  }
}

function* deleteMessage(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(
      baseApi.delete,
      payload.url,
      null,
      {
        headers: {
          Authorization: `Bearer ${payload.userToken}`,
        },
      }
    );
    showToast(response, {position: "top", icon: ICONS.successIcon});
    console.log("response of deleteMessage ::: ", response);
  } catch (error) {
    showToast(error);
    console.error("Error adding deleteMessage:", error);
  }
}

function* clearChat(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(
      baseApi.delete,
      payload.url,
      null,
      {
        headers: {
          Authorization: `Bearer ${payload.userToken}`,
        },
      }
    );
    showToast(response, {position: "top", icon: ICONS.successIcon});
    console.log("response of clearChat ::: ", response);
  } catch (error) {
    showToast(error);
    console.error("Error adding clearChat:", error);
  }
}

function* updateMessage(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(
      baseApi.put,
      payload.url,
      payload?.data,
      {
        headers: {
          Authorization: `Bearer ${payload.userToken}`,
        },
      }
    );
    showToast(response, {position: "top", icon: ICONS.successIcon});
    console.log("response of updateMessage ::: ", response);
  } catch (error) {
    showToast(error);
    console.error("Error adding updateMessage:", error);
  }
}

export default function* chat() {
  yield takeLatest(getChatsListRequest.type, getChatsList);
  yield takeLatest(getMessageListRequest.type, getMessageList);
  yield takeLatest(sendMessageRequest.type, sendMessage);
  yield takeLatest(deleteMessageRequest.type, deleteMessage);
  yield takeLatest(clearChatRequest.type, clearChat);
  yield takeLatest(updateMessageRequest.type, updateMessage);
}
