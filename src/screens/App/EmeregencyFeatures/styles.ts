import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export const styles = ({ colors }: Theme) => StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        borderColor: colors.headerBorder,
        borderBottomWidth: moderateScale(2),
    },
    container: {
        marginTop: moderateScale(15),
        paddingHorizontal: horizontalScale(15),
        backgroundColor: '',
    },
    itemview: {
        borderBottomWidth: 1.5,
        borderColor: colors.headerBorder,
        paddingTop: verticalScale(14),
        paddingBottom: verticalScale(6),
    },
    setitem: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: horizontalScale(2)
    },

    titletext: {
        fontSize: moderateScale(16),
        fontFamily: FONTS.Lexend_Light,
        color: colors.black
    },
    valuetext: {
        fontSize: moderateScale(16),
        fontFamily: FONTS.Lexend_Light,
        color: COLORS.semilight,
    },
    rightimage: {
        height: verticalScale(15),
        width: horizontalScale(15),
        tintColor: COLORS.semilight,
        resizeMode: 'contain',
        right: -horizontalScale(2),
        top: verticalScale(1),
    },
    descriptiontext: {
        fontSize: moderateScale(10),
        fontFamily: FONTS.Lexend_Light,
        color: COLORS.emergency,
        marginTop: verticalScale(6),

    },
    absoult: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})

export default styles;