import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";
import firebase from "../database/firebase";
import { Container, Footer, FooterTab, Button, Icon } from "native-base";
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
      status: "",
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
  GoUserOrder = () => {
    this.props.navigation.navigate("UserOrder");
  };
  GoOrderDetail() {
    this.props.navigation.navigate("OrderDetail");
  }
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.textTitle}>
            Hello,{" "}
            <Text style={styles.textContent}>{this.state.displayName}</Text>
          </Text>

          <TouchableHighlight
            onPress={() => {
              firebase
                .database()
                .ref(`OrderDetail/${this.state.uid}/status`)
                .once("value")
                .then((snapshot) => {
                  var order = snapshot.val();
                  this.setState({ status: order });
                  console.log("laundrystatus", this.state.status);
                  if (this.state.status == null) {
                    this.GoOrder();
                  } else if (this.state.status != null) {
                    Alert.alert(
                      "Could not Ordering",
                      "Your order is in Progress"
                    );
                  }
                });
            }}
          >
            <Image
              style={styles.imagestyle}
              source={require("../src/img/WashIron.png")}
            />
          </TouchableHighlight>
        </View>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.GoHome()}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => this.GoFeed()}>
              <Icon name="chatbubbles" />
              <Text>Feed</Text>
            </Button>
            <Button vertical onPress={() => this.GoUserOrder()}>
              <Icon name="navigate" />
              <Text>Order</Text>
            </Button>
            <Button vertical onPress={() => this.GoOrderDetail()}>
              <Icon name="person" />
              <Text>OrderDetail</Text>
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
    padding: 35,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imagestyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    elevation: 5,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 50,
  },

  textContent: {
    fontSize: 14,
    fontWeight: "normal",
  },
});
