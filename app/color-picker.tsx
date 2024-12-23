import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
  Preview,
  Swatches,
} from "reanimated-color-picker";
import { Text, View } from "react-native";

import Button from "@/components/atoms/Button";
import Row from "@/components/atoms/Row";
import styled from "@emotion/native";
import { useEdittingDiary } from "@/store/editting-diary";
import { useRouter } from "expo-router/build/hooks";
import { useState } from "react";

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: theme.size.pageHorizontalPadding,
  alignItems: "center",
}));

export default function MyColorPicker() {
  const { brushColor: color, setBrushColor: setColor } = useEdittingDiary();
  const router = useRouter();
  const [thumbColor, setThumbColor] = useState(color);

  return (
    <Container>
      <ColorPicker
        onChange={(colors) => setThumbColor(colors.rgb)}
        value={color}
      >
        <Preview />
        <View>
          <Panel1 />
        </View>

        <View>
          <Text>Opacity</Text>
          <OpacitySlider />
        </View>
        <Swatches />
      </ColorPicker>
      <Row>
        <Button
          onPress={() => {
            setColor(thumbColor);
            router.back();
          }}
        >
          선택
        </Button>
      </Row>
    </Container>
  );
}
