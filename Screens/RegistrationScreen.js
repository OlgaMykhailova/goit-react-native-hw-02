import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  KeyboardAvoidingView, // новый импорт
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
} from "react-native";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  const loginHandler = (login) => setLogin(login);
  const emailHandler = (email) => setEmail(email);
  const passwordHandler = (password) => setPassword(password);

  const onLogin = () => {
    if (!login.trim() || !email.trim() || !password.trim()) {
      Alert.alert(`All fields must be completed!`);
      return;
    }
    Alert.alert(`Welcome ${login}, your registration is successfull!`);
    console.log(login, email, password);
    setLogin("");
    setEmail("");
    setPassword("");
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const keyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          style={styles.imageBG}
          source={require("../assets/images/imageBG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              ...styles.wrapper,
              marginTop: isKeyboardShown ? 147 : 263,
            }}
          >
            <Text style={styles.title}>Registration</Text>
            <View style={{ width: dimensions }}>
              <TextInput
                style={styles.input}
                value={login}
                placeholder="Login"
                placeholderTextColor={"#BDBDBD"}
                onChangeText={loginHandler}
                onFocus={() => setIsKeyboardShown(true)}
              ></TextInput>
              <TextInput
                style={styles.input}
                value={email}
                placeholder="Email"
                placeholderTextColor={"#BDBDBD"}
                onChangeText={emailHandler}
                onFocus={() => setIsKeyboardShown(true)}
                keyboardType="email-address"
              ></TextInput>
              <TextInput
                style={styles.input}
                value={password}
                placeholder="Password"
                placeholderTextColor={"#BDBDBD"}
                secureTextEntry={true}
                onFocus={() => setIsKeyboardShown(true)}
                onChangeText={passwordHandler}
              ></TextInput>
              <TouchableOpacity style={styles.button} onPress={onLogin}>
                <Text style={styles.textButton}>Sign Up</Text>
              </TouchableOpacity>
              <Text style={styles.link}>Have already an account? Sign in</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  title: {
    marginTop: 92,
    marginBottom: 33,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    color: "#212121",
  },
  button: {
    height: 51,
    marginTop: 27,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
