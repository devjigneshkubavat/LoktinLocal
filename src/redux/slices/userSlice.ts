import {
  CommentDataProps,
  getAllPreferences,
  RequestListProps,
  RequestProps,
  UserData,
} from "@/constants/types";
import { RootState } from "@/store/store";
import {
  convertToCommunityObjects,
  convertToInterestObjects,
} from "@/utils/helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
  userInfo: UserData;
  birthdateLoader: Boolean;
  communityLoader: Boolean;
  interstLoader: Boolean;
  uploadImageloader: Boolean;
  isLoading: boolean;
  preferencesListData: getAllPreferences[];
  planDetails: getAllPreferences | undefined;
  requestUserList: RequestListProps[];
  commentList: CommentDataProps[];
  isNewCommentAdded: boolean;
  searchPlanList: getAllPreferences[];
  notificationList: any[];
  createdRequestList: RequestProps[];
  organizarProfile: UserData | undefined;
  updateProfileLoader: Boolean;
  updateImageLoader: Boolean;
  nextCursor: null | number;
  userLocation: {
    latitude: number;
    longitude: number;
  };
  isFavoriteLoading: boolean;
  suggetionList: { word: string; score: number }[];
}
const usersInitialState: UsersState = {
  userInfo: {},
  birthdateLoader: false,
  communityLoader: false,
  interstLoader: false,
  uploadImageloader: false,
  isLoading: false,
  preferencesListData: [],
  planDetails: undefined,
  requestUserList: [],
  commentList: [],
  isNewCommentAdded: false,
  searchPlanList: [],
  notificationList: [],
  createdRequestList: [],
  organizarProfile: undefined,
  updateProfileLoader: false,
  updateImageLoader: false,
  nextCursor: null,
  userLocation: {
    latitude: 0,
    longitude: 0,
  },
  isFavoriteLoading: false,
  suggetionList: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    /* This action will trigger our saga middleware
       and set the loader to true and reset error message.
    */
    getUserAction: (state, action) => {
      console.log(action, "call");
    },
    getUserSuccessAction: (state, { payload: user }: PayloadAction) => {},
    getUserErrorAction: (
      state,
      { payload: error }: PayloadAction<string>
    ) => {},
    getUserData: (state, action) => {},
    setUserdata: (state, action) => {
      state.userInfo = action.payload;
    },
    updateBirthdaterequest: (state, action) => {
      state.birthdateLoader = true;
    },
    updateBirthdate: (state, action) => {
      state.birthdateLoader = false;
      state.userInfo.dateOfBirth = action.payload;
    },
    communityRequest: (state, action) => {
      state.communityLoader = true;
    },
    saveCommunity: (state, action) => {
      state.communityLoader = false;
      state.userInfo.communities = convertToCommunityObjects(action.payload);
    },
    interestyRequest: (state, action) => {
      state.interstLoader = true;
    },
    saveInterest: (state, action) => {
      state.interstLoader = false;
      state.userInfo.interests = convertToInterestObjects(action.payload);
    },
    uploadImagerequest: (state, action) => {
      state.uploadImageloader = true;
    },
    saveImagges: (state, action) => {
      state.uploadImageloader = false;
      state.userInfo.profilePhotoUrls = action.payload;
    },
    cleanUserData: (state, action) => {
      state = usersInitialState;
    },
    getAllPlanPreferences: (state, _) => {
      state.isLoading = true;
    },
    saveAllPreferences: (state, action) => {
      console.log("🚀 ~ action:", action);
      state.isLoading = false;
      state.preferencesListData = action.payload.plans;
      state.nextCursor = action.payload.nextCursor;
    },
    initiateJoinRequest: (state, action) => {
      state.isLoading = true;
    },
    setRequestData: (state, action) => {
      state.isLoading = false;
      state.requestUserList = action.payload;
    },
    getPlanDetails: (state, _) => {
      state.isLoading = true;
    },
    setPlanDetails: (state, action) => {
      state.isLoading = false;
      state.planDetails = action.payload;
    },
    onAcceptRequest: (state, action) => {
      state.isLoading = true;
    },
    setAcceptedRequest: (state, action) => {
      state.isLoading = false;
      state.requestUserList = state.requestUserList.map((item) =>
        item.id === action?.payload.id ? { ...action?.payload, ...item } : item
      );
    },
    getCommentList: (state, _) => {
      state.isLoading = true;
    },
    setCommentList: (state, action) => {
      state.isLoading = false;
      state.commentList = action.payload;
    },
    onAddComment: (state, _) => {
      state.isLoading = true;
    },
    setAddComment: (state, action) => {
      state.isLoading = false;
      state.commentList = [action.payload, ...state.commentList];
    },
    onSearchPlan: (state, action) => {
      state.isLoading = true;
    },
    setSearchPlanData: (state, action) => {
      state.isLoading = false;
      state.suggetionList = action.payload;
    },
    onSearchPlanBasedOnSuggetion: (state, action) => {
      state.isLoading = true;
    },
    setSearchPlanDataOnSuggetion: (state, action) => {
      state.isLoading = false;
      state.searchPlanList = action.payload;
    },
    getNotifications: (state, action) => {
      state.isLoading = true;
    },
    setNotifications: (state, action) => {
      state.isLoading = false;
      state.notificationList = action.payload;
    },
    onMarkAsFavorite: (state, action) => {
      state.isFavoriteLoading = true;
    },
    setMarkAsFavorite: (state, action) => {
      state.isFavoriteLoading = false;
      state.preferencesListData = state?.preferencesListData?.map((item) => {
        if (item?.id === action?.payload?.payload?.planId) {
          return {
            ...item,
            isFavourite: action?.payload?.payload?.isFavourite,
          };
        }
        return { ...item };
      });
    },
    onCreateRequest: (state, action) => {
      state.isLoading = true;
    },
    setCreatedRequest: (state, action) => {
      state.isLoading = false;
      state.createdRequestList = [
        ...state?.createdRequestList,
        action?.payload,
      ];
    },
    onUpdatePlan: (state, action) => {
      state.isLoading = true;
    },
    onDeletePlan: (state, action) => {
      state.isLoading = true;
    },
    onSetPreferenceAll: (state, action) => {
      state.isLoading = true;
    },
    onSetPreferenceBasedOnGroupId: (state, action) => {
      state.isLoading = true;
    },
    setGender: (state, action) => {
      state.userInfo.gender = action.payload;
    },
    onUpdateprofile: (state, action) => {
      state.updateProfileLoader = true;
    },
    onGetOrganizerProfile: (state, action) => {
      state.isLoading = true;
    },
    setOrganizerDetails: (state, action) => {
      state.isLoading = false;
      state.organizarProfile = action.payload?.response?.data;
    },
    onSaveProfile: (state, action) => {
      state.updateProfileLoader = false;
    },
    resetProfileData: (state, action) => {
      state.organizarProfile = undefined;
    },
    updateProfileImage: (state, action) => {
      state.updateImageLoader = action.payload;
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    resetSearchList: (state) => {
      state.suggetionList = [];
    },
    clearSearchedList: (state) => {
      state.searchPlanList = [];
      state.suggetionList = [];
    },
  },
});
export const {
  getUserAction,
  getUserSuccessAction,
  getUserErrorAction,
  setUserdata,
  getUserData,
  updateBirthdate,
  updateBirthdaterequest,
  communityRequest,
  saveCommunity,
  saveInterest,
  interestyRequest,
  saveImagges,
  cleanUserData,
  uploadImagerequest,
  getAllPlanPreferences,
  saveAllPreferences,
  initiateJoinRequest,
  setRequestData,
  getPlanDetails,
  setPlanDetails,
  onAcceptRequest,
  setAcceptedRequest,
  getCommentList,
  setCommentList,
  setAddComment,
  onAddComment,
  onSearchPlan,
  setSearchPlanData,
  getNotifications,
  setNotifications,
  onMarkAsFavorite,
  setMarkAsFavorite,
  onCreateRequest,
  setCreatedRequest,
  onUpdatePlan,
  onDeletePlan,
  onSetPreferenceAll,
  onSetPreferenceBasedOnGroupId,
  setGender,
  onGetOrganizerProfile,
  setOrganizerDetails,
  resetProfileData,
  onUpdateprofile,
  onSaveProfile,
  updateProfileImage,
  setUserLocation,
  onSearchPlanBasedOnSuggetion,
  setSearchPlanDataOnSuggetion,
  resetSearchList,
  clearSearchedList,
} = usersSlice.actions;
export default usersSlice.reducer;
export const selectUser = (state: RootState) => state.user;
export const selectImageLoader = (state: RootState) =>
  state.user.uploadImageloader;
export const selectUserData = (state: RootState) => state.user.userInfo;
