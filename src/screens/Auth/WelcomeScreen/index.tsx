import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import BoxComponent from '@/hoc/OuterView';
import Header from '@/components/Header';
import {  ICONS } from '@/constants';
import { STRINGS } from '@/constants/strings';
import {styles} from './styles';
import ProgressBar from '@/components/ProgressBar';
import { goBack, navigate, navigation } from '@/navigation/rootNavigation';
import Button from '@/components/Button';
import { NAMES } from '@/navigation/name';
import { useTheme } from '@/hooks/useTheme';

const WelcomeScreen = () => {
    const { theme, handleTheme,themeType } = useTheme()
    const styless = useMemo(() => styles(theme), [theme]);
    return (
        <View style={styless.container}>
            <Header
                leftIcon={true}
                viewstyle={styless.headerstyle}
                leftView={{
                    onPress: () => {
                        goBack();
                    },
                    icon: ICONS.left_arrow,
                }}
                centerText=""
            // rightView={{onPress: () => {}, icon: STRINGS.skip}}
            // rightIcon={false}
            />
            <View style={styless.centerView}>
                <Text style={styless.introText}>{STRINGS.welcome}</Text>
                <Text style={styless.subText}>{STRINGS.welcomsubText}</Text>
                <Button
                    title={STRINGS.continuesingup}
                    viewstyle={styless.bottomView}
                    textStyle={styless.btnText}
                    onPress={() => {navigate(NAMES.onboardingFour) }}
                    disabled={false}
                />
                <Text onPress={()=>{navigation.navigate(NAMES.trustcontact)}} style={styless.contactText}>{STRINGS.addcontact}</Text>

            </View>
        </View>
    );
};

export default BoxComponent(WelcomeScreen);
