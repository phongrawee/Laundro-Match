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
        console.log("Hello:", snapshot);
        console.log("Testtttttttt:", status);
        this.setState({ selectstatus: status });
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
  selectorder(username, userid, Laundryname, Laundryid) {
    var db = firebase.database().ref("SelectedOrder");
    var user = db.child(userid);
    user.set({
      User: username + "/" + userid,
      Laundry: Laundryname + "/" + Laundryid,
    });
    this.setState({ selectstatus: true });
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <Container>
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
                          this.selectorder(
                            this.state.displayName,
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
