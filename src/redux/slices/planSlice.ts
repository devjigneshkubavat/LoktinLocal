import { PlanImagesListProps } from "@/constants/types";
import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  isLoading: boolean;
  planImage: string;
  isPlanCreated: number | undefined;
  planData:
    | {
        name: string;
        description: string;
        tags: string[];
        date: string;
        time: string;
        address: any;
        groupSize: number;
        type: string;
        imageUrl: string;
        allowJoinRequests: boolean;
        allowComments: boolean;
      }
    | undefined;
  planImagesList: PlanImagesListProps[];
}

const initialState: initialState = {
  isLoading: false,
  planData: undefined,
  planImage: "",
  isPlanCreated: undefined,
  planImagesList: [],
};

const planSlice = createSlice({
  name: "PlanSlice",
  initialState,
  reducers: {
    setPlanDetails: (state, action) => {
      state.planData = { ...state?.planData, ...action?.payload };
    },
    onCreatePlan: (state, action) => {
      state.isLoading = true;
    },
    savePlanDetails: (state, action) => {
      state.isLoading = false;
      state.isPlanCreated = action?.payload?.id;
    },
    onUploadPlanImage: (state, action) => {
      state.isLoading = true;
    },
    savePlanImage: (state, action) => {
      state.isLoading = true;
      state.planData = { ...state?.planData, ...action?.payload };
      state.planImage = action.payload;
    },
    resetAllDetails: (state, action) => {
      state.isPlanCreated = undefined;
      state.planData = undefined;
      state.planImage = "";
      state.planImagesList = [];
    },
    onGetPlanImages: (state, action) => {
      state.isLoading = true;
    },
    setPlanImages: (state, action) => {
      state.isLoading = false;
      state.planImagesList = action.payload;
    },
    onLeaveGroup: (state, action) => {
      state.isLoading = true;
    },
    setLeaveGroup: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  setPlanDetails,
  savePlanDetails,
  onCreatePlan,
  onUploadPlanImage,
  savePlanImage,
  resetAllDetails,
  onGetPlanImages,
  setPlanImages,
  onLeaveGroup,
  setLeaveGroup,
} = planSlice.actions;
export default planSlice.reducer;
