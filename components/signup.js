// components/signup.js

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import firebase from "../database/firebase";
//import firebase from 'firebase';
//firebase.initializeApp(firebaseConfig);

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      address: "",
      isLoading: false,
    };
  }
  writeuserdata(email, address) {
    firebase
      .database()
      .ref("Address")
      .push({
        email,
        address,
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName,
          });
          console.log("User registered successfully!");
          this.writeuserdata(this.state.email, this.state.address);
          this.setState({
            isLoading: false,
            displayName: "",
            email: "",
            password: "",
            address: "",
          });
          this.props.navigation.navigate("Login");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Alert.alert("That email address is already in use!");
          }
          if (error.code === "auth/invalid-email") {
            Alert.alert("That email address is invalid!");
          }
          if (error.code === "auth/invalid-password") {
            Alert.alert("The password must contain at least six characters!");
          }
          this.setState({
            isLoading: false,
          });
          //    console.error(error);
        });
    }
  };
  /*
    functionOne(){
    this.registerUser()
    }
    functionTwo(){
    this.writeuserdata(this.state.email,this.state.address)
    }
    functionCombined() {
      this.functionOne();
      this.functionTwo();
  }  
*/

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, "displayName")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, "password")}
          maxLength={15}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Address"
          value={this.state.address}
          onChangeText={(val) => this.updateInputVal(val, "address")}
          maxLength={50}
        />
        <Button
          color="#3740FE"
          title="Signup"
          // TouchableHighlight onPress={() => this.functionCombined()}
          onPress={() => this.registerUser()}
        />
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          Already Registered? Click here to login
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
