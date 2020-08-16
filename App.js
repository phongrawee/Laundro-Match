import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Landing1 from "./components/landing1";
import Landing2 from "./components/landing2";
import Landing3 from "./components/landing3";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Landing1"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#3740FE",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ title: "Login" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ title: "Dashboard" }, { headerLeft: null })}
      />

      <Stack.Screen
        name="Landing1"
        component={Landing1}
        options={{ title: "LaundroMatch" }}
      />

      <Stack.Screen
        name="Landing2"
        component={Landing2}
        options={{ title: "LaundroMatch" }}
      />

      <Stack.Screen
        name="Landing3"
        component={Landing3}
        options={{ title: "LaundroMatch" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
