import { FONTS } from "@/constants"
import { COLORS } from "@/constants/colors"
import { Theme } from "@/context/themeContext"
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics"
import { StyleSheet } from "react-native"

export const styles = ({ colors }:Theme) => StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        flex:1
    },
    progressView:{
        marginTop:verticalScale(8),
        marginBottom:verticalScale(8)
    },
    introText:{
        fontFamily:FONTS.Lexend_SemiBold,
        fontSize:moderateScale(24),
        color:colors.fontblackColor,
        paddingHorizontal:horizontalScale(16),
        lineHeight:moderateScale(32)
    },
    birthInfoText:{
        fontFamily:FONTS.Lexend_Light,
        fontSize:moderateScale(14),
        color:COLORS.lightFont,
        paddingLeft:horizontalScale(16),
        paddingRight:horizontalScale(24),
        paddingVertical:verticalScale(10),
        lineHeight:moderateScale(19)
    },
    bottomView:{
        backgroundColor:COLORS.primaryColor,
        marginVertical:verticalScale(9)
    },
    btnText:{
        color:colors.white
    },
    dateView:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
})

export default {styles}