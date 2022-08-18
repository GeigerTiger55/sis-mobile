import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import { COLORS } from '../vocabs';

/** Login to app - send user info to App, which calls api to get token for user
 * 
 * props:
 * - loginUser function from App
 * 
 * App -> Login
 */
export default function Login({loginUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /** Handle form submit:
   *
   * Calls login func prop and, if not successful, sets errors.
   */
  async function handleSubmit() {
    console.log('handleSubmit');
    try {
      await loginUser({username, password});
    } catch (err) {
      console.log('Failed login', err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image}
      source = {require("../assets/rithm-r-black.jpeg")}/>

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      {/* TODO: Make button open browser with Rithm page */}
      {/* <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
    height: 150,
    resizeMode: 'contain',
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 20,
    width: "60%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "30%",
    borderRadius: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: COLORS.primary,
  },
});