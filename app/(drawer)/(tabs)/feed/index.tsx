import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Tweet from "../../../../components/Tweet";
//import tweets from "../../../../assets/data/tweets";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { listTweets } from "../../../../lib/api/tweets";
import { useQuery } from "@tanstack/react-query";

export default function FeedScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: listTweets,
  });

  // const [tweets, setTweets] = useState([]);

  // useEffect(() => {
  //   const fetchTweets = async () => {
  //     const res = await listTweets();
  //     setTweets(res);
  //   };
  //   fetchTweets();
  // }, []);

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.page}>
      <FlatList data={data} renderItem={({ item }) => <Tweet tweet={item} />} />
      <Link href="/new-tweet" asChild>
        <Entypo
          name="plus"
          size={24}
          color="white"
          style={styles.floatingButton}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
  floatingButton: {
    backgroundColor: "#1C9BF0",
    borderRadius: 50,
    padding: 20,

    position: "absolute",
    right: 15,
    bottom: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});