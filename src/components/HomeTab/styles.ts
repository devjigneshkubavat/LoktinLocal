import { FONTS } from '@/constants';
import { COLORS } from '@/constants/colors';
import { Theme } from '@/context/themeContext';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';
import { StyleSheet } from 'react-native';

export const styles = ({ colors }:Theme) => StyleSheet.create({
    container: {
        width: '50%',
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: verticalScale(10),
        marginHorizontal: horizontalScale(10),
      },
      tabText: {
        fontSize: moderateScale(16),
        fontFamily: FONTS.Lexend_Medium,
        color: colors.black,
        textAlign: "center",
      },
      activeTab: {
        color: COLORS.primaryColor, // Light brown color for active tab
      },
      tabView: {
       paddingBottom: verticalScale(10),
       paddingHorizontal: horizontalScale(5),
       borderBottomWidth: 1,
       borderBottomColor: colors.white,
      },
      activeTabLine: {
        borderBottomColor:COLORS.primaryColor
      }
});

export default {styles};
