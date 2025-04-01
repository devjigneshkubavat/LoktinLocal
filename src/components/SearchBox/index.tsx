import { COLORS } from '@/constants/colors';
import { CustomTextInputProps } from '@/constants/types';
import React, { memo, useMemo } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { styles } from './styles';
import Icon from '../Icon';
import { ICONS } from '@/constants';
import { useTheme } from '@/hooks/useTheme';

const SearchBox: React.FC<CustomTextInputProps> = memo(({
    placeholder,
    value,
    onChangeText,
    style,
    inputStyle,
    labelStyle,
    ...props
}) => {
    const { theme, handleTheme } = useTheme()
    const styless = useMemo(() => styles(theme), [theme]);
    return (
        <View style={[styless.container, style]}>
            <Icon disabled outerStyle={styless.outerView} iconStyle={styless.iconStyle} icon={ICONS.searchIcon} />
            <TextInput
                style={[styless.input, inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={COLORS.lightFont}
                value={value}
                onChangeText={onChangeText}
                keyboardType={props.keyboardType ?? 'default'}
            />
        </View>
    );
});

export default SearchBox;
