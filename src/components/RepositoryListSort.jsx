import React, { useState, Fragment } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { IconButton, Modal, Portal } from "react-native-paper";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.mainBackground,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
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

const ModalOption = ({ text, last }) => {
  return (
    <TouchableWithoutFeedback onPress={() => console.log("pressed:", text)}>
      <View>
        <Text fontWeight="bold">{text}</Text>
        {!last && <View style={styles.spacer} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const RepositoryListSort = () => {
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
          <ModalOption text="Latest repositories" />
          <ModalOption text="Highest rated repositories" />
          <ModalOption text="Lowest rated repositories" last />
        </Modal>
      </Portal>
      <TouchableWithoutFeedback onPress={showModal}>
        <View style={styles.container}>
          <Text>SET Order type from response</Text>
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
