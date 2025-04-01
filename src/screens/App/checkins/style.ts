import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";



export const style = ({colors} : Theme) => StyleSheet.create({
    
    header:{
        borderBottomWidth:moderateScale(1),
        borderColor: colors.headerBorder,
        paddingBottom: verticalScale(22)

    },
    container:{
        flex:1,
        backgroundColor:colors.white
    },
    list:{
        backgroundColor:'',
        borderBottomWidth:moderateScale(1),
        borderColor: colors.headerBorder,
        paddingTop:verticalScale(16),
        paddingBottom:verticalScale(12),
        marginHorizontal:horizontalScale(15),
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    text:{
        color:colors.black,
        fontFamily:FONTS.Lexend_Light,
        fontSize:moderateScale(16)
    },
    image:{
        height:verticalScale(20),
        width:horizontalScale(20),
        resizeMode:'contain',
        tintColor:COLORS.primaryColor
    }
})

export default style;