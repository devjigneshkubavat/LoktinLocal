import React, { useMemo, useState } from "react";
import { View, Text, Image } from "react-native";
import { Event, getAllPreferences } from "@/constants/types";
import { useTheme } from "@/hooks/useTheme";
import styles from "./styles";
import moment from "moment";
import Button from "@/components/Button";
import { STRINGS } from "@/constants/strings";
import ConfirmAlert from "@/components/ConfirmAlert";

interface EventDetailsProps {
  event?: getAllPreferences;
  isCurrentUserFound?: boolean,
  isCurrentUserJoined?: boolean
}

export const EventDetails = ({ event, isCurrentUserFound, isCurrentUserJoined }: EventDetailsProps) => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleYesPress = () => {
    console.log('handleYesPressd');
    setModalVisible(false);
  };

  const handleNoPress = () => {
    console.log('handleNoPress');
    setModalVisible(false);
  };

  return (
    <View style={style.container}>
      <Image
        source={{ uri: event?.imageUrl }}
        style={style.coverImage}
        resizeMode="cover"
      />
      <View style={style.details}>
        <Text style={style.title}>{event?.name}</Text>
        <Text style={style.venue}>{event?.address?.address}</Text>
        <Text style={style.venue}>
          {moment.utc(event?.dateTime).local().format("dddd, MMMM Do, h:mm A")}
          {/* {moment(
            event?.dateTime,
            "YYYY-MM-DD HH:mm:ss"
          ).format("dddd, MMMM Do, h:mm A")} */}
        </Text>
      </View>
      { !isCurrentUserFound && isCurrentUserJoined ?
        <Button
          title={STRINGS.leave}
          viewstyle={style.bottomView}
          textStyle={style.btnText}
          onPress={() => setModalVisible(true)}
        />
        : ''
      }
      <ConfirmAlert
        visible={isModalVisible}
        title="Are you sure you want to leave this plan?"
        firstbuttonpress={handleYesPress}
        firstbuttontext="Yes"
        secondbuttonpress={handleNoPress}
        secondbuttontext="No"
        Secondbutton={true}
      />
       { event?.tags ? 
          <View style={style.tagsContainer}>
            <Text style={style.tagTitle}>{"Tags"}</Text>
            <View style={style.tags}>
              {event?.tags?.map((tag, index) => (
                <View key={index} style={style.tag}>
                  <Text style={style.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        : ''}
    </View>
  );
};
