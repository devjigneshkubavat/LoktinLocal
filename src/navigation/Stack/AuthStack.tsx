import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@/screens/Auth/SplashScreen';
import { SCREENS } from '../screens';
import { NAMES } from '../name';
import { getLocally, hasValue } from '@/utils/helper';
import Loader from '@/components/Loader';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isloading, setIsloading] = useState(true)
  const [screen, setScreen] = useState(NAMES.splashscreen)

  const getData = async () => {
    const name = await getLocally('screen')
    console.log(name,'SCREEN');
    
    if (hasValue(name)) {
      if (name == '0') {
        setScreen(NAMES.onboardingThree)
      }
      if (name == '1') {
        setScreen(NAMES.onboardingFour)
      }
      if (name == '2') {
        setScreen(NAMES.onboardingFive)
      }
      if (name == '3') {
        setScreen(NAMES.onboardingSix)
      }
    }
    setIsloading(false)
  }
console.log(screen);

  useEffect(() => {
    getData()
  }, [])
  const navigationOptions = {
    headerShown: false,
    // gestureEnabled: false,
  };
  if (isloading) return (null)
  return (
    <Stack.Navigator initialRouteName={screen} screenOptions={navigationOptions} >
      <Stack.Group>
        <Stack.Screen component={SCREENS.SplashScreen} name={NAMES.splashscreen} />
        <Stack.Screen component={SCREENS.OnboardingOne} name={NAMES.onboardingOne} options={{animation:'none'}} />
        <Stack.Screen component={SCREENS.OnboardingTwo} name={NAMES.onboardingTwo} options={{animation:'none'}} />
        <Stack.Screen component={SCREENS.OnboardingThree} name={NAMES.onboardingThree} options={{animation:'none'}} />
        <Stack.Screen component={SCREENS.Verify} name={NAMES.verify} />
        <Stack.Screen component={SCREENS.WelcomeScreen} name={NAMES.welcomscreen} />
        <Stack.Screen component={SCREENS.OnboardingFour} name={NAMES.onboardingFour} />
        <Stack.Screen component={SCREENS.OnboardingFive} name={NAMES.onboardingFive} />
        <Stack.Screen component={SCREENS.OnboardingSix} name={NAMES.onboardingSix} />
        <Stack.Screen component={SCREENS.SignIn} name={NAMES.signin} />
        <Stack.Screen component={SCREENS.TrustContact} name={NAMES.trustcontact} />

      </Stack.Group>
    </Stack.Navigator>
  )
};

export default AuthStack;

const styles = StyleSheet.create({});
