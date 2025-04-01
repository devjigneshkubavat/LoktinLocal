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
    headerstyle:{
        borderBottomWidth:moderateScale(2),
        borderColor:COLORS.lightBg,
        paddingBottom:verticalScale(22)
    },
    progressView:{
        marginTop:verticalScale(8),
        marginBottom:verticalScale(8)
    },
    centerView:{
        flex:1,
        justifyContent:'center',
    },
    bottomView:{
        backgroundColor:COLORS.primaryColor,
        marginVertical:verticalScale(9)
    },
    btnText:{
        color:colors.white
    },
    introText:{
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(24),
        color:colors.fontblackColor,
        paddingHorizontal:horizontalScale(20),
        paddingVertical:verticalScale(8),
        textAlign:'center'
    },
    subText:{
        fontFamily:FONTS.Lexend_Regular,
        fontSize:moderateScale(14),
        color:COLORS.lightFont,
        paddingHorizontal:horizontalScale(36),
        paddingBottom:verticalScale(8),
        textAlign:'center'
    },
    contactText:{
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(16),
        color:COLORS.primaryColor,
        paddingVertical:verticalScale(8),
        textAlign:'center'
    }
})

export default {styles}