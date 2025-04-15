import { FONTS } from '@/constants';
import { COLORS } from '@/constants/colors';
import { Theme } from '@/context/themeContext';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window')
const tile = width / 3

export const styles = ({ colors }: Theme) => StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
    },
    iconStyle: {
        tintColor: colors.black
    },
    headerstyle: {
        borderBottomWidth: moderateScale(2),
        borderColor: colors.headerBorder,
    },
    profileSection: {
        alignItems: 'center',
        paddingHorizontal: horizontalScale(20),
        paddingVertical: verticalScale(20),
    },
    profileImage: {
        width: moderateScale(100),
        height: moderateScale(100),
        borderRadius: moderateScale(50),
        marginBottom: verticalScale(15),
    },
    name: {
        fontSize: moderateScale(24),
        fontFamily: FONTS.Lexend_SemiBold,
        marginBottom: verticalScale(5),
    },
    handle: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Lexend_Medium,
        color: COLORS.lightFont,
        marginBottom: 15,
    },
    bio: {
        fontSize: moderateScale(14),
        color: COLORS.lightFont,
        textAlign: 'center',
        paddingHorizontal: 40,
        marginBottom: 20,
        fontFamily: FONTS.Lexend_Light
    },
    bottomView: {
        width: '100%',
        backgroundColor: COLORS.primaryColor,
    },
    btnText: {
        color: colors.white,
    },
    messageButton: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLORS.primaryColor,
        paddingVertical: 12,
        paddingHorizontal: 100,
        borderRadius: 25,
        marginBottom: 20,
    },
    messageButtonText: {
        color: colors.white,
        fontSize: moderateScale(16),
        fontFamily: FONTS.Lexend_Medium,
    },
    passionsContainer: {
        marginTop: 20,
        borderRadius: 8,
        padding: 20,
        backgroundColor: colors.sectionBg,
    },
    passionsTitle: {
        color: colors.fontblackColor,
        fontSize: moderateScale(18),
        fontFamily: FONTS.Lexend_SemiBold,
        marginBottom: 15,
    },
    passionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    passionTag: {
        borderWidth: 1,
        borderColor: COLORS.tagBorder,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    passionEmoji: {
        marginRight: 5,
    },
    passionText: {
        color: colors.black,
        fontSize: moderateScale(14),
        fontFamily: FONTS.Lexend_Regular
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingBottom: 10
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
    },
    tabText: {
        fontSize: moderateScale(16),
        fontFamily: FONTS.Lexend_Medium,
        color: colors.fontblackColor,
    },
    activeTabText: {
        color: COLORS.primaryColor,
        fontFamily: FONTS.Lexend_Medium,
    },
    activeTabIndicator: {
        position: 'absolute',
        bottom: 0,
        width: '80%',
        height: 2,
        backgroundColor: COLORS.primaryColor,
    },
    boxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    boxImage: {
        width: tile,
        height: tile,
    },
    activityLoader: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 999,
      },
});

export default { styles };
