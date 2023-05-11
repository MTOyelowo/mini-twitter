import { View, Text, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

type IconButtonProps = {
  icon: React.ComponentProps<typeof EvilIcons>["name"];
  text?: string | number;
};

const IconButton = ({ icon, text }: IconButtonProps) => {
  return (
    <View style={styles.wrapper}>
      {/*Icon*/}
      <EvilIcons name={icon} size={22} color="gray" />
      {/*Number*/}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    color: "gray",
  },
});

export default IconButton;
