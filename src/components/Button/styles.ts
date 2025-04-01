import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from 'react-native';

export const styles = ({ colors }:Theme) => StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:verticalScale(18),
        borderRadius:moderateScale(30),
        backgroundColor:colors.white,
        marginHorizontal:horizontalScale(18),
        marginVertical:verticalScale(16)
    },
    btnText:{
        fontSize:moderateScale(16),
        fontFamily:FONTS.Lexend_Medium,
        color:colors.black
    },
    disabledButton:{
        backgroundColor:COLORS.disableColor
    }
})
export default {
    styles
}