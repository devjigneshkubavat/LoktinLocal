import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";



export const style = ({colors} : Theme) => StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white
    },
    header:{
        borderBottomWidth:moderateScale(1),
        borderColor:colors.headerBorder,
    },
    text:{
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(16),
        color:colors.black,
        marginTop:verticalScale(30),
        textAlign:'center'
    },
    textinputview:{
        // backgroundColor:'red'
        marginHorizontal:horizontalScale(40),
        marginTop:verticalScale(25),
        padding:18,
        borderWidth:1,
        borderColor:colors.textinput,
        borderRadius:moderateScale(5),
        flexDirection:'row',
        justifyContent:"space-between",
    },
    textinput:{
        padding:0,
        width:'90%',
        fontSize:moderateScale(16),
        color:colors.black,
        // backgroundColor:'red'
    },
    img:{
        height:verticalScale(20),
        width:horizontalScale(20),
        tintColor:colors.black
    },
    button:{
        paddingVertical:verticalScale(17),
        paddingHorizontal:horizontalScale(20),
        alignItems:"center",
        justifyContent:"center",
        borderRadius:moderateScale(50),
        backgroundColor:COLORS.primaryColor,
        marginHorizontal:horizontalScale(40),
        marginTop:verticalScale(45)
    },
    btntxt:{    
        fontSize:moderateScale(16),
        color:colors.white,
        fontFamily:FONTS.Lexend_Medium
    }
})

export default style;