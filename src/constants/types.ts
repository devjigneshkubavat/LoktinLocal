import { JSX } from "react";
import {
  GestureResponderEvent,
  ImageProps,
  ImageStyle,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { MaskedTextInputProps } from "react-native-advanced-input-mask";

export interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  viewstyle?: ViewStyle;
  textStyle?: TextStyle;
}

export type HeaderProps = {
  centerText?: string;
  leftView?: IconProps | JSX.Element;
  rightView?: IconProps | JSX.Element;
  headerstyle?: ViewStyle;
  rightIcon?: boolean;
  leftIcon?: boolean;
  viewstyle?: ViewStyle;
  lefttext?: boolean;
  leftsidetext?: string;
  leftstyle?: ViewStyle;
  rightviewstyle?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
};

export type IconProps = {
  icon?: ImageProps & string;
  onPress?: (event: GestureResponderEvent) => void;
  iconStyle?: StyleProp<ImageStyle & ViewStyle>;
  disabled?: boolean;
  outerStyle?: ViewStyle;
};

export type ProgressBarProps = {
  progress: number; // Progress value between 0 and 1
  height?: number; // Height of the progress bar
  backgroundColor?: string; // Background color of the progress bar
  progressColor?: string; // Color of the filled progress
  style?: ViewStyle; // Additional style for the progress bar container
  animated: boolean;
  startValue?: number;
};

export type CustomTextInputProps = TextInputProps & {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  mask?: string;
};

export type DropdownProps = {
  label: string;
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
};
export type Community = {
  id: number;
  community_name: string;
};
export type Interest = {
  id: number;
  interest_name: string;
};
export type UserData = {
  username?: string;
  firstName?: string;
  gender?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: any;
  profilePhotoUrls?: string[];
  userId?: number | string;
  communities?: Community[];
  interests?: Interest[];
};
export type ModalProps = {
  isVisible?: boolean;
  options: string[];
  headerName?: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  selectedValue?: string | null;
};

export type Photoupload = {
  visible: boolean;
  onrequestClose: () => void;
  opencamera: () => void;
  opengallery: () => void;
  ontouchable: () => void;
  onclose: () => void;
};
export interface Event {
  id: string;
  title: string;
  venue: string;
  datetime: string;
  image: string;
  tags: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: {
    username: string;
    avatar: string;
  };
  text: string;
  timeAgo: string;
}
export interface getAllPreferences {
  id: number;
  name: string;
  description: string;
  tags?: string[] | null;
  date: string;
  time: string;
  address: any;
  groupSize: number;
  type: string;
  userId: number;
  imageUrl: string;
  allowJoinRequests: boolean;
  isFavourite: boolean;
  allowComments: boolean;
  createdAt: string;
  updatedAt: string;
  user: userDetails;
  groupEntries?: GroupEntriesEntity[] | null;
  dateTime: any;
}
export interface userDetails {
  id: number;
  username: string;
  firstName: string;
  email?: null;
  gender: string;
  phone: string;
  dateOfBirth: string;
  profilePhotoUrls?: string[] | null;
  otp?: null;
  otpExpiresAt?: null;
  isUserVerified: boolean;
  latitude?: null;
  longitude?: null;
  address?: null;
  education?: null;
  userBio?: null;
}
export interface GroupEntriesEntity {
  id: number;
  planId: number;
  userId?: number | null;
  createdAt: string;
  updatedAt: string;
  user?: userDetails;
}

export type Messagemodal = {
  image?: ImageProps;
  title?: String;
  text?: String;
  textstyle?: Object;
  firstbuttonpress?: () => void;
  firstbuttontext?: String;
  Secondbutton?: boolean;
  secondbuttonpress?: () => void;
  secondbuttontext?: String;
  visible?: boolean;
};

export type ConfirmModal = {
  image?: ImageProps;
  title?: String;
  text?: String;
  textstyle?: Object;
  firstbuttonpress?: () => void;
  firstbuttontext?: String;
  Secondbutton?: boolean;
  secondbuttonpress?: () => void;
  secondbuttontext?: String;
  visible?: boolean;
};

export type ParamListTypes = {
  join: { planId: number };
  createPlan: { isUpdate?: boolean };
  preference: { groupId?: number };
};

export interface RequestListProps {
  id: number;
  userId: number;
  planId: number;
  status: string;
  promptAnswer: string;
  createdAt: string;
  updatedAt: string;
  plan: getAllPreferences;
  user: userDetails;
}

export interface CommentDataProps {
  id: number;
  planId: number;
  user: userDetails;
  content: string;
  timeAgo: string;
  replies?: RepliesEntity[] | null;
}

export interface RepliesEntity {
  id: number;
  user: userDetails;
  content: string;
  timeAgo: string;
}

export interface RequestProps {
  status: string;
  id: number;
  userId: number;
  planId: number;
  promptAnswer: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface PickImageProps {
  uri?: string;
  name?: string;
  type?: string;
}

export interface PlanImagesListProps {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: ImagesSrcProps;
  liked: boolean;
  alt: string;
}

export interface ImagesSrcProps {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface ChatListItem {
  user: {
    id: number;
    username: string;
    email: string | null;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isSentByMe: boolean;
  };
}

export interface MessageItem {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  updatedAt: string;
  type?: "header";
  date?: string;
}
