import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderingOptions) => {
  const [allRepositories, setAllRepositories] = useState();

  const response = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderingOptions.orderBy,
      orderDirection: orderingOptions.orderDirection,
    },
    onCompleted: ({ repositories }) => {
      setAllRepositories(repositories);
    },
  });

  return {
    repositories: allRepositories,
    loading: response.loading,
    error: response.error,
  };
};

export default useRepositories;
