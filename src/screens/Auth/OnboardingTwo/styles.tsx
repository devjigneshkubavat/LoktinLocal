import { FONTS } from "@/constants"
import { COLORS } from "@/constants/colors"
import { Theme } from "@/context/themeContext"
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics"
import { StyleSheet } from "react-native"

export const styles = ({ colors }:Theme) => StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    progressView: {
        marginTop: verticalScale(8),
        marginBottom: verticalScale(8)
    },
    bottomView: {
        backgroundColor: COLORS.primaryColor,
        marginVertical: verticalScale(9)
    },
    btnText: {
        color: colors.white
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: verticalScale(14),
    },
    sectionView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: moderateScale(1),
        borderBottomColor: COLORS.sectionBorder,
        paddingVertical: verticalScale(12)
    },
    selectedSection: {
        borderBottomColor: COLORS.primaryColor,
        borderBottomWidth: moderateScale(3.5)
    },
    sectionText: {
        fontFamily: FONTS.Lexend_Medium,
        fontSize: moderateScale(16),
        color: COLORS.sectionBorder
    },
    selectText: {
        color: COLORS.primaryColor
    },
    inputView: {
        marginVertical: verticalScale(25)
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    sentMsgText: {
        fontFamily: FONTS.Lexend_Light,
        fontSize: moderateScale(12),
        color: colors.black,
        paddingHorizontal: horizontalScale(20),
        textAlign: 'center'
    },
})

export default {styles}