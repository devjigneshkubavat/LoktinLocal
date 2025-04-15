import { ChatListItem, getAllPreferences } from "@/constants/types";
import { EProfileTab } from "@/screens/App/Profile";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
  isLoading: boolean;
  postsList: ChatListItem[];
  createdPlanList: getAllPreferences[];
  joinedPlanList: getAllPreferences[];
  favoriteList: getAllPreferences[];
  isFirstTimeRequestCreated: boolean;
  isFavoriteLoading: boolean;
}
const usersInitialState: UsersState = {
  postsList: [],
  createdPlanList: [],
  joinedPlanList: [],
  favoriteList: [],
  isLoading: false,
  isFirstTimeRequestCreated: true,
  isFavoriteLoading: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState: usersInitialState,
  reducers: {
    setPostList: (state, action) => {
      state.postsList = action.payload;
    },
    getPostsListRequest: (state, action) => {
      //   state.chatsList = action.payload;
    },
    sendReportRequest: (state, action) => {
      //   state.chatsList = action.payload;
    },
    setReportList: (state, action) => {
      // state.postsList = action.payload;
    },
    onGetCreatedPlanList: (state, action) => {
      state.isLoading = true;
    },
    setCreatePlanList: (state, action) => {
      state.isLoading = false;
      state.createdPlanList = action.payload;
    },
    onGetJoinPlan: (state, action) => {
      state.isLoading = true;
    },
    setJoinedPlanList: (state, action) => {
      state.isLoading = false;
      state.joinedPlanList = action.payload;
    },
    onGetFavoritePlan: (state, action) => {
      state.isLoading = true;
    },
    setFavoritePlan: (state, action) => {
      state.isLoading = false;
      state.favoriteList = action.payload;
    },
    resetAllData: (state) => {
      state.postsList = [];
      state.createdPlanList = [];
      state.joinedPlanList = [];
      state.favoriteList = [];
      state.isLoading = false;
    },
    onUnfavoritePlan: (state, action) => {
      state.favoriteList = state.favoriteList.filter((item) => {
        return item.planId !== action.payload;
      });
    },
    setRequestTutorial: (state, action) => {
      state.isFirstTimeRequestCreated = action.payload;
    },
    onMarkAsFavoritePost: (state, action) => {
      state.isFavoriteLoading = true;
    },
    setMarkAsFavoritePost: (state, action) => {
      state.isFavoriteLoading = false;
      state.isFavoriteLoading = false;

      const { type } = action.payload.extraData;
      const { planId, isFavourite } = action.payload.payload;

      const updateFavorite = (list: getAllPreferences[]): getAllPreferences[] =>
        list.map((item) =>
          item.id === planId ? { ...item, isFavourite } : item
        );

      if (type === EProfileTab.Created) {
        state.createdPlanList = updateFavorite(state.createdPlanList);
      } else if (type === EProfileTab.Joined) {
        state.joinedPlanList = updateFavorite(state.joinedPlanList);
      }
    },
    onKickOutUser: (state, action) => {
      state.isLoading = true;
    },
    setKickOutUser: (state, action) => {
      state.isLoading = false;
    },
    onGetPrefrences: (state, action) => {
      state.isLoading = true;
    },
    setPrefernceData: (state, action) => {
      state.isLoading = false;
      console.log("🚀 ~ action:", action);
    },
  },
});

export const {
  setPostList,
  getPostsListRequest,
  sendReportRequest,
  setReportList,
  setCreatePlanList,
  onGetCreatedPlanList,
  onGetJoinPlan,
  setJoinedPlanList,
  onGetFavoritePlan,
  setFavoritePlan,
  resetAllData,
  onUnfavoritePlan,
  setRequestTutorial,
  setMarkAsFavoritePost,
  onMarkAsFavoritePost,
  onKickOutUser,
  setKickOutUser,
  onGetPrefrences,
  setPrefernceData,
} = postSlice.actions;
export default postSlice.reducer;
