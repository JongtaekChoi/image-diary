import { Canvas, Rect, RoundedRect, Shadow } from "@shopify/react-native-skia";
import { Pressable, ViewProps } from "react-native";

import React from "react";
import styled from "@emotion/native";
import { useSharedValue } from "react-native-reanimated";
import { useState } from "react";
import { useTheme } from "@emotion/react";

const SkiaContainer: React.FC<{
  pressed: boolean;
  width: number;
  height: number;
}> = ({ pressed, width, height }) => {
  const shadowOffset = pressed ? 5 : 1;
  const theme = useTheme();

  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width,
        height,
      }}
    >
      <RoundedRect
        x={0}
        y={0}
        width={width}
        height={height}
        r={20}
        color={theme.colors.background}
      >
        <Shadow
          dx={shadowOffset}
          dy={shadowOffset}
          blur={5}
          color={theme.colors.shadowColor}
          inner
        />
        <Shadow
          dx={-shadowOffset}
          dy={-shadowOffset}
          blur={5}
          color={theme.colors.oppositeShadowColor}
          inner
        />
      </RoundedRect>
    </Canvas>
  );
};

const Container = styled.View({
  flexGrow: 0,
  position: "relative",
  minHeight: 40,
  minWidth: 100,
});

const ContentContainer = styled.View(({ theme }) => ({
  paddingHorizontal: 20,
  minHeight: 40,
  minWidth: 100,
  borderRadius: 20,
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.colors.primary,
  borderWidth: 1,
}));

const Text = styled.Text(({ theme }) => ({
  color: theme.colors.primary,
}));

const Button: React.FC<
  {
    children: React.ReactNode;
    onPress: () => void;
  } & ViewProps
> = ({ children, onPress, ...props }) => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  return (
    <Container
      {...props}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setLayout({ width, height });
      }}
    >
      <Pressable onPress={onPress}>
        {(state) => (
          <>
            <SkiaContainer
              width={layout.width}
              height={layout.height}
              pressed={state.pressed}
            />
            <ContentContainer
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              {typeof children === "string" ? (
                <Text>{children}</Text>
              ) : (
                children
              )}
            </ContentContainer>
          </>
        )}
      </Pressable>
    </Container>
  );
};

export default Button;
