import BoxComponent from '@/hoc/OuterView'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import style from './style'
import Header from '@/components/Header'
import { ICONS } from '@/constants'
import { goBack } from '@/navigation/rootNavigation'

const Checkins = () => {
    const { theme } = useTheme()
    const styless = useMemo(() => style(theme), [theme])
    const [Minute, Setminute] = useState('Every 15 Minutes')

    return (
        <View style={styless.container}>
            <Header
                leftIcon={true}
                centerText='Check ins'
                viewstyle={styless.header}
                leftView={{
                    onPress: () => {
                        goBack()
                    },
                    icon: ICONS.left_arrow
                }}
            />
            {[
                'Every 15 Minutes',
                'Every 20 Minutes',
                'Every 45 Minutes',
                'Every Hour'
            ].map((item, index) => (
                <TouchableOpacity
                    style={styless.list}
                    key={index}
                    onPress={() => Setminute(item)}
                >
                    <Text style={styless.text}>{item}</Text>
                    {Minute === item && (
                        <Image
                            source={ICONS.checksIcon}
                            style={styless.image}
                        />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default BoxComponent(Checkins)
