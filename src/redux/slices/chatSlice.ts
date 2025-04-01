import { ChatListItem, MessageItem } from "@/constants/types";
import { RootState } from "@/store/store";
import {
  convertToCommunityObjects,
  convertToInterestObjects,
} from "@/utils/helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
  chatsList: ChatListItem[];
  chatMessages: {
    page: number;
    pageSize: number;
    totalMessages: number;
    messages: MessageItem[];
  };
}
const usersInitialState: UsersState = {
  chatsList: [],
  chatMessages: {
    page: 1,
    pageSize: 5,
    totalMessages: 2,
    messages: [],
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: usersInitialState,
  reducers: {
    /* This action will trigger our saga middleware
         and set the loader to true and reset error message.
      */
    getChatsListRequest: (state, action) => {
      //   state.chatsList = action.payload;
    },
    setChatList: (state, action) => {
      state.chatsList = action.payload;
    },
    getMessageListRequest: (state, action) => {
      //   state.chatsList = action.payload;
    },
    setMessageList: (state, action) => {
      state.chatMessages = action.payload;
    },
  },
});
export const {
  getChatsListRequest,
  setChatList,
  getMessageListRequest,
  setMessageList,
} = chatSlice.actions;
export default chatSlice.reducer;
