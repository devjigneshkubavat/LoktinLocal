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
  headerstyle: {
    borderBottomWidth: moderateScale(2),
    borderColor: COLORS.lightBg,
    paddingBottom: verticalScale(22),
  },
  progressView: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(8),
  },
  centerView: {
    paddingTop: verticalScale(15),
    flex: 1,
    paddingHorizontal: horizontalScale(20),
  },
  introText: {
    fontFamily: FONTS.Lexend_SemiBold,
    fontSize: moderateScale(24),
    color: colors.fontblackColor,
    paddingVertical: verticalScale(5),
    lineHeight: moderateScale(32),
  },
  subText: {
    fontFamily: FONTS.Lexend_Light,
    fontSize: moderateScale(14),
    color: COLORS.lightFont,
    paddingVertical: verticalScale(5),
    textAlign: 'left',
    lineHeight: moderateScale(19),
  },
  bottomView: {
    backgroundColor: COLORS.primaryColor,
    marginVertical: verticalScale(9),
  },
  btnText: {
    color: colors.white,
  },
  imageOuterView: {
    marginBottom: verticalScale(20),
    justifyContent:'center',
    alignItems:'center',
    padding:moderateScale(1)
  },
  imagePlaceView:{
    height:verticalScale(103),
    aspectRatio:1,
    objectFit:'contain',
    tintColor:COLORS.primaryColor
  },
  imageView:{
    height:verticalScale(103),
    aspectRatio:1,
    objectFit:'cover',
    borderRadius:verticalScale(103)
  },
  flatlistWrapper:{
    gap: horizontalScale(24)
  },
  flatlistView:{
    alignItems:'center',
    marginVertical:verticalScale(15)
  }
});

export default {styles};
