import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BoxComponent from "@/hoc/OuterView";
import styles from "./styles";
import { useTheme } from "@/hooks/useTheme";
import { ICONS } from "@/constants";
import { goBack } from "@/navigation/rootNavigation";
import { COLORS } from "@/constants/colors";
import Icon from "@/components/Icon";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getMessageListRequest, sendMessageRequest } from "@/redux/slices/chatSlice";
import { MessageItem } from "@/constants/types";
import moment from "moment";
import { formatTimestamp } from "@/utils/helper";

const Chats = ({ route }: any) => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);

  const [messageText, setMessageText] = useState('');

  const { recieverData } = route.params ?? null;

  const dispatch = useDispatch<AppDispatch>();
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { chatMessages } = useSelector((state: RootState) => state.chat);
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(
      getMessageListRequest({
        url: "messages/get-message",
        userToken,
        params: {
          senderId: userInfo.userId,
          receiverId: recieverData?.id,
          page: 1,
          pageSize: 20,
          sortOrder: "DESC",
        },
      })
    );
  }, []);

  type Message = {
    id: string;
    sender: "me" | "other";
    type: "text" | "audio";
    text?: string;
    audioDuration?: string;
    timestamp: string;
    date: string;
  };

  // const messages: Message[] = [
  //   {
  //     id: "1",
  //     sender: "other",
  //     type: "text",
  //     text: "Hi, How’s going on?",
  //     timestamp: "12:30 AM",
  //     date: "Yesterday",
  //   },
  //   {
  //     id: "2",
  //     sender: "me",
  //     type: "text",
  //     text: "Well it’s good but you know about that 😎",
  //     timestamp: "12:33 AM",
  //     date: "Yesterday",
  //   },
  //   {
  //     id: "2",
  //     sender: "me",
  //     type: "text",
  //     text: "Well it’s good but you know about that 😎",
  //     timestamp: "12:33 AM",
  //     date: "Yesterday",
  //   },
  //   {
  //     id: "2",
  //     sender: "me",
  //     type: "text",
  //     text: "Well it’s good but you know about that 😎",
  //     timestamp: "12:33 AM",
  //     date: "Yesterday",
  //   },
  //   {
  //     id: "3",
  //     sender: "other",
  //     type: "text",
  //     text: "Do you want Starbucks? 😆",
  //     timestamp: "12:38 AM",
  //     date: "Yesterday",
  //   },
  //   {
  //     id: "4",
  //     sender: "me",
  //     type: "text",
  //     text: "That would be awesome!",
  //     timestamp: "1:40 AM",
  //     date: "Today",
  //   },
  //   {
  //     id: "4",
  //     sender: "me",
  //     type: "text",
  //     text: "That would be awesome!",
  //     timestamp: "1:40 AM",
  //     date: "Today",
  //   },
  //   {
  //     id: "4",
  //     sender: "me",
  //     type: "text",
  //     text: "That would be awesome!",
  //     timestamp: "1:40 AM",
  //     date: "Today",
  //   },
  // ];

  const renderMessage = ({ item }: { item: MessageItem }) => {
    const isSentByMe = item.senderId === userInfo.userId;
    return (
      <View style={isSentByMe ? style.myMessage : style.otherMessage}>
        <View
          style={[
            style.messageContainer,
            {
              backgroundColor: isSentByMe
                ? COLORS.primaryColor
                : theme.colors.headerBorder,
            },
          ]}
        >
          {/* {item.type === "text" ? ( */}
          <Text
            style={[
              style.messageText,
              {
                color: isSentByMe ? COLORS.white : theme.colors.black,
              },
            ]}
          >
            {item.content}
          </Text>
          {/* ) : (
          <View style={style.audioMessage}>
            <View style={style.audioWave} />
                        <Text style={style.audioDuration}>
                            {item.audioDuration}
                        </Text>
          </View>
        )} */}
        </View>
        <Text
          style={[
            style.timestamp,
            {
              alignSelf: isSentByMe ? "flex-end" : "flex-start",
            },
          ]}
        >
          {moment(item.createdAt).format("hh:mm A")}
        </Text>
      </View>
    );
  };

  const groupedMessages = () => {
    const grouped: {
      [key: string]: (MessageItem | { type: "header"; date: string })[];
    } = {};
    chatMessages?.messages?.forEach((msg) => {
      const messageDate = moment(msg.createdAt).format("DD MMM YYYY");
      if (!grouped[messageDate]) {
        grouped[messageDate] = [{ type: "header", date: messageDate }];
      }
      grouped[messageDate].push(msg);
    });
    // return Object.values(grouped).flat(); // Reverse for inverted FlatList
    return Object.values(grouped).flat().reverse(); // Reverse for inverted FlatList
  };

  const chatData = groupedMessages();

  const onSendPress = () => {
    dispatch(
      sendMessageRequest({
        url: "messages/send",
        userToken,
        data: {
          senderId: userInfo.userId,
          receiverId: recieverData?.id,
          content: messageText
        },
      })
    );
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 40}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <Header />
      <View style={style.chatContainer}>
        <FlatList
          data={chatData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            item.type === "header" ? (
              <View style={style.stickyHeader}>
                <Text style={style.dateHeader}>{item?.date}</Text>
              </View>
            ) : (
              renderMessage({ item })
            )
          }
          showsVerticalScrollIndicator={false}
          inverted={true}
          removeClippedSubviews={false}
        />
        <View style={style.inputContainer}>
          <View style={style.rowView}>
            <TouchableOpacity style={style.camera}>
              <Icon
                icon={ICONS.Cameraicon}
                iconStyle={[style.iconSize, { tintColor: theme.colors.black }]}
              />
            </TouchableOpacity>
            <TextInput
              style={style.input}
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Type something..."
              placeholderTextColor={COLORS.lightFont}
            />
          </View>
          <TouchableOpacity style={style.send} onPress={onSendPress} > 
            <Icon icon={ICONS.send} iconStyle={style.iconSize} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BoxComponent(Chats);
