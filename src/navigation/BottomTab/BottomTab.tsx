import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREENS } from "../screens";
import { NAMES } from "../name";
import CustomTabBar from "./CustomTabBar";

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen component={SCREENS.HomeScreen} name={NAMES.homescreen} />
      <Tab.Screen component={SCREENS.Search} name={NAMES.search} />
      <Tab.Screen component={SCREENS.CreatePlan} name={NAMES.create} />
      <Tab.Screen component={SCREENS.Request} name={NAMES.request} />
      <Tab.Screen component={SCREENS.Profile} name={NAMES.profile} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
