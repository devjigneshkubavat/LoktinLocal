import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, fork, put, select, take, takeLatest } from "redux-saga/effects";
import {
  communityRequest,
  getAllPlanPreferences,
  getCommentList,
  getNotifications,
  getPlanDetails,
  getUserAction,
  getUserData,
  getUserSuccessAction,
  initiateJoinRequest,
  interestyRequest,
  onAcceptRequest,
  onAddComment,
  onCreateRequest,
  onDeletePlan,
  onMarkAsFavorite,
  onSearchPlan,
  onSetPreferenceAll,
  onSetPreferenceBasedOnGroupId,
  onUpdatePlan,
  saveAllPreferences,
  saveCommunity,
  saveImagges,
  saveInterest,
  selectUser,
  setAcceptedRequest,
  setAddComment,
  setCommentList,
  setCreatedRequest,
  setMarkAsFavorite,
  setNotifications,
  setPlanDetails,
  setRequestData,
  setSearchPlanData,
  setUserdata,
  updateBirthdate,
  updateBirthdaterequest,
  uploadImagerequest,
  UsersState,
} from "../slices/userSlice";
import baseApi from "@/api/baseApi";
import { goBack, navigate, replace } from "@/navigation/rootNavigation";
import { NAMES } from "@/navigation/name";
import {
  jsonToFormData,
  normalizeUserDetails,
  setLocally,
  showToast,
} from "@/utils/helper";
import { createPlan, uploadImage } from "../services/authServices";
import {
  onCreatePlan,
  onGetPlanImages,
  onUploadPlanImage,
  savePlanDetails,
  savePlanImage,
  setPlanImages,
} from "../slices/planSlice";
interface ApiResponse {
  [key: string]: any;
}
// Generator function
function* getUserSaga() {
  while (true) {
    const { payload } = yield take(getUserAction);
    console.log(payload, "payload");
    // yield takeLatest(getUserAction.type, getUserSaga);
    yield put(getUserSuccessAction(payload));

    try {
    } catch (error) {
      //   yield put(registerFailure(error));
    }
  }
}

function* watchRequest(action: any) {
  console.log("here", action);
  const { payload } = action;
  console.log(payload);

  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.data}`, // Add the token to the Authorization header
      },
    });
    console.log(response);

    if (response.status === 200) {
      yield put(
        setUserdata(normalizeUserDetails(response.response.data.userDetails))
      );
      if (response.response.data.screen === "DOB") {
        replace(NAMES.onboardingThree);
      }
      if (response.response.data.screen === "CMNT") {
        replace(NAMES.onboardingFour);
      }
      if (response.response.data.screen === "INTR") {
        replace(NAMES.onboardingFive);
      }
      if (response.response.data.screen === "PROF") {
        replace(NAMES.onboardingSix);
      }
    }
  } catch (error) {}
}

function* watchBirthdateRequest(action: any) {
  console.log("here", action);
  const { payload } = action;
  console.log(payload);

  try {
    const response: ApiResponse = yield call(
      baseApi.post,
      payload.url,
      payload.data
    );
    if (response.status === 200) {
      yield put(updateBirthdate(payload.data.dateOfBirth));
      setLocally("screen", "1");
      navigate(NAMES.welcomscreen);
    }
  } catch (error) {
    console.log(error, "err");
    showToast(error);
    yield put(updateBirthdate({}));
  }
}

function* watchCommunity(action: any) {
  console.log("here", action);
  const { payload } = action;
  console.log(payload);

  try {
    const response: ApiResponse = yield call(
      baseApi.post,
      payload.url,
      payload.data
    );
    showToast(response);
    if (response.status === 200) {
      setLocally("screen", "2");
      yield put(saveCommunity(payload.data.communities));
      navigate(NAMES.onboardingFive);
    }
  } catch (error) {
    console.log(error, "err");
    showToast(error);
    yield put(saveCommunity({}));
  }
}

function* watchInterest(action: any) {
  console.log("here", action);
  const { payload } = action;
  console.log(payload);

  try {
    const response: ApiResponse = yield call(
      baseApi.post,
      payload.url,
      payload.data
    );
    showToast(response);
    if (response.status === 200) {
      setLocally("screen", "3");

      yield put(saveInterest(payload.data.interests));
      navigate(NAMES.onboardingSix);
    }
  } catch (error) {
    console.log(error, "err");
    showToast(error);
    yield put(saveInterest({}));
  }
}

function* watchImages(action: any) {
  console.log("here", action);
  const { payload } = action;
  console.log(payload.url);

  const user: UsersState = yield select(selectUser);
  console.log(user.userInfo.userId);

  try {
    const formData = new FormData();
    formData.append("userId", `${user.userInfo.userId}`);
    payload.data.forEach((image: any, index: number) => {
      if (image) {
        formData.append("photos", {
          uri: image,
          name: `image_${index}_${Date.now()}.jpg`,
          type: "image/jpeg",
        });
      }
    });
    const response: ApiResponse = yield call(uploadImage, formData);
    if (response.message === "Photos uploaded successfully") {
      showToast({ status: 200, ...response });
      yield put(saveImagges(response.photos));
      setLocally("screen", "4");
    } else {
      showToast(response);
    }
  } catch (error) {
    console.log(error, "err");
    showToast(error);
    yield put(saveImagges({}));
  }
}

function* watchGetAllPlansBasedOnPreferences(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });

    if (response.status === 200) {
      yield put(saveAllPreferences(response?.response?.data));
    }
  } catch (error) {
    console.error("Error fetching plans:", error);
    yield put(saveAllPreferences({}));
  }
}

function* watchJoinRequest(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    if (response.status === 200) {
      yield put(setRequestData(response?.response?.data));
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(setRequestData({}));
  }
}

function* watchGetPlanDetails(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });

    if (response.status === 200) {
      yield put(setPlanDetails(response?.response?.data));
    }
  } catch (error) {
    console.error("Error fetching plans:", error);
    yield put(setPlanDetails({}));
  }
}

function* watchAcceptRequest(action: any) {
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

    if (response.status === 200) {
      console.log({ response });
      yield put(setAcceptedRequest(response?.response?.data));
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(setAcceptedRequest({}));
  }
}

function* watchGetComments(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    if (response.status === 200) {
      yield put(setCommentList(response.response.data));
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    yield put(setCommentList([])); // Return empty list or appropriate error state
  }
}

function* watchAddComment(action: any) {
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
    if (response.status === 200) {
      yield put(setAddComment(response.response.data));
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    yield put(setAddComment({}));
  }
}

function* watchSearchPlan(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    if (response.status == 200) {
      yield put(setSearchPlanData(response.response.data));
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(setSearchPlanData({}));
  }
}

function* watchNotificationList(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    if (response) {
      yield put(setNotifications(response));
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(setNotifications({}));
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
        setMarkAsFavorite({
          response: response?.response?.data,
          payload: payload.data,
        })
      );
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(setMarkAsFavorite({}));
  }
}

function* watchOnToCreateRequest(action: any) {
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
      yield put(setCreatedRequest(response?.response?.data));
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(setCreatedRequest({}));
  }
}

function* watchToCreatePlan(action: any) {
  const { payload } = action;
  const formData = jsonToFormData(payload.data);

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
      yield put(savePlanDetails(response?.response?.data));
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(savePlanDetails({}));
  }
}

function* watchPlanUpdate(action: any) {
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
    if (response) {
      yield put(savePlanDetails(response?.response?.data));
      navigate(NAMES.join, {
        planId: response?.response?.data?.id,
      });
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(savePlanDetails({}));
  }
}

function* watchPlanDelete(action: any) {
  console.log("🚀 ~ function*watchPlanDelete ~ action:", action);
  const { payload } = action;

  try {
    const response: ApiResponse = yield call(
      baseApi.delete,
      payload.url,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${payload.userToken}`,
        },
      }
    );
    if (response) {
      yield put(savePlanDetails({}));
      replace("Tab");
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(savePlanDetails({}));
  }
}

function* watchPlanImageUpload(action: any) {
  const { payload } = action;
  try {
    const formData = new FormData();
    formData.append("photo", payload.data);
    const response: ApiResponse = yield call(createPlan, formData);
    if (!!response.message) {
      yield put(savePlanImage(response.imageUrl));
    }
  } catch (error) {
    console.log(error, "err");
    yield put(savePlanImage({}));
  }
}

function* watchToGetPlanImages(action: any) {
  const { payload } = action;
  try {
    const response: ApiResponse = yield call(baseApi.get, payload.url, {
      headers: {
        Authorization: `Bearer ${payload.userToken}`,
      },
    });
    if (response) {
      yield put(setPlanImages(response?.images));
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(setPlanImages({}));
  }
}

function* watchSetPreferencesGroupMember(action: any) {
  const { payload } = action;
  console.log(
    "🚀 ~ function*watchSetPreferencesGroupMember ~ payload:",
    payload
  );
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
      replace("Tab");
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(setPlanImages({}));
  }
}

function* watchSetPreferencesBasedPlanGroup(action: any) {
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
      console.log(
        "🚀 ~ function*watchSetPreferencesBasedPlanGroup ~ response:",
        response
      );
      replace("Tab");
    }
  } catch (error) {
    console.error("Error join request:", error);
    yield put(setPlanImages({}));
  }
}

export default function* user() {
  yield fork(getUserSaga);
  yield takeLatest(getUserData.type, watchRequest);
  yield takeLatest(updateBirthdaterequest.type, watchBirthdateRequest);
  yield takeLatest(communityRequest.type, watchCommunity);
  yield takeLatest(interestyRequest.type, watchInterest);
  yield takeLatest(uploadImagerequest.type, watchImages);
  yield takeLatest(getAllPlanPreferences, watchGetAllPlansBasedOnPreferences);
  yield takeLatest(initiateJoinRequest, watchJoinRequest);
  yield takeLatest(getPlanDetails, watchGetPlanDetails);
  yield takeLatest(onAcceptRequest, watchAcceptRequest);
  yield takeLatest(getCommentList, watchGetComments);
  yield takeLatest(onAddComment, watchAddComment);
  yield takeLatest(onSearchPlan, watchSearchPlan);
  yield takeLatest(getNotifications, watchNotificationList);
  yield takeLatest(onMarkAsFavorite, watchToMarkAsFavorite);
  yield takeLatest(onCreateRequest, watchOnToCreateRequest);
  yield takeLatest(onCreatePlan, watchToCreatePlan);
  yield takeLatest(onUploadPlanImage, watchPlanImageUpload);
  yield takeLatest(onGetPlanImages, watchToGetPlanImages);
  yield takeLatest(onUpdatePlan, watchPlanUpdate);
  yield takeLatest(onDeletePlan, watchPlanDelete);
  yield takeLatest(onSetPreferenceAll, watchSetPreferencesGroupMember);
  yield takeLatest(
    onSetPreferenceBasedOnGroupId,
    watchSetPreferencesBasedPlanGroup
  );
}
