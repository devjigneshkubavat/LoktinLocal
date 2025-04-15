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
        flex:1,
        marginTop:verticalScale(20),
        borderColor:COLORS.primaryColor,
        borderWidth:moderateScale(1),
        borderRadius:moderateScale(10),
        marginHorizontal:horizontalScale(0.5),
        marginBottom:verticalScale(0.5),
        elevation:0.7,
        shadowColor:'#171717',
        shadowOffset:{width: 0, height:2},
        shadowOpacity:0.2,
        shadowRadius:3,
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
        paddingHorizontal:horizontalScale(9),
    },
    iconSize:{
        height:verticalScale(16),
        tintColor:COLORS.primaryColor
    },
    closeBtn:{
        marginTop:verticalScale(10),
        alignItems:'flex-start',
        marginLeft:horizontalScale(9),
        width:horizontalScale(24)
    }
});

export default {styles};