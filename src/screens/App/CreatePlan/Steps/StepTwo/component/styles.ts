import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '@/context/themeContext'
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics'
import { FONTS } from '@/constants'

const screenWidth = Dimensions.get("window").width;
const columnGap = 8;
const numColumns = 3;
const totalSpacing = columnGap * (numColumns - 1);
const columnWidth = (screenWidth - totalSpacing - 32) / numColumns; // 16px horizontal padding on both sides

export const styles = ({ colors }: Theme) => StyleSheet.create({
  container: {
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(40),
  },
  title: {
    color: colors.black,
    fontFamily: FONTS.Lexend_SemiBold,
    fontSize: moderateScale(24),
  },
  subtitle: {
    color: colors.black,
    fontFamily: FONTS.Lexend_Light,
    fontSize: moderateScale(11),
    paddingBottom: verticalScale(20),
  },
  grid: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: columnGap,
  },
  column: {
    width: columnWidth,
  },
  imageBox: {
    width: "100%",
    borderRadius: moderateScale(15),
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    marginBottom: columnGap,
  },
  image: {
    width: "100%",
    height: "100%",
  },
})
