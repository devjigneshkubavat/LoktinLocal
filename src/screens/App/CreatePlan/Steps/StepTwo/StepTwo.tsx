import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { styles } from "./styles";
import Icon from "@/components/Icon";
import { ICONS } from "@/constants";
import InspirationGrid from "./component/InspirationGrid";
import { handleChooseImageFromGallery } from "@/utils/helper";
import {
  onGetPlanImages,
  onUploadPlanImage,
  setPlanDetails,
} from "@/redux/slices/planSlice";
import { useDispatch, useSelector } from "react-redux";
import { Asset } from "react-native-image-picker";
import { PickImageProps, PlanImagesListProps } from "@/constants/types";
import FastImage from "react-native-fast-image";
import store, { RootState } from "@/store/store";
import Toast from "react-native-toast-message";

type TProps = {
  handleContinue: () => void;
  handleBack: () => void;
};

const StepTwo = (prop: TProps) => {
  const { handleContinue, handleBack } = prop;
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const dispatch = useDispatch();
  const { planImage, planData, planImagesList } = useSelector(
    (state: RootState) => state.plan
  );
  const { planDetails } = useSelector((state: RootState) => state.user);
  const [selectedImage, setSelectedImage] = useState<PickImageProps | null>(
    null
  );
  const { userToken } = useSelector((state: RootState) => state.auth);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(contentOffsetY);
  };

  const postImages = [
    { id: "1", uri: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: "2", uri: "https://randomuser.me/api/portraits/men/2.jpg" },
    { id: "3", uri: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: "4", uri: "https://randomuser.me/api/portraits/men/4.jpg" },
    { id: "5", uri: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: "6", uri: "https://randomuser.me/api/portraits/men/6.jpg" },
    { id: "7", uri: "https://randomuser.me/api/portraits/men/7.jpg" },
    { id: "8", uri: "https://randomuser.me/api/portraits/men/8.jpg" },
  ];

  const pickImage = async () => {
    const image: Asset | undefined = await handleChooseImageFromGallery();
    if (image?.uri) {
      const selectedImage: PickImageProps = {
        uri: image?.uri,
        name: image?.fileName,
        type: image?.type,
      };
      dispatch(
        onUploadPlanImage({
          url: "photos/upload-photos",
          data: selectedImage,
        })
      );
    }
  };

  const onSelectedImage = (url: string) => {
    setSelectedImage({ name: "", type: "", uri: url });
    dispatch(
      setPlanDetails({
        imageUrl: url,
      })
    );
  };

  const renderItem = (item: PlanImagesListProps) => {
    return (
      <TouchableOpacity
        style={style.imageBox}
        key={`post_${item.id}`}
        onPress={() => onSelectedImage(item?.src?.original)}
      >
        <FastImage
          source={{ uri: item?.src?.original }}
          style={style.coverImage}
        />
      </TouchableOpacity>
    );
  };

  const onContinueClick = () => {
    if (!!selectedImage?.uri) {
      handleContinue();
    } else {
      Toast.show({
        type: "error",
        text1: "Please Select A Image",
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  };

  useEffect(() => {
    if (!!planImage?.length) {
      onSelectedImage(planImage);
    } else if (planDetails?.imageUrl) {
      onSelectedImage(planDetails.imageUrl);
    } else if (planData?.imageUrl) {
      onSelectedImage(planData?.imageUrl);
    }
  }, [planImage, planDetails]);

  useEffect(() => {
    if (planData && planData?.address)
      dispatch(
        onGetPlanImages({
          url: `plans/get/images?address=${planData?.address}&name=${planData?.name}`,
          userToken,
        })
      );
  }, []);

  return (
    <View style={style.container}>
      <ScrollView
        contentContainerStyle={style.pagecontainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Text style={style.sectionTitle}>
          Upload an image that fits your plan
        </Text>
        <TouchableOpacity style={style.uploadBox} onPress={pickImage}>
          {selectedImage?.uri ? (
            <FastImage
              source={
                selectedImage?.uri ? { uri: selectedImage?.uri } : ICONS.plus
              }
              style={style.imagePreviewContainer}
            />
          ) : (
            <>
              <Icon icon={ICONS.plus} iconStyle={style.iconSize} />
              <Text style={style.uploadText}>Tap here to upload an image.</Text>
            </>
          )}
        </TouchableOpacity>
        <Text style={style.orText}>OR</Text>
        {scrollPosition < 50 ? (
          <View>
            <Text style={style.sectionTitle}>Get inspired</Text>
            <View style={style.postContainer}>
              {planImagesList &&
                planImagesList?.length > 0 &&
                planImagesList?.map((item) => renderItem(item))}
            </View>
          </View>
        ) : (
          <InspirationGrid onImageSelect={(url) => onSelectedImage(url)} />
        )}
      </ScrollView>
      <View style={style.footerContainer}>
        <TouchableOpacity style={style.backButton} onPress={handleBack}>
          <Text style={style.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.nextBtn} onPress={handleContinue}>
          <Icon
            icon={ICONS.right_arrow}
            iconStyle={style.nextBtnIcon}
            onPress={onContinueClick}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StepTwo;
