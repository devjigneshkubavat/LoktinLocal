import React, { useMemo, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import styles from "./styles";
import Header from "@/components/Header";
import { goBack } from "@/navigation/rootNavigation";
import { ThemeType } from "@/context/themeContext";
import { ICONS } from "@/constants";
import BoxComponent from "@/hoc/OuterView";
import { useDispatch, useSelector } from "react-redux";
import { setGender } from "@/redux/slices/userSlice";
import { RootState } from "@/store/store";

const EditDetails: React.FC<{ route: any }> = ({ route }) => {
  const { theme, themeType, handleTheme } = useTheme();
  const styless = useMemo(() => styles(theme), [theme]);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [gender, setgender] = useState(userInfo.gender ?? "");
  const [msgType, setMsgType] = useState("onlyKeys");
  const title = route?.params?.title;
  const dispatch = useDispatch();

  const themeOptions: { id: ThemeType; label: string }[] = [
    { id: "light", label: "Light Mode" },
    { id: "dark", label: "Dark Mode" },
    { id: "auto", label: "Use System Setting" },
  ];

  type GenderType = "male" | "female" | "nonBinary" | "other";

  const genderOptions: { id: GenderType; label: string }[] = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
    { id: "nonBinary", label: "Non Binary" },
    { id: "other", label: "Other" },
  ];

  type MessagePermissionType = "onlyKeys" | "anyone" | "noOne";

  const whoCanMessageOptions: { id: MessagePermissionType; label: string }[] = [
    { id: "onlyKeys", label: "Only Keys" },
    { id: "anyone", label: "Anyone" },
    { id: "noOne", label: "No one" },
  ];

  const downloadOptions: { id: string; label: string; option: object }[] = [
    { id: "1", label: "Date Range", option: ["Last year"] },
    { id: "2", label: "Format", option: ["HTML"] },
    { id: "3", label: "Quality", option: ["High"] },
  ];

  const ListItem = ({
    item,
    index,
    onPress,
    isSelected,
    isArrow,
  }: {
    item: any;
    index: number;
    onPress: () => void;
    isSelected: boolean;
    isArrow: boolean;
  }) => {
    return (
      <TouchableOpacity style={styless.option} onPress={onPress}>
        <Text style={styless.optionText}>{item.label}</Text>
        {isSelected && (
          <Image source={ICONS.checksIcon} style={styless.checkIcon} />
        )}
        {isArrow && (
          <View style={styless.arrowView}>
            <View>
              <Text style={styless.optionText}>{item.option}</Text>
            </View>
            <Image source={ICONS.rightArrow} style={styless.arrowIcon} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const onSelectGender = (item: string) => {
    dispatch(setGender(item));
    setgender(item);
    goBack();
  };

  return (
    <View style={styless.container}>
      <Header
        centerText={title}
        leftIcon={true}
        leftView={{
          onPress: goBack,
          icon: ICONS.left_arrow,
        }}
        viewstyle={styless.header}
      />

      {title === "Theme Mode" && (
        <FlatList
          data={themeOptions}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              index={index}
              onPress={() => handleTheme(item.id)}
              isSelected={themeType === item.id}
              isArrow={false}
            />
          )}
        />
      )}

      {title === "Gender" && (
        <FlatList
          data={genderOptions}
          removeClippedSubviews={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              index={index}
              onPress={() => onSelectGender(item.id)}
              isSelected={gender === item.id}
              isArrow={false}
            />
          )}
        />
      )}

      {title === "Who Can Message Me" && (
        <FlatList
          data={whoCanMessageOptions}
          removeClippedSubviews={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              index={index}
              onPress={() => setMsgType(item.id)}
              isSelected={msgType === item.id}
              isArrow={false}
            />
          )}
        />
      )}

      {title === "Create Files To Download" && (
        <FlatList
          data={downloadOptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              index={index}
              onPress={() => setMsgType(item.id)}
              isSelected={false}
              isArrow={true}
            />
          )}
        />
      )}
    </View>
  );
};

export default BoxComponent(EditDetails);
