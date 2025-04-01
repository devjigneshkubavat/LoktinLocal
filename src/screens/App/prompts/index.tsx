import BoxComponent from '@/hoc/OuterView'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo, useState } from 'react'
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import style from './style'
import Header from '@/components/Header'
import { goBack, navigation } from '@/navigation/rootNavigation'
import { ICONS } from '@/constants'
import { horizontalScale, verticalScale } from '@/utils/metrics'
import { COLORS } from '@/constants/colors'
import { NAMES } from '@/navigation/name'

const Prompt = () => {
    const { theme } = useTheme()
    const styless = useMemo(() => style(theme), [theme])
    const [Active, Setactive] = useState('About Me')

    const promptsList1 = [
        { id: 1, question: "What's a nickname only your family uses?" },
        { id: 2, question: "What's the first thing you'd grab in a fire?" },
        {
            id: 3,
            question:
                'If you could live anywhere for a year, where would it be?'
        },
        {
            id: 4,
            question: "What's a song that feels like it was written for you?"
        },
        {
            id: 5,
            question: 'If your personality were a color, what would it be?'
        },
        {
            id: 6,
            question:
                'If you could master one skill instantly, what would it be?'
        },
        {
            id: 7,
            question:
                "What's one word your closest friend would use to describe you?"
        },
        { id: 8, question: "What's the name of your first pet?" },
        { id: 9, question: "What's your favorite season?" }
    ]

    const promptsList2 = [
        {
            id: 1,
            question:
                'How much sawdust can you put into a Rice Krispie Treat before people start to notice?'
        },
        {
            id: 2,
            question:
                'On an average day, how many pigeons do you think you could reasonably carry?'
        },
        {
            id: 3,
            question:
                'If all animals were the same size, which one would win in a fight?'
        },
        { id: 4, question: 'If you were a pizza topping, what would you be?' },
        {
            id: 5,
            question:
                'If you could bankrupt any person, company, country, or organization, who would it be?'
        },
        {
            id: 6,
            question:
                'You just became a member of the Spice Girls. What is your Spice name?'
        },
        {
            id: 7,
            question:
                "What's the largest mammal you think you could knock out with a single punch?"
        },
        {
            id: 8,
            question:
                'Gordon Ramsay critiques your life like a dish—what’s his one-word review?'
        }
    ]

    return (
        <View style={styless.container}>
            <Header
                leftIcon={true}
                leftView={{
                    onPress: () => goBack(),
                    icon: ICONS.left_arrow
                }}
                viewstyle={styless.header}
                centerText='Prompts'
            />
            <View
                style={{
                    marginTop: horizontalScale(15),
                    marginHorizontal: horizontalScale(5),
                    marginBottom: verticalScale(8)
                }}
            >
                <FlatList
                    horizontal
                    data={['About Me', 'Lighthearted', 'Custom']}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styless.mapview,
                                {
                                    backgroundColor:
                                        Active === item
                                            ? COLORS.primaryColor
                                            : theme.colors.white
                                }
                            ]}
                            onPress={() => Setactive(item)}
                        >
                            <Text
                                style={[
                                    styless.maptxt,
                                    {
                                        color:
                                            Active === item
                                                ? theme.colors.white
                                                : theme.colors.black
                                    }
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    removeClippedSubviews={false}
                />
            </View>
            <ScrollView>
                {Active === 'About Me' &&
                    promptsList1.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styless.touch}
                            onPress={() =>
                                navigation.navigate(NAMES.setsafeword,{item:item.question})
                            }
                        >
                            <Text style={styless.txt}>{item.question}</Text>
                        </TouchableOpacity>
                    ))}
                {Active === 'Lighthearted' &&
                    promptsList2.map((item, index) => (
                        <TouchableOpacity key={index} style={styless.touch}  onPress={() =>
                            navigation.navigate(NAMES.setsafeword,{item:item.question})
                        }>
                            <Text style={styless.txt}>{item.question}</Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    )
}

export default BoxComponent(Prompt)
