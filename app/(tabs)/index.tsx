import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

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
    <Container style={styles.container}>
      <DiaryTextInput
        placeholder="Write your diary here..."
        multiline
        value={diaryText}
        onChangeText={setDiaryText}
      />
      <ImageEditor />
      <Button title="저장하기" onPress={() => {}} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    alignSelf: "center",
  },
});
