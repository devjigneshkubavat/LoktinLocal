import { ModalProps } from '@/constants/types';
import { FlatList, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Header from '../Header';
import { ICONS } from '@/constants';
import Icon from '../Icon';
import { useTheme } from '@/hooks/useTheme';
import { useMemo } from 'react';

const CustumModal: React.FC<ModalProps> = ({
    isVisible,
    onClose,
    options,
    onSelect,
    headerName,
    selectedValue
}) => {
    const { theme, handleTheme } = useTheme()
    const styless = useMemo(() => styles(theme), [theme]);
    return (
        <Modal
            transparent={false}
            visible={isVisible}
            animationType={'slide'}
            onRequestClose={() => {
                onClose();
            }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styless.modal}>
                    <Header
                        leftIcon={true}
                        leftView={{
                            onPress: () => {
                                onClose();
                            },
                            icon: ICONS.left_arrow,
                        }}
                        centerText={headerName}
                        viewstyle={styless.headerBottom}
                    />
                    <FlatList
                        data={options}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        contentContainerStyle={styless.containerStyle}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styless.option}
                                onPress={() => onSelect(item)}>
                                <Text style={styless.optionText}>{item}</Text>
                                {selectedValue == item && <Icon icon={ICONS.checksIcon} iconStyle={styless.iconSize} />}
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <TouchableOpacity
                    style={styless.modalOverlay}
                    disabled
                    onPress={() => {
                        onClose();
                    }}
                />
            </SafeAreaView>
        </Modal>
    );
};

export default CustumModal;