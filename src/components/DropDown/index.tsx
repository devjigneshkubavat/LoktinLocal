import { FONTS, ICONS } from '@/constants';
import { COLORS } from '@/constants/colors';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';
import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
    TextStyle,
    ViewStyle,
    Keyboard,
} from 'react-native';
import Icon from '../Icon';
import { DropdownProps } from '@/constants/types';
import {styles} from './styles';
import CustumModal from '../CustumModal';
import { STRINGS } from '@/constants/strings';
import { useTheme } from '@/hooks/useTheme';

const Dropdown: React.FC<DropdownProps> = ({
    label,
    options,
    placeholder = 'Select',
    onSelect,
    style,
    labelStyle,
}) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const { theme, handleTheme } = useTheme()
    const styless = useMemo(() => styles(theme), [theme]);
    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onSelect(value);
    };

    return (
        <TouchableOpacity
            onPress={() => { setModalVisible(true), Keyboard.dismiss() }}
            style={[styless.container, style]}>
            <View style={styless.dropdown}>
                <View>
                    <Text style={[styless.label, labelStyle]}>{label}</Text>
                    <Text style={styless.text}>{selectedValue || placeholder}</Text>
                </View>
                <Icon icon={ICONS.bottom_arrow} iconStyle={styless.iconSize} />
            </View>
            <CustumModal headerName={STRINGS.gender} selectedValue={selectedValue} isVisible={isModalVisible} options={options} onClose={() => setModalVisible(false)} onSelect={(item) => handleSelect(item)} />
        </TouchableOpacity>
    );
};



export default Dropdown;
