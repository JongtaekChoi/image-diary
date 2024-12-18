import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import {
  Canvas,
  Image,
  PaintStyle,
  Path,
  Skia,
  useCanvasRef,
  useImage,
  usePathValue,
} from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import React, { useMemo, useRef, useState } from "react";

import styled from "@emotion/native";
import { useEdittingDiary } from "@/store/editting-diary";

const Container = styled.View`
  flex: 1;
  justifycontent: space-between;
`;

const Toolbar = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export default function ImageEditor() {
  const canvasRef = useCanvasRef();
  const { width, height } = useWindowDimensions();
  const size = Math.min(width, height);
  const [paths, setPaths] = useState([Skia.Path.Make()]);
  const path = paths.at(-1);
  const [brushColor, setBrushColor] = useState("black");
  const [brushWidth, setBrushWidth] = useState(4);

  const paint = Skia.Paint();
  paint.setColor(Skia.Color(brushColor));
  paint.setStyle(PaintStyle.Stroke);
  paint.setStrokeWidth(brushWidth);

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onTouchesDown((e) => {
      if (path && e.allTouches.length === 1) {
        path.moveTo(e.allTouches[0].x, e.allTouches[0].y);
      }
    })
    .onTouchesMove((e) => {
      if (path && e.allTouches.length === 1) {
        path.lineTo(e.allTouches[0].x, e.allTouches[0].y);
      }
    })
    .onEnd((e) => {
      if (path) {
        setPaths([...paths, Skia.Path.Make()]);
      }
    });

  const clearCanvas = () => {
    setPaths([Skia.Path.Make()]);
  };

  const { generateAIImage, imageData, diaryText, isLoading } =
    useEdittingDiary();
  const image = useImage(imageData);

  return (
    <Container>
      <GestureDetector gesture={gesture}>
        <Canvas ref={canvasRef} style={{ width: size, height: size }}>
          {image && (
            <Image image={image} width={size} height={size} x={0} y={0} />
          )}
          {paths.map((path, index) => {
            return <Path key={index} path={path} paint={paint} />;
          })}
        </Canvas>
      </GestureDetector>
      <Text>{diaryText}</Text>
      <Button disabled={true} title="AI 이미지 생성" />
      {isLoading && <ActivityIndicator />}
      <Toolbar>
        <Button title="Black" onPress={() => setBrushColor("black")} />
        <Button title="Red" onPress={() => setBrushColor("red")} />
        <Button title="Blue" onPress={() => setBrushColor("blue")} />
        <Button title="Thin" onPress={() => setBrushWidth(2)} />
        <Button title="Thick" onPress={() => setBrushWidth(8)} />
        <Button title="Clear" onPress={clearCanvas} />
      </Toolbar>
    </Container>
  );
}