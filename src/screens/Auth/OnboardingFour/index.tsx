import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import BoxComponent from '@/hoc/OuterView';
import Header from '@/components/Header';
import { COMMUNITIES, ICONS, IMAGES } from '@/constants';
import { STRINGS } from '@/constants/strings';
import { styles } from './styles';
import ProgressBar from '@/components/ProgressBar';
import { goBack, navigate } from '@/navigation/rootNavigation';
import Dropdown from '@/components/DropDown';
import CustomTextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { NAMES } from '@/navigation/name';
import Icon from '@/components/Icon';
import { UserData } from '@/constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { communityRequest, selectUser } from '@/redux/slices/userSlice';
import { AppDispatch } from '@/store/store';
import Loader from '@/components/Loader';
import { useTheme } from '@/hooks/useTheme';
import { useRoute } from '@react-navigation/native';

export const OnboardingFour = () => {
  const { params } = useRoute<any>()
  const isEdit = params?.isEdit ?? false;
  const onSave = params?.onSave ?? (() => { });
  const selectedData = params?.selectedData ?? null;
  const [selectedTags, setSelectedTags] = useState<string[]>(selectedData ?? []);
  const MAX_SELECTION = 5;
  const userDetails = useSelector(selectUser)
  const { theme, handleTheme } = useTheme()
  const styless = useMemo(() => styles(theme), [theme]);
  const dispatch = useDispatch<AppDispatch>()
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < MAX_SELECTION) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        Alert.alert(
          'Selection Limit',
          `You can only select up to ${MAX_SELECTION} tags.`,
        );
      }
    }
  };

  const onSaveCommunity = () => {
    if (isEdit) {
      onSave(selectedTags)
      goBack()
      return
    }
    dispatch(communityRequest({
      url: 'auth/saveCommunities',
      data: {
        "userId": userDetails.userInfo?.userId,
        "communities": selectedTags
      }
    }))
  }


  return (
    <View style={styless.container}>
      <Header
        leftIcon={isEdit}
        leftView={{
          onPress: () => {
            isEdit && goBack();
          },
          icon: ICONS.left_arrow,
        }}
        centerText=""
        viewstyle={styless.headerstyle}
        rightView={{
          onPress: () => {
            !isEdit && navigate(NAMES.onboardingFive);
          },
          icon: !isEdit ? STRINGS.skip : '',
        }}
        rightIcon={false}
      />
      <View style={styless.centerView}>
        <Text style={styless.introText}>{STRINGS.communityintro}</Text>
        <Text style={styless.subText}>{STRINGS.communitysub}</Text>
        <View style={styless.rowView}>
          <Icon disabled icon={ICONS.userIcon} iconStyle={{ tintColor: theme.colors.black }} />
          <Text style={styless.titleText}>{STRINGS.cause_community}</Text>
        </View>
        <ScrollView style={styless.container}>
          <View style={styless.tagContainer}>
            {COMMUNITIES.map(tag => {
              const isSelected = selectedTags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  style={[styless.tag, isSelected && styless.selectedTag]}
                  onPress={() => toggleTag(tag)}>
                  {isSelected && (
                    <Icon
                      icon={ICONS.checkIcon}
                      iconStyle={styless.iconStyle}
                      disabled
                    />
                  )}
                  <Text
                    style={[
                      styless.tagText,
                      isSelected && styless.selectedTagText,
                    ]}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <Button
        title={STRINGS.continue}
        viewstyle={styless.bottomView}
        textStyle={styless.btnText}
        onPress={() => {
          onSaveCommunity();
        }}
        disabled={false}
      />
      <Loader loading={userDetails.communityLoader} />
    </View>
  );
};

export default BoxComponent(OnboardingFour);
