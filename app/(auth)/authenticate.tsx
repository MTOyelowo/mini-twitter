import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSearchParams } from "expo-router";
import { authenticate } from "../../lib/api/auth";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const Authenticate = () => {
  const [code, setCode] = useState("");
  const router = useRouter();

  const { email } = useSearchParams();

  const { setAuthToken } = useAuth();

  const onConfirm = async () => {
    if (typeof email !== "string") {
      return;
    }
    try {
      const res = await authenticate({ email, emailToken: code });
      setAuthToken(res.authToken);
    } catch (error) {
      Alert.alert("Error", "Email code doesn't match");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Confirm your email with the code sent to your mail
      </Text>
      <TextInput
        placeholder="Verification Code"
        value={code}
        onChangeText={setCode}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={onConfirm}>
        <Text style={styles.buttonText}>Confirm Email</Text>
      </Pressable>
    </View>
  );
};

export default Authenticate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
    color: "gray",
  },
  input: {
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    fontSize: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#050A12",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
