import React, { useMemo } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from "./styles";
import { useTheme } from "@/hooks/useTheme";
import Icon from '@/components/Icon';
import { ICONS } from '@/constants';

interface Event {
    id: string;
    title: string;
    location: string;
    dateTime: string;
    image: string;
    imageUri2: string;
}

const EventList = () => {
    const { theme } = useTheme();
    const style = useMemo(() => styles(theme), [theme]);


    const eventData: Event[] = [
        {
            id: '1',
            title: 'Joker movie',
            location: 'AMC Downtown',
            dateTime: 'Friday, Oct 20, 02:45 PM',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            imageUri2: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
        {
            id: '2',
            title: 'The Weeknd',
            location: 'AMC Downtown',
            dateTime: 'Friday, Oct 20, 02:45 PM',
            image: 'https://randomuser.me/api/portraits/men/3.jpg',
            imageUri2: 'https://randomuser.me/api/portraits/men/4.jpg',
        }
    ]

    return (
        <View style={style.eventContainer}>
            {eventData.map((item, index) => (
                <View key={'event_' + index} style={style.postItem}>
                    <View style={style.postImageContainer}>
                        <Image source={{ uri: item.image }} style={style.postImage} />
                        <Image source={{ uri: item.imageUri2 }} style={style.postImage} />
                    </View>
                    <View style={style.postContent}>
                        <Text style={style.postTitle}>{item.title}</Text>
                        <View style={style.postInfo}>
                            <View style={style.postInfoItem}>
                                <Icon icon={ICONS.location} iconStyle={style.iconSize} />
                                <Text style={style.postInfoText}>{item.location}</Text>
                            </View>
                            <View style={style.postInfoItem}>
                                <Icon icon={ICONS.circleClock} iconStyle={style.iconSize} />
                                <Text style={style.postInfoText}>{item.dateTime}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={style.starButton}>
                        {/* <Icon icon={ICONS.starOutline} iconStyle={style.starIconSize} /> */}
                        <Icon icon={ICONS.star} iconStyle={style.starIconSize} />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}

export default EventList