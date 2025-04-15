import { ChatListItem, MessageItem } from "@/constants/types";
import { RootState } from "@/store/store";
import {
  convertToCommunityObjects,
  convertToInterestObjects,
} from "@/utils/helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
  isPhoneAddsuccess: boolean;
  securitySettings: {
    isEmergencyAllowed: boolean;
    isLocationSharingAllowed: boolean;
    isCheckInPointAllowed: boolean;
    safeWord: { qus: string; aus: string }[];
    receiveCheckInReminders: string;
  };
  dummy: string;
}
const usersInitialState: UsersState = {
  isPhoneAddsuccess: false,
  securitySettings: {
    isEmergencyAllowed: true,
    isLocationSharingAllowed: false,
    isCheckInPointAllowed: true,
    safeWord: [],
    receiveCheckInReminders: "Everyhour",
  },
  dummy: "",
};

export const updateSecuritiesSlice = createSlice({
  name: "updateSecuritiesSlice",
  initialState: usersInitialState,
  reducers: {
    /* This action will trigger our saga middleware
         and set the loader to true and reset error message.
      */
    addPhoneNumberRequest: (state, action) => {
      state.isPhoneAddsuccess = false;
    },
    addPhoneNumberSuccess: (state, action) => {
      state.isPhoneAddsuccess = true;
    },
    securityVerifyPhoneRequest: (state, action) => {
      //   state.chatsList = action.payload;
    },
    updateSecuritySettingsRequest: (state, action) => {
        // state.securitySettings = action.payload;
    },
    updateSecuritySettings: (state, action) => {
        state.securitySettings = action.payload;
    },
    instagramPostsSaveDBRequest: (state, action) => {
      // state.securitySettings = action.payload;
  },
  },
});
export const {
  addPhoneNumberRequest,
  securityVerifyPhoneRequest,
  updateSecuritySettingsRequest,
  addPhoneNumberSuccess,
  updateSecuritySettings,
  instagramPostsSaveDBRequest
} = updateSecuritiesSlice.actions;
export default updateSecuritiesSlice.reducer;
