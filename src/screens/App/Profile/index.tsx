import React, { useMemo, useState } from "react";
import { styles } from "./styles";
import { useTheme } from "@/hooks/useTheme";
import BoxComponent from "@/hoc/OuterView";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "@/components/Header";
import { goBack } from "@/navigation/rootNavigation";
import { ICONS } from "@/constants";
import Button from "@/components/Button";
import PostList from "./component/PostList/PostList";
import EventList from "./component/EventList/EventList";
import { useNavigation } from "@react-navigation/native";
import { NAMES } from "@/navigation/name";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import FastImage from "react-native-fast-image";
import Imagemodal from "../Create/component/Uploadimagemodal/imahemodal";
import ImagePicker from 'react-native-image-crop-picker'

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

const Profile = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const [selectedTab, setSelectedTab] = useState<EProfileTab>(
    EProfileTab.Posts
  );
      const [Input, SetInput] = useState({
          Username: '',
          Name: '',
          Bio: '',
          SelectedImage: {
              base64: '',
              uri: '',
              filename: ''
          },
          Imagemodal: false
      })
  const { userInfo } = useSelector((state: RootState) => state.user);

  
  const dummyImage = "https://randomuser.me/api/portraits/men/1.jpg";

  const passions = [
    { emoji: "🎨", text: "Art and Crafts" },
    { emoji: "🍰", text: "Baking" },
    { emoji: "🌆", text: "Exploring New Cities" },
    { emoji: "💃", text: "Dancing" },
    { emoji: "🐱", text: "Cats" },
    { emoji: "🏕️", text: "Camping" },
    { emoji: "🐶", text: "Dogs" },
    { emoji: "📚", text: "Reading Books" },
    { emoji: "🎮", text: "Gaming" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { userToken } = useSelector((state: RootState) => state.auth);

  // This is the function for update-securities-verifyPhone API
  // const onEditProfilePress = () => {
  //   dispatch(
  //     securityVerifyPhoneRequest({
  //       url: "/update-securities/update-securities-verifyPhone",
  //       userToken,
  //       data: {  
  //         phoneNumber: "+19786159222", 
  //         otp: "50449" 
  //       },
  //     })
  //   );
  // }

  // This is the function for update-securities-setting API
  // const onEditProfilePress = () => {
  //   dispatch(
  //     updateSecuritySettingsRequest({
  //       url: "/update-securities/update-securities-setting",
  //       userToken,
  //       data: {
  //         isEmergencyAllowed: true, 
  //         isLocationSharingAllowed: false,
  //         isCheckInPointAllowed: true,
  //         safeWord:[
  //          {
  //             qus: "what is ai",
  //             aus: "hiii"
  //         }
  //         ], // send array to qus,aus
  //         receiveCheckInReminders: "Everyhour" // "Everyhour", "Every15Minutes", "Every30Minutes", "Every45Minutes"
  //     },
  //     })
  //   );
  // }

  const opencamera = () => {
    ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true
    }).then(response => {
        SetInput(pre => ({ ...pre, Imagemodal: false }))
        SetInput(pre => ({
            ...pre,
            SelectedImage: {
                base64: '',
                uri: response.path,
                filename: response.filename || ''
            }
        }))
    })
}

const opengallery = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
    }).then(response => {
        console.log(response.filename);

        SetInput(pre => ({ ...pre, Imagemodal: false }))
        SetInput(pre => ({
            ...pre,
            SelectedImage: {
                base64: '',
                uri: response.path,
                filename: response.filename || ''
            }
        }))
    })
}

  const PassionTag = ({ emoji, text }: { emoji: string; text: string }) => (
    <View style={style.passionTag}>
      <Text style={style.passionEmoji}>{emoji}</Text>
      <Text style={style.passionText}>{text}</Text>
    </View>
  );

  const TabButton = ({
    title,
    isActive,
  }: {
    title: EProfileTab;
    isActive: boolean;
  }) => (
    <TouchableOpacity
      style={style.tabButton}
      onPress={() => setSelectedTab(title)}
    >
      <Text style={[style.tabText, isActive && style.activeTabText]}>
        {title}
      </Text>
      {isActive && <View style={style.activeTabIndicator} />}
    </TouchableOpacity>
  );

  const renderTabDetails = () => {
    switch (selectedTab) {
      case EProfileTab.Posts:
        return <PostList onPressPlusIcon={() => navigation.navigate(NAMES.createPost)
        }/>;
        break;
      case EProfileTab.Created:
        return <EventList />;
        break;
      case EProfileTab.Joined:
        return <EventList />;
        break;
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
        rightView={{
          onPress: () => navigation.navigate(NAMES.settings),
          icon: ICONS.setting,
          // icon: ICONS.more,
          iconStyle: style.iconStyle,
        }}
      />
      <ScrollView>
        <View style={style.profileSection}>
          <FastImage
            source={{
              uri: userInfo?.profilePhotoUrls?.[0] ?? dummyImage,
            }}
            style={style.profileImage}
          />
          <Text style={style.name}>{userInfo?.firstName}</Text>
          <Text style={style.handle}>{userInfo?.username}</Text>
          <Text style={style.bio}>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley.
          </Text>
          {/* <Button
            title={"Message"}
            viewstyle={style.bottomView}
            textStyle={style.btnText}
            onPress={() => navigation.navigate(NAMES.chats)}
          /> */}
          <Button
            title={"Edit profile"}
            viewstyle={style.bottomView}
            textStyle={style.btnText}
            onPress={() => navigation.navigate(NAMES.editprofile)}
          />
          <View style={style.passionsContainer}>
            <Text style={style.passionsTitle}>Passions</Text>
            <View style={style.passionsGrid}>
              {passions.map((item, index) => (
                <PassionTag
                  key={"passions_" + index}
                  emoji={item.emoji}
                  text={item.text}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={style.tabsContainer}>
          {tabs.map((tab, index) => (
            <TabButton
              key={"tab_" + index}
              title={tab}
              isActive={selectedTab === tab}
            />
          ))}
        </View>
        {renderTabDetails()}
      </ScrollView>
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

export default BoxComponent(Profile);
