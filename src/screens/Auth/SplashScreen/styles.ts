import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export const styles = ({ colors }:Theme) => StyleSheet.create({
    safeareaView: {
        flex: 1,
        backgroundColor: COLORS.primaryColor,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryColor
    },
    imageContainer: {
        marginTop: verticalScale(78),
        paddingHorizontal: horizontalScale(37),
    },
    imageView: {
        height: verticalScale(409),
        width: horizontalScale(300),
        objectFit: 'contain'
    },
    createText: {
        fontSize: moderateScale(16),
        color: colors.white,
        fontFamily: FONTS.Lexend_Medium
    },
    middleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: verticalScale(60),
        paddingBottom: verticalScale(17)
    },
    btnView:{
        marginRight:horizontalScale(4)
    },
    tocText:{
        fontSize:moderateScale(14),
        fontFamily:FONTS.Lexend_Light,
        color:colors.white,
        textAlign:'center',
        paddingHorizontal:horizontalScale(10),
        lineHeight:moderateScale(19),
        paddingVertical:verticalScale(17)
    }
})

const Styles = {
    styles
};
export default Styles