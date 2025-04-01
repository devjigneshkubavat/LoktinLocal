import { FONTS } from '@/constants';
import { COLORS } from '@/constants/colors';
import { Theme } from '@/context/themeContext';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window')
const tile = width / 3

export const styles = ({ colors }: Theme) => StyleSheet.create({
    eventContainer: {
        paddingBottom: 20,
        paddingHorizontal: 20,
        gap: 20
    },
    postItem: {
        flexDirection: "row",
        padding: 16,
        backgroundColor: COLORS.eventColor,
        borderWidth: 1,
        borderColor: COLORS.eventBorder,
        borderRadius: 8,
        alignItems: "center",
        gap: 14
    },
    eventBg: {
        backgroundColor: COLORS.primaryColor,
        opacity: 0.2
    },
    postImageContainer: {
        gap: 5
    },
    postImage: {
        width: moderateScale(48),
        height: moderateScale(48),
        borderRadius: moderateScale(8),
    },
    postContent: {
        flex: 1,
    },
    postTitle: {

        fontSize: moderateScale(16),
        fontFamily: FONTS.Lexend_Bold,
        color: colors.fontblackColor,
        marginBottom: 8,
    },
    postInfo: {
        gap: 5
    },
    postInfoItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: horizontalScale(16),
    },
    postInfoText: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Lexend_Regular,
        color: colors.fontGrayColor,
        // color: "#1F121699",
        marginLeft: 4,
    },
    starButton: {
        padding: 8,
    },
    iconSize: {
        height: verticalScale(20),
        tintColor: colors.black
    },
    starIconSize: {
        height: moderateScale(22),
        // tintColor: colors.black
    },
});

export default { styles };
