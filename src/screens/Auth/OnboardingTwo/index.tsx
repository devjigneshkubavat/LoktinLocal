import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BoxComponent from '@/hoc/OuterView';
import Header from '@/components/Header';
import { ICONS } from '@/constants';
import { STRINGS } from '@/constants/strings';
import { styles } from './styles';
import ProgressBar from '@/components/ProgressBar';
import { goBack, navigate } from '@/navigation/rootNavigation';
import CustomTextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { useRoute } from '@react-navigation/native';
import { UserData } from '@/constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { registerrequest } from '@/redux/slices/authSlice';
import { filteredDatawithvalue, removeWhiteSpace } from '@/utils/helper';
import { RootState } from '@/store/store';
import Loader from '@/components/Loader';
import MastInput from '@/components/MastInput';
import { useTheme } from '@/hooks/useTheme';

const OnboardingTwo = () => {

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const route = useRoute()
    const [userData, setUserData] = useState<UserData>(route?.params ?? {});
    const authData: any = useSelector<RootState>(state => state.auth)
    const dispatch = useDispatch()
    const { theme, handleTheme } = useTheme()
    const styless = useMemo(() => styles(theme), [theme]);
    const [selectedIndex, setSelectedIndex] = useState<Number>(0)
    const handleSelect = useCallback(
        (field: keyof UserData, value: string) => {
            setUserData((prevState) => ({
                ...prevState,
                [field]: removeWhiteSpace(value),
            }));
        },
        [selectedIndex] // Dependencies are empty, so it's stable
    );
    const isFormValid = useMemo(() => {
        return userData.email?.trim() !== '' || userData.phone?.trim();
    }, [userData]);

    const onContinueClick = async () => {
        Keyboard.dismiss()
        try {
            dispatch(
                registerrequest({
                    url: 'auth/signup',
                    data: filteredDatawithvalue(userData),
                })
            );
        } catch (error) {
            console.log(error, 'error scren');

        }
    }

    return (
        <View style={styless.container}>
            <Header
                leftIcon={true}
                leftView={{
                    onPress: () => {
                        goBack();
                    },
                    icon: ICONS.left_arrow,
                }}
                centerText="2/3"
            // rightView={{onPress: () => {}, icon: STRINGS.skip}}
            // rightIcon={false}
            />
            <View style={styless.progressView}>
                <ProgressBar progress={0.67} animated startValue={0.33} />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styless.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust for iOS
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Offset for header
                >
                    <ScrollView
                        contentContainerStyle={styless.scrollContent}
                        keyboardShouldPersistTaps="handled" // Ensures taps on inputs work after dismiss
                    >
                        <View style={{ flex: 1 }}>
                            <View style={styless.rowView}>
                                <TouchableOpacity disabled={selectedIndex == 0} onPress={() => { setSelectedIndex(0), handleSelect('email', '') }} style={[styless.sectionView, selectedIndex == 0 && styless.selectedSection]}>
                                    <Text style={[styless.sectionText, selectedIndex == 0 && styless.selectText]}>Phone</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={selectedIndex == 1} onPress={() => { setSelectedIndex(1), handleSelect('phone', '') }} style={[styless.sectionView, selectedIndex == 1 && styless.selectedSection]}>
                                    <Text style={[styless.sectionText, selectedIndex == 1 && styless.selectText]}>Email</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styless.inputView}>
                                {selectedIndex === 0 ?
                                    <MastInput
                                        label={STRINGS.phone}
                                        placeholder={STRINGS.p_h_phone}
                                        value={userData?.phone ?? ''}
                                        onChangeText={useCallback((text) => handleSelect('phone', text), [handleSelect])}
                                        keyboardType='number-pad'
                                        mask={"+1 [000] [000] [00][00]"}
                                    /> :
                                    <CustomTextInput
                                        label={STRINGS.email}
                                        placeholder={STRINGS.p_h_email}
                                        value={userData.email ?? ''}
                                        onChangeText={useCallback((text) => handleSelect('email', text), [handleSelect])}
                                        keyboardType={'email-address'}
                                        autoCapitalize="none"
                                    />
                                }
                            </View>
                            <Text style={styless.sentMsgText}>{selectedIndex === 0 ? STRINGS.phonesenttext : null}</Text>
                        </View>
                        <Button
                            title={STRINGS.continue}
                            viewstyle={styless.bottomView}
                            textStyle={styless.btnText}
                            onPress={() => { onContinueClick() }}
                            disabled={!isFormValid}
                        />
                    </ScrollView></KeyboardAvoidingView>
            </TouchableWithoutFeedback>

            <Loader loading={authData.registerLoading} />
        </View>
    );
};

export default BoxComponent(OnboardingTwo);
