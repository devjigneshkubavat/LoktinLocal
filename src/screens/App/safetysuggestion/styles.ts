import { Theme } from "@/context/themeContext";
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { FONTS } from "@/constants";

export const styles = ({ colors }: Theme) => StyleSheet.create({
    safearea:{
        backgroundColor:colors.white,
        flex:1
    },
    container:{
        backgroundColor:colors.white,
        flex:1
    },
    header:{
        borderBottomWidth: moderateScale(2),
        borderColor: colors.headerBorder,
        marginBottom: moderateScale(8)
    },
    subcontainer:{
        flex:1,
        width:'100%',
        paddingHorizontal:'5%',
        // backgroundColor:'red'
    },
    contentview:{
        borderColor:COLORS.primaryColor,
        marginHorizontal:'2.5%',
        borderRadius:moderateScale(9),
        paddingHorizontal:horizontalScale(14),
        paddingVertical:verticalScale(14),
        backgroundColor:colors.saftybg,
        width:'45%',
        marginVertical:'2.5%',
        borderWidth:moderateScale(1),
        elevation:0.7,
        shadowColor:'#171717',
        shadowOffset:{width: 0, height:2},
        shadowOpacity:0.2,
        shadowRadius:3
    },
    Imageview:{
        width:'100%',
        marginBottom:verticalScale(18)
    },
    image:{
        resizeMode: 'contain',
        height:horizontalScale(50),
        width:verticalScale(50)
    },
    textview:{
        // backgroundColor:'red',
        rowGap:verticalScale(5)
    },
    title:{ 
        color:colors.black,
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(18)
    },
    detail:{
        color:COLORS.semilight,
        fontSize:moderateScale(13),
        fontFamily:FONTS.Lexend_Regular
    }
})

export default styles;