import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { moderateScale } from "@/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const tile = width / 2 - 22;
const tileImage = tile - 20;

export default ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    requestTitle: {
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(16),
      color: colors.fontblackColor,
      padding: 16,
    },
    boxContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      paddingHorizontal: 16,
      paddingBottom: 10,
    },
    box: {
      width: tile,
      padding: 8,
      gap: 8,
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: colors.white,
      borderColor: COLORS.tagBorder,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    boxImage: {
      width: tileImage,
      height: tileImage,
      borderRadius: 6,
    },
    name: {
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(14),
      color: colors.fontblackColor,
    },
    button: {
      backgroundColor: COLORS.primaryColor,
      borderRadius: 30,
      padding: 5,
      paddingHorizontal: 10,
    },
    buttonText: {
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(12),
      color: colors.white,
    },
    secondaryButton: {
      borderWidth: 1,
      borderColor: COLORS.primaryColor,
      borderRadius: 30,
      padding: 5,
      paddingHorizontal: 10,
    },
    secondaryButtonText: {
      fontFamily: FONTS.Lexend_Medium,
      fontSize: moderateScale(12),
      color: COLORS.primaryColor,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 10,
    },
    text: {
      fontFamily: FONTS.Lexend_Light,
      fontSize: moderateScale(10),
      color: colors.fontblackColor,
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
    noDataTextContainer: {
      justifyContent: "center",
      paddingVertical: 30,
      flex: 1,
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.1)",
      borderRadius: 30,
    },
  });
