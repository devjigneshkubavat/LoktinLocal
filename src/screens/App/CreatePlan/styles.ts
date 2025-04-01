import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '@/context/themeContext'
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics'
import { FONTS } from '@/constants'

const width = Dimensions.get('window').width;

export const styles = ({ colors }: Theme) =>
    StyleSheet.create({
        progressView: {
            marginTop: verticalScale(8),
            marginBottom: verticalScale(8),
        },
        header: {
            justifyContent: 'space-between',
            height: moderateScale(50)
        },
        iconStyle: {
            flexDirection: 'row',
            gap: moderateScale(8)
        },
        nameStyle: {
            flexGrow: 1,
            width: width - 100,
        },
        iconSize: {
            height: moderateScale(24),
            tintColor: colors.black
        },
        leftsidestyle: {
            flexGrow: 1,
            width: undefined,
        },
        container: {
            backgroundColor: colors.white,
            flex: 1
        },
        inputHeader: {
            height: verticalScale(60),
            color: colors.black,
            fontFamily: FONTS.Lexend_SemiBold,
            fontSize: moderateScale(18),
        }
    })

export default styles;
