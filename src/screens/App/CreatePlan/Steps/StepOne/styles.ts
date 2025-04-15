import { StyleSheet } from "react-native";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";

export const styles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: horizontalScale(20),
    },
    plantext: {
      color: colors.black,
      fontFamily: FONTS.Lexend_SemiBold,
      fontSize: moderateScale(18),
      paddingVertical: verticalScale(10),
      marginBottom:verticalScale(8)
    },
    Txtinput: {
      marginHorizontal: 0,
    },
    addressContainer:{
      marginVertical:verticalScale(8)
    },
    Rowview: {
      flexDirection: "row",
      gap: moderateScale(16),
      marginVertical:verticalScale(8)
    },
    Rowtxxtinput: {
      justifyContent: "space-between",
      marginVertical: verticalScale(10),
      marginHorizontal: horizontalScale(0),
      width: horizontalScale(160.5),
    },
    nextBtn: {
      position: "absolute",
      right: horizontalScale(20),
      bottom: verticalScale(15),
      width: moderateScale(35),
      height: moderateScale(35),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: moderateScale(30),
      backgroundColor: COLORS.primaryColor,
    },
    iconSize: {
      height: moderateScale(24),
      tintColor: colors.white,
    },
    mapBoxInput: {
      borderRadius: verticalScale(10),
      height: verticalScale(55),
      backgroundColor: colors.white,
      color: colors.black,
      borderWidth: verticalScale(1),
      borderColor: COLORS.primaryColor,
      width: horizontalScale(335),
    },
  });

export default styles;
