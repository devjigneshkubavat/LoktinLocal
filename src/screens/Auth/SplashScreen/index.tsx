import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { horizontalScale, verticalScale } from '@/utils/metrics'
import { IMAGES } from '@/constants'
import { STRINGS } from '@/constants/strings'
import Button from '@/components/Button'
import { navigate, navigationRef, replace } from '@/navigation/rootNavigation'
import { NAMES } from '@/navigation/name'
import { useTheme } from '@/hooks/useTheme';
import Styles from './styles'
const SplashScreen = () => {
    const {theme,handleTheme} = useTheme()
    const { colors} = theme
    const { styles } = Styles
    
    const style = useMemo(() => styles(theme), [theme]);

    return (
        <SafeAreaView style={style.safeareaView} >
            <View style={style.container}>
                <View style={style.imageContainer}>
                    <Image style={style.imageView} source={IMAGES.splashLogo} />
                </View>
                <View style={style.middleContainer}>
                    <Text onPress={()=>{navigate(NAMES.onboardingOne)}} style={style.createText}>{STRINGS.create_account}</Text>
                </View>
                <View style={style.btnView}>
                    <Button title={STRINGS.Signin} onPress={() => { navigate(NAMES.signin) }} />
                </View>
                <Text style={style.tocText}>{STRINGS.toc_text}</Text>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen
