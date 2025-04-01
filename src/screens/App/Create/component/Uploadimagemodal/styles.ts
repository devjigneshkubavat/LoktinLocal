import { StyleSheet } from 'react-native'
import { Theme } from '@/context/themeContext'
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics'
import { FONTS } from '@/constants'
import { COLORS } from '@/constants/colors'

export const styles = ({colors} : Theme) => 
    StyleSheet.create({
        modalContainer:{
            backgroundColor:'rgba(69, 63, 63, 0.5)',
            flex:1,
            justifyContent:"flex-end"
        },
        absolute: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          },
        grid:{
            backgroundColor:colors.white,
            borderTopLeftRadius:moderateScale(8),
            borderTopRightRadius:moderateScale(8),
        },
        iconview:{
            paddingVertical:verticalScale(10),
            paddingHorizontal:horizontalScale(13),
            borderTopLeftRadius:moderateScale(8),
            borderTopRightRadius:moderateScale(8),
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            borderBottomWidth:moderateScale(2),
            borderColor:colors.headerBorder
        },
        outerstyle:{
            justifyContent:'flex-start',
            alignItems:"flex-start",
        },
        iconstyle:{
            height:moderateScale(13),
            width:moderateScale(13),
            tintColor:COLORS.primaryColor
        },
        uploadphototxt:{
            fontFamily:FONTS.Lexend_Light,
            fontSize:moderateScale(15),
            color:colors.black,
        },
        choiceview:{
            // backgroundColor:'red',
            paddingVertical:verticalScale(25),
            flexDirection:'row',
            justifyContent:'space-around',
            paddingHorizontal:horizontalScale(60)
        },
        cameraimg:{
            height:moderateScale(45),
            width:moderateScale(45),
            tintColor:COLORS.primaryColor
        },
        imgview:{
            alignItems:"center",
            gap:1,
            justifyContent:"center"
        },
        camreratxt:{
            fontFamily:FONTS.Lexend_Light,
            fontSize:moderateScale(13),
            color:colors.black,
        }
    })


export default styles;