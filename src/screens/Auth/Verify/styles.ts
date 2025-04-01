import {FONTS} from '@/constants';
import {COLORS} from '@/constants/colors';
import { Theme } from '@/context/themeContext';
import {horizontalScale, moderateScale, verticalScale} from '@/utils/metrics';
import {StyleSheet} from 'react-native';

export const styles = ({ colors }:Theme) => StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  verifyText: {
    fontFamily: FONTS.Lexend_Bold,
    fontSize: moderateScale(28),
    color: colors.black,
    textAlign: 'center',
    marginTop: verticalScale(50),
  },
  centerView: {
    paddingHorizontal: horizontalScale(27),
  },
  smsText: {
    fontFamily: FONTS.Lexend_Light,
    fontSize: moderateScale(14),
    color: COLORS.lightFont,
    textAlign: 'center',
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
  },
  lowCase: {
    textTransform: 'lowercase',
  },
  otpContainerView: {
    marginVertical: verticalScale(30),
    overflow:'hidden'
  },
  otpTextView: {
    borderBottomWidth: moderateScale(1),
    borderWidth: moderateScale(1),
    borderColor: COLORS.otpInputborder,
    borderRadius: moderateScale(10),
    fontFamily: FONTS.Lexend_Medium,
    color: colors.black,
    fontSize: moderateScale(16),
    height: verticalScale(50),
    width: verticalScale(50),
  },
  bottomView: {
    backgroundColor: COLORS.primaryColor,
    marginVertical: verticalScale(9),
    borderRadius: moderateScale(10),
  },
  btnText: {
    color: colors.white,
  },
  resendText: {
    fontFamily: FONTS.Lexend_Regular,
    fontSize: moderateScale(14),
    color: COLORS.lightFont,
    textAlign: 'center',
    paddingHorizontal: horizontalScale(5),
  },
  errorOTPview: {
    borderColor: 'red',
  },
  resendView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  resendT: {
    fontFamily: FONTS.Lexend_Medium,
    fontSize: moderateScale(14),
    color: colors.fontblackColor,
    textAlign: 'center',
  },
  errorText:{
    fontFamily: FONTS.Lexend_Regular,
    fontSize: moderateScale(14),
    color: 'red',
    textAlign: 'center',
    marginBottom:verticalScale(15)
  }
});

export default {styles};
