import React, { useEffect, useMemo, useState } from "react";
import { View, TextInput } from "react-native";
import BoxComponent from "@/hoc/OuterView";
import Header from "@/components/Header";
import { goBack } from "@/navigation/rootNavigation";
import { ICONS } from "@/constants";
import ProgressBar from "@/components/ProgressBar";
import { styles } from "./styles";
import { useTheme } from "@/hooks/useTheme";
import Icon from "@/components/Icon";
import StepOne from "./Steps/StepOne/StepOne";
import StepTwo from "./Steps/StepTwo/StepTwo";
import StepThree from "./Steps/StepThree/StepThree";

import { useDispatch, useSelector } from "react-redux";
import { resetAllDetails, setPlanDetails } from "@/redux/slices/planSlice";
import { RootState } from "@/store/store";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ParamListTypes } from "@/constants/types";

const CreatePlan = () => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { planDetails } = useSelector((state: RootState) => state.user);
  const route = useRoute<RouteProp<ParamListTypes, "createPlan">>();
  const isUpdate = route.params?.isUpdate;
  const [planName, setplanName] = useState<string>(planDetails?.name ?? "");
  const dispatch = useDispatch();
  const progress = currentStep === 1 ? 0.3 : currentStep === 2 ? 0.5 : 1;
  const { planData, isPlanCreated } = useSelector(
    (state: RootState) => state.plan
  );

  const onBackPress = () => {
    dispatch(resetAllDetails(undefined));
    goBack();
  };

  const RightView = () => {
    return (
      <View style={style.iconStyle}>
        <Icon
          icon={ICONS.closeIcon}
          iconStyle={style.iconSize}
          onPress={onBackPress}
        />
      </View>
    );
  };

  const handleStepOne = (item: {
    address: string;
    Date: string;
    Time: string;
    longitude: any;
    latitude: any;
    dateTime: any;
  }) => {
    dispatch(
      setPlanDetails({
        name: planName,
        address: {
          address: item.address,
          longitude: item.longitude,
          latitude: item.latitude,
        },
        date: item.Date,
        time: item.Time,
        dateTime: item.dateTime,
      })
    );
    setCurrentStep((prev) => prev + 1);
  };

  const handleContinue = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne handleContinue={(input) => handleStepOne(input)} />;
      case 2:
        return (
          <StepTwo handleContinue={handleContinue} handleBack={handleBack} />
        );
      default:
        return (
          <StepThree
            handleContinue={handleContinue}
            handleBack={handleBack}
            isUpdate={isUpdate}
          />
        );
    }
  };

  const leftView = () => {
    return (
      <View style={style.nameStyle}>
        <TextInput
          style={style.inputHeader}
          placeholder={"Plan name"}
          value={planName}
          autoFocus={true}
          onChangeText={(text) => setplanName(text)}
          editable={currentStep == 1}
        />
      </View>
    );
  };

  useEffect(() => {
    return () => {
      dispatch(resetAllDetails({}));
      setplanName("");
    };
  }, []);

  return (
    <View style={style.container}>
      <Header
        lefttext={true}
        leftView={leftView()}
        leftstyle={style.leftsidestyle}
        viewstyle={style.header}
        {...(currentStep === 1 && {
          rightView: RightView(),
        })}
      />
      <View style={style.progressView}>
        <ProgressBar progress={progress} animated={true} />
      </View>
      {renderStep()}
    </View>
  );
};

export default BoxComponent(CreatePlan);
