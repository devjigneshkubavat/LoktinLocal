import { FONTS } from "@/constants"
import { COLORS } from "@/constants/colors"
import { Theme } from "@/context/themeContext"
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics"
import { StyleSheet } from "react-native"

export const styles = ({ colors }:Theme) => StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        backgroundColor: colors.white,
        flex: 1,
    },
})

export default {styles}