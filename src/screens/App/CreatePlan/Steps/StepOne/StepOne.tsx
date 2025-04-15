import { View, Text, TouchableOpacity } from "react-native";
import React, { memo, useEffect, useMemo, useState } from "react";
import CustomTextInput from "@/components/TextInput";
import { useTheme } from "@/hooks/useTheme";
import { styles } from "./styles";
import Icon from "@/components/Icon";
import { ICONS } from "@/constants";
import MapboxPlacesAutocomplete from "react-native-mapbox-places-autocomplete";
import { MAPBOX_API } from "@/utils/Constants";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { resetAllDetails } from "@/redux/slices/planSlice";
import DateTimePicker from "@/components/DateTimePicker";
import { format } from "date-fns";
import { RootState } from "@/store/store";
import { verticalScale } from "@/utils/metrics";

type TProps = {
  handleContinue: (input: {
    address: string;
    Date: string;
    Time: string;
  }) => void;
};

const StepOne = (prop: TProps) => {
  const { handleContinue } = prop;
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const dispatch = useDispatch();
  const { planDetails, userLocation } = useSelector((state: RootState) => state.user);
  const { planData } = useSelector((state: RootState) => state.plan);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const [Input, SetInput] = useState({
    address: planDetails?.address?.address ?? planData?.address?.address ?? "",
    Date: planDetails?.dateTime
      ? format(planDetails?.dateTime, "dd/MM/yyyy")
      : planData?.date ?? "",
    Time: planDetails?.dateTime
      ? format(planDetails?.dateTime, "HH:mm")
      : planData?.time ?? "",
    longitude:
      planDetails?.address?.longitude ?? planData?.address?.longitude ?? "",
    latitude:
      planDetails?.address?.latitude ?? planData?.address?.latitude ?? "",
    dateTime: planDetails?.dateTime,
  });

  const handleSubmit = () => {
    if (!!Input.Date && !!Input.address && !!Input.Time) {
      handleContinue(Input);
    } else {
      Toast.show({
        type: "error",
        text1: "Please Fill The Required Details",
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  };

  const handleConfirm = (date: Date) => {
    setSelectedDateTime(date);
    SetInput((prev) => ({
      ...prev,
      dateTime: date.toISOString(),
      Date: format(date, "dd/MM/yyyy"),
      Time: format(date, "hh:mm a"),
    }));
  };

  return (
    <View style={style.container}>
      <Text style={style.plantext}>Plan Details</Text>
      <View>
        <MapboxPlacesAutocomplete
          id="origin"
          placeholder={'e.g., "The Sweet Swirl"'}
          accessToken={MAPBOX_API}
          onPlaceSelect={(data: any) => {
            SetInput((pre) => ({
              ...pre,
              address: data?.place_name,
              longitude: data?.center?.[0],
              latitude: data?.center?.[1],
            }));
          }}
          onClearInput={() => {}}
          value={Input.address}
          countryId="US"
          inputStyle={style.mapBoxInput}
          containerStyle={style.addressContainer}
          proximity={{
            longitude: userLocation.longitude,
            latitude: userLocation.latitude,
          }}
        />
        <TouchableOpacity
          onPress={() => setPickerVisible(true)}
          style={style.Rowview}
        >
          <CustomTextInput
            label={"Date"}
            placeholder={"DD/MM/YYYY"}
            value={Input.Date}
            onChangeText={(v) => SetInput((pre) => ({ ...pre, Date: v }))}
            style={style.Rowtxxtinput}
            editable={false}
            onPressIn={() => setPickerVisible(true)}
          />
          <CustomTextInput
            label={"Time"}
            placeholder={"HH:MM"}
            value={Input.Time}
            onChangeText={(v) => SetInput((pre) => ({ ...pre, Time: v }))}
            style={style.Rowtxxtinput}
            editable={false}
            onPressIn={() => setPickerVisible(true)}
          />
        </TouchableOpacity>
        <DateTimePicker
          visible={isPickerVisible}
          onClose={() => setPickerVisible(false)}
          onConfirm={handleConfirm}
          initialDate={selectedDateTime || new Date()}
        />
      </View>
      <TouchableOpacity style={style.nextBtn} onPress={handleSubmit}>
        <Icon
          icon={ICONS.right_arrow}
          iconStyle={style.iconSize}
          onPress={handleSubmit}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(StepOne);
