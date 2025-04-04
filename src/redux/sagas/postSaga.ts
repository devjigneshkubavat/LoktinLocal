import baseApi from "@/api/baseApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { getChatsListRequest } from "../slices/chatSlice";
import {
  getPostsListRequest,
  sendReportRequest,
  setPostList,
  setReportList,
} from "../slices/postSlice";
import { showToast } from "@/utils/helper";

interface ApiResponse {
  [key: string]: any;
}

function* getPostsList(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    yield put(setPostList(response.data));
  } catch (error) {
    console.error("getPostsList ERROR:", error);
  }
}

function* sendReport(action: any) {
  const { payload } = action;
  console.log("payload ===>", payload);

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
    console.log("sendReport response", response);
    yield put(setReportList(response.data));
  } catch (error) {
    console.log(error, "sendReport err");
  }
}

export default function* post() {
  yield takeLatest(getPostsListRequest.type, getPostsList);
  yield takeLatest(sendReportRequest.type, sendReport);
}
