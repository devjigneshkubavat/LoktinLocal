import { View, Text, SafeAreaView, StyleSheet, useColorScheme, Appearance } from 'react-native'
import React from 'react'
import SplashScreen from '@/screens/Auth/SplashScreen'
import AuthStack from '@/navigation/Stack/AuthStack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@/navigation/rootNavigation'
import { Provider } from 'react-redux'
import store, { persistor } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import Root from '@/navigation/Route'
import Toast, { BaseToast } from 'react-native-toast-message';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics'
import { COLORS } from '@/constants/colors'
import { FONTS, ICONS } from '@/constants'
import Icon from '@/components/Icon'
import { ThemeProvider } from '@/context/themeContext'

const App = () => {
  const toastConfig = {
    customToast: ({ text1, text2, props }: any) => (
      <View style={styles.customToastContainer}>
        {props.icon && <Icon outerStyle={styles.iconView} icon={props.icon} />}
        <View>
          {text1 && <Text style={styles.text1}>{text1}</Text>}
          {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
        </View>
      </View>
    ),
  }
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <Root />
            <Toast config={toastConfig} />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default App
const styles = StyleSheet.create({
  customToastContainer: {
    backgroundColor: COLORS.white,
    padding: moderateScale(5),
    paddingHorizontal: horizontalScale(10),
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text1: {
    fontSize: moderateScale(12),
    color: COLORS.fontblackColor,
    flexWrap: 'wrap',
    fontFamily: FONTS.Lexend_Medium,
  },
  text2: {
    fontSize: moderateScale(10),
    color: COLORS.fontblackColor,
    fontFamily: FONTS.Lexend_Light,
    flexWrap: 'wrap',
  },
  iconView: {
    height: verticalScale(16),
    width: verticalScale(16),
    marginRight: horizontalScale(10)
  }
});