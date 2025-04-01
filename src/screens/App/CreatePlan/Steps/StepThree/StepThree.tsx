import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Touchable,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { styles } from "./styles";
import { ICONS } from "@/constants";
import Icon from "@/components/Icon";
import { COLORS } from "@/constants/colors";
import { navigate, navigation, replace } from "@/navigation/rootNavigation";
import { NAMES } from "@/navigation/name";
import { useDispatch, useSelector } from "react-redux";
import { onUpdatePlan, setPlanDetails } from "@/redux/slices/userSlice";
import { RootState } from "@/store/store";
import FastImage from "react-native-fast-image";
import {
  onCreatePlan,
  resetAllDetails,
  savePlanImage,
} from "@/redux/slices/planSlice";
import { horizontalScale, verticalScale } from "@/utils/metrics";
import TagInput from "@/components/TagInput";
import PlanCreated from "@/components/PlanCreated";
import Loader from "@/components/Loader";

type TProps = {
  handleContinue: () => void;
  handleBack: () => void;
  isUpdate?: boolean;
};

const CustomPicker = ({
  options,
  selectedValue,
  onSelect,
  visible,
  onClose,
}: any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingHorizontal: horizontalScale(20),
            paddingVertical: verticalScale(20),
            width: "80%",
          }}
        >
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onSelect(item)}
                style={{ paddingVertical: 10 }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
          />
          <TouchableOpacity
            onPress={onClose}
            style={{ paddingVertical: 10, alignItems: "center" }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const StepThree = (prop: TProps) => {
  const { handleContinue, handleBack, isUpdate } = prop;
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const [description, setDescription] = useState("");
  const [allowComments, setAllowComments] = useState(true);
  const [requireJoinRequest, setRequireJoinRequest] = useState(true);
  const [groupSize, setGroupSize] = useState(2);
  const [showPicker, setShowPicker] = useState(false);
  const groupSizes = [2, 4];
  const [scrollPosition, setScrollPosition] = useState(0);
  const dispatch = useDispatch();
  const { planDetails } = useSelector((state: RootState) => state.user);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const [tags, setTags] = useState<string[]>([]);
  const [planCreatedVisible, setPlanCreatedVisible] = useState(false);

  const { planData, isPlanCreated, isLoading } = useSelector(
    (state: RootState) => state.plan
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(contentOffsetY);
  };

  const onInitCreatePlan = () => {
    if (isUpdate) {
      // /plans/2
      dispatch(
        onUpdatePlan({
          url: `plans/${planDetails?.id}`,
          data: {
            ...planData,
            description: description,
            allowComments: allowComments,
            groupSize: groupSize,
            type: "group",
            allowJoinRequests: requireJoinRequest,
            tags: tags,
          },
          userToken,
        })
      );
    } else {
      dispatch(
        onCreatePlan({
          url: "plans",
          data: {
            ...planData,
            description: description,
            allowComments: allowComments,
            groupSize: groupSize,
            type: "group",
            allowJoinRequests: requireJoinRequest,
            tags: tags,
          },
          userToken,
        })
      );
    }
  };

  const handleSelect = (value: any) => {
    setGroupSize(value);
    setShowPicker(false);
  };

  useEffect(() => {
    if (!!isPlanCreated) {
      setPlanCreatedVisible(true);
      setTimeout(() => {
        setPlanCreatedVisible(false);
        replace(NAMES.join, {
          planId: isPlanCreated,
          title: "My Plan",
        });
        dispatch(savePlanImage({ imageUrl: "" }));
        dispatch(resetAllDetails({}));
      }, 3000);
    }
  }, [isPlanCreated]);

  return (
    <View style={style.container}>
      <Loader loading={isLoading} />
      <ScrollView
        contentContainerStyle={style.pagecontainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={style.imageContainer}>
          <FastImage
            source={{ uri: planData?.imageUrl }}
            style={style.selectedImage}
          />
        </View>

        <View style={style.formSection}>
          <Text style={style.label}>Description (Optional)</Text>
          <TextInput
            style={style.descriptionInput}
            placeholder="Add some additional info about your plans."
            placeholderTextColor="#999"
            multiline
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </View>

        <View>
          <TagInput
            initialTags={tags}
            onChangeTags={setTags}
            placeholder="Add tags..."
            // maxTags={5}
            tagColor="#4a8cff"
            textColor="#fff"
            delimiters={[",", " "]}
          />
        </View>

        {/* <TouchableOpacity style={style.tagsButton}>
          <Text style={style.tagsButtonText}>Add tags</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={style.settingItem}
          onPress={() => navigation.navigate(NAMES.preferences)}
        >
          <View style={style.settingLeft}>
            <Icon icon={ICONS.Grid} iconStyle={style.blackIconSize} />
            <Text style={style.settingText}>Set square preferences</Text>
          </View>
          <Icon icon={ICONS.rightArrow} iconStyle={style.blackIconSize} />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={style.settingItem}
          onPress={() => setShowPicker(true)}
        >
          <View style={style.settingLeft}>
            <Icon
              icon={ICONS.userIcon}
              iconStyle={style.blackIconSize}
              disabled
            />
            <Text style={style.settingText}>Group size</Text>
          </View>
          <View style={style.settingRight}>
            <Text style={style.groupSizeText}>{groupSize}</Text>
            <Icon
              icon={ICONS.rightArrow}
              iconStyle={style.groupIconSize}
              disabled
            />
          </View>
        </TouchableOpacity>

        <CustomPicker
          options={groupSizes}
          selectedValue={groupSize}
          onSelect={handleSelect}
          visible={showPicker}
          onClose={() => setShowPicker(false)}
        />

        <View style={style.settingItem}>
          <View style={style.settingLeft}>
            <Icon icon={ICONS.message} iconStyle={style.blackIconSize} />
            <Text style={style.settingText}>Allow comments</Text>
          </View>
          <Switch
            value={allowComments}
            onValueChange={setAllowComments}
            trackColor={{ true: COLORS.primaryColor }}
            thumbColor={COLORS.white}
          />
        </View>

        <View style={style.settingItem}>
          <View style={style.settingLeft}>
            <Icon icon={ICONS.lock} iconStyle={style.blackIconSize} />
            <Text style={style.settingText}>Require join request</Text>
          </View>
          <Switch
            value={requireJoinRequest}
            onValueChange={setRequireJoinRequest}
            trackColor={{ true: COLORS.primaryColor }}
            thumbColor={COLORS.white}
          />
        </View>

        {/* temp comment need to uncomment after conformation */}
        {/* <View style={style.shareSection}>
                <Text style={style.shareTitle}>Share</Text>
                <View style={style.shareOptions}>
                    <TouchableOpacity style={style.shareOption}>
                        <Icon icon={ICONS.copyOutline} iconStyle={style.copyIcon} />
                        <Text style={style.shareOptionText}>Copy link</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.shareOption}>
                        <Icon icon={ICONS.chatBubble} iconStyle={style.copyIcon} />
                        <Text style={style.shareOptionText}>Messages</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
      </ScrollView>
      <PlanCreated
        visible={planCreatedVisible}
        onClose={() => setPlanCreatedVisible(false)}
      />
      <View style={style.footer}>
        <TouchableOpacity style={style.backButton} onPress={handleBack}>
          <Icon icon={ICONS.logOut} iconStyle={style.blackIconSize} />
          <Text style={style.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.createButton} onPress={onInitCreatePlan}>
          <Text style={style.createButtonText}>Create Plan</Text>
          <Icon icon={ICONS.logIn} iconStyle={style.whiteIconSize} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StepThree;
