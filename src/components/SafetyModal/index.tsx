import { ModalProps } from '@/constants/types';
import { FlatList, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Header from '../Header';
import { ICONS } from '@/constants';
import Icon from '../Icon';
import { useTheme } from '@/hooks/useTheme';
import { useMemo } from 'react';
import WebView from 'react-native-webview';
import { verticalScale } from '@/utils/metrics';
import { COLORS } from '@/constants/colors';

const SafetyModal: React.FC<ModalProps> = ({
    isVisible,
    onClose,
    selectedValue
}) => {
    const { theme, handleTheme } = useTheme()
    const styless = useMemo(() => styles(theme), [theme]);
    const getHtml = (index: any): { uri: string } => {
        switch (index) {
            case 0:
                return require('@/assets/html/staysafe.html');
            case 1:
                return require('@/assets/html/emergency.html');
            case 2:
                return require('@/assets/html/safety.html');
            case 3:
                return require('@/assets/html/firstimpression.html');
            default:
                return require('@/assets/html/quikreminder.html'); // Fallback
        }
    };
    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType={'slide'}
            onRequestClose={() => {
                onClose();
            }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styless.modal}>
                    <Icon onPress={onClose} icon={ICONS.downbtn} outerStyle={styless.closeBtn} iconStyle={{height:verticalScale(32)}} />
                    <WebView
                        javaScriptEnabled={true}
                        startInLoadingState={true}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        containerStyle={styless.containerStyle}
                        onMessage={() => { }}
                        originWhitelist={['*']}
                        source={getHtml(selectedValue)}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default SafetyModal;