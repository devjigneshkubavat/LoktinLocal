import React, { useMemo, useState } from "react";
import { styles } from "./styles";
import { useTheme } from "@/hooks/useTheme";
import BoxComponent from "@/hoc/OuterView";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "@/components/Header";
import { goBack } from "@/navigation/rootNavigation";
import { ICONS } from "@/constants";
import Button from "@/components/Button";
// import PostList from "./component/PostList/PostList";
// import EventList from "./component/EventList/EventList";
import { useNavigation } from "@react-navigation/native";
import { NAMES } from "@/navigation/name";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import FastImage from "react-native-fast-image";
import Imagemodal from "../Create/component/Uploadimagemodal/imahemodal";
import ImagePicker from "react-native-image-crop-picker";
import { horizontalScale, verticalScale } from "@/utils/metrics";
import { showToast, showToastMessage } from "@/utils/helper";

export enum EProfileTab {
  Posts = "Posts",
  Created = "Created",
  Joined = "Joined",
}

const tabs: EProfileTab[] = [
  EProfileTab.Posts,
  EProfileTab.Created,
  EProfileTab.Joined,
];

const CreatePost = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);

  const [Input, SetInput] = useState({
    Username: "",
    Name: "",
    Bio: "",
    SelectedImage: {
      base64: "",
      uri: "",
      filename: "",
    },
    Imagemodal: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { userToken } = useSelector((state: RootState) => state.auth);

  console.log("userInfo", userInfo);

  const opencamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((response) => {
      SetInput((pre) => ({ ...pre, Imagemodal: false }));
      SetInput((pre) => ({
        ...pre,
        SelectedImage: {
          base64: "",
          uri: response.path,
          filename: response.filename || "",
        },
      }));
    });
  };

  const opengallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((response) => {
      console.log(response);

      SetInput((pre) => ({ ...pre, Imagemodal: false }));
      SetInput((pre) => ({
        ...pre,
        SelectedImage: {
          base64: "",
          uri: response.path,
          filename: response.filename || "",
          mime: response?.mime
        },
      }));
    });
  };

  console.log("Input?.SelectedImage",Input?.SelectedImage);
  

  const onPressPost = async () => {
    const formData = new FormData();

    formData.append("image", {
      uri: Input?.SelectedImage?.uri,
      name: Input?.SelectedImage?.filename,
      type: Input?.SelectedImage?.mime || "image/jpeg",
    });
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.loktin.app/api/instagram/postImage/${userInfo?.userId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data", // This is needed for file uploads
          },
        }
      );

      const data = await response.json();
      setIsLoading(false);
      showToastMessage("response", data?.message);
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      showToastMessage("response", error?.message || "Something went wrong");
    }
  };

  return (
    <View style={style.container}>
      <Header
        viewstyle={style.headerstyle}
        leftIcon={true}
        leftView={{
          onPress: goBack,
          icon: ICONS.left_arrow,
        }}
        rightIcon={true}
        centerText={"Create a Post"}
      />
      {isLoading && <ActivityIndicator size={'large'}/>}
      <View style={style.profileSection}>
        <View style={{ flex: 1 }}>
          <Text style={style.name}>{"Upload a photo"}</Text>
          <Text style={style.bio}>
            You can upload an image from your device or take a new picture
            directly from your camera. When you're ready, simply hit post!
          </Text>
          <View
            style={[
              style.uploadPhotoContainer,
              Input?.SelectedImage?.uri ? {} : { alignItems: "center" },
            ]}
          >
            <TouchableOpacity
              onPress={() => SetInput((pre) => ({ ...pre, Imagemodal: true }))}
            >
              <Image
                source={
                  Input?.SelectedImage?.uri
                    ? { uri: Input?.SelectedImage?.uri }
                    : require("../../../assets/icons/uploadPhoto.png")
                }
                style={
                  Input?.SelectedImage?.uri
                    ? style.imageStyle
                    : style.uploadImage
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity style={style.postButton} onPress={onPressPost}>
            <Text style={style.btnText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Imagemodal
        visible={Input.Imagemodal}
        onrequestClose={() =>
          SetInput((pre) => ({ ...pre, Imagemodal: false }))
        }
        opencamera={opencamera}
        opengallery={opengallery}
        onclose={() => SetInput((pre) => ({ ...pre, Imagemodal: false }))}
        ontouchable={() => SetInput((pre) => ({ ...pre, Imagemodal: false }))}
      />
    </View>
  );
};

export default CreatePost;
