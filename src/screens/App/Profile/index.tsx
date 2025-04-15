import React, { useEffect, useMemo, useState } from "react";
import { styles } from "./styles";
import { useTheme } from "@/hooks/useTheme";
import BoxComponent from "@/hoc/OuterView";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "@/components/Header";
import { goBack, navigation } from "@/navigation/rootNavigation";
import { ICONS, INTERESTS } from "@/constants";
import Button from "@/components/Button";
import PostList from "./component/PostList/PostList";
import EventList from "./component/EventList/EventList";
import { RouteProp, useIsFocused, useRoute } from "@react-navigation/native";
import { NAMES } from "@/navigation/name";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import FastImage from "react-native-fast-image";
import Imagemodal from "../Create/component/Uploadimagemodal/imahemodal";
import ImagePicker from "react-native-image-crop-picker";

import { ParamListTypes } from "@/constants/types";
import {
  onGetOrganizerProfile,
  onMarkAsFavorite,
  resetProfileData,
} from "@/redux/slices/userSlice";
import {
  onGetCreatedPlanList,
  onGetFavoritePlan,
  onGetJoinPlan,
  onMarkAsFavoritePost,
  onUnfavoritePlan,
  resetAllData,
} from "@/redux/slices/postSlice";

export enum EProfileTab {
  Posts = "Posts",
  Created = "Created",
  Joined = "Joined",
  View = "View",
  Favorites = "Favorites",
}

const tabs: EProfileTab[] = [
  EProfileTab.Posts,
  EProfileTab.Created,
  EProfileTab.Joined,
];

const viewTabs: EProfileTab[] = [EProfileTab.Created, EProfileTab.Joined];

const loginUserTab: EProfileTab[] = [
  EProfileTab.Posts,
  EProfileTab.View,
  EProfileTab.Favorites,
];

const Profile = () => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const route = useRoute<RouteProp<ParamListTypes, "profile">>();
  const userID = route.params?.userId;
  const tab = userID ? tabs : loginUserTab;
  const [selectedTab, setSelectedTab] = useState<EProfileTab>(
    EProfileTab.Posts
  );
  const [innnerTab, setInnerTab] = useState<EProfileTab>(EProfileTab.Created);
  const focus = useIsFocused();
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
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, organizarProfile, isLoading, isFavoriteLoading } =
    useSelector((state: RootState) => state.user);
  const {
    createdPlanList,
    joinedPlanList,
    favoriteList,
    isFavoriteLoading: loading,
  } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (!!userID) {
      dispatch(
        onGetOrganizerProfile({
          url: `auth/get-user-by-id/${userID}`,
          userToken,
        })
      );
    }
  }, [userID]);

  useEffect(() => {
    if (focus) {
      const userId = userID ?? userInfo?.userId;
      dispatch(
        onGetCreatedPlanList({
          url: `plans/get/my-plans/${userId}`,
          userToken,
        })
      );

      dispatch(
        onGetJoinPlan({
          url: `plans/get/joined-plans/${userId}`,
          userToken,
        })
      );

      if (!userID) {
        dispatch(
          onGetFavoritePlan({
            url: `plans/interaction/favorite/${userId}`,
            userToken,
          })
        );
      }
    }
    return () => {
      dispatch(resetAllData());
    };
  }, [focus]);

  useEffect(() => {
    return () => {
      dispatch(resetProfileData({}));
    };
  }, []);

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
      console.log(response.filename);

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

  const PassionTag = ({ emoji, text }: { emoji: string; text: string }) => (
    <View style={style.passionTag}>
      <Text style={style.passionEmoji}>{emoji}</Text>
      <Text style={style.passionText}>{text}</Text>
    </View>
  );

  const TabButton = ({
    title,
    isActive,
    onPress,
  }: {
    title: EProfileTab;
    isActive: boolean;
    onPress: (tab: EProfileTab) => void;
  }) => (
    <TouchableOpacity style={style.tabButton} onPress={() => onPress(title)}>
      <Text style={[style.tabText, isActive && style.activeTabText]}>
        {title}
      </Text>
      {isActive && <View style={style.activeTabIndicator} />}
    </TouchableOpacity>
  );

  const renderInnerTab = () => {
    switch (innnerTab) {
      case EProfileTab.Created:
        return (
          <EventList
            eventList={createdPlanList}
            isLoading={loading}
            onFavoritePress={
              !userID ? (planID, isFavourite) =>
              onMarkAsFavoritePlan(planID, !isFavourite, EProfileTab.Created): undefined
            }
          />
        );
      case EProfileTab.Joined:
        return (
          <EventList
            eventList={joinedPlanList}
            isLoading={loading}
            onFavoritePress={
              !userID ? (planID, isFavourite) =>
              onMarkAsFavoritePlan(planID, !isFavourite, EProfileTab.Created): undefined
            }
          />
        );
    }
  };

  const markUnFavoritePlan = (planID: number) => {
    dispatch(
      onMarkAsFavorite({
        url: "plans/interaction/favorite",
        data: {
          planId: planID,
          isFavourite: false,
        },
        userToken,
      })
    );
    dispatch(onUnfavoritePlan(planID));
  };

  const onMarkAsFavoritePlan = (
    planId: number,
    isFavourite: boolean,
    type: string
  ) => {
    dispatch(
      onMarkAsFavoritePost({
        url: "plans/interaction/favorite",
        data: {
          planId: planId,
          isFavourite: isFavourite,
        },
        userToken,
        extraData: {
          type: type,
        },
      })
    );
  };

  const renderTabDetails = () => {
    switch (selectedTab) {
      case EProfileTab.Posts:
        return (
          <PostList
            onPressPlusIcon={() => navigation.navigate(NAMES.createPost)}
            userId={userID ?? userInfo?.userId}
          />
        );
      case EProfileTab.Created:
        return (
          <EventList
            eventList={createdPlanList}
            isLoading={loading}
            onFavoritePress={(planID, isFavourite) =>
              onMarkAsFavoritePlan(planID, !isFavourite, EProfileTab.Created)
            }
          />
        );

      case EProfileTab.View:
        return (
          <>
            <View style={style.tabsContainer}>
              {viewTabs.map((tab, index) => (
                <TabButton
                  key={"tab_" + index}
                  title={tab}
                  isActive={innnerTab === tab}
                  onPress={(title) => setInnerTab(title)}
                />
              ))}
            </View>
            {renderInnerTab()}
          </>
        );

      case EProfileTab.Joined:
        return (
          <EventList
            eventList={joinedPlanList}
            isLoading={loading}
            onFavoritePress={(planID, isFavourite) =>
              onMarkAsFavoritePlan(planID, !isFavourite, EProfileTab.Joined)
            }
          />
        );
      case EProfileTab.Favorites:
        return (
          <EventList
            eventList={favoriteList}
            onFavoritePress={(planID) => markUnFavoritePlan(planID)}
            isLoading={isFavoriteLoading}
          />
        );
    }
  };

  const mappedInterests = useMemo(() => {
    if (!userInfo?.interests || userInfo?.interests?.length === 0) return [];

    return userInfo?.interests
      .map(({ interest_name }) => {
        const interest = INTERESTS.find(({ label }) => label === interest_name);
        return interest ? interest : { emoji: "❓", label: interest_name };
      })
      .filter(Boolean);
  }, [userInfo.interests]);

  return (
    <>
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
            onPress: () => (userID ? "" : navigation.navigate(NAMES.settings)),
            icon: userID ? ICONS.more : ICONS.setting,
            // icon: ICONS.more,
            iconStyle: style.iconStyle,
          }}
        />
        {isLoading ? (
          <ActivityIndicator style={style.activityLoader} />
        ) : (
          <ScrollView>
            <View style={style.profileSection}>
              <FastImage
                source={{
                  uri:
                    organizarProfile?.profilePhotoUrls?.[0] ??
                    userInfo?.profilePhotoUrls?.[0] ??
                    dummyImage,
                }}
                style={style.profileImage}
              />
              <Text style={style.name}>
                {organizarProfile?.firstName ?? userInfo?.firstName}
              </Text>
              <Text style={style.handle}>
                {organizarProfile?.username ?? userInfo?.username}
              </Text>
              {organizarProfile?.userBio ||
                (userInfo.userBio && (
                  <Text style={style.bio}>
                    {organizarProfile?.userBio ?? userInfo.userBio ?? ""}
                  </Text>
                ))}
              {!userID ? (
                <Button
                  title={"Edit profile"}
                  viewstyle={style.bottomView}
                  textStyle={style.btnText}
                  onPress={() => navigation.navigate(NAMES.editprofile)}
                />
              ) : (
                <Button
                  title={"Message"}
                  viewstyle={style.bottomView}
                  textStyle={style.btnText}
                  onPress={() => navigation.navigate(NAMES.chatList)}
                />
              )}
              {mappedInterests.length > 0 && (
                <View style={style.passionsContainer}>
                  <Text style={style.passionsTitle}>Passions</Text>
                  <View style={style.passionsGrid}>
                    {mappedInterests.map((interest, index) => (
                      <PassionTag
                        key={"passions_" + index}
                        emoji={interest.emoji}
                        text={interest.label}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>
            <View style={style.tabsContainer}>
              {tab.map((tab, index) => (
                <TabButton
                  key={"tab_" + index}
                  title={tab}
                  isActive={selectedTab === tab}
                  onPress={(title) => setSelectedTab(title)}
                />
              ))}
            </View>
            {renderTabDetails()}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default BoxComponent(Profile);
