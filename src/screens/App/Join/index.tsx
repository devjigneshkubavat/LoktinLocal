import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BoxComponent from "@/hoc/OuterView";
import Header from "@/components/Header";
import { useTheme } from "@/hooks/useTheme";
import {
  goBack,
  navigate,
  navigation,
  replace,
} from "@/navigation/rootNavigation";
import { ICONS } from "@/constants";
import styles from "./styles";
import Icon from "@/components/Icon";
import { EventDetails } from "./components/EventDetails/EventDetails";
import EventComments from "./components/EventComments/EventComments";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ParamListTypes } from "@/constants/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Popover from "react-native-popover-view";
import {
  getCommentList,
  getPlanDetails,
  onAddComment,
  onCreateRequest,
  onDeletePlan,
  onMarkAsFavorite,
  setPlanDetails,
} from "@/redux/slices/userSlice";
import FastImage from "react-native-fast-image";
import { COLORS } from "@/constants/colors";
import { NAMES } from "@/navigation/name";
import ConfirmAlert from "@/components/ConfirmAlert";
import Toast from "react-native-toast-message";

const Join = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const style = useMemo(() => styles(theme), [theme]);
  const route = useRoute<RouteProp<ParamListTypes, "join">>();
  const planId = route.params?.planId;
  const { userToken } = useSelector((state: RootState) => state.auth);
  const {
    planDetails,
    isLoading,
    commentList,
    userInfo,
    isNewCommentAdded,
    createdRequestList,
  } = useSelector((state: RootState) => state.user);
  const [isFavourite, setIsFavourite] = useState<boolean>(
    !!planDetails?.isFavourite
  );

  const isCurrentUserFound = userInfo?.userId == planDetails?.userId;
  const isCurrentUserJoined = planDetails?.groupEntries?.some(
    (item) => item?.userId === userInfo.userId
  );
  const isDisableUser =
    isCurrentUserFound || (isCurrentUserJoined && !isCurrentUserFound);

  const [isVisible, setIsVisible] = useState(false);
  const [isPreferenceVisible, setIsPreferenceVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const handleIconPress = (event: any) => {
    const { pageX, pageY } = event.nativeEvent; // Get position of the touch
    setPopoverPosition({ top: pageY, left: pageX });
    setIsPreferenceVisible(true);
  };

  const handleEdit = () => {
    setIsVisible(false);
    navigate(NAMES.createPlan, {
      isUpdate: true,
    });
    console.log("Edit Pressed");
  };

  const handleYesPress = () => {
    setModalVisible(false);
    dispatch(
      onDeletePlan({
        url: `/plans/${planId}`,
        data: {},
        userToken,
      })
    );
  };

  const handleNoPress = () => {
    setModalVisible(false);
  };

  const handleDelete = () => {
    setIsVisible(false);
    setTimeout(() => {
      setModalVisible(true);
    }, 500);
    console.log("Delete Pressed");
  };

  const handlePreference = (id: any) => {
    setIsPreferenceVisible(false);
    navigate(NAMES.preferences, { groupId: id });
  };

  const renderHeaderRightView = () => {
    return (
      <View style={style.iconStyle}>
        <Icon
          icon={ICONS.messages}
          iconStyle={style.iconSize}
          onPress={() => navigation.navigate(NAMES.chatList)}
        />

        {!isCurrentUserFound && (
          <Icon
            icon={isFavourite ? ICONS.starFavorite : ICONS.starOutline}
            iconStyle={[style.iconSize, isFavourite && style.starFavoriteIcon]}
            onPress={() => onMarkAsFavoritePlan(planId, !isFavourite)}
          />
        )}
        {isCurrentUserFound ? (
          <Popover
            isVisible={isVisible}
            from={
              <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Icon disabled icon={ICONS.more} iconStyle={style.iconSize} />
              </TouchableOpacity>
            }
            onRequestClose={() => setIsVisible(false)}
          >
            <View style={style.popoverContent}>
              <TouchableOpacity style={style.menuItem} onPress={handleEdit}>
                <Icon disabled icon={ICONS.edit} iconStyle={style.editIcon} />
                <Text style={style.menuText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.menuItem} onPress={handleDelete}>
                <Icon
                  disabled
                  icon={ICONS.delete}
                  iconStyle={style.deleteIcon}
                />
                <Text style={[style.menuText, { color: "red" }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Popover>
        ) : (
          ""
        )}
      </View>
    );
  };

  const getAllCommentList = () => {
    dispatch(
      getCommentList({
        url: `plans/${planId}/comments`,
        userToken,
      })
    );
  };

  const createJoinRequest = (userId: number, planId: number) => {
    if (isCurrentUserFound) {
      Toast.show({
        type: "error",
        text1: "You are already joined.",
        autoHide: true,
        visibilityTime: 2000,
      });
      return;
    }
    dispatch(
      onCreateRequest({
        url: "join-requests",
        data: {
          userId: userId,
          planId: planId,
          promptAnswer: planDetails?.name,
        },
        userToken,
      })
    );
  };

  const onMarkAsFavoritePlan = (planId: number, isFavourite: boolean) => {
    dispatch(
      onMarkAsFavorite({
        url: "plans/interaction/favorite",
        data: {
          planId: planId,
          isFavourite: isFavourite,
        },
        userToken,
      })
    );

    setIsFavourite(isFavourite);
  };

  const onAddCommentCall = (comment: string) => {
    dispatch(
      onAddComment({
        url: `plans/${planId}/comments`,
        data: {
          userId: userInfo?.userId,
          content: comment,
        },
        userToken,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getPlanDetails({
        url: `plans/${planId}`,
        userToken,
      })
    );

    getAllCommentList();

    return () => {
      dispatch(setPlanDetails(undefined));
    };
  }, [planId]);

  useEffect(() => {
    setIsFavourite(planDetails?.isFavourite ?? false);
  }, [planDetails?.isFavourite]);

  useEffect(() => {
    if (isNewCommentAdded) {
      getAllCommentList();
    }
  }, [isNewCommentAdded]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 40}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <Header
        viewstyle={style.headerstyle}
        leftIcon={true}
        leftView={{
          onPress: () => (isCurrentUserFound ? replace("Tab") : goBack()),
          icon: ICONS.left_arrow,
        }}
        rightView={renderHeaderRightView()}
        centerText={isCurrentUserFound ? "My Plan" : "Join"}
      />
      <ConfirmAlert
        visible={isModalVisible}
        title="Are you sure you want to delete this plan?"
        firstbuttonpress={handleYesPress}
        firstbuttontext="Yes"
        secondbuttonpress={handleNoPress}
        secondbuttontext="No"
        Secondbutton={true}
      />
      {isLoading ? (
        <ActivityIndicator style={style.activityIndicatior} />
      ) : null}
      <ScrollView>
        <EventDetails
          event={planDetails}
          isCurrentUserFound={isCurrentUserFound}
          isCurrentUserJoined={isCurrentUserJoined}
        />
        <View
          style={[
            style.boxContainer,
            planDetails?.groupEntries?.length == 2
              ? style.pairContainer
              : style.groupContainer,
          ]}
        >
          {planDetails?.groupEntries?.map((item, index) => {
            const itemWidth =
              planDetails?.groupEntries?.length == 2 ? "100%" : "50%";
            const hasProfileImage =
              item?.user && item?.user?.profilePhotoUrls?.length != 0;

            return hasProfileImage ? (
              <FastImage
                key={index}
                source={{
                  uri: item.user?.profilePhotoUrls?.[0] ?? "",
                }}
                style={style.requestImage}
                resizeMode="cover"
              />
            ) : (
              <View
                key={index}
                style={[
                  style.request,

                  isDisableUser && style.disableRequestContainer,
                ]}
              >
                {isCurrentUserFound && (
                  <View style={{ position: "absolute", top: 10, right: 10 }}>
                    <Popover
                      isVisible={isPreferenceVisible}
                      from={
                        <TouchableOpacity
                          onPress={(event) => handleIconPress(event)}
                        >
                          <Icon
                            disabled
                            icon={ICONS.more}
                            iconStyle={[
                              style.iconSize,
                              { tintColor: COLORS.primaryColor },
                            ]}
                          />
                        </TouchableOpacity>
                      }
                      onRequestClose={() => setIsPreferenceVisible(false)}
                    >
                      <View style={style.popoverContent}>
                        <TouchableOpacity
                          style={style.menuItem}
                          onPress={() => handlePreference(item?.id)}
                        >
                          <Icon
                            disabled
                            icon={ICONS.Grid}
                            iconStyle={style.gridIcon}
                          />
                          <Text style={style.menuText}>Preference</Text>
                        </TouchableOpacity>
                      </View>
                    </Popover>
                  </View>
                )}
                <Icon
                  icon={ICONS.addUser}
                  iconStyle={[
                    style.addUserIcon,
                    isDisableUser && style.disableUserIcon,
                  ]}
                  disabled={isDisableUser}
                  onPress={() => {
                    createJoinRequest(Number(userInfo?.userId), planId);
                  }}
                />
                <Text
                  style={[
                    style.requestText,
                    isDisableUser && style.disablerequestText,
                  ]}
                  numberOfLines={2}
                >
                  {"Request to join"}
                </Text>
              </View>
            );
          })}
        </View>

        {planDetails?.allowComments && (
          <EventComments
            comments={commentList}
            onSubmitComment={onAddCommentCall}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BoxComponent(Join);
