import { ChatListItem, MessageItem } from "@/constants/types";
import { RootState } from "@/store/store";
import {
  convertToCommunityObjects,
  convertToInterestObjects,
} from "@/utils/helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
//   chatsList: ChatListItem[];
//   chatMessages: {
//     page: number;
//     pageSize: number;
//     totalMessages: number;
//     messages: MessageItem[];
//   };
}
const usersInitialState: UsersState = {
//   chatsList: [],
//   chatMessages: {
//     page: 1,
//     pageSize: 5,
//     totalMessages: 2,
//     messages: [],
//   },
};

export const updateSecuritiesSlice = createSlice({
  name: "updateSecuritiesSlice",
  initialState: usersInitialState,
  reducers: {
    /* This action will trigger our saga middleware
         and set the loader to true and reset error message.
      */
    addPhoneNumberRequest: (state, action) => {
        //   state.chatsList = action.payload;
    },
    securityVerifyPhoneRequest: (state, action) => {
        //   state.chatsList = action.payload;
    },
    updateSecuritySettingsRequest: (state, action) => {
        //   state.chatsList = action.payload;
    },
  },
});
export const {
    addPhoneNumberRequest,
    securityVerifyPhoneRequest,
    updateSecuritySettingsRequest
} = updateSecuritiesSlice.actions;
export default updateSecuritiesSlice.reducer;
