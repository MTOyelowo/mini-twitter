import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTweet } from "../lib/api/tweets";

const user = {
  id: "u1",
  username: "VadimNotJustDev",
  name: "Vadim",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png",
};

export default function NewTweet() {
  const [text, setText] = useState("");

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: createTweet,
    onSuccess: (data) => {
      //queryClient.invalidateQueries({ queryKey: ["tweets"] });
      queryClient.setQueryData(["tweets"], (existingTweets: any) => [
        data,
        ...existingTweets,
      ]);
    },
  });

  const onTweetPress = async () => {
    try {
      await mutateAsync({ content: text });

      setText("");
      router.back();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Link href="../" style={{ fontSize: 16 }}>
            Cancel
          </Link>
          {isLoading && <ActivityIndicator style={{ flex: 1 }} />}
          <Pressable onPress={onTweetPress} style={styles.button}>
            <Text style={styles.buttonText}>Tweet</Text>
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <Image source={{ uri: user.image }} style={styles.image} />
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="What's happening?"
            multiline
            numberOfLines={5}
            style={{ flex: 1 }}
          />
        </View>

        {isError && <Text>Error: {error.message}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1C9BF0",
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
  },
});
