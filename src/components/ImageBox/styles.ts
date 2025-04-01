import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    imageView:{
        height:verticalScale(22),
        aspectRatio:1,
        objectFit:'contain'
    },
    imageOuterView:{
        
    }
})