import {
  FlatList,
  Image,
  Linking,
  Modal,
  ScrollView,
  SectionList,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import styles from "./styles";
import {
  GENDER,
  genderOptions,
  ICONS,
  themeOptions,
  whoCanMessageOptions,
} from "@/constants";
import { COLORS } from "@/constants/colors";
import { moderateScale } from "@/utils/metrics";
import FeatureCard from "./FeatureCard";
import { goBack, navigation } from "@/navigation/rootNavigation";
import { NAMES } from "@/navigation/name";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BoxComponent from "@/hoc/OuterView";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { signOut } from "@/redux/services/authServices";
import { PRIVACY_URL, TOS_URL } from "@/utils/Constants";
import { sendReportRequest } from "@/redux/slices/postSlice";
import {
  addPhoneNumberRequest,
  updateSecuritySettingsRequest,
} from "@/redux/slices/updateSecuritiesSlice";
import { onUpdateprofile, selectUserData } from "@/redux/slices/userSlice";
import moment from "moment";
import {
  capitalize,
  fetchthemeMode,
  getAddressFromMapbox,
  getLocationFromCoordinates,
} from "@/utils/helper";
import CustumModal from "@/components/CustumModal";
import { STRINGS } from "@/constants/strings";
import { WebView } from 'react-native-webview';
import axios from 'axios';

const Settings = () => {
  const insets = useSafeAreaInsets();
  const { theme, themeType, handleTheme } = useTheme();
  const styless = useMemo(() => styles(theme), [theme]);
  const [selectedTab, setSelectedTab] = useState("Settings");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStep, setModalStep] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(selectUserData);
  const [isModalVisible, setIsmodalVisible] = useState(false);
  const { userLocation } = useSelector((state: RootState) => state.user);
  const [currentLocation, setCurrentLocation] = useState("");

  const { userToken } = useSelector((state: RootState) => state.auth);
  const [modalData, setModalData] = useState<any>({
    type: "",
    options: [],
    selectedValue: "",
    id: "",
  });

    // Stats for Instagram 
    const [authUrl, setAuthUrl] = useState<string>("");
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const INSTAGRAM_CLIENT_ID = '450604364686979';
    const INSTAGRAM_CLIENT_SECRET = '602a72d90240c6f085aa79d82fa122ec';
    const REDIRECT_URI = 'https://loktin.app'; // Must match Instagram App Settings


    const onPressInstagram = () => {
      const url =
        `https://api.instagram.com/oauth/authorize` +
        `?client_id=${INSTAGRAM_CLIENT_ID}` +
        `&redirect_uri=${REDIRECT_URI}` +
        `&scope=user_profile,user_media` +
        `&response_type=code`;
  
      setAuthUrl(url);
  };
  
    const getCodeFromUrl = (url: string) => {
      const match = url.match(/code=([^&]+)/);
      return match ? match[1] : null;
    };
  
    const getAccessToken = async (code) => {
      const response = await axios.post(
        'https://api.instagram.com/oauth/access_token',
        new URLSearchParams({
          client_id: INSTAGRAM_CLIENT_ID,
          client_secret: INSTAGRAM_CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URI,
          code,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      return response.data.access_token;
    };
  
    useEffect(() => {
      const handleDeepLink = async ({ url }) => {
        console.log('📲 App opened with URL:', url);
        const code = getCodeFromUrl(url);
  
        if (code) {
          setAuthUrl(null);
          setLoading(true);
  
          try {
            const token = await getAccessToken(code);
            setAccessToken(token);
            console.log('✅ Access Token:', token);
          } catch (error) {
            console.error('❌ Error getting access token:', error.response?.data || error.message);
          } finally {
            setLoading(false);
          }
        }
      };
  
      const subscription = Linking.addEventListener('url', handleDeepLink);
      return () => subscription.remove();
    }, []);


  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddressFromMapbox(
        userLocation?.latitude,
        userLocation?.longitude
      );
      setCurrentLocation(address);
    };

    fetchAddress();
  }, [userLocation]);

  // update-securities
  // useEffect(() => {
  //    const data =  {
  //         "phoneNumber": "+19786159222"
  //     }
  //     console.log("data",data)
  //     dispatch(
  //         addPhoneNumberRequest({
  //             url: "/update-securities/update-securities-addPhone",
  //             userToken,
  //             data
  //           })
  //         );
  //   }, []);

  const handleClose = () => {
    setModalVisible(false);
    setModalStep(1);
  };

  const handleVerified = () => {
    setModalStep((prev) => prev + 1);
  };

  interface SettingItem {
    key: string;
    label: string;
    value?: string | boolean;
    type?: "navigate" | "switch" | "box";
  }

  interface SettingsSection {
    title: string;
    data: SettingItem[];
  }

  interface SettingItem {
    key: string;
    label: string;
    value?: string | boolean;
    type?: "navigate" | "switch" | "box";
    onPress?: () => void;
    showArrow?: boolean;
  }

  interface Section {
    title: string;
    data: SettingItem[];
  }

  interface Feature {
    id: string;
    title: string;
    icon: string;
  }

  const features: Feature[] = [
    // { id: '1', title: 'Profile Verification', icon: ICONS.shieldprofile },
    {
      id: "2",
      title: "Check-In and Emergency Features",
      icon: ICONS.blazingstar,
    },
    {
      id: "3",
      title: "Activity Safety Suggestions",
      icon: ICONS.noteshield,
    },
    {
      id: "4",
      title: "Message Moderation",
      icon: ICONS.chat,
    },
  ];

  const settingsData: Section[] = [
    {
      title: "Account Details",
      data: [
        {
          key: "contact",
          label: "Contact",
          value: userInfo.phone ?? "-",
          showArrow: false,
        },
        {
          key: "birthday",
          label: "Birthday",
          value: moment(userInfo?.dateOfBirth).format("MMMM DD, YYYY"),
          showArrow: false,
        },
        {
          key: "gender",
          label: "Gender",
          value: capitalize(userInfo?.gender),
          type: "navigate",
          onPress: () => {
            setModalData({
              type: "Gender",
              selectedValue: userInfo?.gender,
              options: handleModalData("1"),
              id: "1",
            });
            setIsmodalVisible(true);
          },
          showArrow: true,
        },
        {
          key: "location",
          label: "Current Location",
          value: currentLocation ?? "-",
          type: "box",
          showArrow: false,
        },
      ],
    },
    {
      title: "Customization",
      data: [
        {
          key: "theme",
          label: "Theme Mode",
          value: fetchthemeMode(themeType),
          type: "navigate",
          onPress: () => {
            setModalData({
              type: "Theme Mode",
              selectedValue: themeType,
              options: handleModalData("2"),
              id: "2",
            });
            setIsmodalVisible(true);
            // navigation.navigate(NAMES.editDetails, {
            //     title: 'Theme Mode'
            // })
          },
          showArrow: true,
        },
      ],
    },
    {
      title: "Notifications",
      data: [
        {
          key: "notifications",
          label: "Enable Notifications",
          type: "switch",
          value: userInfo?.enable_notifications,
        },
      ],
    },

    {
      title: "Privacy and Security",
      data: [
        {
          key: "2fa",
          label: "Two-Factor Authentication",
          type: "switch",
          value: userInfo?.two_factor_authentication,
        },
        {
          key: "message",
          label: "Who Can Message Me",
          value: "Only Keys ",
          type: "navigate",
          onPress: () => {
            setModalData({
              type: "Who Can Message Me",
              selectedValue: whoCanMessageOptions,
              options: handleModalData("3"),
              id: "3",
            });
            setIsmodalVisible(true);
          },
          showArrow: true,
        },
        {
          key: "status",
          label: "Show Online Status",
          type: "switch",
          value: userInfo?.show_online_status,
        },
      ],
    },
    {
      title: "Data/Account Management",
      data: [
        {
          key: "download",
          label: "Download My Data",
          type: "navigate",
          onPress: () =>
            navigation.navigate(NAMES.editDetails, {
              title: "Create Files To Download",
            }),
          showArrow: true,
        },
        {
          key: 'instagram',
          label: 'Connect Instagram',
          type: 'navigate',
          onPress: () => console.log('Connect Instagram'),
          showArrow: true
      },
        {
          key: "logout",
          label: "Log Out",
          type: "navigate",
          onPress: () => {
            dispatch(signOut());
          },
          showArrow: true,
        },
        {
          key: "delete",
          label: "Delete Account",
          type: "navigate",
          onPress: () => console.log("Delete Account"),
          showArrow: true,
        },
      ],
    },
    {
      title: "Help and Support",
      data: [
        {
          key: "faqs",
          label: "FAQs",
          type: "navigate",
          onPress: () => console.log("FAQs"),
          showArrow: true,
        },
        {
          key: "support",
          label: "Contact Support",
          type: "navigate",
          onPress: () => console.log("Contact Support"),
          showArrow: true,
        },
        {
          key: "report",
          label: "Report a Problem",
          type: "navigate",
          onPress: () => console.log("Report a Problem"),
          showArrow: true,
        },
        {
          key: "guideline",
          label: "Community Guidelines",
          type: "navigate",
          onPress: () => console.log("Community Guidelines"),
          showArrow: true,
        },
      ],
    },
    {
      title: "Terms and Privacy Policy",
      data: [
        {
          key: "terms",
          label: "Terms of Service",
          type: "navigate",
          onPress: () => {
            Linking.openURL(TOS_URL);
          },
          showArrow: true,
        },
        {
          key: "privacy",
          label: "Privacy Policy",
          type: "navigate",
          onPress: () => {
            Linking.openURL(PRIVACY_URL);
          },
          showArrow: true,
        },
      ],
    },
  ];

  const renderItem = ({ item }: { item: SettingItem }) => {
    // if (item.key === 'location') {
    //     return <View style={styless.optionView}></View>
    // }
    return (
      <TouchableOpacity
        style={styless.optionView}
        onPress={
          () => {
            if (item.key === "instagram") {
              onPressInstagram();
            } else {
              item &&
                item.type === "navigate" &&
                item.onPress &&
                item.onPress();
            }
          }
          // item && item.type === "navigate" && item.onPress && item.onPress()
        }
        disabled={item.type !== "navigate"}
      >
        {item.key == "location" ? (
          <View style={styless.locationView}>
            <Text style={styless.locationLabel}>{item.label}</Text>
            <Text style={styless.locationValue}>{item.value}</Text>
          </View>
        ) : (
          <>
            <Text style={styless.lableText}>{item.label}</Text>
            {item.type === "switch" ? (
              <Switch
                value={Boolean(item.value)}
                trackColor={{ true: COLORS.primaryColor }}
                thumbColor={COLORS.white}
                onValueChange={() => console.log(`Toggle ${item.key}`)}
              />
            ) : (
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {item.value && (
                  <Text style={styless.valueText}>{String(item.value)}</Text>
                )}
                {item.showArrow && (
                <Image
                  source={item?.label === "Connect Instagram" ? ICONS.instagram : ICONS.rightArrow}
                  style={item?.label === "Connect Instagram" ? styless.instagramImage : styless.rightImage}
                />
                )}
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    );
  };

  const handleFeaturePress = (id: String) => {
    switch (id) {
      case "1":
        setModalVisible(true);
        break;
      case "2":
        navigation.navigate(NAMES.emeregencyFeatures);
        break;
      case "3":
        navigation.navigate(NAMES.safetysuggestion);
        break;
      case "4":
        navigation.navigate(NAMES.messageModeration);
        break;
    }
  };
  const handleModalData = (id: string) => {
    switch (id) {
      case "1":
        return genderOptions;
      case "2":
        return themeOptions;
      case "3":
        return whoCanMessageOptions;
      default:
        return genderOptions;
    }
  };

  const handleModalSelection = (item: any) => {
    if (modalData.id == "2") {
      handleTheme(item);
    }
    if (modalData.id == "1") {
      dispatch(
        onUpdateprofile({
          url: "auth/update-user",
          data: {
            gender: item,
          },
        })
      );
    }
    if (modalData.id == "3") {
      dispatch(
        updateSecuritySettingsRequest({
          url: "update-securities/update-securities-setting",
          userToken,
          data: {
            howCanMessageMe: item,
          },
        })
      );
    }
    setModalData({
      ...modalData,
      selectedValue: item,
    });
  };

  return (
    <View style={[styless.container]}>
      <StatusBar backgroundColor={theme.colors.white} />
      <Header
        centerText="Settings"
        leftIcon={true}
        leftView={{
          onPress: () => {
            authUrl ? setAuthUrl(null) : goBack();
          },
          icon: ICONS.left_arrow,
        }}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 20 }}
        />
      )}
      {!authUrl  ? (
        <ScrollView>
          <View style={{ alignItems: "center", padding: moderateScale(20) }}>
            <Image
              source={
                userInfo?.ProfilePhoto
                  ? { uri: userInfo?.ProfilePhoto }
                  : userInfo?.profilePhotoUrls?.[0]
                  ? { uri: userInfo?.profilePhotoUrls?.[0] }
                  : ICONS.imageplaceholder
              }
              style={
                userInfo?.profilePhotoUrls?.[0] || userInfo?.ProfilePhoto
                  ? styless.profileImage
                  : styless.profileImageholder
              }
            />
            <Text style={styless.userText}>{userInfo?.firstName}</Text>
            {userInfo?.email && (
              <Text style={styless.emailText}>{userInfo?.email}</Text>
            )}
          </View>

          <View style={styless.tabContainer}>
            {["Settings", "Safety Center"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={[
                  styless.tabView,
                  selectedTab === tab && styless.activeTabLine,
                ]}
              >
                <Text
                  style={[
                    styless.tabText,
                    selectedTab === tab && styless.activeTab,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedTab === "Settings" && (
            <SectionList
              sections={settingsData}
              keyExtractor={(item) => item.key}
              renderItem={renderItem}
              renderSectionHeader={({ section: { title } }) => (
                <View style={styless.headerView}>
                  <Text style={styless.listTitle}>{title}</Text>
                </View>
              )}
              contentContainerStyle={{
                paddingBottom: insets.bottom + 10,
              }}
              stickySectionHeadersEnabled={false}
            />
          )}

          {selectedTab === "Safety Center" && (
            <View style={styless.container}>
              <FlatList
                style={{ marginTop: moderateScale(15) }}
                data={features}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <FeatureCard
                    icon={item.icon}
                    title={item.title}
                    theme={theme}
                    id={item.id}
                    handleFeaturePress={handleFeaturePress}
                  />
                )}
                ListFooterComponent={() => (
                  <Text style={styless.footerText}>
                    More Safety Features Coming Soon!
                  </Text>
                )}
                contentContainerStyle={{ paddingBottom: insets.bottom + 10 }}
                removeClippedSubviews={false}
              />
            </View>
          )}
          <CustumModal
            headerName={modalData.type}
            selectedValue={modalData.selectedValue}
            isVisible={isModalVisible}
            options={modalData.options}
            onClose={() => setIsmodalVisible(false)}
            onSelect={(item) => {
              handleModalSelection(item);
            }}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleClose}
          >
            <View style={styless.centeredView}>
              {modalStep === 1 ? (
                <View style={styless.modalView}>
                  <Icon
                    icon={ICONS.Camera}
                    iconStyle={styless.cameraIcon}
                    onPress={goBack}
                  />
                  <Text style={styless.modalTitle}>Get Photo Verified</Text>
                  <Text style={styless.modalbody}>
                    On Loktin, trust is key (pun intended) so help confirm you
                    match your photos!
                  </Text>
                  <View>
                    <Button
                      title="Lets Do It!"
                      viewstyle={styless.bottomView}
                      textStyle={styless.btnText}
                      onPress={handleVerified}
                    />
                    <Button
                      title="Maybe Later"
                      viewstyle={styless.cancelView}
                      textStyle={styless.cancelBtnText}
                      onPress={handleClose}
                    />
                  </View>
                </View>
              ) : modalStep === 2 ? (
                <View style={styless.modalView}>
                  <Icon
                    icon={ICONS.Camera}
                    iconStyle={styless.cameraIcon}
                    onPress={goBack}
                  />
                  <Text style={styless.modalTitle}>How it Works</Text>
                  <ScrollView>
                    <Text style={styless.modalbody}>
                      {
                        "Loktin uses a secure and straightforward process to verify your identity and ensure authenticity within the community. To get verified, you’ll be asked to take a quick selfie within the app. This selfie is then compared to the photos on your profile using advanced facial recognition technology to confirm that they match. Once the verification is successful, your profile will display a badge, signaling to others that you’re the real deal. Rest assured, your selfie is stored securely and used only for verification purposes, helping to foster a safe and trustworthy environment for everyone."
                      }
                    </Text>
                  </ScrollView>
                  <View>
                    <Button
                      title="Continue"
                      viewstyle={styless.bottomView}
                      textStyle={styless.btnText}
                      onPress={handleVerified}
                    />
                    <Button
                      title="Not Now"
                      viewstyle={styless.cancelView}
                      textStyle={styless.cancelBtnText}
                      onPress={handleClose}
                    />
                  </View>
                </View>
              ) : (
                <View style={styless.modalView}>
                  <Icon
                    icon={ICONS.LockKey}
                    iconStyle={styless.LockIcon}
                    onPress={goBack}
                  />
                  <Text style={styless.modalTitle}>Thanks!</Text>
                  <Text style={styless.modalbody}>
                    Thanks for verifying your profile! You're all set to explore
                    and connect.
                  </Text>

                  <Button
                    title="Finish"
                    viewstyle={styless.bottomView}
                    textStyle={styless.btnText}
                    onPress={handleClose}
                  />
                </View>
              )}
            </View>
          </Modal>
        </ScrollView>
      ) : (
        <WebView
          source={{ uri: authUrl }}
          startInLoadingState
          javaScriptEnabled
        />
      )}
    </View>
  );
};

export default BoxComponent(Settings);
