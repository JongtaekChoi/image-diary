import { Theme } from "@emotion/react";
const colors: Record<"light" | "dark", Theme["colors"]> = {
  light: {
    text: "#111",
    primary: "#005A8C",
    background: "#EFEFEF",
    tint: "#2f95dc",
    tabIconDefault: "rgba(0, 0, 0, 0.5)",
    tabIconSelected: "#2f95dc",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    oppositeShadowColor: "rgba(255, 255, 255, 0.3)",
  },
  dark: {
    text: "#fff",
    primary: "#005A8C",
    background: "#212121",
    tint: "#2f95dc",
    tabIconDefault: "rgba(255, 255, 255, 0.5)",
    tabIconSelected: "#fff",
    shadowColor: "rgba(255, 255, 255, 0.2)",
    oppositeShadowColor: "rgba(0, 0, 0, 0.3)",
  },
};

export default colors;
