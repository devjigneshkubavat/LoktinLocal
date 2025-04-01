import { FONTS, ICONS } from '@/constants';
import { COLORS } from '@/constants/colors';
import { moderateScale, verticalScale } from '@/utils/metrics';
import React, { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Animated, Easing, Image } from 'react-native';

const PlanCreated = ({ visible, onClose }) => {
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      // Reset values
      scaleValue.setValue(0);
      opacityValue.setValue(0);
      
      // Start animations
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto close after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <Animated.View style={[styles.modalView, { opacity: opacityValue }]}>
          <Text style={styles.modalTitle}>Activity Created: Game Night</Text>
          <Text style={styles.modalText}>You're Locked In!</Text>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
             <Image source={ICONS.checksIcon}/>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderRadius: verticalScale(8),
    padding: 24,
    alignItems: 'center',
    width: moderateScale(300),
  },
  modalTitle: {
    marginBottom: verticalScale(10),
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily:FONTS.Lexend_Light,
  },
  modalText: {
    marginBottom: verticalScale(15),
    textAlign: 'center',
    fontSize: moderateScale(20),
    color: '#555',
    fontFamily:FONTS.Lexend_Medium,
  },
});

export default PlanCreated;