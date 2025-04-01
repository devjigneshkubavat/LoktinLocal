import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { BlurView } from "@react-native-community/blur";

import styles from "./styles";
import { ICONS } from "@/constants";
import { NAMES } from "@/navigation/name";
import HomeTab from "@/components/HomeTab";
import { useTheme } from "@/hooks/useTheme";
import BoxComponent from "@/hoc/OuterView";
import { getAllPreferences } from "@/constants/types";
import { navigate, navigation } from "@/navigation/rootNavigation";
import { AppDispatch, RootState } from "@/store/store";
import CommonMainHeaer from "@/components/CommonMainHeaer";
import {
  getAllPlanPreferences,
  onMarkAsFavorite,
  setPlanDetails,
} from "@/redux/slices/userSlice";
import FastImage from "react-native-fast-image";
import { signOut } from "@/redux/services/authServices";
import { format } from "date-fns";
import Icon from "@/components/Icon";

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const styless = useMemo(() => styles(theme), [theme]);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { preferencesListData, isLoading } = useSelector(
    (state: RootState) => state.user
  );
  const [selectedTab, setSelectedTab] = useState("all");
  const [planPreferences, setPlanPreferences] = useState<getAllPreferences[]>(
    []
  );
  const dummyImage = require("@/assets/image/demoPost.jpeg");

  const onBoxPress = (id: number) => {
    navigate(NAMES.join, {
      planId: id,
    });
  };

  //!!  Paggination Is Pending Due to Query Params is not worked in API
  const getAllPlanData = () => {
    dispatch(
      getAllPlanPreferences({
        url: "plans?limit=10",
        data: {},
        userToken,
      })
    );
  };

  const onMarkAsFavoritePlan = (planId: number, isFavourite: boolean) => {
    dispatch(
      onMarkAsFavorite({
        url: "plans/interaction/favorite",
        data: {
          planId: planId,
          isFavourite: isFavourite,
        },
        userToken,
      })
    );
  };

  const renderItem = ({ item }: { item: getAllPreferences }) => (
    <View
      style={styless.box}
    >
      <View style={styless.userNameView}>
        <Image
          style={styless.userImage}
          source={{ uri: item?.user?.profilePhotoUrls?.[0] ?? "" }}
        />
        <Text style={styless.userNameText}>{item?.user.username}</Text>
      </View>
      <TouchableOpacity onPress={() => onBoxPress(item?.id)}>
        <FastImage
          style={styless.imageBackground}
          source={item.imageUrl ? { uri: item?.imageUrl } : dummyImage}
        >
        </FastImage>
      </TouchableOpacity>
      <View style={styless.userDetailsView}>
          <BlurView style={styless.blurView} blurType="dark" blurAmount={1} />
          <View style={styless.detailsContainer}>
            <Text style={styless.userName}>{item?.name}</Text>
            <View style={styless.directionView}>
              <Image style={styless.canderIcon} source={ICONS?.calanderIcon} />
              <Text style={styless.timeText}>{format(item?.dateTime, "dd/MM/yyyy")}</Text>
            </View>
          </View>
          <View style={styless.directionView}>
            <Icon icon={ICONS.messages} iconStyle={styless.leftIcon} onPress={() => navigation.navigate(NAMES.chatList)} />
            <Icon
              icon={item?.isFavourite ? ICONS.heartFavorite : ICONS.heart}
              iconStyle={[styless.leftIcon]}
              onPress={() => onMarkAsFavoritePlan(item?.id, !item?.isFavourite)}
            />
          </View>
        </View>
    </View>
  );

  useEffect(() => {
    getAllPlanData();
    dispatch(setPlanDetails(undefined));
  }, []);

  useEffect(() => {
    const selectedUserPreference = preferencesListData?.filter(
      (item) => item.type.toLowerCase() === selectedTab.toLowerCase()
    );
    setPlanPreferences(
      selectedUserPreference?.length != 0
        ? selectedUserPreference
        : preferencesListData
    );
  }, [selectedTab, preferencesListData]);

  return (
    <View style={styless.container}>
      {isLoading ? (
        <ActivityIndicator style={styless.activityIndicatior} />
      ) : null}
      <CommonMainHeaer />
      <HomeTab setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <FlatList
        data={planPreferences}
        renderItem={renderItem}
        contentContainerStyle={styless.boxContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index?.toString()}
      />
    </View>
  );
};

export default BoxComponent(HomeScreen);
