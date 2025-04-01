import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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

  return (
    <View style={styless.container}>
      {homeTabData.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => props.setSelectedTab(tab.id)}
          style={[
            styless.tabView,
            props.selectedTab === tab.id && styless.activeTabLine,
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
    </View>
  );
};

export default HomeTab;
