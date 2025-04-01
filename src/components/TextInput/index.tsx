import { COLORS } from "@/constants/colors";
import { CustomTextInputProps } from "@/constants/types";
import React, { memo, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/hooks/useTheme";

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  style,
  inputStyle,
  labelStyle,
  ...props
}) => {
  const { theme, handleTheme } = useTheme();
  const styless = useMemo(() => styles(theme), [theme]);
  return (
    <View style={[styless.container, style]}>
      <Text style={[styless.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[styless.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.lightFont}
        value={value}
        onChangeText={onChangeText}
        keyboardType={props.keyboardType ?? "default"}
        multiline={props.multiline}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;
