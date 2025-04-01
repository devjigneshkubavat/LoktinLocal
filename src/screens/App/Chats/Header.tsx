import Icon from '@/components/Icon'
import { ICONS } from '@/constants'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FONTS } from '@/constants'
import { COLORS } from '@/constants/colors'
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics'
import { useTheme } from '@/hooks/useTheme'
import { goBack } from '@/navigation/rootNavigation'

const Header: React.FC = () => {
    const { theme } = useTheme()

    return (
        <View style={[styles.headerView]}>
            <View style={[styles.leftView]}>
                <Icon
                    icon={ICONS.left_arrow}
                    onPress={() => goBack()}
                    iconStyle={{ tintColor: theme.colors.black }}
                />
            </View>
            <View style={styles.centerView}>
                <Image
                    style={styles.userImage}
                    source={require('@/assets/image/demoPost.jpeg')}
                />
                <View>
                    <Text
                        style={[
                            styles.centerText,
                            { color: theme.colors.black }
                        ]}
                    >
                        {'Marvin McKinney'}
                    </Text>
                    <Text
                        style={[
                            styles.centerText,
                            {
                                color: COLORS.primaryColor,
                                fontSize: moderateScale(12)
                            }
                        ]}
                    >
                        {'online now'}
                    </Text>
                </View>
            </View>
            <View style={styles.rightView}>
                <View style={styles.iconView}>
                    <TouchableOpacity>
                        <Image style={styles.icons} source={ICONS.phone} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={styles.icons} source={ICONS.more} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: horizontalScale(20),
        paddingVertical: verticalScale(16)
        // backgroundColor: colors.white
    },
    leftView: {
        alignItems: 'flex-start',
        width: horizontalScale(35)
    },
    centerView: {
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },

    centerText: {
        fontFamily: FONTS.Lexend_Light,
        fontSize: moderateScale(14),
        // color: colors.fontblackColor,
        paddingBottom: verticalScale(2.5)
    },

    rightView: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: horizontalScale(50)
    },

    iconView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icons: {
        marginLeft: horizontalScale(10),
        width: moderateScale(25),
        height: moderateScale(25),
        tintColor: 'black'
    },
    userImage: {
        height: moderateScale(35),
        width: moderateScale(35),
        borderRadius: moderateScale(40),
        marginRight: horizontalScale(10),
        backgroundColor: 'red'
    }
})
