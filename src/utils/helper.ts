import { ICONS } from "@/constants";
import reduxStorage from "@/store/reduxStorage";
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";
import Toast from "react-native-toast-message";

export const filteredDatawithvalue = (data: any) => {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );
};
export const addPrefixToPhone = (
  userData: Record<string, any>,
  prefix: string
): Record<string, any> => {
  if (userData.phone) {
    return {
      ...userData,
      phone: `${prefix}${userData.phone}`, // Add the prefix to the phone field
    };
  }
  return userData; // Return as is if no phone field
};

export const showToast = (response: any, props: { position: any; icon: any; } | undefined) => {
  if (response?.status === 200) {
    Toast.show({
      type: "customToast",
      text1: response.message,
      position: "bottom",
      visibilityTime: 2000,
      swipeable: false,
      props: { icon: ICONS.successIcon },
    });
  } else {
    Toast.show({
      type: "customToast",
      text1: response.message ?? response.toString(),
      position: props?.position || "bottom",
      visibilityTime: 2000,
      swipeable: false,
      props: { icon: props?.icon || ICONS.errorIcon },
    });
  }
};
export const normalizeUserDetails = (
  data: Record<string, any>
): Record<string, any> => {
  const { id, ...rest } = data; // Destructure to remove `id`
  return {
    ...rest,
    userId: data.userId || id, // Add `userId` using `id` if `userId` is not present
  };
};
export function hasValue(value: any): boolean {
  return value !== null && value !== undefined && value !== "";
}
export function convertToCommunityObjects(communities: string[]) {
  return communities.map((community, index) => ({
    id: index + 1, // Assigning 1-based index as ID
    community_name: community,
  }));
}
export function convertToInterestObjects(interests: string[]) {
  return interests.map((interests, index) => ({
    id: index + 1, // Assigning 1-based index as ID
    interest_name: interests,
  }));
}

export const setLocally = (key: string, value: string) => {
  return reduxStorage.setItem(key, value);
};
export const getLocally = async (key: string) => {
  return reduxStorage.getItem(key);
};
export const removeWhiteSpace = (value: string) => {
  return value.replace(/\s+/g, ""); // Removes all white spaces
};
export const formatPhonenumber = (input: string) => {
  const numericInput = removeWhiteSpace(input);
  if (input.length < 10) {
    return numericInput;
  }
  const formatted = `+1 ${numericInput.slice(2, 5)} ${numericInput.slice(
    5,
    8
  )} ${numericInput.slice(8, 12)}`;
  return formatted; // Removes all white spaces
};

export const handleChooseImageFromGallery = (): Promise<Asset | undefined> => {
  const options: ImageLibraryOptions = {
    mediaType: "photo",
  };
  return new Promise((resolve, reject) => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        reject("User cancelled image picker");
      } else if (response.errorCode) {
        reject(response.errorCode);
      } else {
        const source: Asset | undefined = response.assets && response.assets[0];
        resolve(source);
      }
    });
  });
};

export function jsonToFormData(json: any) {
  const formData = new FormData();

  Object.keys(json).forEach((key) => {
    if (json[key] instanceof File) {
      formData.append("imageUrl", json[key]);
    } else {
      formData.append(key, json[key]);
    }
  });

  return formData;
}

export function getTimeDifference(timestamp: string): string {
  const givenTime = new Date(timestamp);
  const currentTime = new Date();
  const diffInSeconds = Math.floor(
    (currentTime.getTime() - givenTime.getTime()) / 1000
  );

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(weeks / 52);

  if (minutes < 60) {
    return `${minutes} min ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 52) {
    return `${weeks} weeks ago`;
  } else {
    return `${years} years ago`;
  }
}

export function formatTimestamp(timestamp: string): string {
  const givenDate = new Date(timestamp);
  const currentDate = new Date();

  // Format the date as DD/MM/YYYY
  const formattedDate = `${givenDate.getDate().toString().padStart(2, "0")}/${(
    givenDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${givenDate.getFullYear()}`;

  // Check if the given date is today
  if (
    givenDate.getDate() === currentDate.getDate() &&
    givenDate.getMonth() === currentDate.getMonth() &&
    givenDate.getFullYear() === currentDate.getFullYear()
  ) {
    return "Today";
  }

  // Check if the given date is yesterday
  const yesterday = new Date();
  yesterday.setDate(currentDate.getDate() - 1);

  if (
    givenDate.getDate() === yesterday.getDate() &&
    givenDate.getMonth() === yesterday.getMonth() &&
    givenDate.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  }

  return formattedDate;
}
