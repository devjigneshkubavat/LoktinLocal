import { FONTS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { Theme } from "@/context/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const style = ({ colors }: Theme) => StyleSheet.create({
    header: {
        borderBottomWidth: horizontalScale(1),
        borderColor: colors.headerBorder,
        paddingBottom: verticalScale(22)
    },
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: moderateScale(1),
        borderBottomColor: COLORS.lightBg,
        paddingVertical: verticalScale(15),
        paddingHorizontal: horizontalScale(15)
    },
    title: {
        color: colors.black,
        fontFamily: FONTS.Lexend_SemiBold,
        fontSize: moderateScale(14)
    },
    text: {
        color: colors.black,
        fontFamily: FONTS.Lexend_Light,
        fontSize: moderateScale(11)
    },
    itemTitle: {
        color: colors.black,
        fontFamily: FONTS.Lexend_SemiBold,
        fontSize: moderateScale(12)
    },
    rightImage: {
        height: horizontalScale(14),
        tintColor: colors.black,
        resizeMode: 'contain',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.overlay
    },
    modalView: {
        width: width - 50,
        backgroundColor: colors.white,
        borderRadius: moderateScale(10),
        paddingVertical: verticalScale(20),
        gap: moderateScale(20),
    },
    modalTitle: {
        color: colors.black,
        fontFamily: FONTS.Lexend_Medium,
        fontSize: moderateScale(16),
        textAlign: 'center'
    },
    modalHeader: {
        width: '100%',
        borderBottomWidth: moderateScale(1),
        borderBottomColor: COLORS.lightBg,
        paddingBottom: verticalScale(20),
    },
    bottomView: {
        backgroundColor: COLORS.primaryColor,
        marginHorizontal: horizontalScale(50),
        marginVertical: undefined
    },
    btnText: {
        color: colors.white,
    },
    textinput: {
        borderRadius: moderateScale(10),
        borderWidth: moderateScale(1),
        borderColor: COLORS.primaryColor,
        fontSize: moderateScale(16),
        fontFamily: FONTS.Lexend_Light,
        marginHorizontal: horizontalScale(18),
        padding: 20,
        height: horizontalScale(150),
        textAlignVertical: 'top',
        color: colors.black,
    }
})

export default style;