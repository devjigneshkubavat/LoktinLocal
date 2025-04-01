import BoxComponent from "@/hoc/OuterView";
import { useTheme } from "@/hooks/useTheme";
import React, { useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import style from "./style";
import Header from "@/components/Header";
import { ICONS } from "@/constants";
import Icon from "@/components/Icon";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { navigation } from "@/navigation/rootNavigation";
import { NAMES } from "@/navigation/name";
import { Slider, RangeSlider } from "@react-native-assets/slider";
import { COLORS } from "@/constants/colors";
import { onSetPreferenceAll } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ParamListTypes } from "@/constants/types";

const Preference = () => {
  const detail = [
    {
      key: "gender",
      label: "Gender",
      value: "Male",
      type: "navigation",
      onPress: () => console.log("Gneder"),
    },
    // {
    //   key: "eduction",
    //   label: "Eduction",
    //   value: "Bachelor",
    //   type: "navigation",
    //   onPress: () => console.log("eduction"),
    // },
    {
      key: "inrest",
      label: "Intrest",
      value: "hiking",
      type: "navigation",
      onPress: () => console.log("intrest"),
    },
    {
      key: "Causes",
      label: "causes and communities",
      value: "environment",
      type: "navigation",
      onPress: () => console.log("Causes"),
    },
  ];

  const route = useRoute<RouteProp<ParamListTypes, "preference">>();
  const groupId = route.params?.groupId;

  const [toValue, setToValue] = useState([0, 0]);
  const [age, setAge] = useState(0);
  console.log(toValue);
  const dispatch = useDispatch();
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { planDetails } = useSelector((state: RootState) => state.user);

  const Rightview = () => {
    return (
      <View style={styless.iconStyle}>
        <Icon icon={ICONS.send} iconStyle={styless.iconSize} />
        <Icon
          icon={ICONS.notification}
          iconStyle={styless.iconSize}
          onPress={() => navigation.navigate(NAMES.notification)}
        />
      </View>
    );
  };

  const { theme } = useTheme();
  const styless = useMemo(() => style(theme), [theme]);

  const onClickOnAllSquares = () => {
    dispatch(
      onSetPreferenceAll({
        url: `plans/${planDetails?.id}/preferences`,
        data: {
          age: `${toValue[0]}-${toValue[1]}`,
          distance: age,
          gender: "male",
          education: "Bachelor",
          interests: ["hiking"],
          causesAndCommunities: ["environment", "Sports"],
        },
        userToken,
      })
    );
  };

  const onClickOnThisSqure = () => {
    dispatch(
      onSetPreferenceAll({
        url: `/plans/${planDetails?.id}/group/${groupId}/preferences`,
        data: {
          age: `${toValue[0]}-${toValue[1]}`,
          distance: age,
          gender: "male",
          education: "Bachelor",
          interests: ["hiking"],
          causesAndCommunities: ["environment", "Sports"],
        },
        userToken,
      })
    );
  };

  return (
    <View style={styless.container}>
      <Header
        lefttext={true}
        viewstyle={styless.headerstyle}
        leftstyle={styless.leftsidestyle}
        leftsidetext="Preference"
        rightView={Rightview()}
      />
      <View style={styless.suncontainer}>
        <View style={{ flexGrow: 1 }}>
          <View style={styless.agetxt}>
            <Text style={styless.age}>Age</Text>
            <Text style={styless.age}>{`${toValue[0]} - ${toValue[1]}`}</Text>
          </View>
          <View>
            <RangeSlider
              style={{
                width: "100%",
                height: verticalScale(40),
                backgroundColor: "",
              }}
              range={[1, 4]}
              step={1}
              minimumRange={1}
              minimumValue={0}
              maximumValue={30}
              thumbStyle={styless.thumb}
              minTrackStyle={{
                backgroundColor: "rgba(152, 147, 148, 0.1)",
              }}
              maxTrackStyle={{
                backgroundColor: "rgba(152, 147, 148, 0.1)",
              }}
              midTrackStyle={{
                backgroundColor: COLORS.primaryColor,
              }}
              onValueChange={setToValue}
            />
          </View>
          <View style={[styless.agetxt, { marginTop: verticalScale(10) }]}>
            <Text style={styless.age}>Distance</Text>
            <Text style={styless.age}>{`${age} mi`}</Text>
          </View>
          <View>
            <Slider
              style={{
                width: "100%",
                height: verticalScale(40),
                backgroundColor: "",
              }}
              minimumValue={0}
              maximumValue={30}
              step={1}
              value={age}
              onValueChange={setAge}
              thumbStyle={styless.thumb}
              minimumTrackTintColor={COLORS.primaryColor}
              maximumTrackTintColor="rgba(152, 147, 148, 0.1)"
            />
          </View>
          {detail.map((item, index) => (
            <TouchableOpacity
              style={styless.item}
              key={index}
              onPress={item.onPress}
            >
              <Text style={styless.age}>{item.label}</Text>
              <View style={styless.icnview}>
                <Text style={styless.age}>{item.value}</Text>
                <Image source={ICONS.rightArrow} style={styless.icn} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={styless.button}
            onPress={onClickOnAllSquares}
          >
            <Text style={[styless.txt]}>Set for all squares</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styless.squre}>
            <Text style={styless.texts} onPress={onClickOnThisSqure}>
              Set for only this squre
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BoxComponent(Preference);
