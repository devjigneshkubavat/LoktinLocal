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
    headerstyle: {
        borderBottomWidth: moderateScale(2),
        borderColor: colors.headerBorder,
        paddingBottom: verticalScale(18)
    },
    leftsidestyle: {
        width: horizontalScale(100),
    },
    iconStyle: {
        flexDirection: 'row',
        gap: 8
    },
    iconSize: {
        height: moderateScale(22),
        tintColor: colors.black
    },
    suncontainer:{
        flexGrow: 1,
        paddingHorizontal:horizontalScale(15),
        paddingVertical:verticalScale(20)
    },
    agetxt:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:"row"
    },
    age:{
        fontSize:moderateScale(16),
        fontFamily:FONTS.Lexend_Light,
        color:colors.black
    },
    range:{

    },
    mapcontainer:{
        // justifyContent:"space-between",
        // flexDirection:"row",
        // alignItems:'center',
        // backgroundColor:'red'
    },
    item:{
        borderBottomWidth:moderateScale(1),
        borderColor:colors.headerBorder,
        paddingTop:verticalScale(20),
        paddingBottom:verticalScale(10),
        flexDirection:"row",
        justifyContent:"space-between",
    },
    icnview:{
        justifyContent:"space-between",
        flexDirection:"row",
        gap:10,
        alignItems:'center',
        marginRight:horizontalScale(4)
    },
    icn:{
        height:verticalScale(13),
        width:horizontalScale(13),
        tintColor:colors.black,
        resizeMode:'contain',
        right : -horizontalScale(2),
        top: verticalScale(1),
    },
    button:{
        backgroundColor:COLORS.primaryColor,
        paddingVertical:verticalScale(17),
        borderRadius:moderateScale(40),
        alignItems:'center',
        justifyContent:'center',
    },
    txt:{
        color:colors.white,
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(16)
    },
    squre:{
        paddingVertical:verticalScale(17),
        alignItems:'center',
        justifyContent:'center',
        marginTop:verticalScale(15),
    },
    texts:{
        color:COLORS.primaryColor,
        fontFamily:FONTS.Lexend_Medium,
        fontSize:moderateScale(16)
    },
    thumb:{
     height: moderateScale(24),
     width: moderateScale(24),
     borderRadius: moderateScale(40),
     borderWidth: moderateScale(1),
     backgroundColor:colors.white,
     borderColor:COLORS.primaryColor,
     elevation:3
    }
})

export default style