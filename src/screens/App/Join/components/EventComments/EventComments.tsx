import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { memo, useMemo, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import styles from "./styles";
import { CommentDataProps } from "@/constants/types";
import { COLORS } from "@/constants/colors";
import Icon from "@/components/Icon";
import { ICONS } from "@/constants";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface CommentsProps {
  comments: CommentDataProps[];
  onSubmitComment: (comment: string) => void;
}

const EventComments = (props: CommentsProps) => {
  const { comments } = props;
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const [comment, setComment] = useState<string>("");
  const { userInfo } = useSelector((state: RootState) => state.user);

  const onAddComment = () => {
    if (!comment) return;
    if (comment.trim().length != 0) {
      props.onSubmitComment(comment);
      setComment("");
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>{comments?.length} Comments</Text>
      {comments?.length != 0 &&
        comments?.map((comment) => (
          <View key={comment?.id} style={style.comment}>
            <FastImage
              source={{
                uri:
                  comment?.user?.profilePhotoUrls?.[0] ??
                  userInfo?.profilePhotoUrls?.[0],
              }}
              style={style.avatar}
            />
            <View style={style.commentContent}>
              <View style={style.commentTitle}>
                <Text style={style.username}>
                  @{comment?.user?.username ?? userInfo.username}
                </Text>
                <Text style={style.timeAgo}>{comment?.timeAgo}</Text>
              </View>
              <Text style={style.commentText} numberOfLines={2}>
                {comment?.content}
              </Text>
            </View>
          </View>
        ))}
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={comment}
          onChangeText={setComment}
          placeholder="Type something..."
          placeholderTextColor={COLORS.lightFont}
        />
        <TouchableOpacity style={style.send} onPress={onAddComment}>
          <Icon icon={ICONS.send} iconStyle={style.iconSize} disabled />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(EventComments);
