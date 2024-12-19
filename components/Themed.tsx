import { Text as DefaultText, View as DefaultView } from "react-native";

import styled from "@emotion/native";

export const Text = styled(DefaultText)`
  color: ${(props) => props.theme.colors.text};
`;

export const View = styled(DefaultView)`
  background-color: ${(props) => props.theme.colors.background};
`;
