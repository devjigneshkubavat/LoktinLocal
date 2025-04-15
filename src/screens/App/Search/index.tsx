import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BoxComponent from "@/hoc/OuterView";
import { useTheme } from "@/hooks/useTheme";
import styles from "./styles";
import Icon from "@/components/Icon";
import { ICONS } from "@/constants";
import { navigate } from "@/navigation/rootNavigation";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchedList,
  onSearchPlan,
  onSearchPlanBasedOnSuggetion,
  resetSearchList,
  setSearchPlanData,
} from "@/redux/slices/userSlice";
import { RootState } from "@/store/store";
import { getAllPreferences } from "@/constants/types";
import { NAMES } from "@/navigation/name";
import EventList from "../Profile/component/EventList/EventList";
import { COLORS } from "@/constants/colors";

const Search = () => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const [SearchText, onChangeSearchText] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const dispatch = useDispatch();
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { isLoading, searchPlanList, userLocation, suggetionList } =
    useSelector((state: RootState) => state.user);
  const [isShowSearchedData, setIsShowSearchedData] = useState(false);

  const onNavigateToPlanDetailsScreen = (id: number) => {
    navigate(NAMES.join, {
      planId: id,
    });
    clearSearchResult();
  };

  const renderListEmptyView = () => {
    if (isLoading) return <ActivityIndicator style={style.activityLoader} />;
    return (
      <View style={style.noDataTextContainer}>
        <Text style={[style.name]}>{"No Search Data Found"}</Text>
      </View>
    );
  };

  const renderSearchListItem = ({
    item,
  }: {
    item: { word: string; score: number };
  }) => {
    return (
      <TouchableOpacity
        style={style.searchListItem}
        onPress={() => {
          onChangeSearchText(item.word);
          setIsShowSearchedData(true);
          dispatch(resetSearchList());
          onSearchPlanBasedOnSuggestion(item.word);
        }}
      >
        <Text style={style.searchItemText}>{item?.word}</Text>
      </TouchableOpacity>
    );
  };

  const renderPlanList = ({ item }: { item: getAllPreferences[] }) => {
    if (item?.length == 0) return renderListEmptyView();
    return (
      <ScrollView style={{ padding: 10 }}>
        <EventList
          eventList={item}
          key={Math?.random()?.toFixed()}
          onEventPress={onNavigateToPlanDetailsScreen}
        />
      </ScrollView>
    );
  };

  const clearSearchResult = () => {
    onChangeSearchText("");
    setIsShowSearchedData(false);
    dispatch(setSearchPlanData({}));
    dispatch(clearSearchedList());
  };

  const fetchResults = async (query: string) => {
    if (!query) return;
    dispatch(
      onSearchPlan({
        url: `https://api.datamuse.com/sug?s=${query}`,
        userToken,
      })
    );
  };

  const onSearchPlanBasedOnSuggestion = (query: string) => {
    if (!query) return;
    dispatch(
      onSearchPlanBasedOnSuggetion({
        url: `/plans/get/search?q=${query}&latitude=${userLocation?.latitude}&longitude=${userLocation.longitude}&radius=5`,
        userToken,
      })
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(SearchText);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [SearchText]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchResults(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <View style={style.container}>
      <View style={[style.searchBar, SearchText && style.active]}>
        <View style={style.iconView}>
          <Icon icon={ICONS.searchIcon} iconStyle={style.icons} />
          <TextInput
            value={SearchText}
            onChangeText={onChangeSearchText}
            style={style.searchInput}
            placeholder="Search for a plans"
            placeholderTextColor={COLORS.fontblackColor}
          />
          <Icon
            icon={ICONS.closeIcon}
            iconStyle={style.icons}
            onPress={clearSearchResult}
          />
        </View>
      </View>
      {!isShowSearchedData && SearchText && suggetionList?.length != 0 && (
        <View
          style={{
            position: "absolute",
            top: "8%",
            width: "100%",
          }}
        >
          <FlatList
            data={suggetionList}
            renderItem={renderSearchListItem}
            style={[style.searchList]}
            ItemSeparatorComponent={() => <View style={style.itemSeparator} />}
            ListEmptyComponent={renderListEmptyView}
          />
        </View>
      )}
      {isShowSearchedData && renderPlanList({ item: searchPlanList })}
    </View>
  );
};

export default BoxComponent(Search);
