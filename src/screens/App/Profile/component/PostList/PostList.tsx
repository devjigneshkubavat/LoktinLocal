import React, { useMemo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/hooks/useTheme";
import Icon from "@/components/Icon";
import { ICONS } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import FastImage from "react-native-fast-image";

const PostList = () => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const { userInfo } = useSelector((state: RootState) => state.user);

  return (
    <View style={style.boxContainer}>
      {userInfo.profilePhotoUrls?.map((item) => (
        <FastImage source={{ uri: item }} style={style.boxImage} />
      ))}
      <TouchableOpacity style={style.boxImage}>
        <Icon icon={ICONS.plus} iconStyle={style.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default PostList;
