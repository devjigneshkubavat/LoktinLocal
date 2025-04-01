import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";



export const style = ({colors}:Theme) => StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white
    },
    header:{
        borderBottomWidth:moderateScale(1),
        borderColor:colors.headerBorder
    },
    mapview:{
        flexDirection:"row",
        paddingVertical:verticalScale(12),
        justifyContent:"center",
        marginHorizontal:horizontalScale(5),
        width:140,
        borderRadius:moderateScale(50),
        borderWidth:moderateScale(1),
        borderColor:'rgba(152, 147, 148, 0.2)'
    },
    color:{
        backgroundColor:colors.white
    },
    touch:{
        borderWidth:moderateScale(1),
        borderColor:COLORS.primaryColor,
        paddingHorizontal:horizontalScale(15),
        paddingVertical:verticalScale(15),
        marginVertical:verticalScale(7),
        marginHorizontal:horizontalScale(10),
        borderRadius:moderateScale(10)
    },
    maptxt:{
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(16),
 
    },
    txt:{
        color:colors.black,
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(14)
    }
})

export default style;