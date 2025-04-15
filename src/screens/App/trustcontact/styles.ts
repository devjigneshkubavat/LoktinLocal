import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export const style = ({colors} : Theme) => StyleSheet.create({
    safearea:{
        flex:1,
        backgroundColor:colors.white
    },
    header:{
        borderBottomWidth:moderateScale(1),
        borderBlockColor:colors.headerBorder,
        paddingBottom:verticalScale(20)
    },
    maincontainer: {
        backgroundColor: colors.white,
        flex: 1
    },
    container:{
        borderBottomWidth:moderateScale(3),
        borderColor:COLORS.primaryColor,
        marginTop:verticalScale(30),
        paddingBottom:verticalScale(10)
    },
    text:{
        color:COLORS.primaryColor,
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(16),
        textAlign:"center",
    },
    flexview:{
        flex:1,
        justifyContent:'space-between'
    },
    textinput:{
        marginTop:verticalScale(50)
    },
    touch:{
        backgroundColor:COLORS.primaryColor,
        paddingVertical:verticalScale(15),
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:horizontalScale(16),
        borderRadius:moderateScale(30),
        marginBottom:verticalScale(30)
    },
    touchtext:{
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(16),
        color:colors.white
    }
})

export default style