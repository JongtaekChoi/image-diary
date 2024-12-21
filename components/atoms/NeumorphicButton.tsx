import {
  GestureResponderEvent,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

import React from "react";
import styled from "@emotion/native";

const Container = styled.View({
  width: 150,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
});

// 외곽 그림자용 레이어 (하단 그림자)
const OuterShadow = styled.View({
  shadowColor: "#a3b1c6", // 어두운 그림자 색상
  shadowOffset: { width: 6, height: 6 },
  shadowOpacity: 0.5,
  shadowRadius: 10,
  backgroundColor: "#e0e0e0",
  borderRadius: 25,
  elevation: 10,
});

// 내부 그림자용 레이어 (상단 그림자)
const InnerShadow = styled.View({
  shadowColor: "#ffffff", // 밝은 그림자 색상
  shadowOffset: { width: -6, height: -6 },
  shadowOpacity: 1,
  shadowRadius: 10,
  backgroundColor: "#e0e0e0",
  borderRadius: 25,
});

// 버튼 콘텐츠
const ButtonContent = styled.TouchableOpacity({
  width: 150,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#e0e0e0",
  borderRadius: 25,
});

const ButtonText = styled.Text({
  fontSize: 16,
  fontWeight: "bold",
  color: "#555",
});

export default function NeumorphicButton({
  onPress,
  children,
  style,
}: {
  onPress?: (e: GestureResponderEvent) => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Container>
      <OuterShadow>
        <InnerShadow>
          <ButtonContent
            onPress={onPress ? onPress : undefined}
            disabled={!onPress}
          >
            {typeof children == "string" ? (
              <ButtonText>{children}</ButtonText>
            ) : (
              children
            )}
          </ButtonContent>
        </InnerShadow>
      </OuterShadow>
    </Container>
  );
}
