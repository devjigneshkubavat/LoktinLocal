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
        paddingBottom: verticalScale(20),
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: horizontalScale(15),
    },
    mapconatiner: {
        flexDirection: 'row',
    },
    imageview: {
        width: '13%',
        marginVertical: verticalScale(10),
    },
    img: {
        height: moderateScale(30),
        width: moderateScale(30)
    },
    msg: {
        fontFamily: FONTS.Lexend_Medium,
        fontSize: moderateScale(14),
        color: colors.black,
    },
    day: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Lexend_Light,
        color: COLORS.emergency,
        marginTop: verticalScale(3)
    },
    dayview: {
        width: '20%',
        alignItems: "flex-end",
        marginVertical: verticalScale(10),
    },
    Nodataimg: {
        height: moderateScale(80),
        width: moderateScale(80),
    },
    Nodata: {
        fontFamily: FONTS.Lexend_Medium,
        fontSize: moderateScale(16),
        color: colors.black,
        marginTop: verticalScale(35)
    },
    Nomsg: {
        fontSize: moderateScale(16),
        fontFamily: FONTS.Lexend_Light,
        color: 'rgba(121, 121, 121, 1)',
        marginTop: verticalScale(10),
        width: '80%',
        textAlign: "center"
    }

})

export default style