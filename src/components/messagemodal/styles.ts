import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";



export const styles = ({colors}:Theme) => StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'red',
        justifyContent:"center",
        alignItems:'center',
    },
    absoulte:{
        position:'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0
    },
    message:{
        backgroundColor:colors.modalbg,
        borderRadius:moderateScale(15),
        width:'80%',
        alignItems:"center",
        paddingHorizontal:horizontalScale(47),
        paddingVertical:verticalScale(22),
        rowGap:moderateScale(18)
    },
    butttonview:{
        gap:10,
        width:'100%',
        marginTop:verticalScale(10)
    },
    image:{
        height:verticalScale(36),
        width:horizontalScale(44),
        tintColor:COLORS.primaryColor
    },
    titletext:{
        fontFamily:FONTS.Lexend_Medium,
        color:colors.black,
        fontSize:moderateScale(20)
    },
    text:{
        color:colors.black,
        fontSize:moderateScale(12),
        fontFamily:FONTS.Lexend_Regular,
        textAlign:'center'
    },
    button:{
        backgroundColor:COLORS.primaryColor,
        paddingVertical:verticalScale(15),
        justifyContent:'center',
        alignItems:"center",
        borderRadius:moderateScale(40)
    },
    buttontext:{
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(16),
        color:colors.white
    },
    secondbtn:{
        borderWidth:moderateScale(1),
        borderColor:'#BBBBBB',
        paddingVertical:verticalScale(15),
        justifyContent:'center',
        alignItems:"center",
        borderRadius:moderateScale(40)
    },
    secondtxt:{
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(16),
        color:colors.black
    }
})

export default styles;