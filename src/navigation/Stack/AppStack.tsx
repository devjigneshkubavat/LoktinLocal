import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREENS } from '../screens'
import { NAMES } from '../name'
import BottomTab from '../BottomTab/BottomTab'

const Stack = createNativeStackNavigator()

const AppStack = () => {
    const navigationOptions = {
        headerShown: false
        // gestureEnabled: false,
    }
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Group>
                <Stack.Screen component={BottomTab} name={'Tab'} />
                <Stack.Screen component={SCREENS.Join} name={NAMES.join} />
                <Stack.Screen
                    component={SCREENS.CreatePlan}
                    name={NAMES.createPlan}
                    options={{ animation: 'none' }}
                />
                <Stack.Screen
                    component={SCREENS.SafetySuggestion}
                    name={NAMES.safetysuggestion}
                />
                <Stack.Screen
                    component={SCREENS.Settings}
                    name={NAMES.settings}
                    options={{ animation: 'none'}}
                />
                <Stack.Screen
                    component={SCREENS.EditDetails}
                    name={NAMES.editDetails}
                />
                <Stack.Screen
                    component={SCREENS.Notification}
                    name={NAMES.notification}
                />
                <Stack.Screen
                    component={SCREENS.Preference}
                    name={NAMES.preferences}
                    options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                    component={SCREENS.Editprofile}
                    name={NAMES.editprofile}
                />
                <Stack.Screen
                    component={SCREENS.EmeregencyFeatures}
                    name={NAMES.emeregencyFeatures}
                />
                <Stack.Screen
                    component={SCREENS.TrustContact}
                    name={NAMES.trustcontact}
                />
                <Stack.Screen
                    component={SCREENS.Checkins}
                    name={NAMES.checkins}
                />
                <Stack.Screen
                    component={SCREENS.ChatList}
                    name={NAMES.chatList}
                />
                <Stack.Screen component={SCREENS.Chats} name={NAMES.chats} />
                <Stack.Screen
                    component={SCREENS.Safeword}
                    name={NAMES.safeword}
                />
                <Stack.Screen component={SCREENS.prompts} name={NAMES.prompt} />
                <Stack.Screen
                    component={SCREENS.SetSafeword}
                    name={NAMES.setsafeword}
                />
                <Stack.Screen
                    component={SCREENS.MessageModeration}
                    name={NAMES.messageModeration}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default AppStack

const styles = StyleSheet.create({})
