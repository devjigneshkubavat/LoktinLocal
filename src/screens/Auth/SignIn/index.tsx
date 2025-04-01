import { Alert, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import BoxComponent from '@/hoc/OuterView';
import Header from '@/components/Header';
import { ICONS } from '@/constants';
import { STRINGS } from '@/constants/strings';
import {styles} from './styles';
import { goBack, navigate } from '@/navigation/rootNavigation';
import CustomTextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { UserData } from '@/constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, selectAuth } from '@/redux/slices/authSlice';
import { filteredDatawithvalue, removeWhiteSpace } from '@/utils/helper';
import Loader from '@/components/Loader';
import MastInput from '@/components/MastInput';
import KeyBoardAvoid from '@/components/KeyBoardAvoid';
import { useTheme } from '@/hooks/useTheme';

const SignIn = () => {

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState<UserData>({
        email: '',
        phone: ''
    });
    const dispatch = useDispatch()
    const authData: any = useSelector(selectAuth)
    const { theme, handleTheme } = useTheme()
    const styless = useMemo(() => styles(theme), [theme]);
    const isFormValid = useMemo(() => {
        return userData.email?.trim() !== '' || userData.phone?.trim();
    }, [userData]);
    const [selectedIndex, setSelectedIndex] = useState<Number>(1)
    const handleSelect = useCallback(
        (field: keyof UserData, value: string) => {
            setUserData((prevState) => ({
                ...prevState,
                [field]: removeWhiteSpace(value),
            }));
        },
        [selectedIndex] // Dependencies are empty, so it's stable
    );
    const onContinueClick = useCallback(() => {
        Keyboard.dismiss()
        try {

            dispatch(loginRequest({
                url: 'auth/login',
                data: filteredDatawithvalue(userData)
            }))
        } catch (error) {

        }
    }, [userData])
    const onselection = () => {
        if (selectedIndex == 0) {
            setSelectedIndex(1),
                handleSelect('phone', '')
        } else {
            setSelectedIndex(0),
                handleSelect('email', '')
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
                centerText=""
                viewstyle={styless.headerstyle}

            // rightView={{onPress: () => {}, icon: STRINGS.skip}}
            // rightIcon={false}
            />
            <KeyBoardAvoid>
                <View style={{ flex: 1 }}>
                    <View style={styless.qView}>
                        <Text style={styless.qText}>{selectedIndex === 0 ? STRINGS.phonequeston : STRINGS.emailquestion}</Text>
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
                                autoCapitalize='none'
                            />
                        }
                    </View>
                    <Text style={styless.sentMsgText}>{selectedIndex === 0 ? STRINGS.phonesenttext : STRINGS.emailsenttext}</Text>
                </View>
            </KeyBoardAvoid>
            <View style={styless.changeV}>
                <Text onPress={onselection} style={styless.changeText}>{STRINGS.signinwith}{selectedIndex == 0 ? 'email' : 'phone number'}</Text>
            </View>
            <Button
                title={STRINGS.continue}
                viewstyle={styless.bottomView}
                textStyle={styless.btnText}
                onPress={() => { onContinueClick() }}
                disabled={!isFormValid}
            />
            <Loader loading={authData.loginLoading} />

        </View>
    );
};

export default BoxComponent(SignIn);
