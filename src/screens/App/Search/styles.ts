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
    searchBar: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: verticalScale(15),
      paddingRight: horizontalScale(15),
      paddingLeft: horizontalScale(15),
      borderBottomWidth: 1,
      borderBottomColor: colors.headerBorder,
    },
    active: {
      borderBottomWidth: 1.5,
      borderBottomColor: colors.black,
    },
    iconView: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    icons: {
      width: moderateScale(22),
      height: moderateScale(22),
      tintColor: colors.black,
    },
    headerText: {
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(16),
      color: colors.fontblackColor,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    searchInput: {
      flexGrow: 1,
      fontFamily: FONTS.Lexend_Light,
      fontSize: moderateScale(16),
      color: colors.fontblackColor,
    },
    activityLoader: {
      paddingVertical: moderateScale(30),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: "rgba(0,0,0,0.1)",
    },
    searchListItem: {
      paddingVertical: moderateScale(10),
    },
    searchItemText: {
      fontFamily: FONTS.Lexend_Light,
      fontSize: moderateScale(17),
      color: colors.fontblackColor,
    },
    searchList: {
      marginVertical: verticalScale(15),
      paddingHorizontal: horizontalScale(15),
    },
    itemSeparator: {
      borderBottomColor: COLORS.borderColor,
      borderBottomWidth: verticalScale(1),
      paddingHorizontal: verticalScale(15),
    },
    noDataTextContainer: {
      justifyContent: "center",
      paddingVertical: moderateScale(30),
      flex: 1,
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.1)",
      borderRadius: 10,
    },
    name: {
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(14),
      color: colors.fontblackColor,
    },
  });
