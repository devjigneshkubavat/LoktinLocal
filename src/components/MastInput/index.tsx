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
import {styles} from './styles';
import {
    MaskedTextInput,
} from 'react-native-advanced-input-mask';
import { useTheme } from '@/hooks/useTheme';

const MastInput: React.FC<CustomTextInputProps> = memo(
    ({
        label,
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
                <Text style={[styless.label, labelStyle]}>{label}</Text>
                <MaskedTextInput
                    autocomplete={false}
                    mask={props.mask ?? ''}
                    style={[styless.input, inputStyle]}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.lightFont}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={props.keyboardType ?? 'default'}
                />
            </View>
        );
    },
);

export default MastInput;
