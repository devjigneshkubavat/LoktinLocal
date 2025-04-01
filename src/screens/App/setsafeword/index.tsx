import { useTheme } from '@/hooks/useTheme'
import React, { useMemo } from 'react'
import { Text, TextInput, View } from 'react-native'
import style from './style'
import BoxComponent from '@/hoc/OuterView'
import { useRoute } from '@react-navigation/native'
import Header from '@/components/Header'
import { goBack } from '@/navigation/rootNavigation'
import { ICONS } from '@/constants'
import Button from '@/components/Button'

const SetSafeword = () => {
    const route = useRoute()

    const { theme } = useTheme()
    const styless = useMemo(() => style(theme), [theme])

    return (
        <View style={styless.container}>
            <Header
                leftIcon={true}
                viewstyle={styless.header}
                leftView={{
                    onPress: () => goBack(),
                    icon: ICONS.left_arrow
                }}
                centerText='Change Safe Word'
            />
            <View style={styless.form}>
                <Text style={styless.txt}>{route.params.item}</Text>
                <TextInput
                    placeholder={'Enter your new safe word.'}
                    multiline={true}
                    style={styless.textinput}
                />
            </View>

            <Button
                title='Set Safe Word'
                viewstyle={styless.bottomView}
                textStyle={styless.btnText}
                onPress={goBack}
            />
            <Button
                title='Edit Prompt'
                onPress={goBack}
            />
        </View>
    )
}

export default BoxComponent(SetSafeword)
