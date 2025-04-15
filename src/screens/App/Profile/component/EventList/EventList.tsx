import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/hooks/useTheme";
import Icon from "@/components/Icon";
import { ICONS } from "@/constants";
import FastImage from "react-native-fast-image";
import { getAllPreferences } from "@/constants/types";
import moment from "moment";
import { COLORS } from "@/constants/colors";

interface Event {
  id: string;
  title: string;
  location: string;
  dateTime: string;
  image: string;
  imageUri2: string;
}

interface EventListProps {
  eventList: getAllPreferences[];
  onFavoritePress?: (planID: number, isFavourite: boolean) => void;
  isLoading?: boolean;
  onEventPress?: (planID: number) => void;
  isfromFavourite?: boolean
}

const EventList = (props: EventListProps) => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  console.log(JSON.stringify(props.eventList));

  return (
    <View style={style.eventContainer}>
      {/* {props?.isLoading && (
        <ActivityIndicator style={style.activityIndicator} />
      )} */}

      {props?.eventList?.map((item, index) => {
        let data:any = props?.isfromFavourite ? item.plan:item
        return (
          <TouchableOpacity
            key={"event_" + index}
            style={style.postItem}
            activeOpacity={1}
            disabled={!props?.onEventPress}
            onPress={() => props?.onEventPress?.(data.planId ?? data.id)}
          >
            <View
              style={
                data?.groupSize != 2
                  ? style.postImageContainer
                  : style.twoPostContainer
              }
            >
              {Array.from({ length: data?.groupSize ?? 0 }).map((_, index) => {
                const entry = data?.groupEntries?.[index] ?? null;
                const profilePhoto = entry?.user?.profilePhotoUrls?.[0];
                const isRemote = !!profilePhoto;
                const imageSource = isRemote
                  ? { uri: profilePhoto }
                  : ICONS.dummyProfile;
                if (isRemote) {
                  return (
                    <FastImage
                      key={`groupEntry_${data?.id}_${index}`}
                      source={imageSource}
                      style={style.postImage}
                    />
                  );
                } else {
                  return (
                    <View
                      style={[
                        style.postImage,
                        { borderWidth: 1, borderColor: COLORS.primaryColor },
                      ]}
                    ></View>
                  );
                }
              })}
            </View>

            <View style={style.postContent}>
              <Text style={style.postTitle}>{data?.name}</Text>
              <View style={style.postInfo}>
                <View style={style.postInfoItem}>
                  <Icon icon={ICONS.location} iconStyle={style.iconSize} />
                  <Text style={style.postInfoText}>{data?.address?.address}</Text>
                </View>
                <View style={style.postInfoItem}>
                  <Icon icon={ICONS.circleClock} iconStyle={style.iconSize} />
                  <Text style={style.postInfoText}>
                    {moment
                      .utc(data?.dateTime)
                      .local()
                      .format("dddd, MMMM Do, h:mm A")}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={style.starButton}
              disabled={!props?.onFavoritePress}
              onPress={() => {
                props?.onFavoritePress?.(
                  data?.planId ?? data?.id,
                  data.isFavourite
                );
              }}
            >
              <Image
                source={data?.isFavourite ? ICONS.heartFavorite : ICONS.heart}
                style={style.starIconSize}
                tintColor={COLORS.primaryColor}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )
      })}
    </View>
  );
};

export default EventList;