import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from "react-native";
import firebase from "../database/firebase";
import { Container, Footer, FooterTab, Button, Icon } from "native-base";

export default class OrderDetail extends Component {
  constructor() {
    super();
    this.state = {
      uid: firebase.auth().currentUser.uid,
      detail: "",
    };
  }

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  GoHome = () => {
    this.props.navigation.navigate("Dashboard");
  };
  GoFeed = () => {
    this.props.navigation.navigate("Feed");
  };
  GoOrder = () => {
    this.props.navigation.navigate("Order");
  };

  /*readUserData = () => {
    firebase
      .database()
      .ref("OrderDetail/ + ${userId} + Jacket/")
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val());
      });
  };*/
  onButtonPressed() {
    this.database = firebase.database();
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}`)
      .on("value", (snapshot) => {
        console.log("User data: ", snapshot.val());
      });
  }
 
  render() {
    return (
      <Container>
        <View style={styles.NextButton}>
          <Button vertical onPress={this.onButtonPressed.bind(this)}>
            <Icon name="send"  />
            <Text>Order!</Text>
          </Button>
        </View>

        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.GoHome()} >
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => this.GoFeed()}>
              <Icon name="chatbubbles"  />
              <Text>Feed</Text>
            </Button>
            <Button vertical active>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
            <Button vertical onPress={() => this.signOut()}>
              <Icon name="log-out" />
              <Text>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  imagestyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
  NextButton: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    marginLeft: 160,
  },
});
