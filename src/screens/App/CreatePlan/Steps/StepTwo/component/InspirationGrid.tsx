import React, { useMemo } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { useTheme } from "@/hooks/useTheme";
import { styles } from "./styles";

interface PlanImagesListProps {
  id: number | string;
  src: {
    original: string;
  };
}

interface Props {
  images: PlanImagesListProps[];
  onImageSelect: (url: string) => void;
}

const InspirationGrid = ({ images, onImageSelect }: Props) => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);

  // Add heights & imageUrl
  const processedData = useMemo(() => {
    return images.map((item, index) => ({
      ...item,
      id: item.id ?? index,
      imageUrl: item?.imageUrl,
      height: 180 + (index % 5) * 30, // Dynamic height variation
    }));
  }, [images]);

  // Split into 3 columns
  const columns: typeof processedData[] = [[], [], []];
  processedData.forEach((item, index) => {
    const columnIndex = index % 3;
    columns[columnIndex].push(item);
  });

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text style={style.title}>Get inspired</Text>
      <Text style={style.subtitle}>Choose an image that best fits your plan</Text>
      <View style={style.grid}>
        {columns.map((columnItems, colIndex) => (
          <View key={`column_${colIndex}`} style={style.column}>
            {columnItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={style.imageBox}
                onPress={() => onImageSelect(item.imageUrl)}
              >
                <FastImage
                  source={{ uri: item.imageUrl }}
                  style={[style.image, { height: item.height }]}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default InspirationGrid;
