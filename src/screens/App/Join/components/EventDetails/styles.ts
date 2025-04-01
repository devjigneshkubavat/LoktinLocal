import { FONTS } from '@/constants';
import { COLORS } from '@/constants/colors';
import { Theme } from '@/context/themeContext';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';
import { StyleSheet } from 'react-native';

export default ({ colors }: Theme) => StyleSheet.create({
    container: {
        // backgroundColor: "#fff",
    },
    coverImage: {
        width: "100%",
        height: verticalScale(250),
        borderRadius: 8,
    },
    details: {
        padding: moderateScale(16),
        gap: 4
    },
    title: {
        fontSize: moderateScale(20),
        fontFamily: FONTS.Lexend_Medium,
        color: colors.fontblackColor,
    },
    venue: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Lexend_Light,
        color: COLORS.lightFont,
    },
    tagsContainer: {
        padding: moderateScale(16),
        gap: 8
    },
    tagTitle: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Lexend_Regular,
        color: colors.fontblackColor,
    },
    tags: {
        flexDirection: "row",
        gap: 8,
    },
    tag: {
        backgroundColor: COLORS.primaryColor,
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(15),
    },
    tagText: {
        color: colors.white,
        fontSize: moderateScale(14),
        fontFamily: FONTS.Lexend_Medium,
    },
    bottomView: {
        backgroundColor: COLORS.danger,
    },
    btnText: {
        color: colors.white,
    },
});
