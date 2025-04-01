import { useTheme } from '@/hooks/useTheme'
import React, { useMemo, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import style from './styles'
import Header from '@/components/Header'
import CustomTextInput from '@/components/TextInput'
import BoxComponent from '@/hoc/OuterView'
import { goBack } from '@/navigation/rootNavigation'
import { ICONS } from '@/constants'

const TrustContact = () => {
    const { theme } = useTheme()
    const styless = useMemo(() => style(theme), [theme])
    const [Number, Setnumber] = useState('')
    return (
        <>
            <Header
                leftIcon={true}
                centerText='Trusted Contact'
                viewstyle={styless.header}
                leftView={{
                    onPress: () => {
                        goBack()
                    },
                    icon: ICONS.left_arrow
                }}
            />
            <View style={styless.container}>
                <Text style={styless.text}>Phone</Text>
            </View>
            <View style={styless.flexview}>
                <CustomTextInput
                    style={styless.textinput}
                    placeholder={`Enter a trusted contact's number`}
                    label={'Phone'}
                    value={Number}
                    onChangeText={v => Setnumber(v)}
                    keyboardType='numeric'
                    maxLength={10}
                />
                <TouchableOpacity style={styless.touch}>
                    <Text style={styless.touchtext}>Complete</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default BoxComponent(TrustContact)
