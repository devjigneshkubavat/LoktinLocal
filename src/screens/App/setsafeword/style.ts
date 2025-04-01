import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export const style = ({ colors }: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        borderColor: colors.headerBorder,
        borderBottomWidth: moderateScale(1),

    },
    txt: {
        fontSize: moderateScale(17),
        fontFamily: FONTS.Lexend_Medium,
        color: colors.black,
        marginTop: verticalScale(15),
        marginHorizontal: horizontalScale(18),
        width: '90%'
    },
    textinput: {
        borderWidth: moderateScale(1),
        borderColor: COLORS.primaryColor,
        fontSize: moderateScale(16),
        fontFamily: FONTS.Lexend_Light,
        borderRadius: moderateScale(10),
        marginHorizontal: horizontalScale(18),
        marginTop: verticalScale(15),
        paddingHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(10),
        height: verticalScale(150),
        color: colors.black,
        padding: 0,
        textAlignVertical: 'top'
    },
    bottomView: {
        backgroundColor: COLORS.primaryColor,
        marginHorizontal: horizontalScale(50),
        marginVertical: undefined
    },
    btnText: {
        color: colors.white,
    },
    form: {
        flexGrow: 1
    }
})


export default style