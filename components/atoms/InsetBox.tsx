import { BlurStyle, Canvas, Rect, Skia } from "@shopify/react-native-skia";
import { LayoutChangeEvent, View } from "react-native";

import React from "react";
import { Text } from "../Themed";

const InsetShadowBox = () => {
  const paint1 = Skia.Paint();
  paint1.setColor(Skia.Color("#c5c5c5"));
  paint1.setMaskFilter(Skia.MaskFilter.MakeBlur(BlurStyle.Normal, 6, true));

  const paint2 = Skia.Paint();
  paint2.setColor(Skia.Color("#ffffff"));
  paint2.setMaskFilter(Skia.MaskFilter.MakeBlur(BlurStyle.Normal, 6, true));

  const [layout, setLayout] = React.useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  return (
    <View
      onLayout={onLayout}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Canvas style={{ flex: 1 }}>
        <Rect
          x={4}
          y={4}
          width={layout.width}
          height={layout.height}
          paint={paint1}
        />
        <Rect
          x={-4}
          y={-4}
          width={layout.width}
          height={layout.height}
          paint={paint2}
        />
      </Canvas>
    </View>
  );
};

export default InsetShadowBox;
