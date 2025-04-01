import { COLORS } from "@/constants/colors"
import { Theme } from "@/context/themeContext"
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics"
import { StyleSheet } from "react-native"


export const styles = ({ colors }: Theme) => StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    header: {
      borderBottomWidth: moderateScale(1),
      borderColor: colors.headerBorder,
      paddingBottom: verticalScale(20)
  },
    iconStyle: {
        flexDirection: 'row',
        gap: moderateScale(8)
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: verticalScale(10),
        marginBottom: verticalScale(10),
        marginHorizontal: horizontalScale(10),
        borderBottomWidth: 1,
            borderBottomColor: colors.headerBorder
      },
    optionText: {
        fontSize: moderateScale(16),
        color: colors.black,
      },
      checkIcon:{
        width: moderateScale(18),
        height: moderateScale(18),
        tintColor: COLORS.primaryColor,
        
      },
      arrowIcon:{
        width: moderateScale(20),
        height: moderateScale(15),
        tintColor: colors.black,
        resizeMode: "contain"
      },
      arrowView:{
        flexDirection: 'row',
        alignItems: 'center'
      }
})


export default styles
