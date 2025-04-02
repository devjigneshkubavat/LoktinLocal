import { useTheme } from "@/hooks/useTheme";
import React, { useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import style from "./styles";
import Header from "@/components/Header";
import CustomTextInput from "@/components/TextInput";
import BoxComponent from "@/hoc/OuterView";
import { goBack } from "@/navigation/rootNavigation";
import { ICONS } from "@/constants";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addPhoneNumberRequest } from "@/redux/slices/updateSecuritiesSlice";

const TrustContact = () => {
  const { theme } = useTheme();
  const styless = useMemo(() => style(theme), [theme]);
  const [Number, Setnumber] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { userToken } = useSelector((state: RootState) => state.auth);
  const { isPhoneAddsuccess } = useSelector(
    (state: RootState) => state.updateSecuritiesSaga
  );

  const onAddPhonePress = () => {
    if (Number === "" || Number.length < 6) {
      Toast.show({
        type: "error",
        text1: "Invalid phone number",
        text2: "Please enter valid phone number",
        visibilityTime: 3000,
      });
      return;
    }
    const data = {
      phoneNumber: Number,
    };
    dispatch(
      addPhoneNumberRequest({
        url: "/update-securities/update-securities-addPhone",
        userToken,
        data,
      })
    );
  };

  useEffect(() => {
    if (isPhoneAddsuccess) {
    }
  }, [isPhoneAddsuccess]);

  return (
    <>
      <Header
        leftIcon={true}
        centerText="Trusted Contact"
        viewstyle={styless.header}
        leftView={{
          onPress: () => {
            goBack();
          },
          icon: ICONS.left_arrow,
        }}
      />
      <View style={styless.container}>
        <Text style={styless.text}>Phone</Text>
      </View>
      <View style={styless.flexview}>
        <CustomTextInput
          style={styless.textinput}
          placeholder={`Enter a trusted contact's number`}
          label={"Phone"}
          value={Number}
          onChangeText={(v) => Setnumber(v)}
          keyboardType="numeric"
          maxLength={15}
        />
        <TouchableOpacity style={styless.touch} onPress={onAddPhonePress}>
          <Text style={styless.touchtext}>Complete</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BoxComponent(TrustContact);
