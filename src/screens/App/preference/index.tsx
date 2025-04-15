import BoxComponent from "@/hoc/OuterView";
import { useTheme } from "@/hooks/useTheme";
import React, { useMemo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import style from "./style";
import Header from "@/components/Header";
import { genderOptions, ICONS } from "@/constants";
import Icon from "@/components/Icon";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { goBack, navigation } from "@/navigation/rootNavigation";
import { NAMES } from "@/navigation/name";
import { Slider, RangeSlider } from "@react-native-assets/slider";
import { COLORS } from "@/constants/colors";
import { onSetPreferenceAll } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ParamListTypes } from "@/constants/types";
import CustumModal from "@/components/CustumModal";
import { STRINGS } from "@/constants/strings";
import {
  generateLabelArray,
  generateLabelString,
  hasValue,
  isInputValid,
  showToast,
  showToastMessage,
} from "@/utils/helper";
import Toast from "react-native-toast-message";
import FastImage from "react-native-fast-image";
import { setPlanDetails } from "@/redux/slices/planSlice";

const Preference = () => {
  const route = useRoute<RouteProp<ParamListTypes, "preference">>();
  const groupId = route.params?.groupId;

  const [toValue, setToValue] = useState([0, 0]);
  const [age, setAge] = useState(0);

  const dispatch = useDispatch();
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { planDetails, userInfo } = useSelector(
    (state: RootState) => state.user
  );
  console.log("🚀 ~ Preference ~ planDetails:", planDetails);
  const { planData } = useSelector((state: RootState) => state.plan);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number>(groupId ?? 1);

  const detail = [
    {
      key: "gender",
      label: "Gender",
      value: "Male",
      type: "navigation",
      onPress: () => setModalVisible(true),
    },
    // {
    //   key: "eduction",
    //   label: "Eduction",
    //   value: "Bachelor",
    //   type: "navigation",
    //   onPress: () => console.log("eduction"),
    // },
    {
      key: "interests",
      label: "Intrest",
      value: "hiking",
      type: "navigation",
      onPress: (value: any) => {
        navigation.navigate(NAMES.onboardingFive1, {
          isEdit: true,
          selectedData: value,
          onSave: (newdata: any) => {
            SetInput({ ...Input, interests: newdata });
          },
        });
      },
    },
    {
      key: "communities",
      label: "Causes and Communities",
      value: "environment",
      type: "navigation",
      onPress: (value: any) =>
        navigation.navigate(NAMES.onboardingFour1, {
          isEdit: true,
          selectedData: value,
          onSave: (newdata: any) => {
            SetInput({ ...Input, communities: newdata });
          },
        }),
    },
  ];

  const [Input, SetInput] = useState<any>({
    interests: [],
    communities: [],
    gender: "",
    age: [18, 25],
    distance: 5,
  });
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
    if (!isInputValid(Input)) {
      Toast.show({
        type: "customToast",
        text1: "All fields are required",
        position: "bottom",
        visibilityTime: 2000,
        swipeable: false,
        props: { icon: ICONS.errorIcon },
      });
      return;
    }
    const data = {
      age: `${Input.age[0]}-${Input.age[1]}`,
      distance: Input.distance,
      gender: Input.gender,
      interests: Input.interests,
      causesAndCommunities: Input.communities,
    };
    if (!!groupId) {
      dispatch(
        onSetPreferenceAll({
          url: `plans/${planDetails?.id}/preferences`,
          data: data,
          userToken,
        })
      );
    } else {
      dispatch(
        setPlanDetails({
          ...planData,
          ...data,
        })
      );
      goBack();
    }
  };

  const onClickOnThisSqure = () => {
    if (!isInputValid(Input)) {
      Toast.show({
        type: "customToast",
        text1: "All fields are required",
        position: "bottom",
        visibilityTime: 2000,
        swipeable: false,
        props: { icon: ICONS.errorIcon },
      });
      return;
    }
    const data = {
      age: `${Input.age[0]}-${Input.age[1]}`,
      distance: Input.distance,
      gender: Input.gender,
      // education: "Bachelor",
      interests: Input.interests,
      causesAndCommunities: Input.communities,
    };
    if (groupId) {
      dispatch(
        onSetPreferenceAll({
          url: `/plans/${planDetails?.id}/group/${groupId}/preferences`,
          data: data,
          userToken,
        })
      );
    } else {
      dispatch(
        setPlanDetails({
          ...planData,
          groupEntries: [
            {
              id: selectedGroup,
              ...data,
            },
          ],
        })
      );
      goBack();
    }
  };

  const handleSelect = (value: string) => {
    SetInput({ ...Input, gender: value });
  };

  return (
    <ScrollView style={styless.container}>
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
            <Text
              style={styless.age}
            >{`${Input.age[0]} - ${Input.age[1]}`}</Text>
          </View>
          <View>
            <RangeSlider
              style={{
                width: "100%",
                height: verticalScale(40),
                backgroundColor: "",
              }}
              range={Input.age}
              step={1}
              minimumRange={18}
              minimumValue={18}
              maximumValue={100}
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
              onValueChange={(value) => SetInput({ ...Input, age: value })}
            />
          </View>
          <View style={[styless.agetxt, { marginTop: verticalScale(10) }]}>
            <Text style={styless.age}>Distance</Text>
            <Text style={styless.age}>{`${Input.distance} mi`}</Text>
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
              value={Input.distance}
              onValueChange={(value) => SetInput({ ...Input, distance: value })}
              thumbStyle={styless.thumb}
              minimumTrackTintColor={COLORS.primaryColor}
              maximumTrackTintColor="rgba(152, 147, 148, 0.1)"
            />
          </View>
          {detail.map((item, index) => {
            const fieldKey = item.key;
            return (
              <TouchableOpacity
                style={styless.item}
                key={index}
                onPress={() =>
                  item.onPress &&
                  item.onPress(
                    fieldKey !== "gender" &&
                      generateLabelArray(
                        Input[fieldKey],
                        fieldKey == "interests"
                          ? "interest_name"
                          : "community_name"
                      )
                  )
                }
              >
                <Text style={[styless.age, { flexGrow: 0.25 }]}>
                  {item.label}
                </Text>
                <View style={styless.icnview}>
                  {fieldKey == "gender" ? (
                    <Text
                      numberOfLines={1}
                      style={[
                        styless.age,
                        {
                          textTransform: "capitalize",
                          flex: 1,
                          textAlign: "right",
                        },
                      ]}
                    >
                      {hasValue(Input[item.key]) ? Input[fieldKey] : "Select"}
                    </Text>
                  ) : (
                    <Text
                      numberOfLines={1}
                      style={[styless.age, { flex: 1, textAlign: "right" }]}
                    >
                      {Input[fieldKey]?.length > 0
                        ? generateLabelString(
                            Input[fieldKey],
                            fieldKey == "interests"
                              ? "interest_name"
                              : "community_name"
                          )
                        : "Select"}
                    </Text>
                  )}
                  <Image source={ICONS.rightArrow} style={styless.icn} />
                </View>
              </TouchableOpacity>
            );
          })}
          <View
            style={[
              styless.boxContainer,
              planDetails?.groupSize ?? planData?.groupSize == 2
                ? styless.pairContainer
                : styless.groupContainer,
            ]}
          >
            {Array.from({
              length: planDetails?.groupSize ?? planData?.groupSize ?? 0,
            }).map((_, index) => {
              const hasProfileImage = userInfo.profilePhotoUrls?.[0];

              return index == 0 ? (
                <FastImage
                  key={index}
                  source={{ uri: hasProfileImage }}
                  style={styless.requestImage}
                  resizeMode="cover"
                />
              ) : (
                <TouchableOpacity
                  key={index}
                  style={[
                    styless.request,
                    (groupId ?? index) == selectedGroup && {
                      backgroundColor: "rgba(243, 245, 39, 0.4)",
                    },
                  ]}
                  onPress={() => setSelectedGroup(groupId ?? index)}
                  activeOpacity={0.5}
                >
                  <Icon
                    icon={ICONS.addUser}
                    iconStyle={[styless.addUserIcon]}
                    onPress={() => {}}
                    disabled={true}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
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
      <CustumModal
        headerName={STRINGS.gender}
        selectedValue={Input.gender}
        isVisible={isModalVisible}
        options={genderOptions}
        onClose={() => setModalVisible(false)}
        onSelect={(item) => handleSelect(item)}
      />
    </ScrollView>
  );
};

export default BoxComponent(Preference);
