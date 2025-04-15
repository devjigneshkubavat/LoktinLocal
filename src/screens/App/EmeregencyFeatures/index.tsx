import { useTheme } from "@/hooks/useTheme";
import React, { useEffect, useMemo } from "react";
import { Image, Switch, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";
import { ICONS } from "@/constants";
import { goBack, navigation } from "@/navigation/rootNavigation";
import { NAMES } from "@/navigation/name";
import BoxComponent from "@/hoc/OuterView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { updateSecuritySettings, updateSecuritySettingsRequest } from "@/redux/slices/updateSecuritiesSlice";

const EmeregencyFeatures = () => {
  const { theme } = useTheme();
  const styless = useMemo(() => styles(theme), [theme]);

  const { securitySettings, isPhoneAddsuccess } = useSelector(
    (state: RootState) => state.updateSecuritiesSaga
  );
  const { userToken } = useSelector((state: RootState) => state.auth);

  console.log("securitySettings at screen ::: ", securitySettings);

  const dispatch = useDispatch<AppDispatch>();

  interface Emergency {
    key: string;
    title: string;
    value: string | boolean;
    type: "navigation" | "switch";
    arrow?: boolean;
    blur?: boolean;
    description?: string;
    onPress?: () => void;
  }

  const emeregency: Emergency[] = [
    {
      key: "trustcontact",
      title: "Trusted Contact",
      value: "9067456784",
      arrow: true,
      type: "navigation",
      blur: true,
      onPress: () => navigation.navigate(NAMES.trustcontact),
    },
    {
      key: "isEmergencyAllowed",
      title: "Emergency Button",
      value: securitySettings?.isEmergencyAllowed,
      type: "switch",
      description:
        "Loktin prioritizes your safety. By activating this slider, you’ll instantly access the Emergency Button, allowing you to quickly alert a trusted  contact in an emergency. It’s discreet, fast, and designed to give you peace of mind, always. ",
    },
    {
      key: "isLocationSharingAllowed",
      title: "Share Your Location",
      value: securitySettings?.isLocationSharingAllowed,
      type: "switch",
      description:
        "This feature lets you securely share your location with a trusted friend, giving them peace of mind and keeping you connected.",
    },
    {
      key: "isCheckInPointAllowed",
      title: "Safety Checkpoints",
      value: securitySettings?.isCheckInPointAllowed,
      type: "switch",
      description:
        "Safety Checkpoints help keep you secure during meetups. Choose a question and set your answer, then decide how often to check in. If you don’t respond correctly or within an hour, your emergency contact will be notified with your last location. Stay safe and in control.",
    },
    {
      key: "receivecheckins",
      title: "Receive Check ins",
      value: "Every Hour",
      arrow: true,
      type: "navigation",
      onPress: () => navigation.navigate(NAMES.checkins),
    },
    {
      key: "safeword",
      title: "Safe Word",
      value: "true",
      arrow: true,
      type: "navigation",
      blur: true,
      onPress: () => navigation.navigate(NAMES.safeword),
    },
  ];

  const onSwitchValueChange = (item, val) => {
    const updateSettingConfig = {
      ...securitySettings,
      ...{ [item.key]: val },
    };

    dispatch(
      updateSecuritySettings(updateSettingConfig)
    );
    dispatch(
      updateSecuritySettingsRequest({
        url: "update-securities/update-securities-setting",
        userToken,

        data: updateSettingConfig,
      })
    );
  };

  return (
    <>
      <Header
        leftIcon={true}
        centerText="Check in and Emergency Features"
        viewstyle={styless.header}
        leftView={{
          onPress: () => {
            goBack();
          },
          icon: ICONS.left_arrow,
        }}
      />
      <View style={styless.container}>
        {emeregency.map((item, index) => (
          <View key={index} style={styless.itemview}>
            <TouchableOpacity
              style={styless.setitem}
              disabled={item.type != "navigation"}
              onPress={item.onPress}
            >
              <Text style={styless.titletext}>{item.title}</Text>
              {item.type === "switch" ? (
                <Switch
                  value={Boolean(item.value)}
                  thumbColor={COLORS.white}
                  trackColor={{ true: COLORS.primaryColor }}
                  onValueChange={(val) => onSwitchValueChange(item, val)}
                />
              ) : (
                <View
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View
                  // style={{
                  //     position: 'relative',
                  //     overflow: 'hidden'
                  // }}
                  >
                    {/* <BlurView
                                            blurType='light'
                                            style={styless.absoult}
                                            blurAmount={1}
                                        /> */}
                    <Text style={styless.valuetext}>{item.value}</Text>
                  </View>
                  {item.arrow && (
                    <Image
                      source={ICONS.rightArrow}
                      style={styless.rightimage}
                    />
                  )}
                </View>
              )}
            </TouchableOpacity>
            {item.description && (
              <Text style={styless.descriptiontext}>{item.description}</Text>
            )}
          </View>
        ))}
      </View>
    </>
  );
};

export default BoxComponent(EmeregencyFeatures);
