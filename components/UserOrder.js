import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "../database/firebase";
import { Container, Footer, FooterTab, Button, Icon } from "native-base";
import Overlay from "react-native-modal-overlay";

export default class UserOrder extends Component {
  state = {
    modalVisible: false,
  };
  constructor() {
    super();
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      list: [],
      bid: "",
      Lname: "",
      Lkey: "",
      selectstatus: "",
      Laddress: "",
      bidstatus:"",
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
  GoUserOrder = () => {
    this.props.navigation.navigate("UserOrder");
  };
  GoOrderDetail() {
    this.props.navigation.navigate("OrderDetail");
  }
  componentDidMount() {
    firebase
      .database()
      .ref("BidOrder")
      .child(this.state.uid)
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            Laundry: child.val().Laundry,
            Bidamount: child.val().Bidamount,
          });
        });
        this.setState({ list: li });
      });
    firebase
      .database()
      .ref("SelectedOrder")
      .child(this.state.uid)
      .once("value")
      .then((snapshot) => {
        var status = snapshot.val();
        this.setState({ selectstatus: status });
      });
      firebase
      .database()
      .ref("BidOrder")
      .child(this.state.uid)
      .once("value")
      .then((snapshot) => {
        var bstatus = snapshot.val();
        this.setState({ bidstatus: bstatus });
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
  onClose = () => this.setState({ modalVisible: false });

  selectlaundry(Lname, bid, Lkey) {
    this.setlaundry(Lname, bid, Lkey);
    this.bidpress();
  }

  bidpress = () => {
    this.setState({ modalVisible: true });
  };
  setlaundry(Lname, bid, Lkey) {
    this.setState({ Lname: Lname });
    this.setState({ bid: bid });
    this.setState({ Lkey: Lkey });
  }
  setorder(userid, Laundryname, Laundryid) {
    var add;
    console.log("kkk", this.state.Lkey);
    firebase
      .database()
      .ref(`Users/${this.state.Lkey}/address`)
      .on("value", (snapshot) => {
        add = snapshot.val();
        console.log("aaa", add);
        var db = firebase.database().ref("SelectedOrder");
        var user = db.child(userid);
        user.set({
          Laundry: Laundryname,
          Laundryid: Laundryid,
          LaundryAddress: add,
          BidAmount: this.state.bid,
        });
        this.setState({ selectstatus: true });
        this.setState({ modalVisible: false });
      });
  }

  render() {
    return (
      <Container>
        {this.state.orderstatus != null ? (
          <View style={styles.container}>
         {this.state.bidstatus != null ? (
        <View style={styles.container}>
       
          {this.state.selectstatus != null ? (
            <Text>You already selected the laundry</Text>
          ) : null}
          {this.state.selectstatus == null ? (
            <FlatList
              style={{ width: "100%" }}
              data={this.state.list}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={styles.container}
                      onPress={() =>
                        this.selectlaundry(
                          item.Laundry,
                          item.Bidamount,
                          item.key
                        )
                      }
                    >
                      <Text>Laundry Name : {item.Laundry}</Text>
                      <Text>Bid amount : {item.Bidamount} baht</Text>
                    </TouchableOpacity>
                    <Overlay
                      visible={this.state.modalVisible}
                      onClose={this.onClose}
                      closeOnTouchOutside
                    >
                      <Text>User : {this.state.ordername}</Text>
                      <Text>Input Bid :</Text>

                      <Button
                        title="Select"
                        style={styles.NextButton}
                        onPress={() =>
                          this.setorder(
                            this.state.uid,
                            this.state.Lname,
                            this.state.Lkey
                          )
                        }
                      >
                        <Text>Select</Text>
                      </Button>
                    </Overlay>
                  </View>
                );
              }}
            />
          ) : null}
        </View>) : null}
        {this.state.bidstatus == null ? (<View style={styles.container}><Text>No Laundry Bid yet</Text></View>) : null}</View>) : null}
        {this.state.orderstatus == null ? (<View style={styles.container}><Text>You don't order yet!</Text></View>) : null}
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
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
  NextButton: {
    width: 30,
    paddingTop: 10,
    alignItems: "center",
    marginLeft: 150,
  },
});
