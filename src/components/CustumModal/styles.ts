import { FONTS } from '@/constants';
import { COLORS } from '@/constants/colors';
import { Theme } from '@/context/themeContext';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';
import { StyleSheet } from 'react-native';

export const styles = ({ colors }:Theme) => StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.modalbackground,
    },
    modal: {
        backgroundColor: colors.white,
    },
    option: {
        paddingVertical: verticalScale(8),
        borderBottomWidth: moderateScale(1),
        borderBottomColor: COLORS.lightBg,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    optionText: {
        fontSize: moderateScale(16),
        color: colors.fontblackColor,
        fontFamily:FONTS.Lexend_Light,
        textTransform:'capitalize'
    },
    headerBottom:{
        borderBottomWidth:moderateScale(1),
        borderBottomColor:COLORS.lightBg,
        paddingLeft:horizontalScale(10)
    },
    containerStyle:{
        paddingHorizontal:horizontalScale(16)
    },
    iconSize:{
        height:verticalScale(16),
        tintColor:COLORS.primaryColor
    }
});

export default {styles};