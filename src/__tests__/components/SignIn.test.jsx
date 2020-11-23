import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();

      // render the SignInContainer component, fill the text inputs and press the submit button
      const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

      const INPUT_USERNAME = "anton";
      const INPUT_PASSWORD = "wwWwWWwwwWW123123123123";

      fireEvent.changeText(getByTestId("usernameField"), INPUT_USERNAME);
      fireEvent.changeText(getByTestId("passwordField"), INPUT_PASSWORD);
      fireEvent.press(getByTestId("submitButton"));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);

        const { username, password } = onSubmit.mock.calls[0][0];
        expect(username).toBe(INPUT_USERNAME);
        expect(password).toBe(INPUT_PASSWORD);
      });
    });
  });
});
