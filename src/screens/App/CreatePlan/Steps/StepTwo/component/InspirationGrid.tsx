import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { ResponsiveGrid } from "react-native-flexible-grid";
import { useTheme } from "@/hooks/useTheme";
import { styles } from "./styles";

interface DataProp {
  id: number;
  widthRatio?: number;
  heightRatio?: number;
  imageUrl: string;
}

const InspirationGrid = ({
  onImageSelect,
}: {
  onImageSelect: (url: string) => void;
}) => {
  let idCounter = React.useRef(0);
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);

  const getData = () => {
    const originalData = [
      {
        imageUrl: "https://picsum.photos/200/300?random=1",
        widthRatio: 1,
        heightRatio: 4,
      },
      {
        imageUrl: "https://picsum.photos/200/300?random=2",
        widthRatio: 1,
        heightRatio: 3,
      },
      {
        imageUrl: "https://picsum.photos/200/300?random=3",
        widthRatio: 1,
        heightRatio: 4,
      },
      {
        imageUrl: "https://picsum.photos/200/300?random=4",
        widthRatio: 1,
        heightRatio: 5,
      },
      {
        imageUrl: "https://picsum.photos/200/300?random=5",
        widthRatio: 1,
        heightRatio: 5,
      },
      {
        imageUrl: "https://picsum.photos/200/300?random=6",
        widthRatio: 1,
        heightRatio: 3,
      },
    ];

    return originalData.map((item) => ({ ...item, id: ++idCounter.current }));
  };

  const renderItem = ({ item }: { item: DataProp }) => {
    return (
      <TouchableOpacity
        style={style.boxContainer}
        onPress={() => onImageSelect(item.imageUrl)}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={style.box}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={style.title}>Get inspired</Text>
      <Text style={style.subtitle}>
        Choose an image that best fits your plan
      </Text>
      <ResponsiveGrid
        maxItemsPerColumn={3}
        data={getData()}
        renderItem={renderItem}
        itemUnitHeight={50}
        showScrollIndicator={false}
        keyExtractor={(item: DataProp) => item.id.toString()}
      />
    </View>
  );
};

export default InspirationGrid;
