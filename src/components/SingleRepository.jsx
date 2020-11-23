import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const SingleRepository = () => {
  let { id } = useParams();
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id },
  });

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  const repositoryNode = data.repository ?? null;

  return <RepositoryItem {...repositoryNode} showLink />;
};

export default SingleRepository;
