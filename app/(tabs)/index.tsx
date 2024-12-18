import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

import React from "react";
import { router } from "expo-router";
import { useEdittingDiary } from "@/store/editting-diary";

export default function App() {
  const { setDiaryText, diaryText, imageData } = useEdittingDiary();
  const pushImageEditor = () => {
    router.push("/image-editor");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageData }} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Write your diary here..."
        multiline
        value={diaryText}
        onChangeText={setDiaryText}
      />
      <Button title="이미지 편집하기" onPress={pushImageEditor} />
      <Button title="저장하기" onPress={pushImageEditor} />
    </View>
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
