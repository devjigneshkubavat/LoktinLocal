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
    textAlign:'left'
  },
  subText: {
    fontFamily: FONTS.Lexend_Light,
    fontSize: moderateScale(14),
    color: COLORS.lightFont,
    paddingVertical: verticalScale(5),
    textAlign: 'left',
    lineHeight: moderateScale(19),
    marginBottom:verticalScale(8)
  },
  bottomView: {
    backgroundColor: COLORS.primaryColor,
    marginVertical: verticalScale(9),
  },
  btnText: {
    color: colors.white,
  },
  rowView: {
    paddingVertical: verticalScale(10),
  },
  titleText: {
    fontFamily: FONTS.Lexend_Medium,
    fontSize: moderateScale(18),
    color: colors.fontblackColor,
    lineHeight: moderateScale(32),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows tags to wrap onto the next line
    gap: moderateScale(10), // Space between tags
  },
  tag: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(50),
    backgroundColor: colors.white,
    marginRight: horizontalScale(10), // Horizontal spacing
    marginBottom: verticalScale(4), // Vertical spacing
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.lightFont,
  },
  selectedTag: {
    backgroundColor: COLORS.primaryColor,
    borderWidth: 0,
    flexDirection:'row',
    gap:horizontalScale(3)
  },
  tagText: {
    fontSize: moderateScale(14),
    color: colors.fontblackColor,
    fontFamily: FONTS.Lexend_Light,
  },
  selectedTagText: {
    color: colors.white,
    fontFamily: FONTS.Lexend_Medium,
  },
  iconStyle:{
    height:verticalScale(20),
    aspectRatio:1,
    objectFit:'contain',
    tintColor:colors.white
  },
});

export default {styles};
