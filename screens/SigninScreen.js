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

const Signin = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const { data } = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          { email, password }
        );
        console.log(data);
        setToken(data.token);
      } catch (error) {
        console.log(error);
        if (error.response) {
          setErrorMessage("This mail doesn't exist");
        } else {
          setErrorMessage(
            "l'identifiant ou le mot de passe ne sont pas correct"
          );
        }
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
        <Text style={styles.title}>Sign in </Text>
      </View>

      <View style={styles.inputBlock}>
        <TextInput
          placeholder="email"
          value={email}
          style={styles.signinput}
          onChangeText={(text) => {
            setErrorMessage("");
            setEmail(text);
          }}
        />
      </View>
      <View style={styles.inputBlock}>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setErrorMessage("");
            setPassword(text);
          }}
          style={styles.signinput}
        />
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.buttonTitle}>Sign in </Text>
        </TouchableOpacity>
      </View>

      {errorMessage && <Text>{errorMessage}</Text>}

      <View style={styles.redirection}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.txtRedirection}>No account? Register</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
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
    marginTop: 50,
  },

  buttonTitle: {
    fontSize: 25,
    color: "#828282",
  },

  redirection: {
    marginHorizontal: 126,
  },

  txtRedirection: {
    fontSize: 14,
    marginTop: 10,
    color: "grey",
  },
});

export default Signin;
