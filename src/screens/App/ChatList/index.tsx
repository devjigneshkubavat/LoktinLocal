import React, { useEffect, useMemo } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import styles from "./styles";
import BoxComponent from "@/hoc/OuterView";
import { ICONS } from "@/constants";
import { goBack, navigation } from "@/navigation/rootNavigation";
import { NAMES } from "@/navigation/name";
import Header from "@/components/Header";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getChatsListRequest } from "@/redux/slices/chatSlice";
import { ChatListItem } from "@/constants/types";
import { getTimeDifference } from "@/utils/helper";

const ChatList = () => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);

  const dispatch = useDispatch<AppDispatch>();
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { chatsList } = useSelector((state: RootState) => state.chat);

  type ChatItem = {
    id: string;
    name: string;
    message: string;
    time: string;
    profileImage: string;
    unreadCount?: number;
  };

  useEffect(() => {
    dispatch(
      getChatsListRequest({
        url: "messages/chats-list",
        userToken,
      })
    );
  }, []);

  // const chatList: ChatItem[] = [
  //   {
  //     id: "1",
  //     name: "Jhone Endrue",
  //     message: "Hello how are you? I am going to market. Do you want shopping?",
  //     time: "23 min",
  //     profileImage: "https://your-image-url.com/jhone.png", // Replace with actual image URL
  //     unreadCount: 2,
  //   },
  //   {
  //     id: "2",
  //     name: "Jihane Luande",
  //     message:
  //       "We are on the runways at the military hangar, there is a plane in",
  //     time: "40 min",
  //     profileImage: "https://your-image-url.com/jihane.png",
  //     unreadCount: 1,
  //   },
  //   {
  //     id: "3",
  //     name: "Broman Alexander",
  //     message: "I received my new watch that I ordered from Amazon.",
  //     time: "1 hr",
  //     profileImage: "https://your-image-url.com/broman.png",
  //   },
  //   {
  //     id: "4",
  //     name: "Zack Jr",
  //     message:
  //       "I just arrived in front of the school. I’m waiting for you hurry up!",
  //     time: "1 hr",
  //     profileImage: "https://your-image-url.com/zack.png",
  //   },
  //   {
  //     id: "5",
  //     name: "Zack Jr",
  //     message:
  //       "I just arrived in front of the school. I’m waiting for you hurry up!",
  //     time: "1 hr",
  //     profileImage: "https://your-image-url.com/zack.png",
  //   },
  //   {
  //     id: "6",
  //     name: "Zack Jr",
  //     message:
  //       "I just arrived in front of the school. I’m waiting for you hurry up!",
  //     time: "1 hr",
  //     profileImage: "https://your-image-url.com/zack.png",
  //   },
  //   {
  //     id: "7",
  //     name: "Zack Jr",
  //     message:
  //       "I just arrived in front of the school. I’m waiting for you hurry up!",
  //     time: "1 hr",
  //     profileImage: "https://your-image-url.com/zack.png",
  //   },
  // ];

  const RenderItem: React.FC<{ item: ChatListItem; index: number }> = ({
    item,
    index,
  }) => (
    <TouchableOpacity
      style={style.listView}
      onPress={() =>
        navigation.navigate(NAMES.chats, { recieverData: item.user })
      }
    >
      <View style={style.imageContainer}>
        <Image
          style={style.image}
          source={{
            uri: "https://randomuser.me/api/portraits/men/1.jpg",
          }}
        />
      </View>
      <View style={style.detailsView}>
        <Text style={style.nameText}>{item.user.username}</Text>
        <Text style={style.detailsText}>{item.lastMessage.content}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>{getTimeDifference(item.lastMessage.timestamp)}</Text>
        <View style={style.badge}>
          <Text style={style.badgeText}>{1}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={style.container}>
      <Header
        centerText="Messages"
        leftIcon={true}
        leftView={{
          onPress: () => {
            goBack();
          },
          icon: ICONS.left_arrow,
        }}
      />
      <FlatList
        data={chatsList}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} />
        )}
        keyExtractor={(item) => item.user.id.toString()}
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default BoxComponent(ChatList);
