import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Landing1 from "./components/landing1";
import Landing2 from "./components/landing2";
import Landing3 from "./components/landing3";
import Feed from "./components/feed";
import Order from "./components/order";
import OrderDetail from "./components/orderdetail";
import UserOrder from "./components/UserOrder";
console.disableYellowBox = true;
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
        name="Login"
        component={Login}
        options={({ title: "Login" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup" }}
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
      <Stack.Screen name="Feed" component={Feed} options={{ title: "Feed" }} />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ title: "Ordering" }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{ title: "Order Detail" }}
      />
        <Stack.Screen
        name="UserOrder"
        component={UserOrder}
        options={{ title: "Your Order" }}
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
