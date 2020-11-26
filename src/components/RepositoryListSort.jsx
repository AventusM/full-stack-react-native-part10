import React, { useState, Fragment } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { IconButton, Modal, Portal } from "react-native-paper";

import {
  LOWEST_RATED_REPOSITORIES_CONSTANT,
  HIGHEST_RATED_REPOSITORIES_CONSTANT,
  LATEST_REPOSITORIES_CONSTANT,
} from "../constants";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContentContainer: {
    backgroundColor: "white",
    padding: 10,
  },
  spacer: {
    backgroundColor: theme.colors.mainBackground,
    marginBottom: 5,
    marginTop: 5,
    height: 1,
    width: "100%",
  },
});

const ModalOption = ({ text, last, orderingFunction, hideModal }) => {
  const selectAndHideModal = () => {
    orderingFunction();
    hideModal();
  };

  return (
    <TouchableWithoutFeedback onPress={selectAndHideModal}>
      <View>
        <Text fontWeight="bold">{text}</Text>
        {!last && <View style={styles.spacer} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const RepositoryListSort = ({ orderingFunctions }) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Fragment>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContentContainer}
        >
          <Text color="textSecondary">Select an item...</Text>
          <View style={styles.spacer} />
          <ModalOption
            hideModal={hideModal}
            orderingFunction={orderingFunctions.orderByLatestRepositories}
            text={LATEST_REPOSITORIES_CONSTANT}
          />
          <ModalOption
            hideModal={hideModal}
            orderingFunction={orderingFunctions.orderByHighestRatedRepositories}
            text={HIGHEST_RATED_REPOSITORIES_CONSTANT}
          />
          <ModalOption
            hideModal={hideModal}
            orderingFunction={orderingFunctions.orderByLowestRatedRepositories}
            text={LOWEST_RATED_REPOSITORIES_CONSTANT}
            last
          />
        </Modal>
      </Portal>
      <TouchableWithoutFeedback onPress={showModal}>
        <View style={styles.container}>
          <Text>{orderingFunctions.orderTitle}</Text>
          <IconButton
            icon={visible ? "chevron-up" : "chevron-down"}
            size={16}
          />
        </View>
      </TouchableWithoutFeedback>
    </Fragment>
  );
};

export default RepositoryListSort;
