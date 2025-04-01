import { FONTS } from '@/constants';
import { COLORS } from '@/constants/colors';
import { Theme } from '@/context/themeContext';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';
import { StyleSheet } from 'react-native';

export const styles = ({ colors }: Theme) => StyleSheet.create({
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
    logoImage: {
        width: '35%',
        height: 'auto',
        aspectRatio: 87 / 24,
        tintColor: colors.black
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
});

export default { styles };
