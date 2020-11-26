import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { debounce } from "lodash";

import ItemSeparator from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";
import RepositoryListSort from "./RepositoryListSort";
import TextInput from "./TextInput";

import useRepositories from "../hooks/useRepositories";
import theme from "../theme";

import {
  ASC_CONSTANT,
  DESC_CONSTANT,
  LOWEST_RATED_REPOSITORIES_CONSTANT,
  CREATED_AT_CONSTANT,
  HIGHEST_RATED_REPOSITORIES_CONSTANT,
  LATEST_REPOSITORIES_CONSTANT,
  RATING_AVERAGE_CONSTANT,
} from "../constants";

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  inputRowContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  inputField: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: 3,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { orderingFunctions, searchFunctions } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.inputRowContainer}>
          <IconButton icon="find-replace" size={20} />
          <TextInput
            onChangeText={searchFunctions.handleTextChange}
            placeholder="Search for a repository"
            style={styles.inputField}
          />
        </View>
        <RepositoryListSort orderingFunctions={orderingFunctions} />
      </View>
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;
    return (
      <FlatList
        testID="repositoryList"
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem {...item} />}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState(CREATED_AT_CONSTANT);
  const [orderDirection, setOrderDirection] = useState(DESC_CONSTANT);
  const [orderTitle, setOrderTitle] = useState(LATEST_REPOSITORIES_CONSTANT);
  const [searchKeyword, setSearchKeyword] = useState("");

  const variables = { orderBy, orderDirection, searchKeyword, first: 15 };
  const { repositories, fetchMore } = useRepositories(variables);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  const orderByLatestRepositories = () => {
    setOrderBy(CREATED_AT_CONSTANT);
    setOrderDirection(DESC_CONSTANT);
    setOrderTitle(LATEST_REPOSITORIES_CONSTANT);
  };

  const orderByHighestRatedRepositories = () => {
    setOrderBy(RATING_AVERAGE_CONSTANT);
    setOrderDirection(DESC_CONSTANT);
    setOrderTitle(HIGHEST_RATED_REPOSITORIES_CONSTANT);
  };

  const orderByLowestRatedRepositories = () => {
    setOrderBy(RATING_AVERAGE_CONSTANT);
    setOrderDirection(ASC_CONSTANT);
    setOrderTitle(LOWEST_RATED_REPOSITORIES_CONSTANT);
  };

  const orderingFunctions = {
    orderByLatestRepositories,
    orderByHighestRatedRepositories,
    orderByLowestRatedRepositories,
    orderTitle,
  };

  const handleTextChange = debounce((text) => {
    setSearchKeyword(text);
  }, 500);

  const searchFunctions = {
    handleTextChange,
  };

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      orderingFunctions={orderingFunctions}
      searchFunctions={searchFunctions}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
