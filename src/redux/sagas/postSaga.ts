import baseApi from "@/api/baseApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { getChatsListRequest } from "../slices/chatSlice";
import {
  getPostsListRequest,
  onGetCreatedPlanList,
  onGetFavoritePlan,
  onGetJoinPlan,
  onKickOutUser,
  onMarkAsFavoritePost,
  sendReportRequest,
  setCreatePlanList,
  setFavoritePlan,
  setJoinedPlanList,
  setKickOutUser,
  setMarkAsFavoritePost,
  setPostList,
  setReportList,
} from "../slices/postSlice";
import { showToast } from "@/utils/helper";
import { ICONS } from "@/constants";
import { onLeaveGroup, setLeaveGroup } from "../slices/planSlice";
import { navigate } from "@/navigation/rootNavigation";

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
    showToast(response, {
      position: "top",
      icon: ICONS.successIcon,
    });
    console.log("sendReport response", response);
    yield put(setReportList(response.data));
  } catch (error) {
    console.log(error, "sendReport err");
  }
}

function* watchUserCreatePlan(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    if (response) {
      yield put(setCreatePlanList(response?.response?.data));
    }
  } catch (error) {
    console.error("Error watchOrganizerProfile:", error);
    yield put(setCreatePlanList({}));
  }
}

function* watchUserJoinedPlan(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    if (response) {
      yield put(setJoinedPlanList(response?.response?.data));
    }
  } catch (error) {
    console.error("Error watchOrganizerProfile:", error);
    yield put(setJoinedPlanList({}));
  }
}

function* watchFavoritePlan(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    if (response) {
      yield put(setFavoritePlan(response?.response?.data));
    }
  } catch (error) {
    console.error("Error watchOrganizerProfile:", error);
    yield put(setFavoritePlan({}));
  }
}

function* watchLeaveGroup(action: any) {
  const { payload } = action;
  console.log("payload ===>", payload);

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
    if (response) {
      console.log("watchLeaveGroup response", response);
      navigate("Tabs");
      yield put(setLeaveGroup({}));
    }
  } catch (error) {
    yield put(setLeaveGroup({}));
    console.log(error, "watchLeaveGroup err");
  }
}

function* watchToMarkAsFavorite(action: any) {
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
    if (response) {
      yield put(
        setMarkAsFavoritePost({
          response: response?.response?.data,
          payload: payload.data,
          extraData: payload.extraData,
        })
      );
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(setMarkAsFavoritePost({}));
  }
}

function* watchToKickoutUser(action: any) {
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
    if (response) {
      yield put(setKickOutUser({}));
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(setKickOutUser({}));
  }
}

export default function* post() {
  yield takeLatest(getPostsListRequest.type, getPostsList);
  yield takeLatest(sendReportRequest.type, sendReport);
  yield takeLatest(onGetCreatedPlanList.type, watchUserCreatePlan);
  yield takeLatest(onGetJoinPlan.type, watchUserJoinedPlan);
  yield takeLatest(onGetFavoritePlan.type, watchFavoritePlan);
  yield takeLatest(onLeaveGroup.type, watchLeaveGroup);
  yield takeLatest(onMarkAsFavoritePost.type, watchToMarkAsFavorite);
  yield takeLatest(onKickOutUser.type, watchToKickoutUser);
}
