import BoxComponent from "@/hoc/OuterView";
import { useTheme } from "@/hooks/useTheme";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import style from "./style";
import Header from "@/components/Header";
import { ICONS, IMAGES } from "@/constants";
import { goBack } from "@/navigation/rootNavigation";
import { verticalScale } from "@/utils/metrics";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "@/redux/slices/userSlice";
import { RootState } from "@/store/store";

const Notification = ({}) => {
  const { theme } = useTheme();
  const styless = useMemo(() => style(theme), [theme]);
  const dispatch = useDispatch();
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { isLoading, notificationList } = useSelector(
    (state: RootState) => state.user
  );

  const notifications = [
    {
      id: 1,
      user: "James",
      message: "James has Requested to Join your Square",
      time: "2 days ago",
      avatar: "https://example.com/avatar1.jpg", // Replace with actual image URL
    },
    {
      id: 2,
      user: "James",
      message: "James has Requested to Join your Square",
      time: "2 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 3,
      user: "James",
      message: "James has Requested to Join your Square",
      time: "2 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 4,
      user: "James",
      message: "replied to your post",
      time: "2 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 5,
      user: "James",
      message: "James has Requested to Join your Square",
      time: "2 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 6,
      user: "James",
      message: "James has Requested to Join your Square",
      time: "2 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 7,
      user: "James",
      message: "James has Requested to Join your Square",
      time: "2 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 8,
      user: "James",
      message: "James has Requested to Join your Square",
      time: "2 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 9,
      user: "James",
      message: "Order Tweaked!",
      time: "13 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 10,
      user: "James",
      message: "Order Tweaked!",
      time: "13 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 11,
      user: "James",
      message: "Order Tweaked!",
      time: "13 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 12,
      user: "James",
      message: "Order Tweaked!",
      time: "13 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 13,
      user: "James",
      message: "Order Tweaked!",
      time: "13 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 14,
      user: "James",
      message: "Order Tweaked!",
      time: "13 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 15,
      user: "James",
      message: "Order Tweaked!",
      time: "13 days ago",
      avatar: "https://example.com/avatar1.jpg",
    },
  ];

  const listEmptyView = () => {
    return (
      <View
        style={[
          styless.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Image style={styless.Nodataimg} source={ICONS.nodata} />
        <Text style={styless.Nodata}>No Notifications</Text>
        <Text style={styless.Nomsg}>
          We’ll let you know when there will be something to update you.
        </Text>
      </View>
    );
  };

  useEffect(() => {
    dispatch(
      getNotifications({
        url: "notifications",
        userToken,
      })
    );
  }, []);

  return (
    <View style={styless.container}>
      {isLoading ? (
        <ActivityIndicator style={styless.activityIndicatior} />
      ) : null}
      <Header
        centerText="Notification"
        leftIcon={true}
        viewstyle={styless.header}
        leftView={{
          onPress: () => {
            goBack();
          },
          icon: ICONS.left_arrow,
        }}
      />
      <FlatList
        contentContainerStyle={styless.scroll}
        showsVerticalScrollIndicator={false}
        data={notificationList}
        removeClippedSubviews={false}
        ListEmptyComponent={listEmptyView}
        renderItem={({ item, index }) => (
          <View key={item.id} style={styless.mapconatiner}>
            <View style={styless.imageview}>
              <Image source={ICONS.dummy} style={styless.img} />
            </View>
            <View
              style={{
                width: "65%",
                backgroundColor: "65",
                marginVertical: verticalScale(10),
              }}
            >
              <Text style={styless.msg}>{item.message}</Text>
            </View>
            <View style={styless.dayview}>
              <Text style={styless.day}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default BoxComponent(Notification);
