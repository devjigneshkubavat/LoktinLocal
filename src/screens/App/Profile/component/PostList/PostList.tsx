import React, { useEffect, useMemo } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/hooks/useTheme";
import Icon from "@/components/Icon";
import { ICONS } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import FastImage from "react-native-fast-image";
import { getChatsListRequest } from "@/redux/slices/chatSlice";
import {
  getPostsListRequest,
  sendReportRequest,
} from "@/redux/slices/postSlice";
import { useIsFocused } from "@react-navigation/native";

const PostList = ({ onPressPlusIcon }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  const style = useMemo(() => styles(theme), [theme]);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { postsList } = useSelector((state: RootState) => state.post);

  console.log("postsList", postsList);

  useEffect(() => {
    dispatch(
      getPostsListRequest({
        url: "api/getPost",
        userToken,
      })
    );
  }, [isFocused]);

  const renderSource = (item) => {
    const baseURL = 'https://api.loktin.app/';
    return item?.path?.includes('api.loktin.app') ? item.path : `${baseURL}${item?.path}`;
  };

  return (
    <View style={style.boxContainer}>
      {postsList?.map((item) => (
        <FastImage
          source={{ uri: renderSource(item) }}
          style={style.boxImage}
        />
      ))}
      {/* {userInfo.profilePhotoUrls?.map((item) => (
        <FastImage source={{ uri: item }} style={style.boxImage} />
      ))} */}
      <TouchableOpacity style={style.boxImage} onPress={onPressPlusIcon}>
        <Image source={ICONS.plus} style={style.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default PostList;
