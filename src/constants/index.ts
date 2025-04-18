import { ThemeType } from "@/context/themeContext";

export const IMAGES = {
  splashLogo: require("@/assets/image/splashLogo.png"),
  logoName: require("@/assets/image/logoName.png"),
};
export const ICONS = {
  left_arrow: require("@/assets/icons/arrow-left.png"),
  right_arrow: require("@/assets/icons/arrow-right.png"),
  bottom_arrow: require("@/assets/icons/arrow_down.png"),
  userIcon: require("@/assets/icons/userIcon.png"),
  checkIcon: require("@/assets/icons/Checkcircle.png"),
  imageplaceholder: require("@/assets/icons/imageplaceholder.png"),
  searchIcon: require("@/assets/icons/searchIcon.png"),
  checksIcon: require("@/assets/icons/check.png"),
  errorIcon: require("@/assets/icons/error.png"),
  successIcon: require("@/assets/icons/success.png"),
  warningIcon: require("@/assets/icons/warning.png"),
  calanderIcon: require("@/assets/icons/calendar.png"),
  heart: require("@/assets/icons/heart.png"),
  messages: require("@/assets/icons/messages.png"),
  notification: require("@/assets/icons/notification.png"),
  send: require("@/assets/icons/send.png"),
  tabHome: require("@/assets/icons/tabHome.png"),
  tabHomeWhite: require("@/assets/icons/tabHomeWhite.png"),
  tabSearch: require("@/assets/icons/tabSearch.png"),
  tabDocument: require("@/assets/icons/tabDocument.png"),
  tabRequest: require("@/assets/icons/tabRequest.png"),
  more: require("@/assets/icons/more.png"),
  location: require("@/assets/icons/location.png"),
  circleClock: require("@/assets/icons/circleClock.png"),
  star: require("@/assets/icons/star.png"),
  starOutline: require("@/assets/icons/starOutline.png"),
  plus: require("@/assets/icons/plus.png"),
  setting: require("@/assets/icons/setting.png"),
  Cameraicon: require("@/assets/image/cameraIcon.png"),
  close: require("@/assets/image/close.png"),
  gallary: require("@/assets/image/gallary.png"),
  uploadimg: require("@/assets/image/uploadphoto.png"),
  staysafe: require("@/assets/image/stay.png"),
  onlinesecurity: require("@/assets/image/online.png"),
  emergencybutton: require("@/assets/image/emergency.png"),
  safety: require("@/assets/image/safetypoint.png"),
  firstipression: require("@/assets/image/first.png"),
  quicksafety: require("@/assets/image/quick.png"),
  // rightArrow: require('@/assets/icons/right-arrow.png'),
  rightArrow: require("@/assets/icons/rightArrow.png"),
  blazingstar: require("@/assets/icons/blazingstar.png"),
  chat: require("@/assets/icons/chat.png"),
  noteshield: require("@/assets/icons/noteshield.png"),
  shieldprofile: require("@/assets/icons/shieldprofile.png"),
  addUser: require("@/assets/icons/addUser.png"),
  closeIcon: require("@/assets/icons/close.png"),
  dummy: require("@/assets/image/dummy.png"),
  phone: require("@/assets/icons/phone.png"),
  logIn: require("@/assets/icons/log-in.png"),
  logOut: require("@/assets/icons/log-out.png"),
  Grid: require("@/assets/icons/Grid.png"),
  copyOutline: require("@/assets/icons/copy-outline.png"),
  chatBubble: require("@/assets/icons/chat-bubble.png"),
  lock: require("@/assets/icons/Lock.png"),
  message: require("@/assets/icons/Message.png"),
  nodata: require("@/assets/image/nodata.png"),
  eye: require("@/assets/image/eye.png"),
  eyeoff: require("@/assets/image/eyeoff.png"),
  heartFavorite: require("@/assets/icons/heartFavorite.png"),
  starFavorite: require("@/assets/icons/starFavorite.png"),
  Camera: require("@/assets/icons/Camera.png"),
  LockKey: require("@/assets/icons/LockKey.png"),
  delete: require("@/assets/icons/delete.png"),
  edit: require("@/assets/icons/edit.png"),
  downbtn: require("@/assets/icons/downbtn.png"),
  dummyProfile: require("@/assets/image/dummyImage.jpg"),
  kickOut: require("@/assets/icons/kickoutIcon.png"),
};
export const FONTS = {
  Lexend_Thin: "Lexend-Thin", // 100
  Lexend_ExtraLight: "Lexend-ExtraLight", // 200
  Lexend_Light: "Lexend-Light", // 300
  Lexend_Regular: "Lexend-Regular", // 400
  Lexend_Medium: "Lexend-Medium", // 500
  Lexend_SemiBold: "Lexend-SemiBold", // 600
  Lexend_Bold: "Lexend-Bold", // 700
  Lexend_ExtraBold: "Lexend-ExtraBold", // 800
  Lexend_Black: "Lexend-Black", // 900
};

export const GENDER = ["male", "female", "non binary", "other"];
export const Thememode = ["Light Mode", "Dark Mode", "Use System Setting"];
export const Meesage = ["Only Keys", "Anyone", "No one"];
export const themeOptions: { id: ThemeType; label: string }[] = [
  { id: "light", label: "Light Mode" },
  { id: "dark", label: "Dark Mode" },
  { id: "auto", label: "Use System Setting" },
];

type GenderType = "male" | "female" | "non binary" | "other";

export const genderOptions: { id: GenderType; label: string }[] = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "non binary", label: "Non Binary" },
  { id: "other", label: "Other" },
];

type MessagePermissionType = "OnlyKeys" | "AnyOne" | "NoOne";

export const whoCanMessageOptions: {
  id: MessagePermissionType;
  label: string;
  tooltip?: boolean;
}[] = [
  { id: "OnlyKeys", label: "Only Keys", tooltip: true },
  { id: "AnyOne", label: "Anyone" },
  { id: "NoOne", label: "No one" },
];

export const COMMUNITIES = [
  "Black Lives Matter",
  "Feminism",
  "Environmentalism",
  "Trans rights",
  "LGBTQ+ rights",
  "Disability rights",
  "Reproductive rights",
  "Immigrant rights",
  "Indigenous rights",
  "Voter rights",
  "Human rights",
  "Neurodiversity",
  "End religious hate",
];

export const INTERESTS = [
  { emoji: "🎨", label: "Art and Crafts" },
  { emoji: "🍰", label: "Baking" },
  { emoji: "🏙️", label: "Exploring New Cities" },
  { emoji: "💃", label: "Dancing" },
  { emoji: "🐱", label: "Cats" },
  { emoji: "🏕️", label: "Camping" },
  { emoji: "🐶", label: "Dogs" },
  { emoji: "📚", label: "Reading Books" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "📸", label: "Photography" },
  { emoji: "✈️", label: "Traveling" },
  { emoji: "🖋️", label: "Writing" },
  { emoji: "🎧", label: "Listening to Music" },
  { emoji: "🛶", label: "Kayaking" },
  { emoji: "🌌", label: "Stargazing" },
  { emoji: "🍳", label: "Cooking" },
  { emoji: "🎤", label: "Singing" },
  { emoji: "🧗", label: "Hiking" },
  { emoji: "🚴", label: "Cycling" },
  { emoji: "📺", label: "Watching Movies & Series" },
  { emoji: "🌱", label: "Gardening" },
  { emoji: "🧩", label: "Solving Puzzles" },
  { emoji: "🛍️", label: "Shopping" },
  { emoji: "⚽", label: "Playing Sports" },
  { emoji: "🖌️", label: "Sketching" },
  { emoji: "🎭", label: "Theater and Drama" },
  { emoji: "🍹", label: "Mixology (Making Cocktails/Mocktails)" },
  { emoji: "🏄", label: "Surfing" },
  { emoji: "🚂", label: "Train Journeys" },
  { emoji: "🌸", label: "Nature Walks" },
  { emoji: "🕹️", label: "Retro Gaming" },
  { emoji: "🍿", label: "Exploring Snacks and Food Culture" },
  { emoji: "👩‍💻", label: "Learning New Skills Online" },
  { emoji: "🚤", label: "Boating" },
  { emoji: "🎲", label: "Board Games and Card Games" },
  { emoji: "🛋️", label: "Relaxing with Good Vibes" },
  { emoji: "📆", label: "Planning and Journaling" },
];
