import React from "react";
import { View, StyleSheet, Pressable, Image, ImageProps } from "react-native";
import { Text } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FONTS, ICONS } from "@/constants";
import { NAMES } from "../name";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Theme } from "@/context/themeContext";
import { useTheme } from "@/hooks/useTheme";
import { COLORS } from "@/constants/colors";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import FastImage from "react-native-fast-image";
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics'

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styless = styles(theme);
  const { userInfo } = useSelector((state: RootState) => state.user);

  const renderName = (name: string) => {
    switch (name) {
      case NAMES.homescreen:
        return "Meet";
      case NAMES.search:
        return "Search";
      case NAMES.create:
        return "Create";
      case NAMES.request:
        return "Request";
      default:
        return "Profile";
    }
  };

  const renderIcon = (name: string, isFocused: boolean) => {
    const iconStyle: ImageProps = {
      width: moderateScale(24),
      height: moderateScale(24),
      resizeMode: "contain",
      tintColor: isFocused ? theme.colors.white : theme.colors.black,
    };
    switch (name) {
      case NAMES.homescreen:
        return <Image source={ICONS.tabHome} style={iconStyle} />;
      case NAMES.search:
        return <Image source={ICONS.tabSearch} style={iconStyle} />;
      case NAMES.create:
        return <Image source={ICONS.tabDocument} style={iconStyle} />;
      case NAMES.request:
        return <Image source={ICONS.tabRequest} style={iconStyle} />;
      default:
        return (
          <FastImage
            source={{
              uri:
                userInfo?.profilePhotoUrls?.[0] ??
                "https://randomuser.me/api/portraits/men/1.jpg",
            }}
            style={styless.profileImage}
          />
        );
    }
  };

  return (
<View
            style={[
                styless.tabContainer,
                { paddingBottom: insets.bottom + 10 }
            ]}
        >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        return (
          <Pressable
            key={index}
            onPress={() => navigation.navigate(route.name)}
            style={styless.tabButton}
          >
            <View style={[styless.box, isFocused && styless.boxBg]}>
              {renderIcon(route.name, isFocused)}
              {isFocused && (
                <Text style={styless.meetText}>{renderName(route.name)}</Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = ({ colors }: Theme) =>
  StyleSheet.create({
    box: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 10,
      backgroundColor: colors.white,
      borderTopWidth: 0,
      elevation: 10,
    },
    tabButton: {
      alignItems: "center",
    },
    boxBg: {
      backgroundColor: COLORS.primaryColor,
      borderRadius: 50,
      paddingHorizontal: 10,
      height: verticalScale(40),
    },
    meetText: {
      fontSize: moderateScale(14),
      fontFamily: FONTS.Lexend_Medium,
      color: colors.white,
    },
    profileImage: {
      width: moderateScale(24),
      height: moderateScale(24),
      borderRadius: moderateScale(15)
    },
    indicator: {
      height: 4,
      width: 20,
      backgroundColor: "black",
      borderRadius: 2,
      marginTop: 4,
    },
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    screenText: {
      fontSize: 24,
      fontWeight: "bold",
    },
  });

export default CustomTabBar;
