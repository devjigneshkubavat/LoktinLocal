import { StyleSheet } from 'react-native'
import { Theme } from '@/context/themeContext'
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics'
import { FONTS } from '@/constants'
import { COLORS } from '@/constants/colors'

export const styles = ({ colors }: Theme) =>
    StyleSheet.create({
        safearea: {
            flex: 1,
            backgroundColor: colors.black
        },

        container: {
            backgroundColor: colors.white,
            flex: 1
        },
        iconStyle: {
            flexDirection: 'row',
            gap: 8
        },
        iconSize: {
            height: verticalScale(22),
            tintColor: colors.black
        },
        headerstyle: {
            borderBottomWidth: moderateScale(2),
            borderColor: colors.headerBorder,
            paddingBottom: verticalScale(22)
        },
        leftsidestyle: {
            width: horizontalScale(51),
            flexGrow: 1,
        },
        subcontainer: {
            paddingHorizontal: horizontalScale(20),
            paddingVertical: verticalScale(20),
            justifyContent: 'flex-start',
        },
        plantext: {
            color: colors.black,
            fontFamily: FONTS.Lexend_SemiBold,
            fontSize: moderateScale(18)
        },
        Txtinput: {
            marginVertical: verticalScale(8),
            marginHorizontal: horizontalScale(0)
        },
        Tagview: {
            borderWidth: moderateScale(1),
            borderColor: COLORS.primaryColor,
            borderRadius: moderateScale(10),
            paddingHorizontal: horizontalScale(16),
            paddingVertical: verticalScale(8.5),
            marginVertical: verticalScale(10),
            marginHorizontal: horizontalScale(0)
        },
        Tagtext: {
            fontSize: moderateScale(12),
            color: colors.fontblackColor,
            marginBottom: verticalScale(5),
            fontFamily: FONTS.Lexend_Light
        },
        Tags: {
            flexDirection: "row",
            gap: 7
        },
        listtag: {
            backgroundColor: COLORS.primaryColor,
            borderRadius: moderateScale(20),
            marginTop: verticalScale(5),
            paddingHorizontal: horizontalScale(18),
            paddingVertical: verticalScale(5),
            justifyContent: "center",
            alignItems: "center"

        },
        listtagtext: {
            color: colors.white,
            fontFamily: FONTS.Lexend_Regular
        },
        Rowview: {
            flexDirection: "row",
            gap: 13,
        },
        Rowtxxtinput: {
            justifyContent: "space-between",
            marginVertical: verticalScale(10),
            marginHorizontal: horizontalScale(0),
            width: horizontalScale(160.5)
        },
        Photoview: {
            flexDirection: 'row',
            alignItems: "center",
            gap: 15
        },
        Touchstyle: {
            borderRadius: moderateScale(10),
            borderColor: COLORS.primaryColor,
            borderWidth: moderateScale(2),
            borderStyle: 'dashed',
            height: verticalScale(115),
            width: horizontalScale(105),
            justifyContent: "center",
            alignItems: "center",
            overflow: 'hidden',
        },
        imguri: {
            overflow: "hidden",
            borderRadius: moderateScale(10),
            height: verticalScale(115),
            width: horizontalScale(105),
        },
        txtview: {
            gap: 3
        },
        Filenametxt: {
            fontSize: moderateScale(16),
            color: colors.fontblackColor,
            fontFamily: FONTS.Lexend_Light,

        },
        uploadtext: {
            color: colors.fontblackColor,
            fontSize: moderateScale(13),
            fontFamily: FONTS.Lexend_Medium
        },
        selecttext: {
            color: COLORS.lightFont,
            fontSize: moderateScale(12)
        },
        Filetext: {
            color: COLORS.primaryColor,
            textDecorationLine: "underline"
        },
        icons: {
            resizeMode: 'contain',
            height: moderateScale(50),
            width: moderateScale(50),
            tintColor:COLORS.primaryColor
        },
        Image: {
            height: moderateScale(105),
            width: moderateScale(105),
            borderRadius: moderateScale(10),
        },
        button: {
            backgroundColor: COLORS.primaryColor,
            borderRadius: moderateScale(50),
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: verticalScale(15),
            marginVertical: verticalScale(10)
        },
        Createtxt: {
            color: colors.white,
            fontSize: moderateScale(16),
            fontFamily: FONTS.Lexend_Medium
        }

    })

export default styles;
