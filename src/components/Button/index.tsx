import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useMemo } from 'react';
import { styles } from './styles';
import { ButtonProps } from '@/constants/types';
import { useTheme } from '@/hooks/useTheme';

export const Button: React.FC<ButtonProps> = ({
  viewstyle,
  title,
  onPress,
  disabled,
  textStyle,
}) => {
  const { theme, handleTheme } = useTheme()
  const style = useMemo(() => styles(theme), [theme]);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[style.container, viewstyle, disabled && style.disabledButton]}>
      <Text style={[style.btnText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
export default Button;
