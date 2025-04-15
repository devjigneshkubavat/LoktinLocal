import { Image, StatusBar, View } from 'react-native'
import React, { useMemo } from 'react'
import { styles } from './styles'
import { useTheme } from '@/hooks/useTheme'
import Icon from '@/components/Icon';
import { ICONS, IMAGES } from '@/constants'
import { NAMES } from '@/navigation/name'
import { navigation } from '@/navigation/rootNavigation';

const CommonMainHeaer: React.FC = () => {
    const { theme, themeType } = useTheme()
    const styless = useMemo(() => styles(theme), [theme])

    return (
        <View style={styless.header}>
            <StatusBar
                backgroundColor={theme.colors.white}
                barStyle={theme.colors.white === '#000000' ? 'light-content' : 'dark-content'}
            />
            <Image style={styless.logoImage} source={IMAGES.logoName} />
            <View style={styless.iconView}>
                <Icon icon={ICONS.send} iconStyle={styless.icons} onPress={() => navigation.navigate(NAMES.chatList)} />
                <Icon icon={ICONS.notification} iconStyle={styless.icons} onPress={() => navigation.navigate(NAMES.notification)} />
            </View>
        </View>
    )
}

export default CommonMainHeaer
