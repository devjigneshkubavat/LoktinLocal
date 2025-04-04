import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { uploadImage } from "@/redux/services/authServices";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const tile = width / 3;

export const styles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    iconStyle: {
      tintColor: colors.black,
    },
    headerstyle: {
      borderBottomWidth: moderateScale(2),
      borderColor: colors.headerBorder,
    },
    profileSection: {
      paddingHorizontal: horizontalScale(20),
      paddingVertical: verticalScale(20),
      flex: 1,
    },
    profileImage: {
      width: moderateScale(100),
      height: moderateScale(100),
      borderRadius: moderateScale(50),
      marginBottom: verticalScale(15),
    },
    name: {
      fontSize: moderateScale(24),
      fontFamily: FONTS.Lexend_SemiBold,
      marginBottom: verticalScale(5),
    },
    handle: {
      fontSize: moderateScale(14),
      fontFamily: FONTS.Lexend_Medium,
      color: COLORS.lightFont,
      marginBottom: 15,
    },
    bio: {
      fontSize: moderateScale(13),
      color: COLORS.lightFont,
      marginBottom: 20,
      fontFamily: FONTS.Lexend_Light,
    },
    bottomView: {
      width: "100%",
      backgroundColor: "#6db5ff",
      alignSelf: "center",
    },
    messageButton: {
      width: "100%",
      alignItems: "center",
      backgroundColor: COLORS.primaryColor,
      paddingVertical: 12,
      paddingHorizontal: 100,
      borderRadius: 25,
      marginBottom: 20,
    },
    messageButtonText: {
      color: colors.white,
      fontSize: moderateScale(16),
      fontFamily: FONTS.Lexend_Medium,
    },
    passionsContainer: {
      marginTop: 20,
      borderRadius: 8,
      padding: 20,
      backgroundColor: colors.sectionBg,
    },
    passionsTitle: {
      color: colors.fontblackColor,
      fontSize: moderateScale(18),
      fontFamily: FONTS.Lexend_SemiBold,
      marginBottom: 15,
    },
    passionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    passionEmoji: {
      marginRight: 5,
    },
    passionText: {
      color: colors.black,
      fontSize: moderateScale(14),
      fontFamily: FONTS.Lexend_Regular,
    },
    tabsContainer: {
      flexDirection: "row",
      paddingBottom: 10,
    },
    tabButton: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 15,
    },
    tabText: {
      fontSize: moderateScale(16),
      fontFamily: FONTS.Lexend_Medium,
      color: colors.fontblackColor,
    },
    activeTabText: {
      color: COLORS.primaryColor,
      fontFamily: FONTS.Lexend_Medium,
    },
    activeTabIndicator: {
      position: "absolute",
      bottom: 0,
      width: "80%",
      height: 2,
      backgroundColor: COLORS.primaryColor,
    },
    boxContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    boxImage: {
      width: tile,
      height: tile,
    },
    postButton: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: verticalScale(18),
      borderRadius: moderateScale(30),
      backgroundColor: "#6db5ff",
      marginHorizontal: horizontalScale(18),
      marginVertical: verticalScale(16),
      width: "100%",
      alignSelf: "center",
    },
    btnText: {
      fontSize: moderateScale(16),
      fontFamily: FONTS.Lexend_Medium,
      color: colors.white,
    },
    uploadPhotoContainer: {
      borderWidth: 1,
      height: verticalScale(313),
      width: horizontalScale(313),
      borderRadius: horizontalScale(72),
      borderColor: "#6DB5FF",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: verticalScale(20),
      
    },
    uploadImage: {
      height: horizontalScale(40),
      width: horizontalScale(40),
      resizeMode: 'cover',
    },
    imageStyle: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
      borderRadius: horizontalScale(20)
    },
  });

export default { styles };
