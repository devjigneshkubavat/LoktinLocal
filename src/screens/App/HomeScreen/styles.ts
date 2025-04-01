import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const styles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    headerstyle: {
      borderBottomWidth: moderateScale(2),
      borderColor: COLORS.lightBg,
      paddingBottom: verticalScale(22),
    },
    progressView: {
      marginTop: verticalScale(8),
      marginBottom: verticalScale(8),
    },
    centerView: {
      flex: 1,
      justifyContent: "center",
    },
    bottomView: {
      backgroundColor: COLORS.primaryColor,
      marginVertical: verticalScale(9),
    },
    btnText: {
      color: COLORS.white,
    },
    introText: {
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(24),
      color: COLORS.fontblackColor,
      paddingHorizontal: horizontalScale(20),
      paddingVertical: verticalScale(8),
      textAlign: "center",
    },
    subText: {
      fontFamily: FONTS.Lexend_Regular,
      fontSize: moderateScale(14),
      color: COLORS.lightFont,
      paddingHorizontal: horizontalScale(36),
      paddingBottom: verticalScale(8),
      textAlign: "center",
    },
    contactText: {
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(16),
      color: COLORS.primaryColor,
      paddingVertical: verticalScale(8),
      textAlign: "center",
    },
    userName: {
      fontFamily: FONTS.Lexend_SemiBold,
      fontSize: moderateScale(18),
      color: COLORS.white,
    },
    timeText: {
      fontFamily: FONTS.Lexend_Regular,
      fontSize: moderateScale(14),
      color: COLORS.white,
    },
    canderIcon: {
      height: moderateScale(20),
      width: moderateScale(20),
      marginRight: horizontalScale(4),
    },
    leftIcon: {
      height: moderateScale(24),
      width: moderateScale(24),
      marginRight: horizontalScale(4),
    },
    imageBackground: {
      alignSelf: "center",
      borderRadius: moderateScale(25),
      marginTop: verticalScale(10),
      overflow: "hidden",
      height: "100%",
      width: "100%",
      justifyContent: "flex-end",
    },
    userNameView: {
      backgroundColor: COLORS.white,
      top: verticalScale(20),
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      left: horizontalScale(10),
      paddingHorizontal: horizontalScale(2),
      borderRadius: moderateScale(20),
      paddingVertical: verticalScale(2),
      zIndex: 10,
    },
    userImage: {
      width: moderateScale(25),
      height: moderateScale(25),
      backgroundColor: "red",
      borderRadius: moderateScale(25),
      marginRight: horizontalScale(5),
    },
    userDetailsView: {
      width: "95%",
      alignSelf: "center",
      borderRadius: 32,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: verticalScale(10),
      flexDirection: "row",
      overflow: "hidden",
      position: 'absolute',
      bottom: verticalScale(0),
    },
    directionView: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: verticalScale(4),
    },
    boxContainer: {
      paddingHorizontal: verticalScale(10),
      gap: verticalScale(10),
      paddingBottom: verticalScale(20),
    },
    box: {
      width: "100%",
      height: height / 1.5,
      alignSelf: "center",
      paddingBottom: verticalScale(10),
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
    blurView: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    detailsContainer: {
      flex: 1,
    },
    userNameText: {
      fontSize: moderateScale(16),
      fontFamily: FONTS.Lexend_Medium,
      paddingRight: moderateScale(10),
    },
  });

export default styles;
