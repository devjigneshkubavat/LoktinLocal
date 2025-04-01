import { Dimensions, StyleSheet } from "react-native";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";

const width = Dimensions.get("window").width - 40;

export const styles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      position: "relative",
      flex: 1,
    },
    pagecontainer: {
      flexGrow: 1,
      paddingHorizontal: horizontalScale(16),
      paddingBottom: verticalScale(20),
    },
    sectionTitle: {
      color: colors.black,
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(18),
      paddingVertical: verticalScale(10),
    },
    uploadBox: {
      height: moderateScale(200),
      backgroundColor: "#E7E7E7",
      borderColor: "#B7B7B7",
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(8),
      justifyContent: "center",
      alignItems: "center",
      maxWidth: moderateScale(200),
      alignSelf: "center",
      marginVertical: verticalScale(20),
      gap: moderateScale(10),
      paddingTop: verticalScale(20),
    },
    imagePreviewContainer: {
      height: moderateScale(220),
      borderRadius: moderateScale(8),
      width: moderateScale(200),
    },
    uploadText: {
      color: COLORS.black,
      fontFamily: FONTS.Lexend_Regular,
      fontSize: moderateScale(14),
      paddingHorizontal: horizontalScale(20),
      textAlign: "center",
    },
    iconSize: {
      height: moderateScale(24),
      tintColor: COLORS.black,
    },
    orText: {
      textAlign: "center",
      color: colors.black,
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(16),
      padding: moderateScale(5),
    },
    postContainer: {
      flexGrow: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      paddingBottom: verticalScale(16),
    },
    imageBox: {
      width: width / 4,
      padding: moderateScale(5),
    },
    coverImage: {
      width: "100%",
      height: moderateScale(125),
      borderRadius: moderateScale(10),
      resizeMode: "cover",
    },
    footerContainer: {
      paddingHorizontal: horizontalScale(20),
      paddingVertical: verticalScale(10),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    backButton: {
      padding: moderateScale(10),
    },
    backButtonText: {
      color: colors.black,
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(15),
    },
    nextBtn: {
      width: moderateScale(35),
      height: moderateScale(35),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: moderateScale(30),
      backgroundColor: COLORS.primaryColor,
    },
    nextBtnIcon: {
      height: moderateScale(24),
      tintColor: colors.white,
    },
  });

export default styles;
