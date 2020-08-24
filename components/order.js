import React, { Component } from "react";
import { Container, Footer, FooterTab, Button, Icon } from "native-base";
import { StyleSheet, View, ScrollView, Image, Text } from "react-native";
import InputSpinner from "react-native-input-spinner";
import firebase from "../database/firebase";

export default class Order extends Component {
  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
    });
  }
  constructor() {
    super();
    this.state = {
      value: 0,
      valueReal: 1.5,
      colorLeft: this.getRandomColor(),
      colorRight: this.getRandomColor(),
      Tshirt: 0,
      Shorts: 0,
      Jacket: 0,
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
    };
  }
  inputuserorder(date, uid, email, Tshirt, Shorts, Jacket) {
    var Detail = firebase.database().ref("OrderDetail");
    var userid = Detail.child(uid);
    userid
      .set({
        date,
        email,
        Tshirt,
        Shorts,
        Jacket,
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
  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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

  functionOne() {
    this.props.navigation.navigate("OrderDetail");
  }
  functionTwo() {
    this.inputuserorder(
      this.state.date,
      this.state.uid,
      this.state.email,
      this.state.Tshirt,
      this.state.Shorts,
      this.state.Jacket
    );
  }
  functionCombined() {
    this.functionOne();
    this.functionTwo();
  }

  render() {
    return (
      <Container>
        <ScrollView style={styles.container}>
          <View style={styles.col}>
            <Text style={styles.text}>T-shirt</Text>
            <InputSpinner
              value={this.state.value}
              style={styles.spinner}
              onChange={(val) => this.updateInputVal(val, "Tshirt")}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.text}>Shorts</Text>
            <InputSpinner
              value={this.state.value}
              style={styles.spinner}
              onChange={(val) => this.updateInputVal(val, "Shorts")}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.text}>Jacket</Text>
            <InputSpinner
              value={this.state.value}
              style={styles.spinner}
              onChange={(val) => this.updateInputVal(val, "Jacket")}
            />
          </View>
          <View style={styles.NextButton}>
            <Button vertical>
              <Icon name="send" onPress={() => this.functionCombined()} />
              <Text>Order!</Text>
            </Button>
          </View>
        </ScrollView>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="home" onPress={() => this.GoHome()} />
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon name="chatbubbles" onPress={() => this.GoFeed()} />
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
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 45,
  },
  col: {
    flex: 1,
    marginBottom: 20,
    flexDirection: "row",
  },
  text: {
    flex: 3,
    marginTop: 12,
    marginRight: 10,
    fontSize: 16,
  },
  title: {
    marginBottom: 40,
    fontSize: 30,
  },
  spinner: {
    flex: 1,
    width: "auto",
    minWidth: 200,
  },
  imagestyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  NextButton: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    marginLeft: 160,
  },
});
