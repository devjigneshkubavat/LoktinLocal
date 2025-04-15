import { TouchableOpacity, Image } from "react-native";
import React, { useMemo } from "react";
import { IconProps } from "@/constants/types";
import { styles } from "./styles";
import { useTheme } from "@/hooks/useTheme";

const Icon: React.FC<IconProps> = (props, disabled) => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);

  return (
    <TouchableOpacity {...props} style={[style.container, props.outerStyle]}>
      <Image source={props.icon} style={[style.imageView, props.iconStyle]} />
    </TouchableOpacity>
  );
};
export default Icon;
