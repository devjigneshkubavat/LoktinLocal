import { ChatListItem, MessageItem } from "@/constants/types";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
  postsList: ChatListItem[];
}
const usersInitialState: UsersState = {
  postsList: [],
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
  },
});

export const {
  setPostList,
  getPostsListRequest,
  sendReportRequest,
  setReportList,
} = postSlice.actions;
export default postSlice.reducer;
