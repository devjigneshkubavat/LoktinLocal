import React, { useMemo } from 'react'
import { Text, View } from "react-native";
import { useTheme } from '@/hooks/useTheme';
import styles from './styles';
import Icon from '@/components/Icon';
import { ICONS } from '@/constants';
import { navigation } from '@/navigation/rootNavigation';
import { NAMES } from '@/navigation/name';

type TCommonHeaderProps = {
    leftText?: string;
}

const CommonHeader = ({ leftText }: TCommonHeaderProps) => {
    const { theme } = useTheme();
    const style = useMemo(() => styles(theme), [theme]);

    return (
        <View style={style.header}>
            <Text style={style.headerText}>{leftText}</Text>
            <View style={style.iconView}>
                <Icon icon={ICONS.send} iconStyle={style.icons} onPress={() => navigation.navigate(NAMES.chatList)} />
                <Icon icon={ICONS.notification} iconStyle={style.icons} onPress={() => navigation.navigate(NAMES.notification)} />
            </View>
        </View>
    );
};

export default CommonHeader
