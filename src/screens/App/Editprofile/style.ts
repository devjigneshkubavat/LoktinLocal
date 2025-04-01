import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";



export const style = ({ colors }: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        borderBottomWidth: moderateScale(1),
        borderColor: colors.headerBorder,
        paddingBottom: verticalScale(20)
    },
    touchview: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: "center"
    },
    touch: {
        width: '50%',
        paddingVertical: verticalScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: moderateScale(2),
        borderColor: colors.white
    },
    touchon: {
        borderColor: COLORS.primaryColor
    },
    touchtext: {
        fontSize: moderateScale(16),
        color: colors.black,
        fontFamily: FONTS.Lexend_Medium,

    },
    texton: {
        color: COLORS.primaryColor
    },
    imageContainer: {
        alignItems: 'center',
        paddingVertical: verticalScale(18)
    },
    imageview: {
        alignItems: "center",
        height: moderateScale(100),
        width: moderateScale(100),
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(70),
        resizeMode: 'cover',
    },
    addimageview: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: moderateScale(30),
        height: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryColor,
        borderRadius: moderateScale(70),
        borderWidth: moderateScale(1),
        borderColor: colors.white,
        overflow: "hidden",

    },
    addimage: {
        height: moderateScale(24),
        width: moderateScale(24),
        tintColor: colors.white
    },
    aboutme: {
        width: '100%',
        fontSize: moderateScale(14),
        fontFamily: FONTS.Lexend_SemiBold,
        color: colors.black,
        paddingHorizontal: horizontalScale(8)
    },
    scrool: {
        marginTop: verticalScale(18),
        paddingTop: verticalScale(5),
        paddingHorizontal: horizontalScale(8),

    },
    viewcontainer: {
        gap: 10,
        flexDirection: "row",
    },
    labelstyle: {
        width: '25%',
        marginBottom: verticalScale(15),
        paddingBottom: verticalScale(8)
    },
    labeltxt: {
        fontSize: moderateScale(17),
        fontFamily: FONTS.Lexend_Light,
        color: colors.black
    },
    selectview: {
        flexGrow: 1,
        borderBottomWidth: moderateScale(1),
        borderColor: colors.headerBorder,
        marginBottom: verticalScale(15),
        paddingBottom: verticalScale(8),
        alignItems: "center",
        justifyContent: 'flex-end',
        flexDirection: 'row',
        gap: 10,

    },
    rightimage: {
        height: moderateScale(15),
        width: moderateScale(15),
        tintColor: colors.black,
        resizeMode: 'contain',
        right: -horizontalScale(2),
        top: verticalScale(1),
    },
    textinput: {
        borderBottomWidth: moderateScale(1),
        borderColor: colors.headerBorder,
        width: "75%",
        marginBottom: verticalScale(15),
        paddingBottom: verticalScale(8),
        fontSize: moderateScale(17),
        padding: 0,
        color: colors.black
    }

})

export default style;