import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
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
import { clearChatRequest, deleteMessageRequest, getMessageListRequest, sendMessageRequest, updateMessageRequest } from "@/redux/slices/chatSlice";
import { MessageItem } from "@/constants/types";
import moment from "moment";
import { formatTimestamp } from "@/utils/helper";
import Modal from "react-native-modal";
import { verticalScale } from "@/utils/metrics";


const Chats = ({ route }: any) => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const inputRef: MutableRefObject<TextInput | null> = useRef(null);

  const [messageText, setMessageText] = useState('');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isEditMessage, setIsEditMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isVisibleClearAllModal, setIsVisibleClearAllModal] = useState<boolean>(false);
  
  const { recieverData } = route.params ?? null;  

  const dispatch = useDispatch<AppDispatch>();
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { chatMessages } = useSelector((state: RootState) => state.chat);
  const { userInfo } = useSelector((state: RootState) => state.user);

  console.log("chatMessages",chatMessages);

  const apiCallForGetChat = () => {
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
  }

  useEffect(() => {
    apiCallForGetChat();
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
      <TouchableOpacity style={isSentByMe ? style.myMessage : style.otherMessage} onPress={() => {
        setModalVisible(true);
        setSelectedMessage(item);
        }}>
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
      </TouchableOpacity>
    );
  };

  // const groupedMessages = () => {
  //   const grouped: {
  //     [key: string]: (MessageItem | { type: "header"; date: string })[];
  //   } = {};
  //   chatMessages?.messages?.forEach((msg) => {
  //     const messageDate = moment(msg.createdAt).format("DD MMM YYYY");
  //     if (!grouped[messageDate]) {
  //       grouped[messageDate] = [{ type: "header", date: messageDate }];
  //     }
  //     grouped[messageDate].push(msg);
  //   });
  //   // return Object.values(grouped).flat(); // Reverse for inverted FlatList
  //   return Object.values(grouped).flat().reverse(); // Reverse for inverted FlatList
  // };

  const groupedMessages = () => {
    const grouped: { [key: string]: MessageItem[] } = {};
  
    chatMessages?.messages?.forEach((msg) => {
      const messageDate = moment(msg.createdAt).format("DD MMM YYYY");
      if (!grouped[messageDate]) {
        grouped[messageDate] = [];
      }
      grouped[messageDate].push(msg);
    });
  
    const sortedMessages = Object.entries(grouped).map(([date, messages]) => {
      messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      return [{ type: "header", date }, ...messages];
    });
  
    return sortedMessages.flat().reverse()
  };
  
  const chatData = groupedMessages();

  function sortMessages(data) {
  let filteredMessages = data.filter(msg => msg.type !== "header");

    // Step 2: Sort messages by createdAt (ascending order)
    filteredMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    // Step 3: Insert missing headers
    let result = [];
    let lastDate = null;

    filteredMessages.forEach(msg => {
        // Extract message date in "DD MMM YYYY" format
        let messageDate = new Date(msg.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        // If a new date is encountered, add a header before the message
        if (messageDate !== lastDate) {
            result.push({ type: "header", date: messageDate });
            lastDate = messageDate;
        }

        // Add the actual message
        result.push(msg);
    });

    return result;
}



const sortedMessages = sortMessages(chatData);


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
    setTimeout(() => {
      setMessageText("");
      apiCallForGetChat();
      Keyboard.dismiss();
    }, 2000)
  }

  const handleEditPress = () => {
    if(selectedMessage?.id){
      dispatch(
        updateMessageRequest({
          url: `messages/update-message/${selectedMessage?.id}`,
          userToken,
          data : {
            content: messageText
          }
        })
      )
      setTimeout(() => {
        apiCallForGetChat();
        setModalVisible(false);
        setIsEditMessage(false);
        setMessageText("");
        Keyboard.dismiss();
      },2000)
    }
  }

  const apiCallForDeleteMessage = () => {
    if(selectedMessage?.id){
      setIsLoading(true);
      dispatch(
        deleteMessageRequest({
          url: `/messages/delete-message/${selectedMessage?.id}`,
          userToken,
        })
      );
      setTimeout(() => {
        setIsLoading(false);
        apiCallForGetChat();
        setModalVisible(false);
      },2000)
   
    }

       // dispatch(
    //   clearChatRequest({
    //     url: `messages/chat-All-Clear/${userInfo.userId}`,
    //     userToken,
    //   })
    // );
  };

  const handleClearAllChat = () => {
    setIsLoading(true);
    dispatch(
      clearChatRequest({
        url: `messages/chat-All-Clear/${recieverData?.id}`,
        userToken,
      })
    );
    setTimeout(() => {
      setIsLoading(false);
      apiCallForGetChat();
      setModalVisible(false);
      setIsVisibleClearAllModal(false);
    }, 2000)
  };

  const handleEdit = () => {
    inputRef.current.focus();
    setIsEditMessage(true);
    setMessageText(selectedMessage?.content);
    setModalVisible(false);
  };
  
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 40}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <Header
        title={recieverData?.username}
        source={{ uri: recieverData?.profilePhotoUrls[0] }}
        onPressDots={() => {
          setModalVisible(true);
          setIsVisibleClearAllModal(true);
        }}
      />
      {isLoading && (
        <ActivityIndicator style={style.activityIndicatior} size={"large"} />
      )}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
          setIsVisibleClearAllModal(false);
        }}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            width: 200,
            backgroundColor: "white",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          {isVisibleClearAllModal && (
            <TouchableOpacity
              onPress={handleClearAllChat}
              style={{ padding: 10 }}
            >
              <Text style={{ fontSize: 16 }}>Clear All Chat</Text>
            </TouchableOpacity>
          )}
            {!isVisibleClearAllModal && (
              <>
                <TouchableOpacity onPress={handleEdit} style={{ padding: 10 }}>
                  <Text style={{ fontSize: 16 }}>Edit Message</Text>
                </TouchableOpacity>
                <View
                  style={{ height: 1, width: "100%", backgroundColor: "#ccc" }}
                />
                <TouchableOpacity
                  onPress={apiCallForDeleteMessage}
                  style={{ padding: 10 }}
                >
                  <Text style={{ fontSize: 16, color: "red" }}>
                    Delete Message
                  </Text>
                </TouchableOpacity>
              </>
            )}
        </View>
      </Modal>
      <View style={style.chatContainer}>
        <FlatList
          data={sortedMessages || chatData}
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
          // inverted={true}
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
              ref={inputRef}
              style={style.input}
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Type something..."
              placeholderTextColor={COLORS.lightFont}
              onSubmitEditing={() => handleEditPress()}
            />
          </View>
          <TouchableOpacity
            style={style.send}
            onPress={() => {
              isEditMessage ? handleEditPress() : onSendPress();
            }}
          >
            <Image source={ICONS.send} style={{
              height: verticalScale(22),
              aspectRatio: 1,
              objectFit: 'contain',
              tintColor: "white"
            }} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BoxComponent(Chats);
