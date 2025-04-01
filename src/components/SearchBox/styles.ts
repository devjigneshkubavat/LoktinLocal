import {FONTS} from '@/constants';
import {COLORS} from '@/constants/colors';
import { Theme } from '@/context/themeContext';
import {horizontalScale, moderateScale, verticalScale} from '@/utils/metrics';
import {StyleSheet} from 'react-native';

export const styles = ({ colors }:Theme) => StyleSheet.create({
  container: {
    borderWidth: moderateScale(1),
    borderColor: COLORS.primaryColor,
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8.5),
    marginVertical: verticalScale(8),
    marginHorizontal: horizontalScale(0),
    flexDirection:'row',
    alignItems:'center'
  },
  input: {
    fontSize: moderateScale(16),
    color: COLORS.fontblackColor,
    fontFamily: FONTS.Lexend_Light,
    padding:0,
    margin:0,
    flex:1
  },
  iconStyle:{
    height:verticalScale(16),
    aspectRatio:1,
    tintColor:colors.black
  },
  outerView:{
    marginRight:horizontalScale(10)
  }
});

export default {styles};
