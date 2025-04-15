import { ModalProps } from '@/constants/types';
import { FlatList, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Header from '../Header';
import { ICONS } from '@/constants';
import Icon from '../Icon';
import { useTheme } from '@/hooks/useTheme';
import { useMemo } from 'react';
import Popover from 'react-native-popover-view';
import InfoBtn from '../InfoBtn';
import Toast from 'react-native-toast-message';
import { toastConfig } from 'App';


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
                                onPress={() => onSelect(item.id)}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styless.optionText}>{item.label}</Text>
                                    {item.tooltip && <InfoBtn title='Keys are people who have connected in groups with you before or you are currently in a group with.' onPress={() => { }} />}
                                </View>
                                {selectedValue == item.id && <Icon icon={ICONS.checksIcon} iconStyle={styless.iconSize} />}
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
            <Toast config={toastConfig} />

        </Modal>
    );
};

export default CustumModal;