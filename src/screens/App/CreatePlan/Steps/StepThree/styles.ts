import { StyleSheet } from "react-native";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";

export const styles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      position: "relative",
      flex: 1,
    },
    pagecontainer: {
      flexGrow: 1,
      paddingHorizontal: horizontalScale(10),
      paddingBottom: verticalScale(20),
    },
    content: {
      flexGrow: 1,
    },
    imageContainer: {
      alignItems: "center",
      marginVertical: verticalScale(20),
    },
    selectedImage: {
      width: moderateScale(150),
      height: moderateScale(200),
      borderRadius: moderateScale(8),
    },
    formSection: {
      paddingHorizontal: horizontalScale(8),
    },
    label: {
      color: colors.black,
      fontFamily: FONTS.Lexend_Light,
      fontSize: moderateScale(11),
    },
    descriptionInput: {
      color: colors.black,
      fontFamily: FONTS.Lexend_Light,
      fontSize: moderateScale(16),
      minHeight: verticalScale(80),
      paddingHorizontal:0,
    },
    tagsButton: {
      borderWidth: 1,
      borderColor: COLORS.otpInputborder,
      backgroundColor: "#6DB5FF2E",
      borderRadius: moderateScale(5),
      paddingVertical: verticalScale(5),
      paddingHorizontal: horizontalScale(8),
      alignSelf: "flex-start",
      marginLeft: moderateScale(10),
      marginTop: "5%",
    },
    tagsButtonText: {
      color: colors.black,
      fontFamily: FONTS.Lexend_Light,
      fontSize: moderateScale(10),
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: verticalScale(16),
      paddingHorizontal: horizontalScale(10),
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightBg,
    },
    settingLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    settingText: {
      color: colors.black,
      fontFamily: FONTS.Lexend_Light,
      fontSize: moderateScale(16),
      marginLeft: verticalScale(12),
    },
    settingRight: {
      gap: moderateScale(5),
      flexDirection: "row",
      alignItems: "center",
    },
    groupSizeText: {
      color: colors.black,
      fontFamily: FONTS.Lexend_Light,
      fontSize: moderateScale(16),
      marginRight: verticalScale(4),
    },
    shareSection: {
      paddingHorizontal: horizontalScale(20),
      paddingTop: verticalScale(20),
    },
    shareTitle: {
      color: colors.black,
      fontFamily: FONTS.Lexend_Light,
      fontSize: moderateScale(13),
      marginBottom: horizontalScale(16),
    },
    shareOptions: {
      flexDirection: "row",
      gap: moderateScale(24),
    },
    shareOption: {
      alignItems: "center",
      gap: moderateScale(8),
    },
    shareIconContainer: {
      width: moderateScale(50),
      height: moderateScale(50),
      borderRadius: 25,
      backgroundColor: "#F0F0F0",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: verticalScale(8),
    },
    messagesIcon: {
      backgroundColor: "#4CD964",
    },
    shareOptionText: {
      color: colors.black,
      fontFamily: FONTS.Lexend_Light,
      fontSize: moderateScale(14),
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: moderateScale(20),
      gap: moderateScale(10),
    },
    backButton: {
      flexGrow: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.headerBorder,
      justifyContent: "space-between",
      paddingVertical: moderateScale(15),
      paddingHorizontal: horizontalScale(20),
      borderRadius: moderateScale(50),
    },
    backButtonText: {
      flex: 1,
      textAlign: "center",
      color: colors.black,
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(16),
    },
    createButton: {
      flexGrow: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: COLORS.primaryColor,
      paddingVertical: moderateScale(15),
      gap: moderateScale(10),
      paddingHorizontal: horizontalScale(15),
      borderRadius: moderateScale(50),
    },
    createButtonText: {
      flex: 1,
      textAlign: "center",
      color: colors.white,
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(16),
    },
    copyIcon: {
      height: moderateScale(38),
    },
    groupIconSize: {
      transform: [{ rotate: "90deg" }],
      height: moderateScale(18),
      tintColor: colors.black,
    },
    blackIconSize: {
      height: moderateScale(20),
      tintColor: colors.black,
    },
    whiteIconSize: {
      height: moderateScale(20),
      tintColor: colors.white,
    },
    loader: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: "80%", // Adjust width as needed
      borderRadius: 10,
    },
  });

export default styles;
