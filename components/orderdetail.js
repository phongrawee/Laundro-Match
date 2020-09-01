import React, { Component } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import firebase from "../database/firebase";
import { Container, Footer, FooterTab, Button, Icon } from "native-base";

export default class OrderDetail extends Component {
  constructor() {
    super();
    this.state = {
      Dlist: {},
      Tshirt: "",
      Shorts: "",
      Jacket: "",
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
      orderDropdatetime: "",
      orderPickdatetime: "",
      orderdate: "",
      address: "",
      selectstatus: "",
      laundry: "",
      laundryid: "",
      Laddress: "",
      orderstatus:"",
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
  onButtonPressed() {
    this.database = firebase.database();
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}`)
      .on("value", (snapshot) => {
        console.log("User data: ", snapshot.val());
        this.state = {
          detail: snapshot.val(),
        };
      });
    this.Alertfunc();
  }
  componentWillMount() {
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/Jacket`)
      .once("value", (snapshot) => {
        this.setState({ Jacket: snapshot.val() });
      });
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/Tshirt`)
      .once("value", (snapshot) => {
        this.setState({ Tshirt: snapshot.val() });
      });
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/Shorts`)
      .on("value", (snapshot) => {
        this.setState({ Shorts: snapshot.val() });
      });
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/orderDropdatetime`)
      .on("value", (snapshot) => {
        this.setState({ orderDropdatetime: snapshot.val() });
      });
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/orderPickdatetime`)
      .on("value", (snapshot) => {
        this.setState({ orderPickdatetime: snapshot.val() });
      });
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/orderdate`)
      .on("value", (snapshot) => {
        this.setState({ orderdate: snapshot.val() });
      });
    firebase
      .database()
      .ref(`Users/${this.state.uid}/address`)
      .on("value", (snapshot) => {
        this.setState({ address: snapshot.val() });
      });
    firebase
      .database()
      .ref(`SelectedOrder/${this.state.uid}/Laundry`)
      .on("value", (snapshot) => {
        this.setState({ laundry: snapshot.val() });
      });

    firebase
      .database()
      .ref(`SelectedOrder/${this.state.uid}/Laundryid`)
      .on("value", (snapshot) => {
        this.setState({ laundryid: snapshot.val() });
      });
    firebase
      .database()
      .ref(`SelectedOrder/${this.state.uid}/LaundryAddress`)
      .on("value", (snapshot) => {
        this.setState({ Laddress: snapshot.val() });
      });

    firebase
      .database()
      .ref("SelectedOrder")
      .child(this.state.uid)
      .once("value")
      .then((snapshot) => {
        var status = snapshot.val();
        this.setState({ selectstatus: status });
        console.log("laundrystatus", status);
      });
      firebase
      .database()
      .ref("OrderDetail")
      .child(this.state.uid)
      .once("value")
      .then((snapshot) => {
        var order = snapshot.val();
        this.setState({ orderstatus: order });
        console.log("laundrystatus", order);
      });
  }
  Alertfunc() {
    Alert.alert(
      "Cancel",
      "The Order has been Cancelled!",
      [{ text: "OK", onPress: () => this.GoHome() }],
      { cancelable: false }
    );
  }
  removeOrder() {
    firebase.database().ref("OrderDetail").child(this.state.uid).remove();
    firebase.database().ref("BidOrder").child(this.state.uid).remove();
    this.Alertfunc();
  }
  render() {
    return (
      <Container>
         {this.state.orderstatus != null ? (
        <View style={styles.container}>
        <View style={styles.container}>
          <Text>User Name : {this.state.displayName}</Text>
          <Text>Clothes</Text>
          <Text>Jacket x{this.state.Jacket}</Text>
          <Text>T-Shirt x{this.state.Tshirt}</Text>
          <Text>Shorts x{this.state.Shorts}</Text>
          <Text>Drop Time : {this.state.orderDropdatetime}</Text>
          <Text>Pick Time : {this.state.orderPickdatetime}</Text>
          <Text>Address : {this.state.address}</Text>
        </View>
        {this.state.selectstatus != null ? (
          <View style={styles.container}>
            <Text>
              This order is matching with {this.state.laundry}
              {"\n  "}
               Send the clothes at {this.state.Laddress}
            </Text>
          </View>
        ) : null}
        <View style={styles.container}>
          {this.state.selectstatus == null ? (
            <Text>This order is not match</Text>
          ) : null}
          {this.state.selectstatus == null ? (
            <Button
              vertical
              onPress={() => this.removeOrder()}
              style={styles.NextButton}
            >
              <Text style={styles.buttonText}>Cancel Order</Text>
            </Button>
          ) : null}
        </View>
        </View>) : null}
        {this.state.orderstatus == null ? (<View style={styles.container}><Text>No Order Yet!</Text></View>) : null}
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
              <Icon active name="navigate" />
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
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
    marginTop: 20,
    width: 100,
    height: 35,
    alignItems: "center",
    marginLeft: 30,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,

    color: "#fff",
  },
}); /*
        <View style={styles.NextButton}>
          <Button vertical onPress={this.onButtonPressed.bind(this)}>
            <Icon name="send" />
            <Text>Order!</Text>
          </Button>
        </View>*/
