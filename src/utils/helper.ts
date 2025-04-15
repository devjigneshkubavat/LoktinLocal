import { ICONS } from "@/constants";
import reduxStorage from "@/store/reduxStorage";
import { Appearance, PermissionsAndroid, Platform } from "react-native";
import {
  openCamera,
  openPicker,
  Options,
} from "react-native-image-crop-picker";
import { Asset } from "react-native-image-picker";
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoder";
import Toast from "react-native-toast-message";
import { MAPBOX_API } from "./Constants";

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

export const showToast = (
  response: any,
  props?: { position: any; icon: any } | undefined
) => {
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

export const showToastMessage = (type: string, message: string) => {
  if (type === "response") {
    Toast.show({
      type: "customToast",
      text1: message,
      position: "top",
      visibilityTime: 2000,
      swipeable: false,
      props: { icon: ICONS.successIcon },
    });
  } else {
    Toast.show({
      type: "customToast",
      text1: message,
      position: "top",
      visibilityTime: 2000,
      swipeable: false,
      props: { icon: ICONS.errorIcon },
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
export const isPhoneNumberValid = (number: string) => {
  const regex = /^\+1 \d{3} \d{3} \d{4}$/;
  return regex.test(number);
};

export const handleChooseImageFromGallery = () => {
  const options: Options = {
    mediaType: "photo",
    cropping: true,
  };
  return new Promise((resolve, reject) => {
    openPicker(options)
      .then((response: any) => {
        if (response.didCancel) {
          reject("User cancelled image picker");
        } else if (response.errorCode) {
          reject(response.errorCode);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const handleCapturePhotoFromCamera = () => {
  const options: Options = {
    mediaType: "photo",
    cropping: true,
  };
  return new Promise((resolve, reject) => {
    openCamera(options)
      .then((response: any) => {
        if (response.didCancel) {
          reject("User cancelled image picker");
        } else if (response.errorCode) {
          reject(response.errorCode);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
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
export const capitalize = (str: any) => {
  if (!str) return ""; // Handle empty or null input
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateLabelString = (array: Array<any>, key: string) => {
  return array
    .map((item) => (typeof item === "object" && key ? item[key] : item)) // Extract key for objects, otherwise use the string directly
    .filter(Boolean) // Remove null/undefined values
    .join(", ");
};
export const generateLabelArray = (array: Array<any>, key: string) => {
  return array
    .map((item) => (typeof item === "object" && key ? item[key] : item)) // Extract key for objects, otherwise use the string directly
    .filter(Boolean);
};

export const fetchthemeMode = (themeType: any) => {
  switch (themeType) {
    case "light":
      return "Light Mode";
    case "dark":
      return "Dark Mode";
    case "auto":
      return "Use System Setting";
    default:
      return "Light Mode";
  }
};

export const requestLocationPermission = async () => {
  try {
    let granted;

    if (Platform.OS === "ios") {
      granted = await Geolocation.requestAuthorization("whenInUse").catch(
        (error) => {
          return "denied";
        }
      );
    } else {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).catch((error) => {
        return PermissionsAndroid.RESULTS.DENIED;
      });
    }

    if (
      granted === "granted" ||
      granted === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const LOCATION_CURRENT_OPTION: Geolocation.GeoOptions | undefined = {
  accuracy: {
    android: "high",
    ios: "best",
  },
  enableHighAccuracy: true,
  timeout: 15000,
  distanceFilter: 0,
};

export const getCurrentPosition =
  async (): Promise<Geolocation.GeoPosition> => {
    return new Promise(async (resolve, reject) => {
      await Geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        },
        LOCATION_CURRENT_OPTION
      );
    });
  };

export const getLocationFromCoordinates = async (data: any) => {
  return new Promise((resolve, reject) => {
    Geocoder.init;
    let addressDetails = {};
    Geocoder.geocodePosition({ lat: data.longitude, lng: data.longitude })
      .then((res: any) => {
        console.log("res, res", res);

        if (res.length > 0) {
          addressDetails = {
            address: res[0].formattedAddress,
            area: res[0].subLocality,
            city: res[0].locality,
            state: res[0].adminArea,
            pincode: res[0].postalCode,
            country: res[0].country,
          };
          return addressDetails;
        } else {
          reject("No address found");
        }
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  });
};
export const isInputValid = (Input: any) => {
  return (
    Input.interests.length > 0 &&
    Input.communities.length > 0 &&
    Input.gender.trim() !== "" &&
    Input.age.length === 2 &&
    Input.age.every((num) => typeof num === "number") &&
    Input.distance > 0
  );
};

export const getAddressFromMapbox = async (lat: number, lng: number) => {
  const accessToken = MAPBOX_API;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data?.features?.length > 0) {
      const address = data.features[0].place_name;
      return address;
    } else {
      return "Address not found";
    }
  } catch (error) {
    return "Error fetching address";
  }
};
