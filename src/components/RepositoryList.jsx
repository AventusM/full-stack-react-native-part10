import React, { useState } from "react";
import { FlatList } from "react-native";

import ItemSeparator from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";
import RepositoryListSort from "./RepositoryListSort";

import useRepositories from "../hooks/useRepositories";

export const RepositoryListContainer = ({
  repositories,
  orderingFunctions,
}) => {
  return (
    <FlatList
      testID="repositoryList"
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem {...item} />}
      ListHeaderComponent={
        <RepositoryListSort orderingFunctions={orderingFunctions} />
      }
      keyExtractor={(item) => item.id}
    />
  );
};

const CREATED_AT_CONSTANT = "CREATED_AT";
const RATING_AVERAGE_CONSTANT = "RATING_AVERAGE";
const ASC_CONSTANT = "ASC";
const DESC_CONSTANT = "DESC";

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState(CREATED_AT_CONSTANT);
  const [orderDirection, setOrderDirection] = useState(DESC_CONSTANT);

  const orderingOptions = { orderBy, orderDirection };
  const { repositories } = useRepositories(orderingOptions);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const orderByLatestRepositories = () => {
    setOrderBy(CREATED_AT_CONSTANT);
    setOrderDirection(DESC_CONSTANT);
  };

  const orderByHighestRatedRepositories = () => {
    setOrderBy(RATING_AVERAGE_CONSTANT);
    setOrderDirection(DESC_CONSTANT);
  };

  const orderByLowestRatedRepositories = () => {
    setOrderBy(RATING_AVERAGE_CONSTANT);
    setOrderDirection(ASC_CONSTANT);
  };

  const orderingFunctions = {
    orderByLatestRepositories,
    orderByHighestRatedRepositories,
    orderByLowestRatedRepositories,
  };

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      orderingFunctions={orderingFunctions}
    />
  );
};

export default RepositoryList;
