import { ActivityIndicator, Button, Text } from "react-native";
import {
  Canvas,
  Image,
  PaintStyle,
  Path,
  SkPaint,
  SkPath,
  Skia,
  useCanvasRef,
  useImage,
} from "@shopify/react-native-skia";
import {
  Gesture,
  GestureDetector,
  Pressable,
} from "react-native-gesture-handler";
import React, { useEffect, useMemo, useRef, useState } from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styled from "@emotion/native";
import useDimensions from "@/hooks/useDimensions";
import { useEdittingDiary } from "@/store/editting-diary";
import { useRouter } from "expo-router";
import { useTheme } from "@emotion/react";

const Container = styled.View`
  flex: 1;
  justifycontent: space-between;
`;

const Toolbar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const SubToolBar = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

const ColorCircle = styled.View((props: { color: string }) => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: props.color,
  margin: 4,
}));

const CanvasContainer = styled(Canvas)`
  border: 1px solid black;
`;

interface PathPaint {
  path: SkPath;
  paint: SkPaint;
}

enum SubToolbarCategory {
  BrushWidth,
  Eraser,
}

function createPathPaint(): PathPaint {
  return {
    path: Skia.Path.Make(),
    paint: Skia.Paint(),
  };
}

export default function ImageEditor() {
  const canvasRef = useCanvasRef();
  const router = useRouter();
  const { width, height } = useDimensions();
  const {
    generateAIImage,
    imageData,
    diaryText,
    isLoading,
    brushColor,
    setBrushColor,
  } = useEdittingDiary();
  const {
    size: { pageHorizontalPadding },
  } = useTheme();
  const size = Math.min(width - pageHorizontalPadding * 2, height);
  const [pathPaints, setPathPaints] = useState<Array<PathPaint>>([
    createPathPaint(),
  ]);
  const [activeSubToolbar, setActiveSubToolbar] =
    useState<SubToolbarCategory>();
  const { path, paint } = pathPaints.at(-1)!;
  const [brushWidth, setBrushWidth] = useState(4);

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
        path.quadTo(
          path.getLastPt().x,
          path.getLastPt().y,
          (path.getLastPt().x + e.allTouches[0].x) / 2,
          (path.getLastPt().y + e.allTouches[0].y) / 2
        );
        canvasRef.current?.redraw();
      }
    })
    .onEnd((e) => {
      if (path) {
        setPathPaints((paths) => [...paths, createPathPaint()]);
      }
    });

  const clearCanvas = () => {
    setPathPaints([createPathPaint()]);
  };

  const image = useImage(imageData);

  return (
    <Container>
      <GestureDetector gesture={gesture}>
        <CanvasContainer ref={canvasRef} style={{ width: size, height: size }}>
          {image && (
            <Image image={image} width={size} height={size} x={0} y={0} />
          )}
          {pathPaints.map(({ path, paint }, index) => {
            return <Path key={index} path={path} paint={paint} />;
          })}
        </CanvasContainer>
      </GestureDetector>
      <Button disabled={true} title="AI 이미지 생성" />
      {isLoading && <ActivityIndicator />}
      <Toolbar>
        <Pressable
          onPress={() => {
            router.push("/color-picker");
          }}
        >
          {(state) => (
            <MaterialIcons name="border-color" size={24} color={brushColor} />
          )}
        </Pressable>
        <Button title="Thin" onPress={() => setBrushWidth(2)} />
        <Button title="Thick" onPress={() => setBrushWidth(8)} />
        <Button title="Clear" onPress={clearCanvas} />
      </Toolbar>
      <SubToolBar></SubToolBar>
    </Container>
  );
}
