import React, { useEffect, useMemo } from "react";
import BoxComponent from "@/hoc/OuterView";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import styles from "./styles";
import CommonHeader from "@/components/CommonHeader/CommonHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { initiateJoinRequest, onAcceptRequest } from "@/redux/slices/userSlice";
import { RequestListProps, userDetails } from "@/constants/types";

const Request = () => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const dispatch = useDispatch();
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { requestUserList, isLoading, userInfo } = useSelector(
    (state: RootState) => state.user
  );

  const handleRequestAcceptOrIgnore = (id: number, status: string) => {
    dispatch(
      onAcceptRequest({
        url: `join-requests/${id}`,
        data: {
          status: status,
        },
        userToken,
      })
    );
  };

  const RequestList = ({
    requestUserList,
  }: {
    requestUserList: RequestListProps[];
  }) => {
    const groupedRequests = requestUserList?.reduce(
      (acc: { [key: string]: RequestListProps[] }, request) => {
        const planName = request?.plan?.name;
        if (!acc[planName]) {
          acc[planName] = [];
        }
        acc[planName].push(request);
        return acc;
      },
      {}
    );
    return (
      <View>
        {Object.keys(groupedRequests).map((planName) => (
          <View key={planName}>
            <Text style={style.requestTitle}>{planName}</Text>
            <View style={style.boxContainer}>
              {groupedRequests[planName]?.map((request: RequestListProps) => {
                if (request?.status !== "pending") {
                  return (
                    <View style={style.noDataTextContainer}>
                      <Text style={[style.name]}>{"No Requests Found"}</Text>
                    </View>
                  );
                }
                return (
                  <View style={style.box} key={request?.id}>
                    <Image
                      source={{
                        uri:
                          request?.user?.profilePhotoUrls?.[0] ||
                          "https://randomuser.me/api/portraits/men/1.jpg",
                      }}
                      style={style.boxImage}
                      resizeMode="cover"
                    />
                    <Text style={style.name}>{request?.user?.username}</Text>
                    <View style={style.buttonContainer}>
                      <TouchableOpacity
                        style={style.button}
                        onPress={() =>
                          handleRequestAcceptOrIgnore(request?.id, "accepted")
                        }
                      >
                        <Text style={style.buttonText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={style.secondaryButton}
                        onPress={() =>
                          handleRequestAcceptOrIgnore(request?.id, "rejected")
                        }
                      >
                        <Text style={style.secondaryButtonText}>Ignore</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    );
  };

  useEffect(() => {
    // !! Need to put user ID Dynamically Right now data is not coming from API so I;ve put as 2.

    // /plans/pending-join-requests/:userId
    dispatch(
      initiateJoinRequest({
        url: `plans/pending-join-requests/${userInfo?.userId}`,
        userToken,
      })
    );
  }, []);

  return (
    <View style={style.container}>
      {isLoading ? (
        <ActivityIndicator style={style.activityIndicatior} />
      ) : null}
      <CommonHeader leftText={"Join Request"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {RequestList({ requestUserList })}
      </ScrollView>
    </View>
  );
};

export default BoxComponent(Request);
