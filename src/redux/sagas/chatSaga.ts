import baseApi from "@/api/baseApi";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getChatsListRequest,
  getMessageListRequest,
  sendMessageRequest,
  setChatList,
  setMessageList,
} from "../slices/chatSlice";

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
  console.log("payload ::: ", payload);

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
    console.log("response of sendMessage ::: ", response);
  } catch (error) {
    console.error("Error adding sendMessage:", error);
  }
}

export default function* chat() {
  yield takeLatest(getChatsListRequest.type, getChatsList);
  yield takeLatest(getMessageListRequest.type, getMessageList);
  yield takeLatest(sendMessageRequest.type, sendMessage);
}
