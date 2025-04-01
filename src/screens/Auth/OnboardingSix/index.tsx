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
import React, { useMemo, useRef, useState } from 'react';
import BoxComponent from '@/hoc/OuterView';
import Header from '@/components/Header';
import { ICONS } from '@/constants';
import { STRINGS } from '@/constants/strings';
import { styles } from './styles';
import { goBack, navigate } from '@/navigation/rootNavigation';
import Button from '@/components/Button';
import ImagePickerModal from 'react-native-image-picker-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectImageLoader, selectUser, uploadImagerequest } from '@/redux/slices/userSlice';
import { AppDispatch } from '@/store/store';
import CustumLoader from '@/components/Loader/CustumLoader';
import { useTheme } from '@/hooks/useTheme';
import FaceDetection from '@react-native-ml-kit/face-detection';

export const OnboardingSix = () => {
  const [imagePicker, setImagepicker] = useState(false)
  const selectedIndex = useRef(0)
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null, null, null]);
  const imageLoader = useSelector(selectImageLoader)
  const dispatch = useDispatch<AppDispatch>()
  const { theme, handleTheme } = useTheme()
  const styless = useMemo(() => styles(theme), [theme]);
  const selectImage = (item: any) => {
    const selectedImageUri = item.assets[0].uri;
    setImages(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages[selectedIndex.current] = selectedImageUri!;
      return updatedImages;
    });
    setImagepicker(false)
  }
  const renderImageItem = ({ item, index }: { item: string | null; index: number }) => (
    <TouchableOpacity onPress={() => { setImagepicker(true), selectedIndex.current = index }} style={styless.imageOuterView}>
      <Image
        source={item ? { uri: item } : ICONS.imageplaceholder}
        style={[item ? styless.imageView : styless.imagePlaceView]}
      />
    </TouchableOpacity>
  );
  const handleUpload = async () => {
    const validImages = images.filter(image => image !== null);
    if (!images.some(image => image !== null)) return
    for (const image of validImages) {
      try {
        const result = await FaceDetection.detect(image!);
        if (result && result.length > 0) {
          dispatch(uploadImagerequest({
            url: 'photos/upload-photos',
            data: images,
          }))
          return;
        }
      } catch (error) {
        console.error("Face detection error:", error);
      }
    }
    Alert.alert("Error", STRINGS.facenotfind);
  }

  return (
    <View style={styless.container}>
      <Header
        leftIcon={false}
        leftView={{
          onPress: () => {
            goBack();
          },
        }}
        centerText=""
        viewstyle={styless.headerstyle}
        rightIcon={false}
      />
      <View style={styless.centerView}>
        <Text style={styless.introText}>{STRINGS.profileIntro}</Text>
        <Text style={styless.subText}>{STRINGS.profileSub}</Text>
        <FlatList
          data={images}
          numColumns={2}
          contentContainerStyle={styless.flatlistView}
          columnWrapperStyle={styless.flatlistWrapper}
          renderItem={renderImageItem}
        />
      </View>
      <Button
        title={STRINGS.continue}
        viewstyle={styless.bottomView}
        textStyle={styless.btnText}
        onPress={() => {
          // navigate(NAMES.onboardingTwo);
          handleUpload()
        }}
        disabled={!images.some(image => image !== null)}
      />
      <ImagePickerModal libraryPhotoOptions={{ selectionLimit: 1, mediaType: 'photo' }} onBackdropPress={() => { setImagepicker(false) }} onCancelPress={() => { setImagepicker(false) }} title='You can either take a picture or select one from your album.' data={['Take a photo', 'Select from the library']} isVisible={imagePicker} onPress={selectImage} />
      <CustumLoader loading={imageLoader} />
    </View>
  );
};

export default BoxComponent(OnboardingSix);