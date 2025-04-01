import {COLORS} from '@/constants/colors';
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Text, ViewStyle, Animated} from 'react-native';
import {styles} from './styles';
import {ProgressBarProps} from '@/constants/types';

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 4,
  backgroundColor = COLORS.lightBg,
  progressColor = COLORS.primaryColor,
  style,
  animated = false,
  startValue=0,
}) => {
  const animatedValue = useRef(new Animated.Value(startValue*100)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: progress*100,
        duration: 1000, // Smooth transition duration
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(progress);
    }
  }, [progress, animated]);

  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  console.log(animatedValue,'animaedwidth',animated);
  
  return (
    <View style={[styles.container, style, {height, backgroundColor}]}>
      <Animated.View
        style={[
          styles.progress,
          {
            width: animated ? animatedWidth : `${progress * 100}%`,
            backgroundColor: progressColor,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;