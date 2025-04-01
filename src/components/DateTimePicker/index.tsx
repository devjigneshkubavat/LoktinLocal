import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import DatePicker from "react-native-date-picker";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { COLORS } from "@/constants/colors";

interface DateTimePickerProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  initialDate?: Date;
}

export default function DateTimePicker({
  visible,
  onClose,
  onConfirm,
  initialDate = new Date(),
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(initialDate);

  useEffect(() => {
    if (visible) {
      setSelectedDate(initialDate);
      setSelectedTime(initialDate);
    }
  }, [visible, initialDate]);

  const handleConfirm = () => {
    const mergedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      selectedTime.getSeconds()
    );

    onConfirm(mergedDate);
    onClose();
  };

  const getMaxDate = (days: number) => {
    let maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + days);
    return maxDate;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <CalendarPicker
            onDateChange={setSelectedDate}
            selectedStartDate={selectedDate}
            width={horizontalScale(320)}
            initialDate={selectedDate}
            minDate={new Date()}
            maxDate={getMaxDate(7)}
            selectedDayColor="#007AFF"
            selectedDayTextColor="#FFFFFF"
          />
          <View style={styles.timePickerContainer}>
            <DatePicker
              date={selectedTime}
              mode="time"
              onDateChange={setSelectedTime}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    padding: horizontalScale(20),
    width: Math.min(horizontalScale(400), Dimensions.get("window").width - 40),
    maxHeight: Platform.OS === "web" ? 600 : "80%",
  },
  header: {
    flexDirection: "row",
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(10),
    backgroundColor: "#f0f0f0",
    padding: horizontalScale(4),
  },
  tabButton: {
    flex: 1,
    paddingVertical: verticalScale(8),
    alignItems: "center",
    borderRadius: moderateScale(8),
  },
  activeTabButton: {
    backgroundColor: COLORS.white,
  },
  tabText: {
    fontSize: moderateScale(16),
    color: "#666",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  timePickerContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  timePicker: {
    backgroundColor: "white",
    width: "100%",
    height: 215,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    gap: moderateScale(10),
    paddingHorizontal: horizontalScale(20),
  },
  button: {
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(10),
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  confirmButton: {
    backgroundColor: COLORS.primaryColor,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
});