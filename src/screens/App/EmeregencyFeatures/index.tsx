import { useTheme } from '@/hooks/useTheme'
import React, { useMemo } from 'react'
import {
    Image,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { styles } from './styles'
import Header from '@/components/Header'
import { COLORS } from '@/constants/colors'
import { ICONS } from '@/constants'
import { goBack, navigation } from '@/navigation/rootNavigation'
import { NAMES } from '@/navigation/name'
import BoxComponent from '@/hoc/OuterView'

const EmeregencyFeatures = () => {
    const { theme } = useTheme()
    const styless = useMemo(() => styles(theme), [theme])

    interface Emergency {
        key: string
        title: string
        value: string | boolean
        type: 'navigation' | 'switch'
        arrow?: boolean
        blur?: boolean
        description?: string
        onPress?: () => void
    }

    const emeregency: Emergency[] = [
        {
            key: 'trustcontact',
            title: 'Trusted Contect',
            value: '9067456784',
            arrow: true,
            type: 'navigation',
            blur: true,
            onPress: () => navigation.navigate(NAMES.trustcontact)
        },
        {
            key: 'emergencybutton',
            title: 'EmergencyButton',
            value: true,
            type: 'switch',
            description:
                'Loktin prioritizes your safety. By activating this slider, you’ll instantly access the Emergency Button, allowing you to quickly alert a trusted  contact in an emergency. It’s discreet, fast, and designed to give you peace of mind, always. '
        },
        {
            key: 'shareyourlocation',
            title: 'Share Your Location',
            value: true,
            type: 'switch',
            description:
                'This feature lets you securely share your location with a trusted friend, giving them peace of mind and keeping you connected.'
        },
        {
            key: 'safetycheckpoints',
            title: 'Safety Checkpoints',
            value: true,
            type: 'switch',
            description:
                'Safety Checkpoints help keep you secure during meetups. Choose a question and set your answer, then decide how often to check in. If you don’t respond correctly or within an hour, your emergency contact will be notified with your last location. Stay safe and in control.'
        },
        {
            key: 'receivecheckins',
            title: 'Receive Check ins',
            value: 'Every Hour',
            arrow: true,
            type: 'navigation',
            onPress: () => navigation.navigate(NAMES.checkins)
        },
        {
            key: 'safeword',
            title: 'Safe Word',
            value: 'true',
            arrow: true,
            type: 'navigation',
            blur: true,
            onPress: () => navigation.navigate(NAMES.safeword)
        }
    ]

    return (
        <>
            <Header
                leftIcon={true}
                centerText='Check in and Emergency Features'
                viewstyle={styless.header}
                leftView={{
                    onPress: () => {
                        goBack()
                    },
                    icon:ICONS.left_arrow
                }}
            />
            <View style={styless.container}>
                {emeregency.map((item, index) => (
                    <View key={index} style={styless.itemview}>
                        <TouchableOpacity
                            style={styless.setitem}
                            disabled={item.type != 'navigation'}
                            onPress={item.onPress}
                        >
                            <Text style={styless.titletext}>{item.title}</Text>
                            {item.type === 'switch' ? (
                                <Switch
                                    value={Boolean(item.value)}
                                    thumbColor={COLORS.white}
                                    trackColor={{ true: COLORS.primaryColor }}
                                    onValueChange={() => console.log('call')}
                                />
                            ) : (
                                <View
                                    style={{
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <View
                                    // style={{
                                    //     position: 'relative',
                                    //     overflow: 'hidden'
                                    // }}
                                    >
                                        {/* <BlurView
                                            blurType='light'
                                            style={styless.absoult}
                                            blurAmount={1}
                                        /> */}
                                        <Text style={styless.valuetext}>
                                            {item.value}
                                        </Text>
                                    </View>
                                    {item.arrow && (
                                        <Image
                                            source={ICONS.rightArrow}
                                            style={styless.rightimage}
                                        />
                                    )}
                                </View>
                            )}
                        </TouchableOpacity>
                        {item.description && (
                            <Text style={styless.descriptiontext}>
                                {item.description}
                            </Text>
                        )}
                    </View>
                ))}
            </View>
        </>
    )
}

export default BoxComponent(EmeregencyFeatures)
