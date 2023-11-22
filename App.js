import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./screens/SigninScreen";
import SignUp from "./screens/SignupScreen";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  // déclarer un state pour relancer le code de ce composant
  const [userToken, setUserToken] = userState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {/* // faire une condition qui vérifie si ya un token (state), si oui => go Navigateur avec Home, sinon => go navigateur avec SignIn/SignUp */}
      <Stack.Navigator>
        {userToken === ? (
        {/* // transmettre ce state (et le setState associé en props) */}
        <Stack.Screen name="Signin" component={SignIn} setToken={setToken} />
        <Stack.Screen name="Signup" component={SignUp} setToken={setToken} />
        ):(

        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
