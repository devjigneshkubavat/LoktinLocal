import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import BoxComponent from "@/hoc/OuterView";
import { goBack } from "@/navigation/rootNavigation";
import { ICONS } from "@/constants";
import { useTheme } from "@/hooks/useTheme";
import style from "./style";
import Button from "@/components/Button";
import { sendReportRequest } from "@/redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

const MessageModeration = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const styles = useMemo(() => style(theme), [theme]);
  const [modalVisible, setModalVisible] = useState(false);

  const { userToken } = useSelector((state: RootState) => state.auth);

  const handleModal = () => {
    setModalVisible((prev) => !prev);
  };

  const handleSubmit = () => {
    const message = {
      reportMassge: " hello",
    };
    dispatch(
      sendReportRequest({
        url: "report/send-report",
        userToken,
        data: message,
      })
    );
    setModalVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={true}
        centerText="Join"
        viewstyle={styles.header}
        leftView={{
          onPress: goBack,
          icon: ICONS.left_arrow,
        }}
      />
      <View style={styles.item}>
        <View>
          <Text style={styles.title}>What do you want to report?</Text>
          <Text style={styles.text}>
            We value your experience on our platform and want to ensure
            everything runs smoothly. If you encounter any issues, notice a bug,
            or have concerns about another user, we encourage you to share your
            feedback with us. Your input is incredibly important in helping us
            improve and maintain a safe, enjoyable community. Rest assured, any
            report you make is completely anonymous, so you can share freely
            with confidence. Thank you for helping us create the best experience
            possible!
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.item} onPress={handleModal}>
        <Text style={styles.itemTitle}>Report a bug</Text>
        <Image source={ICONS.rightArrow} style={styles.rightImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={handleModal}>
        <Text style={styles.itemTitle}>Report a user</Text>
        <Image source={ICONS.rightArrow} style={styles.rightImage} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Can you tell us what happened?
              </Text>
            </View>
            <TextInput
              style={styles.textinput}
              multiline={true}
              placeholder="Share your experience."
              textAlign={"left"}
              numberOfLines={4}
            />
            <Button
              title="Submit"
              viewstyle={styles.bottomView}
              textStyle={styles.btnText}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BoxComponent(MessageModeration);
