import { Platform } from "react-native";

const theme = {
  colors: {
    error: "#d73a4a",
    grayishTransparent: "rgba(0,0,0,0.75)",
    white: "#fff",
    mainBackground: "#e1e4e8",
    appbarBackground: "#24292e",
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
