import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import BoxComponent from '@/hoc/OuterView';
import Header from '@/components/Header';
import { GENDER, genderOptions, ICONS } from '@/constants';
import { STRINGS } from '@/constants/strings';
import {styles} from './styles';
import ProgressBar from '@/components/ProgressBar';
import { goBack, navigate } from '@/navigation/rootNavigation';
import Dropdown from '@/components/DropDown';
import CustomTextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { NAMES } from '@/navigation/name';
import { UserData } from '@/constants/types';
import { useDispatch } from 'react-redux';
import { cleanData } from '@/redux/slices/authSlice';
import { persistor } from '@/store/store';
import KeyBoardAvoid from '@/components/KeyBoardAvoid';
import { useTheme } from '@/hooks/useTheme';

export const OnboardingOne = () => {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    firstName: '',
    email: '',
    phone: '',
    gender: '',
  });
  const dispatch = useDispatch()
  const { theme, handleTheme } = useTheme()
  const style = useMemo(() => styles(theme), [theme]);
  const isFormValid = useMemo(() => {
    return userData.username?.trim() !== '' && userData.firstName?.trim() !== '' && userData.gender !== '';
  }, [userData]);

  const handleSelect = useCallback(
    (field: keyof UserData, value: string) => {
      setUserData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    },
    [] // Dependencies are empty, so it's stable
  );
  return (
    <View style={style.container}>
      <Header
        leftIcon={true}
        leftView={{
          onPress: () => {
            goBack();
          },
          icon: ICONS.left_arrow,
        }}
        centerText="1/3"
      // rightView={{onPress: () => {}, icon: STRINGS.skip}}
      // rightIcon={false}
      />
      <View style={style.progressView}>
        <ProgressBar progress={0.33} animated={true}/>
      </View>
      <KeyBoardAvoid>
        <View style={{ flex: 1 }}>
          <Text style={style.introText}>{STRINGS.intro}</Text>
          <CustomTextInput
            label={STRINGS.username}
            placeholder={STRINGS.p_h_username}
            value={userData.username ?? ''}
            onChangeText={useCallback((text) => handleSelect('username', text), [handleSelect])}
          />
          <CustomTextInput
            label={STRINGS.firstname}
            placeholder={STRINGS.p_h_firstname}
            value={userData.firstName ?? ''}
            onChangeText={useCallback((text) => handleSelect('firstName', text), [handleSelect])}
          />
          <Dropdown
            label={STRINGS.gender}
            options={genderOptions}
            placeholder={STRINGS.select}
            onSelect={value => handleSelect('gender', value)}
          />
        </View>
      </KeyBoardAvoid>
      <Button
        title={STRINGS.continue}
        viewstyle={style.bottomView}
        textStyle={style.btnText}
        onPress={() => { navigate(NAMES.onboardingTwo, userData) }}
        disabled={!isFormValid}
      />
      {/* <Button
        title={'Clean data'}
        viewstyle={styles.bottomView}
        textStyle={styles.btnText}
        onPress={() => { dispatch({type:cleanData.type}),persistor.purge()}}
      /> */}
    </View>
  );
};

export default BoxComponent(OnboardingOne);
