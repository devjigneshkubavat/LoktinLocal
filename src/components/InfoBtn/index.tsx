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
import Icon from '../Icon';
import { ICONS } from '@/constants';
import Popover from 'react-native-popover-view';

export const InfoBtn: React.FC<ButtonProps> = ({
  viewstyle,
  title,
  textStyle,
}) => {
  const { theme, handleTheme } = useTheme()
  const style = useMemo(() => styles(theme), [theme]);
  return (
    <Popover
      popoverStyle={{ backgroundColor: theme.colors.white }}
      from={(
        <TouchableOpacity>
          <Text style={style.btnText}>ⓘ</Text>
        </TouchableOpacity>
      )}>
        <>
      <Text style={style.titleText}>{title}</Text>
      </>
    </Popover>
  );
};
export default InfoBtn;
