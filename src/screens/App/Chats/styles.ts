import { FONTS } from '@/constants'
import { COLORS } from '@/constants/colors'
import { Theme } from '@/context/themeContext'
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics'
import { StyleSheet } from 'react-native'


export default ({ colors }: Theme) =>
StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
    },
    chatContainer: {
        flex: 1,
        marginHorizontal: horizontalScale(20),
    },
    messageContainer: {
        padding: moderateScale(15),
        borderRadius: moderateScale(10),
        maxWidth: '75%',

    },
    myMessage: {
        alignSelf: 'flex-end',
    },
    otherMessage: {
        alignSelf: 'flex-start',
    },
    messageText: {
        fontFamily: FONTS.Lexend_Light,
        fontSize: moderateScale(14)
    },
    timestamp: {
        fontSize: moderateScale(10),
        color: COLORS.lightFont,
        marginTop: verticalScale(5),
        alignSelf: 'flex-start',
        marginBottom: verticalScale(10)
    },
    stickyHeader: {
        backgroundColor: colors.headerBorder,
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(15),
        alignSelf: 'center',
        marginHorizontal: horizontalScale(10),
        marginVertical: verticalScale(15),
        borderRadius: 10
    },
    dateHeader: {
        textAlign: 'center',
        fontSize: moderateScale(10),
        color: colors.black,
        fontFamily: FONTS.Lexend_Light
    },
    audioMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical:verticalScale(10)
    },
    input: {
        // backgroundColor: colors.headerBorder,
        flex:1,
        // height: verticalScale(50),
        // paddingRight: horizontalScale(15),
        fontSize: moderateScale(12),
        fontFamily: FONTS.Lexend_Light,
        color: colors.fontblackColor,
        // marginRight: horizontalScale(10),
    },
    iconSize: {
        height: verticalScale(22),
        tintColor: colors.white
    },
    send: {
        backgroundColor: COLORS.primaryColor,
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    camera: {
        // backgroundColor: colors.headerBorder,
        height: verticalScale(22),
        aspectRatio:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:horizontalScale(3.5)
    },
    rowView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        height: verticalScale(50),
        borderRadius:moderateScale(10),
        backgroundColor: colors.headerBorder,
        paddingHorizontal:horizontalScale(16),
        marginRight:horizontalScale(10)
    }
})