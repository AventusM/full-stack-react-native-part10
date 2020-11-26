import { useMutation } from "@apollo/react-hooks";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ id }) => {
    const { data } = await mutate({
      notifyOnNetworkStatusChange: true,
      variables: { id },
    });

    return data;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
