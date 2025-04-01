import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
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
import { onSearchPlan, setSearchPlanData } from "@/redux/slices/userSlice";
import { RootState } from "@/store/store";
import { getAllPreferences } from "@/constants/types";
import { NAMES } from "@/navigation/name";

const Search = () => {
  const { theme } = useTheme();
  const style = useMemo(() => styles(theme), [theme]);
  const [SearchText, onChangeSearchText] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const dispatch = useDispatch();
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { isLoading, searchPlanList } = useSelector(
    (state: RootState) => state.user
  );

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

  const renderSearchListItem = ({ item }: { item: getAllPreferences }) => {
    return (
      <TouchableOpacity
        style={style.searchListItem}
        onPress={() => onNavigateToPlanDetailsScreen(item?.id)}
      >
        <Text style={style.searchItemText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  const clearSearchResult = () => {
    onChangeSearchText("");
    dispatch(setSearchPlanData({}));
  };

  const fetchResults = async (query: string) => {
    if (!query) return;
    dispatch(
      onSearchPlan({
        url: `/plans/get/search?q=${query}`,
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
          />
          <Icon
            icon={ICONS.closeIcon}
            iconStyle={style.icons}
            onPress={clearSearchResult}
          />
        </View>
      </View>
      <FlatList
        data={searchPlanList}
        renderItem={renderSearchListItem}
        style={style.searchList}
        ItemSeparatorComponent={() => <View style={style.itemSeparator} />}
        ListEmptyComponent={renderListEmptyView}
      />
    </View>
  );
};

export default BoxComponent(Search);
