import { FONTS } from '@/constants'
import { COLORS } from '@/constants/colors'
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

interface FeatureCardProps {
    icon: any
    title: string
    theme: any
    id: String,
    handleFeaturePress: (id: String) => void
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    theme,
    id,
    handleFeaturePress
}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => handleFeaturePress(id)}>
            <Image
                style={styles.icon}
                source={icon}
                tintColor={theme.colors.black}
            />
            <Text style={[styles.text, { color: theme.colors.black }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default FeatureCard

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primaryColor,
        borderRadius: moderateScale(10),
        paddingHorizontal: horizontalScale(15),
        paddingVertical: verticalScale(15),
        marginVertical: verticalScale(5),
        marginHorizontal: horizontalScale(12)
    },
    icon: {
        width: horizontalScale(30),
        height: horizontalScale(30),
        resizeMode: 'contain',
        marginRight: horizontalScale(10)
    },
    text: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Lexend_Medium
    }
})
