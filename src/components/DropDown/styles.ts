import { FONTS } from '@/constants';
import { COLORS } from '@/constants/colors';
import { Theme } from '@/context/themeContext';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';
import { StyleSheet } from 'react-native';

export const styles = ({ colors }:Theme) => StyleSheet.create({
    container: {
        borderWidth: moderateScale(1),
        borderColor: COLORS.primaryColor,
        borderRadius: moderateScale(10),
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(8.5),
        marginVertical: verticalScale(8),
        marginHorizontal: horizontalScale(16),
    },
    label: {
        fontSize: moderateScale(11),
        color: colors.fontblackColor,
        marginBottom: verticalScale(5),
        fontFamily: FONTS.Lexend_Light,
    },
    iconSize:{
        height:verticalScale(18),
        tintColor:colors.black
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: moderateScale(16),
        color: colors.fontblackColor,
        fontFamily:FONTS.Lexend_Light,
        textTransform:'capitalize'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        borderTopLeftRadius: moderateScale(16),
        borderTopRightRadius: moderateScale(16),
        padding: verticalScale(16),
        paddingBottom:verticalScale(25)
    },
    option: {
        paddingVertical: verticalScale(12),
        borderBottomWidth: moderateScale(1),
        borderBottomColor: COLORS.primaryColor,
        alignItems:'center',
    },
    optionText: {
        fontSize: moderateScale(16),
        color: colors.fontblackColor,
        fontFamily:FONTS.Lexend_Medium,
        textTransform:'capitalize'
    },
});

export default {styles};
