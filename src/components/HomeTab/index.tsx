import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface HomeTabProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const homeTabData = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "pair",
    name: "Pairs",
  },
  {
    id: "group",
    name: "Groups",
  },
];

const HomeTab = (props: HomeTabProps) => {
  const { theme, handleTheme } = useTheme();
  const styless = useMemo(() => styles(theme), [theme]);
  // const [selectedTab, setSelectedTab] = useState("All");
  const { preferencesListData } = useSelector((state: RootState) => state.user);
  const translateX = useRef(new Animated.Value(0)).current;
  const [tabLayouts, setTabLayouts] = useState<{ [key: string]: { x: number; width: number } }>({});
  const [underlineWidth, setUnderlineWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent, id: string) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts((prev) => ({ ...prev, [id]: { x, width } }));
  };

  useEffect(() => {
    const layout = tabLayouts[props.selectedTab];
    if (layout) {
      setUnderlineWidth(layout.width);
      Animated.spring(translateX, {
        toValue: layout.x,
        useNativeDriver: true,
      }).start();
    }
  }, [props.selectedTab, tabLayouts]);
  return (
    <View style={styless.container}>
      {homeTabData.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => props.setSelectedTab(tab.id)}
          onLayout={(e) => handleLayout(e, tab.id)}
          style={[
            styless.tabView,
            // props.selectedTab === tab.id && styless.activeTabLine,
          ]}
        >
          <Text
            style={[
              styless.tabText,
              props.selectedTab === tab.id && styless.activeTab,
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
      {tabLayouts[props.selectedTab] && (
        <Animated.View
          style={[
            styless.activeTabLine,
            {
              width: underlineWidth,
              transform: [{ translateX }],
            },
          ]}
        />
      )}
    </View>
  );
};

export default HomeTab;