import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {styles} from './styles';
import BoxComponent from '@/hoc/OuterView';
import Header from '@/components/Header';
import { goBack, navigate, replace } from '@/navigation/rootNavigation';
import { ICONS } from '@/constants';
import { STRINGS } from '@/constants/strings';
import OTPTextView from 'react-native-otp-textinput';
import { COLORS } from '@/constants/colors';
import Button from '@/components/Button';
import { useTimer } from '@/components/Timer';
import { NAMES } from '@/navigation/name';
import { RouteProp, useRoute } from '@react-navigation/native';
import { UserData } from '@/constants/types';
import { otpResendRequest, selectAuth, verifyRequest, verifySuccess } from '@/redux/slices/authSlice';
import { addPrefixToPhone, filteredDatawithvalue, formatPhonenumber, normalizeUserDetails, setLocally } from '@/utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import Loader from '@/components/Loader';
import { resendOTP, verifyOTP } from '@/redux/services/authServices';
import { getUserData, setUserdata } from '@/redux/slices/userSlice';
import { useTheme } from '@/hooks/useTheme';

type RouteParams = {
    isSignin?: Boolean,
    userData: UserData
}

const Verify = () => {
    const otpInput = useRef<any>(null);
    const [error, setError] = useState<Boolean>(false);
    const [otpText, setOtptext] = useState('')
    const { timeLeft, isRunning, start, pause, reset } = useTimer(20); // 20-second timer
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>()
    const isemail = !!route?.params?.userData?.email;
    const text = route?.params?.userData?.email?.trim() ? route.params.userData.email : formatPhonenumber(route.params?.userData?.phone ?? '');

    const dispatch = useDispatch<AppDispatch>()
    const authData: any = useSelector(selectAuth)
    const { theme, handleTheme,themeType } = useTheme()
    const styless = useMemo(() => styles(theme), [theme]);
    const clearText = () => {
        otpInput.current.clear();
    };

    const setText = () => {
        otpInput.current.setValue('1234');
    };

    const onResendOtp = useCallback(async () => {
        setOtptext('')
        clearText()
        setError(false)
        try {
            if (route?.params?.isSignin) {
                const response = await dispatch(resendOTP({
                    url: 'auth/login',
                    data: filteredDatawithvalue(route?.params?.userData)
                }))

            } else {
                const response = await dispatch(resendOTP({
                    url: 'auth/resend-otp',
                    data: filteredDatawithvalue(route?.params?.userData)
                }))
            }
            start()

        } catch (error) {

        }
    }, [route?.params?.isSignin])

    const onVerifyOTP = useCallback(async () => {
        try {
            if (route?.params?.isSignin) {
                const response = await dispatch(verifyOTP({
                    url: 'auth/verify-otp',
                    data: { ...filteredDatawithvalue(route?.params?.userData), otp: otpText }
                }))
                if (response.status === 200) {
                    dispatch(verifySuccess(response.response.data.token))
                    dispatch(getUserData({
                        url: 'auth/get-user-details',
                        data: response.response.data.token
                    }))
                }

            } else {
                const response = await dispatch(verifyOTP({
                    url: 'auth/verify-user',
                    data: { userId: route?.params?.userData?.userId, otp: otpText }
                }))
                if (response.status === 200) {
                    setLocally('screen', '0')
                    dispatch(setUserdata(normalizeUserDetails(response.response.data)))
                    replace(NAMES.onboardingThree)
                }
            }

        } catch (error) {
            setError(true)
        }

    }, [route?.params?.isSignin, otpText])


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
            />
            <View style={styless.centerView}>
                <Text style={styless.verifyText}>
                    {STRINGS.verifyText} {isemail ? STRINGS.emailaddress : STRINGS.phonenumber}
                </Text>
                <Text style={styless.smsText}>
                    {isemail ? STRINGS.emailotpsentText : STRINGS.smssentText}{' '}
                    <Text style={styless.lowCase}>{isemail ? STRINGS.email : STRINGS.phone}{' '}{text}</Text>
                </Text>
                <OTPTextView
                    inputCount={5}
                    tintColor={COLORS.primaryColor}
                    offTintColor={COLORS.otpInputborder}
                    containerStyle={styless.otpContainerView}
                    textInputStyle={styless.otpTextView}
                    ref={otpInput}
                    handleTextChange={(value) => {
                        setOtptext(value)
                        if (error) setError(false)
                    }}
                />
                {error && <Text style={styless.errorText}>{STRINGS.otperrorText}</Text>}
            </View>
            <View>
                {isRunning ? (
                    <View style={styless.resendView}>
                        <Text style={styless.resendText}>{STRINGS.sendagain}</Text>
                        <Text style={styless.resendT}>00:{timeLeft}</Text>
                    </View>
                ) : (
                    <View style={styless.resendView}>
                        <Text style={styless.resendText}>{STRINGS.resendcode}</Text>
                        <Text onPress={() => { onResendOtp() }} style={styless.resendT}>
                            {STRINGS.resend}
                        </Text>
                    </View>
                )}
                <Button
                    title={STRINGS.verify}
                    viewstyle={styless.bottomView}
                    textStyle={styless.btnText}
                    onPress={() => { onVerifyOTP() }}
                    disabled={otpText.trim().length < 5}
                />
            </View>
            <Loader loading={authData.resendLoading || authData.verifyloading} />
        </View>
    );
};

export default BoxComponent(Verify);
