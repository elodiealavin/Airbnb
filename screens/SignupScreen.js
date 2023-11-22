import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Platform,
} from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";

export default function Signup({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDecription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const handleSignup = async () => {
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const { data } = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            { email, username, description, password }
          );
          console.log(data);
          setToken(data.token);
        } catch (error) {
          console.log(error.response.data.error);
          if (error.response) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage("Une erreur est survenue");
          }
        }
      } else {
        setErrorMessage("Les Mots de passe ne sont pas identique");
      }
    } else {
      setErrorMessage("Missing Parameters");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.containerLogo}>
        <Image source={require("../assets/logo2.png")} style={styles.logo} />
        <Text style={styles.title}>Sign up </Text>
      </View>

      <View style={styles.inputBlock}>
        <TextInput
          placeholder="email"
          style={styles.signinput}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>

      <View style={styles.inputBlock}>
        <TextInput
          placeholder="username"
          style={styles.signinput}
          value={username}
          onChangeText={(text) => {
            setErrorMessage("");
            setUsername(text);
          }}
        />
      </View>

      <View style={styles.describeContainer}>
        <TextInput
          placeholder="Describe yourself in a few words..."
          value={description}
          style={[styles.txtDescribe, styles.textarea]}
          multiline
          textAlignVertical="top"
          onChangeText={(text) => {
            setErrorMessage("");
            setDecription(text);
          }}
        />
      </View>
      <View style={styles.inputBlock}>
        <TextInput
          placeholder="password"
          value={password}
          secureTextEntry={true}
          style={styles.signinput}
          onChangeText={(text) => {
            setErrorMessage("");
            setPassword(text);
          }}
        />
      </View>
      <View style={styles.inputBlock}>
        <TextInput
          placeholder="confirm password"
          value={confirmPassword}
          secureTextEntry={true}
          style={styles.signinput}
          onChangeText={(text) => {
            setErrorMessage("");
            setConfirmPassword(text);
          }}
        />
      </View>

      {errorMessage && <Text>{errorMessage}</Text>}

      <View style={styles.button}>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.buttonTitle}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.redirection}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          <Text style={styles.txtRedirection}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },

  containerLogo: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },

  logo: {
    width: 103,
    height: 110,
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    color: "#828282",
  },

  inputBlock: {
    marginHorizontal: 30,
    marginVertical: 20,
  },

  signinput: {
    borderWidth: 1,
    borderBottomColor: "lightpink",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    fontSize: 20,
  },

  describeContainer: {
    borderColor: "lightpink",
    borderWidth: 1,
    marginTop: 15,
    height: 100,
    marginHorizontal: 30,
  },

  txtDescribe: {
    marginLeft: 15,
  },

  textarea: {
    height: 150,
  },

  button: {
    borderColor: "lightpink",
    borderRadius: 205,
    borderWidth: 3,
    width: 200,
    height: 60,
    padding: 5,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 100,
    marginTop: 20,
  },

  buttonTitle: {
    fontSize: 25,
    color: "#828282",
  },

  redirection: {
    marginHorizontal: 90,
  },

  txtRedirection: {
    fontSize: 14,
    marginTop: 10,
    color: "grey",
  },
});
