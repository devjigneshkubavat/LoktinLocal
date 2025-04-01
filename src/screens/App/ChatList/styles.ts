import { FONTS } from '@/constants'
import { COLORS } from '@/constants/colors'
import { Theme } from '@/context/themeContext'
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics'
import { StyleSheet } from 'react-native'



export default ({ colors }: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.white,
        },
        imageContainer:{
            justifyContent: 'center',
            alignItems: 'center',
            height: moderateScale(65),
            width: moderateScale(65),
            borderRadius: moderateScale(65),
            borderWidth:2,
            borderColor: COLORS.primaryColor,
            padding: moderateScale(5),
            overflow: 'hidden',
        
        },
        image:{
            height: moderateScale(58),
            width: moderateScale(58),
            borderRadius: moderateScale(58),
            resizeMode: 'contain',
        },
        listView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: horizontalScale(15),
            paddingVertical: verticalScale(10),
            marginTop: verticalScale(10),
            paddingHorizontal:horizontalScale(5),
        },
        nameText:{
            fontSize: moderateScale(14),
            color: colors.black,
            fontFamily: FONTS.Lexend_SemiBold
        },
        timeText :{
            fontSize: moderateScale(12),
            color: COLORS.black,
           fontFamily: FONTS.Lexend_Medium
        },
        badge:{
            marginTop: verticalScale(10),
            height: moderateScale(20),
            width: moderateScale(20),
            backgroundColor: COLORS.primaryColor,
            borderRadius: moderateScale(120 ),
            justifyContent: 'center',
            alignItems: 'center',
        },
        badgeText:   {
            fontSize: moderateScale(12),
            color: COLORS.white,
           fontFamily: FONTS.Lexend_Medium
        },
        detailsView: { flex: 1,     marginHorizontal: horizontalScale(10), },
        detailsText:{
            lineHeight: verticalScale(20),
            fontSize: moderateScale(14),
            color: colors.fontGrayColor
        }
    })