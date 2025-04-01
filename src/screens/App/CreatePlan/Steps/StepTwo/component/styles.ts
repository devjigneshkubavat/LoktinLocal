import { StyleSheet } from 'react-native'
import { Theme } from '@/context/themeContext'
import { moderateScale } from '@/utils/metrics'
import { FONTS } from '@/constants'

export const styles = ({ colors }: Theme) => StyleSheet.create({
    boxContainer: {
        flex: 1,
        padding: 5,
    },
    image: {
        width: moderateScale(100),
        height: moderateScale(100),
    },
    box: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
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
        paddingBottom: 20
    },
})

export default styles;
