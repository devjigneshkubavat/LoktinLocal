import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale, width } from "@/utils/metrics";
import { StyleSheet } from 'react-native';

export const styles = ({ colors }:Theme) => StyleSheet.create({
    btnText:{
        fontSize:moderateScale(16),
        fontFamily:FONTS.Lexend_Medium,
        color:colors.black,
        marginHorizontal:horizontalScale(5)
    },
    titleText:{
        fontSize:moderateScale(12),
        fontFamily:FONTS.Lexend_Medium,
        color:colors.black,
        padding:moderateScale(10),
        width:width/1.5
    }
})
export default {
    styles
}