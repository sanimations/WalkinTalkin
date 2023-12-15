import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [bgColor, setBackgroundColor] = useState("#ADD8E6");

  const handleColorChange = (newColor) => {
    console.log("newColor: ", newColor);
    setBackgroundColor(newColor);
    console.log("updated background color: ", bgColor);
  };

  return (
    <ImageBackground
      source={require("../assets/backgroundImage.png")}
      style={styles.appBackground}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.appTitle}>WalkinTalkin</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Type username here"
              placeholderTextColor="#757083"
            />
            <Text style={styles.chooseBC}>Choose Background Color:</Text>
            <View style={styles.colorButtonsContainer}>
              <TouchableOpacity
                style={[styles.buttonColor, { backgroundColor: "#909C08" }]}
                onPress={() => handleColorChange("#909C08")}
                accessibilityLabel="Color Change"
                accessibilityHint="Sets the background color of your chat to green."
                accessibilityRole="button"
              />
              <TouchableOpacity
                style={[styles.buttonColor, { backgroundColor: "#474056" }]}
                onPress={() => handleColorChange("#474056")}
                accessibilityLabel="Color Change"
                accessibilityHint="Sets the background color of your chat to dark navy blue."
                accessibilityRole="button"
              />
              <TouchableOpacity
                style={[styles.buttonColor, { backgroundColor: "#8A95A5" }]}
                onPress={() => handleColorChange("#8A95A5")}
                accessibilityLabel="Color Change"
                accessibilityHint="Sets the background color of your chat to light blue."
                accessibilityRole="button"
              />
              <TouchableOpacity
                style={[styles.buttonColor, { backgroundColor: "#B9C6AE" }]}
                onPress={() => handleColorChange("#B9C6AE")}
                accessibilityLabel="Color Change"
                accessibilityHint="Sets the background color of your chat to light green."
                accessibilityRole="button"
              />
            </View>
            <View style={styles.startChatContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Chat", { name: name, bgColor: bgColor })
                }
              >
                <Text style={styles.startChatText}>Start Chatting!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  appBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    // borderColor: "green",
    // borderWidth: 2,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,

    // borderColor: "blue",
    // borderWidth: 2,
  },
  innerContainer: {
    width: "88%",
    height: "88%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    paddingBottom: 100,
  },
  textInput: {
    width: "88%",
    padding: 25,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    opacity: 0.5,
    fontSize: 16,
    fontWeight: "300",
  },
  chooseBC: {
    opacity: 1,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  colorButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  buttonColor: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  startChatContainer: {
    backgroundColor: "#757083",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  startChatText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default Start;
