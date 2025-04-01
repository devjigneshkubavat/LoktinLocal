import { FONTS } from '@/constants';
import { COLORS } from '@/constants/colors';
import { Theme } from '@/context/themeContext';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window')

export default ({ colors }: Theme) => StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
        paddingBottom: 20
    },
    title: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Lexend_Light,
    },
    comment: {
        flexDirection: "row",
        alignItems: 'center',
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5EA",
    },
    avatar: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
    },
    commentContent: {
        width: width - horizontalScale(72),
        paddingLeft: horizontalScale(10),
        flexGrow: 1,
    },
    commentTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    username: {
        fontSize: moderateScale(15),
        fontFamily: FONTS.Lexend_Regular,
        color: '#8E8E93',
    },
    commentText: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Lexend_Regular,
        color: colors.fontblackColor,
    },
    timeAgo: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Lexend_Regular,
        color: '#8E8E93',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    input: {
        backgroundColor: '#9893940D',
        flex: 1,
        height: verticalScale(50),
        paddingHorizontal: horizontalScale(20),
        borderRadius: moderateScale(15),
        fontSize: moderateScale(12),
        fontFamily: FONTS.Lexend_Light,
        color: colors.fontblackColor,
    },
    iconSize: {
        height: moderateScale(22),
        tintColor: colors.white
    },
    send: {
        backgroundColor: COLORS.primaryColor,
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
    }
});
