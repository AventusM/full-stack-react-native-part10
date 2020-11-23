import React from "react";
import { render } from "@testing-library/react-native";

import { RepositoryListContainer } from "../../components/RepositoryList";
import { formatMetricToK } from "../../components/RepositoryItem";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const { debug, getAllByTestId } = render(
        <RepositoryListContainer
          repositories={repositories.edges.map((edge) => edge.node)}
        />
      );

      repositories.edges
        .map((edge) => edge.node)
        .forEach((node, index) => {
          const comparisonNode = repositories.edges[index].node;

          const renderedFullName = getAllByTestId("fullName")[index];
          expect(renderedFullName).toHaveTextContent(node.fullName);
          expect(node.fullName).toBe(comparisonNode.fullName);

          const renderedDescription = getAllByTestId("description")[index];
          expect(renderedDescription).toHaveTextContent(node.description);
          expect(node.description).toBe(comparisonNode.description);

          const renderedLanguage = getAllByTestId("language")[index];
          expect(renderedLanguage).toHaveTextContent(node.language);
          expect(node.language).toBe(comparisonNode.language);

          const renderedForksCount = getAllByTestId("forks")[index];
          expect(renderedForksCount).toHaveTextContent(
            formatMetricToK(node.forksCount)
          );
          expect(node.forksCount).toBe(comparisonNode.forksCount);

          const renderedStargazersCount = getAllByTestId("stars")[index];
          expect(renderedStargazersCount).toHaveTextContent(
            formatMetricToK(node.stargazersCount)
          );
          expect(node.stargazersCount).toBe(comparisonNode.stargazersCount);

          const renderedRatingAverage = getAllByTestId("rating")[index];
          expect(renderedRatingAverage).toHaveTextContent(
            formatMetricToK(node.ratingAverage)
          );
          expect(node.ratingAverage).toBe(comparisonNode.ratingAverage);

          const renderedReviewCount = getAllByTestId("reviews")[index];
          expect(renderedReviewCount).toHaveTextContent(
            formatMetricToK(node.reviewCount)
          );
          expect(node.reviewCount).toBe(comparisonNode.reviewCount);
        });
    });
  });
});
