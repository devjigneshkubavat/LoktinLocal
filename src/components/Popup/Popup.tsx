import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, Modal, Dimensions } from "react-native";
import { GestureResponderEvent } from "react-native";

interface Message {
  id: string;
  text: string;
}

const { width, height } = Dimensions.get("window");

const messagesData: Message[] = [
  { id: "1", text: "Hello!" },
  { id: "2", text: "How are you?" },
  { id: "3", text: "Let's meet up!" }
];

const Popup: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(messagesData);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const handleLongPress = (message: Message, event: GestureResponderEvent) => {
    setSelectedMessage(message);
    setModalVisible(true);
    const { pageX, pageY, locationY } = event.nativeEvent;
    
    // Dynamically position menu to prevent overflow
    const popupHeight = 80; // Estimated height of the popup
    const popupWidth = 150; // Estimated width of the popup
    let adjustedTop = pageY + 10; // Default below the message
    let adjustedLeft = pageX;
    
    if (adjustedTop + popupHeight > height) {
      adjustedTop = pageY - popupHeight - 10; // Move above if no space below
    }
    if (adjustedLeft + popupWidth > width) {
      adjustedLeft = width - popupWidth - 10; // Shift left if it overflows right
    }

    setMenuPosition({ top: adjustedTop, left: adjustedLeft });
  };

  const handleEdit = () => {
    Alert.alert("Edit Message", "Feature coming soon!");
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (selectedMessage) {
      setMessages(messages.filter(msg => msg.id !== selectedMessage.id));
    }
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={(event) => handleLongPress(item, event)}
            style={{
              backgroundColor: "#f0f0f0",
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
              alignSelf: "flex-start"
            }}
          >
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={{
              position: "absolute",
              top: menuPosition.top,
              left: menuPosition.left,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 5
            }}
          >
            <TouchableOpacity onPress={handleEdit} style={{ padding: 10 }}>
              <Text style={{ fontSize: 16 }}>Edit Message</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: "#ccc", marginVertical: 5 }} />
            <TouchableOpacity onPress={handleDelete} style={{ padding: 10 }}>
              <Text style={{ fontSize: 16, color: "red" }}>Delete Message</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Popup;
