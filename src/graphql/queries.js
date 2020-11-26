import { gql } from "apollo-boost";

export const GET_AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $searchKeyword: String
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $first: Int
    $after: String
  ) {
    repositories(
      searchKeyword: $searchKeyword
      orderDirection: $orderDirection
      orderBy: $orderBy
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          fullName
          ownerAvatarUrl
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query getUsers($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      ownerAvatarUrl
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;
