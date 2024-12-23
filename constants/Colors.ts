import { Theme } from "@emotion/react";

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

const colors: Record<"light" | "dark", Theme["colors"]> = {
  light: {
    text: "#000",
    background: "#e8e8e8",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    shadowColor: "#000",
    oppositeShadowColor: "#fff",
  },
  dark: {
    text: "#fff",
    background: "#212121",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    shadowColor: "#fff",
    oppositeShadowColor: "#000",
  },
};

export default colors;
