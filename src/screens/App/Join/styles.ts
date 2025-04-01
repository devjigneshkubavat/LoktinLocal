import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export default ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    iconStyle: {
      flexDirection: "row",
      gap: 8,
    },
    iconSize: {
      height: 22,
      tintColor: colors.black,
    },
    headerstyle: {
      borderBottomWidth: moderateScale(2),
      borderColor: colors.headerBorder,
      paddingBottom: verticalScale(22),
    },
    coverImage: {
      width: 200,
      height: 200,
      borderRadius: 16,
    },
    boxContainer: {
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      padding: 16,
    },
    requestImage: {
      width: horizontalScale(150),
      aspectRatio:1,
      borderRadius: 16,
    },
    request: {
      width: horizontalScale(150),
      aspectRatio:1,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: COLORS.primaryColor,
      borderRadius: 16,
      gap: 5,
      backgroundColor: "#F5FAFF",
      position: "relative",
    },
    moreButton: {
      position: "absolute",
      top: 20,
      right: 10,
    },
    moreIcon: {
      height: 22,
      tintColor: COLORS.primaryColor,
    },
    box: {
      width: 200,
      height: 200,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: COLORS.primaryColor,
      borderRadius: 16,
      backgroundColor: "rgba(207, 174, 146, 0.2)",
    },
    addUserIcon: {
      height: 50,
      tintColor: COLORS.primaryColor,
    },
    requestText: {
      fontSize: 14,
      fontFamily: FONTS.Lexend_Medium,
      color: COLORS.primaryColor,
    },
    activityIndicatior: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    starFavoriteIcon: {
      tintColor: undefined,
    },
    disableRequestContainer: {
      borderColor: COLORS.tagBorder,
    },
    disableUserIcon: {
      tintColor: COLORS.sectionBorder,
      opacity: 0.5,
    },
    disablerequestText: {
      color: COLORS.fontblackColor,
      opacity: 0.6,
    },
    popoverContent: {
      paddingVertical: verticalScale(5),
      minWidth: 150,
      borderRadius: moderateScale(15),
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: moderateScale(10),
    },
    editIcon: {
      marginRight: horizontalScale(10),
      tintColor: colors.black,
    },
    deleteIcon: {
      marginRight: horizontalScale(10),
      tintColor: "#ff0000",
    },
    menuText: {
      fontSize: moderateScale(16),
      fontFamily: FONTS.Lexend_Regular,
    },
    gridIcon: {
      marginRight: horizontalScale(10),
      tintColor: COLORS.black,
    },
    pairContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    groupContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
  });
