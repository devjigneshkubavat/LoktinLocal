import { FONTS } from '@/constants';
import { COLORS } from '@/constants/colors';
import { Theme } from '@/context/themeContext';
import { verifyRequest } from '@/redux/slices/authSlice';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';
import { StyleSheet } from 'react-native';

export default ({ colors }: Theme) => StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: verticalScale(60),
        paddingRight: horizontalScale(10),
        paddingLeft: horizontalScale(5),
        borderBottomWidth: 1,
        borderBottomColor: colors.headerBorder
    },
    iconView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    icons: {
        width: moderateScale(22),
        height: moderateScale(22),
        tintColor: colors.black
    },
    headerText: {
        fontFamily: FONTS.Lexend_SemiBold,
        fontSize: moderateScale(18),
        color: colors.fontblackColor,
        paddingHorizontal: 15,
        paddingVertical: 10

    }
});
