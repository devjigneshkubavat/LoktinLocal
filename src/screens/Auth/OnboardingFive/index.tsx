import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import BoxComponent from '@/hoc/OuterView';
import Header from '@/components/Header';
import { ICONS, INTERESTS } from '@/constants';
import { STRINGS } from '@/constants/strings';
import { styles } from './styles';
import ProgressBar from '@/components/ProgressBar';
import { goBack, navigate } from '@/navigation/rootNavigation';
import Dropdown from '@/components/DropDown';
import CustomTextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { NAMES } from '@/navigation/name';
import Icon from '@/components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { interestyRequest, saveInterest, selectUser } from '@/redux/slices/userSlice';
import { AppDispatch } from '@/store/store';
import SearchBox from '@/components/SearchBox';
import Loader from '@/components/Loader';
import { WModal } from '@flyskywhy/react-native-smart-tip';
import { useTheme } from '@/hooks/useTheme';
import { useRoute } from '@react-navigation/native';

export const OnboardingFive = () => {
  const { params } = useRoute<any>()
  const isEdit = params?.isEdit ?? false;
  const onSave = params?.onSave ?? (() => { });
  const selectedData = params?.selectedData ?? null;
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(selectedData ?? []);
  const [filteredInterests, setFilteredInterests] = useState(INTERESTS);
  const userDetails = useSelector(selectUser)
  const dispatch = useDispatch<AppDispatch>()
  const { theme, handleTheme } = useTheme()
  const styless = useMemo(() => styles(theme), [theme]);
  const handleSearch = (text: string) => {
    setSearchText(text);
    // Filter the interests based on the search text
    const filtered = INTERESTS.filter(interest =>
      interest.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredInterests(filtered);
  };
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const onSaveInterest = () => {
    if(isEdit){
      onSave(selectedTags)
      goBack()
      return
    }
    dispatch(interestyRequest({
      url: 'auth/saveInterests',
      data: {
        "userId": userDetails.userInfo?.userId,
        "interests": selectedTags
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
        rightView={{ onPress: () => { !isEdit && navigate(NAMES.onboardingSix) }, icon: !isEdit ? STRINGS.skip : '' }}
        rightIcon={false}
      />
      <View style={styless.centerView}>
        <Text style={styless.introText}>{STRINGS.interestIntro}</Text>
        <Text style={styless.subText}>{STRINGS.intertestSub}</Text>
        <SearchBox onChangeText={handleSearch} placeholder='What are you into?' value={searchText} />
        <View style={styless.rowView}>
          <Text style={styless.titleText}>{STRINGS.myinterest}</Text>
        </View>
        <ScrollView style={styless.container}>
          <View style={styless.tagContainer}>
            {filteredInterests.map(({ label, emoji }) => {
              const isSelected = selectedTags.includes(label);
              return (
                <TouchableOpacity
                  key={label}
                  style={[styless.tag, isSelected && styless.selectedTag]}
                  onPress={() => toggleTag(label)}
                >
                  <Text style={[styless.tagText, isSelected && styless.selectedTagText]}>
                    {emoji}{' '}{label}
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
          onSaveInterest()
        }}
        disabled={false}
      />
      {/* <Loader loading={userDetails.interstLoader} /> */}
    </View>
  );
};

export default BoxComponent(OnboardingFive);
