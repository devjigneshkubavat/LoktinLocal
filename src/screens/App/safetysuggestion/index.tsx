import BoxComponent from '@/hoc/OuterView'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import styles from './styles'
import Header from '@/components/Header'
import { ICONS } from '@/constants'
import { goBack } from '@/navigation/rootNavigation'

const SafetySuggestion = () => {
    const { theme } = useTheme()
    const styless = useMemo(() => styles(theme), [theme])

    const data = [
        {
            title: 'Stay Safe from Scams',
            description: 'Common tactics scammers use and how to spot them.',
            icon: ICONS.staysafe
        },
        {
            title: 'Online Security',
            description: 'What to share and what to keep private.',
            icon: ICONS.onlinesecurity
        },
        {
            title: 'Emergency Button',
            description: 'How to use the emergency button.',
            icon: ICONS.emergencybutton
        },
        {
            title: 'Safety Checkpoints',
            description: 'How do safety checkpoints work?',
            icon: ICONS.safety
        },
        {
            title: 'First Impressions',
            description: 'Recognizing red flags and setting boundaries.',
            icon: ICONS.firstipression
        },
        {
            title: 'Quick Safety Reminders',
            description: 'Easy-to-follow tips for staying alert and prepared.',
            icon: ICONS.quicksafety
        }
    ]

    return (
        <View style={styless.container}>
            <Header
                leftIcon={true}
                centerText='Safety Suggestion'
                viewstyle={styless.header}
                leftView={{
                    onPress: () => {
                        goBack()
                    },
                    icon: ICONS.left_arrow
                }}
            />
            <View style={styless.subcontainer}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    // horizontal
                    renderItem={({ item, index }) => (
                        <View style={styless.contentview}>
                            <View style={styless.Imageview}>
                                <Image
                                    source={item.icon}
                                    style={styless.image}
                                />
                            </View>

                            <View style={styless.textview}>
                                <Text style={styless.title}>{item.title}</Text>
                                <Text style={styless.detail}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    )}
                    removeClippedSubviews={false}
                />
            </View>
        </View>
    )
}

export default BoxComponent(SafetySuggestion)
