import Button from "@/components/atoms/Button";
import ImageEditor from "@/components/ImageEditor";
import React from "react";
import styled from "@emotion/native";
import { useEdittingDiary } from "@/store/editting-diary";

const Container = styled.View`
  flex: 1;
  justifycontent: space-between;
  align-items: center;
`;

const DiaryTextInput = styled.TextInput(({ theme }) => ({
  width: `100%`,
  height: 100,
  borderColor: "#ccc",
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  marginBottom: 20,
  color: theme.colors.text,
  fontSize: 16,
  backgroundColor: theme.colors.background,
}));

export default function App() {
  const { setDiaryText, diaryText, imageData } = useEdittingDiary();

  return (
    <Container>
      <DiaryTextInput
        placeholder="Write your diary here..."
        multiline
        value={diaryText}
        onChangeText={setDiaryText}
      />
      <ImageEditor />
      <Button onPress={() => {}}>저장하기</Button>
    </Container>
  );
}
