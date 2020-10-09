import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import firebase from "../database/firebase";
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
  Content,
} from "native-base";
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
        <Content>
          <View style={styles.namedisplay}>
            <Text style={styles.textHeading}>
              Hello, {this.state.displayName}
              {"\n"}
              <Text style={styles.textContent}>Welcome Back!</Text>
            </Text>
            <Text style={styles.textContent2}>Choose Service</Text>
          </View>
          <TouchableOpacity
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
              source={require("../src/img/customer.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.GoFeed();
            }}
          >
            <Image
              style={styles.imagestyle}
              source={require("../src/img/laundry.png")}
            />
          </TouchableOpacity>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.GoHome()} active>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>

            <Button vertical onPress={() => this.GoUserOrder()}>
              <Icon name="cart" />
              <Text>Match</Text>
            </Button>
            <Button vertical onPress={() => this.GoOrderDetail()}>
              <Icon name="paper" />
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
    resizeMode: "contain",
    elevation: 5,
    alignSelf: "center",
    marginTop: 8,
  },

  textHeading: {
    fontSize: 32,
    color: "#000000",
    fontWeight: "bold",
  },
  textContent: {
    fontSize: 32,
    fontWeight: "normal",
  },
  textContent2: {
    paddingTop: 30,
    fontSize: 20,
    fontWeight: "normal",
  },

  namedisplay: { marginLeft: 30, marginTop: 30 },
});
