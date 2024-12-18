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
  const pathRef = useRef(Skia.Path.Make());
  const [path] = useState(() => Skia.Path.Make());
  const [brushColor, setBrushColor] = useState("black");
  const [brushWidth, setBrushWidth] = useState(4);

  const paint = Skia.Paint();
  paint.setColor(Skia.Color(brushColor));
  paint.setStyle(PaintStyle.Stroke);
  paint.setStrokeWidth(brushWidth);

  const gesture = Gesture.Pan()
    .onTouchesDown((e) => {
      if (e.allTouches.length === 1) {
        path.moveTo(e.allTouches[0].x, e.allTouches[0].y);
        pathRef.current = path;
      }
    })
    .onTouchesMove((e) => {
      if (e.allTouches.length === 1) {
        path.lineTo(e.allTouches[0].x, e.allTouches[0].y);
        pathRef.current = path;
      }
    })
    .onEnd((e) => {
      console.log(path.toSVGString());
      canvasRef?.current?.redraw();
    });

  const clearCanvas = () => {
    path.reset(); // Path 초기화
    pathRef.current = Skia.Path.Make(); // 새 Path 설정
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
          <Path
            paint={(() => {
              const paint = Skia.Paint();
              paint.setColor(Skia.Color(brushColor));
              paint.setStyle(PaintStyle.Stroke);
              paint.setStrokeWidth(brushWidth);
              return paint;
            })()}
            path={path}
          />
        </Canvas>
      </GestureDetector>
      <Text>{diaryText}</Text>
      <Button
        disabled={true}
        title="AI 이미지 생성"
        onPress={generateAIImage}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  canvas: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
    margin: 20,
  },
});
