import { FONTS } from '@/constants'
import { COLORS } from '@/constants/colors'
import { Theme } from '@/context/themeContext'
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics'
import { Dimensions, StyleSheet } from 'react-native'

const { height } = Dimensions.get('window');

export default ({ colors }: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.white,
            flex: 1
        },
        iconStyle: {
            flexDirection: 'row',
            gap: moderateScale(8)
        },
        iconSize: {
            height: verticalScale(22),
            tintColor: colors.black
        },
        headerstyle: {
            borderBottomWidth: moderateScale(2),
            borderColor: colors.borderColor,
            paddingBottom: verticalScale(22)
        },
        tabContainer: {
            width: '100%',
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: verticalScale(20)
        },
        tabText: {
            fontSize: moderateScale(16),
            fontFamily: FONTS.Lexend_Medium,
            color: colors.black,
            textAlign: "center",
            gap: 8
        },
        activeTab: {
            color: COLORS.primaryColor, // Light brown color for active tab
        },
        tabView: {
            width: '50%',
            alignItems: 'center',
            paddingBottom: verticalScale(10),
            paddingHorizontal: horizontalScale(5),
            borderBottomWidth: 1,
            borderBottomColor: colors.white,
        },
        activeTabLine: {
            borderBottomColor: COLORS.primaryColor
        },
        optionView: {
            marginHorizontal: horizontalScale(15),
            paddingTop: verticalScale(15),
            paddingBottom: verticalScale(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: colors.headerBorder
        },
        lableText: {
            color: colors.black,
            fontSize: moderateScale(16),
            fontFamily: FONTS.Lexend_Light
        },
        valueText: {
            color: colors.black,
            fontSize: moderateScale(16),
            fontFamily: FONTS.Lexend_Light
        },
        userText: {
            fontSize: moderateScale(18),
            fontFamily: FONTS.Lexend_SemiBold,
            color: colors.black,
            marginTop: verticalScale(2)
        },
        emailText: {
            color: colors.fontGrayColor,
            fontSize: moderateScale(14),
            fontFamily: FONTS.Lexend_Regular
        },
        listTitle: {
            fontSize: moderateScale(14),
            fontFamily: FONTS.Lexend_SemiBold,
            color: colors.black,
            paddingHorizontal: horizontalScale(10)
        }, headerView: {
            backgroundColor: colors.headerBorder + '90',
            paddingVertical: verticalScale(18),
            marginBottom: verticalScale(10),

        },
        rightImage: {
            width: horizontalScale(15),
            height: verticalScale(15),
            tintColor: colors.black,
            resizeMode: 'contain',
            right: -horizontalScale(2),
            top: verticalScale(1),
        },
        instagramImage: {
            width: horizontalScale(18),
            height: verticalScale(18),
            resizeMode: 'cover',
            right: -horizontalScale(2),
            top: verticalScale(1),
        },
        footerText: {
            textAlign: "center",
            fontSize: moderateScale(14),
            fontFamily: FONTS.Lexend_Medium,
            color: colors.black,
            marginTop: verticalScale(20),
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.overlay
        },
        modalView: {
            marginHorizontal: horizontalScale(20),
            marginVertical: verticalScale(20),
            backgroundColor: colors.white,
            borderRadius: moderateScale(10),
            paddingHorizontal: horizontalScale(20),
            paddingVertical: verticalScale(20),
            alignItems: 'center',
            gap: moderateScale(10),
            maxHeight: height * 0.8
        },
        modalTitle: {
            fontSize: moderateScale(20),
            fontFamily: FONTS.Lexend_SemiBold,
            color: colors.black,
            textAlign: 'center'
        },
        modalbody: {
            fontSize: moderateScale(18),
            fontFamily: FONTS.Lexend_Light,
            color: colors.black,
            textAlign: 'center'
        },
        cameraIcon: {
            height: verticalScale(48),
        },
        LockIcon: {
            height: verticalScale(70),
        },
        bottomView: {
            backgroundColor: COLORS.primaryColor,
            width: horizontalScale(200),
            marginHorizontal: undefined
        },
        cancelView: {
            borderColor: COLORS.otpInputborder,
            borderWidth: 1,
            width: horizontalScale(200),
            marginHorizontal: undefined,
            marginVertical: undefined
        },
        cancelBtnText: {
            color: colors.black,
        },
        btnText: {
            color: colors.white,
        },
        profileImage:{
            height: verticalScale(80),
            borderRadius: verticalScale(40),
            aspectRatio:1,
        },
        profileImageholder:{
            height: verticalScale(80),
            borderRadius: verticalScale(40),
            aspectRatio:1,
            tintColor:COLORS.primaryColor
        },
        locationView:{
            borderWidth:moderateScale(1),
            borderColor:COLORS.primaryColor,
            flex:1,
            marginTop:verticalScale(-7),
            marginBottom:verticalScale(5),
            borderRadius:moderateScale(10),
            paddingHorizontal:horizontalScale(16),
            paddingVertical:verticalScale(8.5)
        },
        locationLabel:{
            fontSize: moderateScale(11),
            fontFamily: FONTS.Lexend_Light,
            color: colors.fontblackColor,
        },
        locationValue:{
            fontSize: moderateScale(16),
            fontFamily: FONTS.Lexend_Regular,
            color: colors.black,
        }
    })
