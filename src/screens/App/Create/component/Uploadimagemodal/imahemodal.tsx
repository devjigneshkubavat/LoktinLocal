import React from "react";
import { Modal, Text, TouchableNativeFeedback, View } from "react-native";
import { useMemo } from "react";
import styles from "./styles";
import { useTheme } from "@/hooks/useTheme";
import { Photoupload } from "@/constants/types";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { ICONS } from "@/constants";
import { COLORS } from "@/constants/colors";
import { BlurView } from "@react-native-community/blur";

const Imagemodal: React.FC<Photoupload> = ({
  visible,
  onrequestClose,
  opencamera,
  opengallery,
  onclose,
  ontouchable,
}) => {
  const { theme } = useTheme();
  const styless = useMemo(() => styles(theme), [theme]);

  return (
    <Modal
      visible={visible}
      onRequestClose={onrequestClose}
      transparent={true}
      animationType="slide"
    >
      <TouchableNativeFeedback onPress={ontouchable}>
        <View style={styless.modalContainer}>
          <BlurView
            style={styless.absolute}
            blurType="dark"
            blurAmount={5}
            // reducedTransparencyFallbackColor='white'
          />
          <View style={styless.grid}>
            <View style={styless.iconview}>
              <Icon
                icon={ICONS.close}
                iconStyle={styless.iconstyle}
                outerStyle={styless.outerstyle}
                onPress={onclose}
              />
              <Text style={styless.uploadphototxt}>Upload Picture</Text>
              <Icon
                iconStyle={styless.iconstyle}
                outerStyle={styless.outerstyle}
              />
            </View>
            <View style={styless.choiceview}>
              <View style={styless.imgview}>
                <Icon
                  icon={ICONS.Cameraicon}
                  iconStyle={styless.cameraimg}
                  onPress={opencamera}
                />
                <Text style={styless.camreratxt}>Camera</Text>
              </View>
              <View style={styless.imgview}>
                <Icon
                  icon={ICONS.gallary}
                  iconStyle={styless.cameraimg}
                  onPress={opengallery}
                />
                <Text style={styless.camreratxt}>Gallery</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </Modal>
  );
};

export default Imagemodal;
