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
      bidstatus: "",
      orderstatus: "",
      Tshirt: "",
      Shorts: "",
      Jacket: "",
      email: firebase.auth().currentUser.email,
      orderDropdatetime: "",
      orderPickdatetime: "",
      orderdate: "",
      address: "",
      Service:"",
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
      .ref(`OrderDetail/${this.state.uid}/service`)
      .on("value", (snapshot) => {
        this.setState({ Service: snapshot.val() });
      });
    firebase
      .database()
      .ref(`Users/${this.state.uid}/address`)
      .on("value", (snapshot) => {
        this.setState({ address: snapshot.val() });
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
        firebase.database().ref("OrderDetail").child(this.state.uid).remove();

      });
      var MatchDetail = firebase.database().ref("MatchOrderDetail");
      var userid = MatchDetail.child(userid);
      userid
        .set({
          orderPickdatetime:this.state.orderPickdatetime,
          orderDropdatetime:this.state.orderDropdatetime,
          orderdate:this.state.orderdate,
          email:this.state.email,
          Tshirt:this.state.Tshirt,
          Shorts:this.state.Shorts,
          Jacket:this.state.Jacket,
          address:this.state.address,
          name:this.state.displayName,
          service:this.state.Service,
        })

  }

  render() {
    return (
      <Container>
        {this.state.orderstatus != null ? (
          <View style={styles.container}>
            {this.state.bidstatus != null ? (
              <View style={styles.container}>
                {this.state.selectstatus != null ? (
                  <View style={styles.textStatusContainer}>
                    <Text>You already selected the laundry</Text>
                  </View>
                ) : null}
                {this.state.selectstatus == null ? (
                  <FlatList
                    data={this.state.list}
                    keyExtractor={(item) => item.key}
                    style={styles.containerFlatlist}
                    renderItem={({ item }) => {
                      return (
                        <View>
                          <TouchableOpacity
                            style={styles.containerItem}
                            onPress={() =>
                              this.selectlaundry(
                                item.Laundry,
                                item.Bidamount,
                                item.key
                              )
                            }
                          >
                            <View style={{ alignSelf: "center" }}>
                              <Text style={styles.textTitle}>
                                Laundry Name:{"  "}{" "}
                                <Text style={styles.textContent}>
                                  {item.Laundry}
                                </Text>
                              </Text>
                              <Text style={styles.textTitle}>
                                Bid Amount:{" "}
                                <Text style={styles.textContent}>
                                  {item.Bidamount} baht
                                </Text>
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <Overlay
                            visible={this.state.modalVisible}
                            onClose={this.onClose}
                            closeOnTouchOutside
                            containerStyle={{
                              backgroundColor: "rgba(0, 0, 0, 0.60)",
                            }}
                          >
                            <Text style={styles.textTitle}>
                              Laundry Name:{" "}
                              <Text style={styles.textContent}>
                                {this.state.Lname}
                              </Text>
                            </Text>
                            <Text style={styles.textTitle}>
                              Bid Amount:{" "}
                              <Text style={styles.textContent}>
                                {this.state.bid}
                              </Text>
                            </Text>

                            <Button
                              title="Select"
                              primary
                              style={{
                                marginTop: 10,
                                padding: 5,
                                alignSelf: "center",
                              }}
                              onPress={() =>
                                this.setorder(
                                  this.state.uid,
                                  this.state.Lname,
                                  this.state.Lkey
                                )
                              }
                            >
                              <Text style={styles.buttonText}>Select</Text>
                            </Button>
                          </Overlay>
                        </View>
                      );
                    }}
                  />
                ) : null}
              </View>
            ) : null}
            {this.state.bidstatus == null ? (
              <View style={styles.textStatusContainer}>
                <Text>No Laundry Bid yet</Text>
              </View>
            ) : null}
          </View>
        ) : null}

        {this.state.orderstatus == null ? (
          <View style={styles.textStatusContainer}>
            <Text>You don't order yet!</Text>
          </View>
        ) : null}

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
    marginTop: 16,
    flexDirection: "column",
  },

  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  textContent: {
    fontSize: 14,
    fontWeight: "normal",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },

  containerItem: {
    marginTop: 10,
    elevation: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#efefef",
    borderRadius: 8,
  },

  containerFlatlist: {
    flex: 1,
    padding: 16,
    marginHorizontal: 16,
  },

  textStatusContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
