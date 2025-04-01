import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export const styles = ({ colors }: Theme) => StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageView: {
        height: verticalScale(22),
        aspectRatio: 1,
        objectFit: 'contain',
    }
})
export default { styles }