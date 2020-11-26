import { useQuery } from "@apollo/react-hooks";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = (variables) => {
  const { data, fetchMore, error, loading, ...result } = useQuery(
    GET_SINGLE_REPOSITORY,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_SINGLE_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

  return {
    repository: data ? data.repository : undefined,
    fetchMore: handleFetchMore,
    loading,
    error,
    ...result,
  };
};

export default useSingleRepository;
