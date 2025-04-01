import BoxComponent from '@/hoc/OuterView'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import style from './style'
import Header from '@/components/Header'
import { goBack, navigation } from '@/navigation/rootNavigation'
import { ICONS } from '@/constants'
import { NAMES } from '@/navigation/name'

const Safeword = () => {
    const { theme } = useTheme()
    const styless = useMemo(() => style(theme), [theme])
    const [Toggle, Settoggle] = useState(false)

    return (
        <View style={styless.container}>
            <Header
                leftIcon={true}
                leftView={{
                    onPress: () => goBack(),
                    icon: ICONS.left_arrow
                }}
                centerText='Safe Word'
                viewstyle={styless.header}
            />
            <Text style={styless.text}>Enter your safe word</Text>
            <View style={styless.textinputview}>
                <TextInput
                    style={styless.textinput}
                    secureTextEntry={Toggle}
                    // multiline={true}
                    placeholder='Enter safe word'
                    placeholderTextColor={'grey'}
                />
                <TouchableOpacity onPress={() => Settoggle(!Toggle)}>
                    <Image
                        source={Toggle ? ICONS.eyeoff : ICONS.eye}
                        style={styless.img}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styless.button}
                onPress={() => navigation.navigate(NAMES.prompt)}
            >
                <Text style={styless.btntxt}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BoxComponent(Safeword)
