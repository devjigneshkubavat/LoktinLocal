import {FONTS} from '@/constants';
import {COLORS} from '@/constants/colors';
import {Theme} from '@/context/themeContext';
import {horizontalScale, moderateScale, verticalScale} from '@/utils/metrics';
import {StyleSheet} from 'react-native';

export const styles = ({colors}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    progressView: {
      marginTop: verticalScale(8),
      marginBottom: verticalScale(8),
    },
    introText: {
      fontFamily: FONTS.Lexend_SemiBold,
      fontSize: moderateScale(24),
      color: colors.fontblackColor,
      paddingHorizontal: horizontalScale(20),
      paddingVertical: verticalScale(8),
      lineHeight: moderateScale(32),
    },
    bottomView: {
      backgroundColor: COLORS.primaryColor,
      marginVertical: verticalScale(9),
    },
    btnText: {
      color: colors.white,
    },
  });
export default {
  styles,
};
