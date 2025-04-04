import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;

export const styles = ({ colors }: Theme) =>
  StyleSheet.create({
    headerView: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: horizontalScale(20),
      height: verticalScale(60),
    },
    leftView: {
      justifyContent: "center",
      alignItems: "flex-start",
      width: horizontalScale(50),
    },
    centerView: {
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    },
    txt: {
      fontSize: moderateScale(18),
    },
    centerText: {
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(16),
      color: colors.fontblackColor,
      textAlign: "center",
    },
    rightView: {
      justifyContent: "center",
      alignItems: "flex-end",
      width: horizontalScale(50),
    },
    rightText: {
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(16),
      color: COLORS.primaryColor,
    },
    leftArrow: {
      height: verticalScale(22),
      tintColor: colors.black,
    },
   
  });

export default { styles };
