import { useWindowDimensions } from "react-native";

export default function useDimensions() {
  const { width, height } = useWindowDimensions();

  return { width, height };
}
