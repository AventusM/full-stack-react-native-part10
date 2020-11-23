import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  mainInfoTextContainer: {
    flexDirection: "column",
    flexShrink: 1, // Wraps text within mobile devices instead of becoming 'invisible'
    marginLeft: 10,
    marginBottom: 10,
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  spacedAround: {
    justifyContent: "space-around",
  },
  centerAligned: {
    alignItems: "center",
  },
  selfStartAligned: {
    alignSelf: "flex-start",
  },
  languagePill: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  rowMargin: {
    marginVertical: 6,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
});

const RepositoryItem = (props) => {
  const {
    ownerAvatarUrl,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
  } = props;

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.imageContainer} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.mainInfoTextContainer}>
          <Text testID={"fullName"} fontWeight="bold">
            {fullName}
          </Text>
          <Text testID={"description"} color="textSecondary">
            {description}
          </Text>
          <View
            style={[
              styles.selfStartAligned,
              styles.languagePill,
              styles.rowMargin,
            ]}
          >
            <Text testID={"language"} color="textWhite">
              {language}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.spacedAround]}>
        <SecondaryItem
          metric={stargazersCount}
          description={"Stars"}
          testID={"stars"}
        />
        <SecondaryItem
          metric={forksCount}
          description={"Forks"}
          testID={"forks"}
        />
        <SecondaryItem
          metric={reviewCount}
          description={"Reviews"}
          testID={"reviews"}
        />
        <SecondaryItem
          metric={ratingAverage}
          description={"Rating"}
          testID={"rating"}
        />
      </View>
    </View>
  );
};

const SecondaryItem = ({ metric, description, testID }) => {
  return (
    <View testID={testID} style={[styles.column, styles.centerAligned]}>
      <Text fontWeight="bold">{formatMetricToK(metric)}</Text>
      <Text color="textSecondary">{description}</Text>
    </View>
  );
};

/* Stolen from here https://stackoverflow.com/a/9461657 */
export const formatMetricToK = (metric) =>
  metric >= 1000
    ? Math.sign(metric) * (Math.abs(metric) / 1000).toFixed(1) + "k"
    : Math.sign(metric) * Math.abs(metric);

export default RepositoryItem;
