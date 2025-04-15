import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
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
import store, { AppDispatch, RootState } from "@/store/store";
import CommonMainHeaer from "@/components/CommonMainHeaer";
import {
  getAllPlanPreferences,
  onMarkAsFavorite,
  setPlanDetails,
  setUserLocation,
} from "@/redux/slices/userSlice";
import FastImage from "react-native-fast-image";
import { signOut } from "@/redux/services/authServices";
import { format } from "date-fns";
import Icon from "@/components/Icon";
import { getCurrentPosition, requestLocationPermission } from "@/utils/helper";

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const styless = useMemo(() => styles(theme), [theme]);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { isLoading, nextCursor, isFavoriteLoading } = useSelector(
    (state: RootState) => state.user
  );
  const preferencesListData = store?.getState()?.user?.preferencesListData;
  console.log("🚀 ~ HomeScreen ~ preferencesListData:", preferencesListData);
  const [selectedTab, setSelectedTab] = useState("all");
  const dummyImage = require("@/assets/image/demoPost.jpeg");

  const onBoxPress = (id: number) => {
    navigate(NAMES.join, {
      planId: id,
    });
  };

  const onChangeTap = (tab: string) => {
    setSelectedTab(tab);
    getAllPlanData(tab == "all" ? undefined : tab);
  };

  //!!  Paggination Is Pending Due to Query Params is not worked in API
  const getAllPlanData = (type?: string, cursor?: number) => {
    let url = "plans?limit=10";
    if (cursor) {
      url += `&cursor=${cursor}`;
    }
    if (type) {
      url += `&type=${type}`;
    }
    dispatch(
      getAllPlanPreferences({
        url: url,
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

  const onNavigateToUserProfile = (userID: number) => {
    navigate(NAMES.userProfile, {
      userId: userID,
    });
  };

  const renderItem = ({ item }: { item: getAllPreferences }) => (
    <View style={styless.box}>
      <TouchableOpacity
        style={styless.userNameView}
        onPress={() => onNavigateToUserProfile(item?.user?.id)}
      >
        <Image
          style={styless.userImage}
          source={{ uri: item?.user?.profilePhotoUrls?.[0] ?? "" }}
        />
        <Text style={styless.userNameText}>{item?.user.username}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onBoxPress(item?.id)}>
        <FastImage
          style={styless.imageBackground}
          source={item.imageUrl ? { uri: item?.imageUrl } : dummyImage}
        ></FastImage>
      </TouchableOpacity>
      <View style={styless.userDetailsView}>
        <BlurView style={styless.blurView} blurType="dark" blurAmount={1} />
        <View style={styless.detailsContainer}>
          <Text style={styless.userName}>{item?.name}</Text>
          <View style={styless.directionView}>
            <Image style={styless.canderIcon} source={ICONS?.calanderIcon} />
            <Text style={styless.timeText}>
              {format(item?.dateTime, "dd/MM/yyyy")}
            </Text>
          </View>
        </View>
        <View style={styless.directionView}>
          <Icon
            icon={ICONS.messages}
            iconStyle={styless.leftIcon}
            onPress={() => navigation.navigate(NAMES.chatList)}
          />
          <Icon
            icon={!!item?.isFavourite ? ICONS.heartFavorite : ICONS.heart}
            iconStyle={[styless.leftIcon]}
            onPress={() => onMarkAsFavoritePlan(item?.id, !item?.isFavourite)}
          />
        </View>
      </View>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styless.noDataTextContainer}>
      <Text style={[styless.name]}>{"No Data Found"}</Text>
    </View>
  );

  useEffect(() => {
    setSelectedTab("all");
    getAllPlanData();
    dispatch(setPlanDetails(undefined));
  }, []);

  useEffect(() => {
    const checkPermission = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        const coors = await getCurrentPosition();
        dispatch(
          setUserLocation({
            latitude: coors?.coords?.latitude,
            longitude: coors?.coords?.longitude,
          })
        );
      } else {
        Alert.alert(
          "Location Permission",
          "Please enable location permission in your device settings to use this feature.",
          [
            {
              text: "Go to Settings",
              onPress: () => Linking.openSettings(),
              style: "destructive",
            },
            {
              text: "Cancel",
            },
          ],
          { cancelable: false }
        );
      }
    };

    checkPermission();
  }, []);

  return (
    <View style={styless.container}>
      {isLoading || isFavoriteLoading ? (
        <ActivityIndicator style={styless.activityIndicatior} />
      ) : null}
      <CommonMainHeaer />
      <HomeTab setSelectedTab={onChangeTap} selectedTab={selectedTab} />
      <FlatList
        data={preferencesListData}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styless.boxContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index?.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!!nextCursor) {
            getAllPlanData(selectedTab, nextCursor);
          }
        }}
      />
    </View>
  );
};

export default BoxComponent(HomeScreen);
