import baseApi from "@/api/baseApi";
import {
  cleanData,
  otpResendFailure,
  otpResendRequest,
  otpResendSuccess,
  verifyFailure,
  verifyRequest,
  verifySuccess,
} from "../slices/authSlice";
import { setLocally, showToast } from "@/utils/helper";
import store, { persistor } from "@/store/store";
import reduxStorage from "@/store/reduxStorage";
import Toast from "react-native-toast-message";
import axios from "axios";
interface ApiResponse {
  [key: string]: any;
}
export const resendOTP = ({ url, data }: { url: string; data: any }) => {
  return async (dispatch: any) => {
    dispatch(otpResendRequest({ url, data }));
    try {
      const response: ApiResponse = await baseApi.post(url, data);
      showToast(response);
      dispatch(otpResendSuccess()); // Dispatch success action
      return response; // Resolve the promise
    } catch (error) {
      showToast(error);
      dispatch(otpResendFailure()); // Dispatch failure action
      throw error; // Reject the promise
    }
  };
};
export const verifyOTP = ({ url, data }: { url: string; data: any }) => {
  return async (dispatch: any) => {
    dispatch(verifyRequest({ url, data }));
    try {
      const response: ApiResponse = await baseApi.post(url, data);
      showToast(response);
      dispatch(verifySuccess({})); // Dispatch success action
      return response; // Resolve the promise
    } catch (error) {
      showToast(error);
      dispatch(verifyFailure()); // Dispatch failure action
      throw error; // Reject the promise
    }
  };
};
export async function uploadImage(formData: any) {
  try {
    const response = await fetch(
      "https://api.loktin.app/photos/upload-photos",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to upload: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to upload: ${error}`);
  }
}

export const createPlan = async (data: any) => {
  const token = store.getState().auth.userToken;
  try {
    const response = await axios.post(
      "https://api.loktin.app/photos/upload/plans",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("🚀 Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating plan:", error);
  }
};

export const signOut = () => {
  return async (dispatch: any) => {
    dispatch({ type: "RESET_STATE" });
    await reduxStorage.removeItem("screen");
    await persistor.purge();
    await persistor.flush();
    setLocally("theme", "auto");
    Toast.show({ type: "success", text1: "Sign Out Successfully" });
  };
};
