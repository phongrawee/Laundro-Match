import React, { Component } from "react";
import { StyleSheet, View, Text, Alert, TextInput } from "react-native";
import firebase from "../database/firebase";
import { Container, Footer, FooterTab, Button, Icon } from "native-base";
import { Rating, AirbnbRating } from "react-native-ratings";
import Overlay from "react-native-modal-overlay";

export default class OrderDetail extends Component {
  state = {
    modalVisible: false,
  };
  constructor() {
    super();
    this.state = {
      Dlist: {},
      Tshirt: "",
      Shorts: "",
      Jacket: "",
      Tshirt2: "",
      Shorts2: "",
      Jacket2: "",
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
      orderDropdatetime: "",
      orderPickdatetime: "",
      orderdate: "",
      orderDropdatetime2: "",
      orderPickdatetime2: "",
      orderdate2: "",
      address: "",
      selectstatus: "",
      laundry: "",
      laundryid: "",
      Laddress: "",
      orderstatus: "",
      orderstatus2: "",
      bid: "",
      Lrate: "",
      comment: "",
    };
  }
  ratingCompleted = (rating) => {
    this.setState({ Lrate: rating });
    console.log("Rating is: " + rating);
  };
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
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  componentWillMount() {
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/Jacket`)
      .once("value", (snapshot) => {
        this.setState({ Jacket2: snapshot.val() });
      });
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/Tshirt`)
      .once("value", (snapshot) => {
        this.setState({ Tshirt2: snapshot.val() });
      });
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/Shorts`)
      .on("value", (snapshot) => {
        this.setState({ Shorts2: snapshot.val() });
      });
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/orderDropdatetime`)
      .on("value", (snapshot) => {
        this.setState({ orderDropdatetime2: snapshot.val() });
      });
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/orderPickdatetime`)
      .on("value", (snapshot) => {
        this.setState({ orderPickdatetime2: snapshot.val() });
      });
    firebase
      .database()
      .ref(`OrderDetail/${this.state.uid}/orderdate`)
      .on("value", (snapshot) => {
        this.setState({ orderdate2: snapshot.val() });
      });
    firebase
      .database()
      .ref(`MatchOrderDetail/${this.state.uid}/Jacket`)
      .once("value", (snapshot) => {
        this.setState({ Jacket: snapshot.val() });
      });
    firebase
      .database()
      .ref(`MatchOrderDetail/${this.state.uid}/Tshirt`)
      .once("value", (snapshot) => {
        this.setState({ Tshirt: snapshot.val() });
      });
    firebase
      .database()
      .ref(`MatchOrderDetail/${this.state.uid}/Shorts`)
      .on("value", (snapshot) => {
        this.setState({ Shorts: snapshot.val() });
      });
    firebase
      .database()
      .ref(`MatchOrderDetail/${this.state.uid}/orderDropdatetime`)
      .on("value", (snapshot) => {
        this.setState({ orderDropdatetime: snapshot.val() });
      });
    firebase
      .database()
      .ref(`MatchOrderDetail/${this.state.uid}/orderPickdatetime`)
      .on("value", (snapshot) => {
        this.setState({ orderPickdatetime: snapshot.val() });
      });
    firebase
      .database()
      .ref(`MatchOrderDetail/${this.state.uid}/orderdate`)
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
        console.log("Lid", this.laundryid);
      });
    firebase
      .database()
      .ref(`SelectedOrder/${this.state.uid}/LaundryAddress`)
      .on("value", (snapshot) => {
        this.setState({ Laddress: snapshot.val() });
      });
    firebase
      .database()
      .ref(`SelectedOrder/${this.state.uid}/BidAmount`)
      .on("value", (snapshot) => {
        this.setState({ bid: snapshot.val() });
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
        firebase
          .database()
          .ref("MatchOrderDetail")
          .child(this.state.uid)
          .once("value")
          .then((snapshot) => {
            var order2 = snapshot.val();
            this.setState({ orderstatus2: order2 + order });
            console.log("laundrystatus", order2);
            console.log("HHHH", this.state.orderstatus2);
          });
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
  onClose = () => this.setState({ modalVisible: false });

  removeOrder() {
    firebase.database().ref("OrderDetail").child(this.state.uid).remove();
    firebase.database().ref("BidOrder").child(this.state.uid).remove();
    this.Alertfunc();
  }
  finishOrder() {
    this.setState({ modalVisible: true });
  }
  FinFunc(rate, name, comment) {
    console.log("RRR", this.ratingCompleted);
    var dbA = firebase
      .database()
      .ref(`Rating/${this.state.laundryid}/${this.state.uid}`);
    dbA.set({
      Name: name,
      Rating: rate,
      Comment: comment,
    });
    this.setState({ modalVisible: false });
    firebase.database().ref("MatchOrderDetail").child(this.state.uid).remove();
    firebase.database().ref("OrderDetail").child(this.state.uid).remove();
    firebase.database().ref("BidOrder").child(this.state.uid).remove();
    firebase.database().ref("SelectedOrder").child(this.state.uid).remove();
    this.GoHome();
  }
  render() {
    return (
      <Container>
        {this.state.orderstatus2 != 0 ? (
          <View style={styles.container}>
            {this.state.selectstatus != null ? (
              <View style={styles.container}>
                <View style={styles.detail}>
                  <Text style={styles.textTitle}>
                    User Name: {"  "}{" "}
                    <Text style={styles.textContent}>
                      {this.state.displayName}
                    </Text>
                  </Text>
                  <Text style={styles.textTitle}>Clothes</Text>
                  <Text style={styles.textContent}>
                    Jacket x{this.state.Jacket}
                  </Text>
                  <Text style={styles.textContent}>
                    T-Shirt x{this.state.Tshirt}
                  </Text>
                  <Text style={styles.textContent}>
                    Shorts x{this.state.Shorts}
                  </Text>
                  <Text style={styles.textTitle}>Drop Time: </Text>
                  <Text style={styles.textContent}>
                    {this.state.orderDropdatetime}
                  </Text>
                  <Text style={styles.textTitle}>Pick Time: </Text>
                  <Text style={styles.textContent}>
                    {this.state.orderPickdatetime}
                  </Text>
                  <Text style={styles.textTitle}>
                    Address :{" "}
                    <Text style={styles.textContent}>{this.state.address}</Text>
                  </Text>

                  {/* this order not already match */}
                </View>
              </View>
            ) : null}
            {this.state.selectstatus == null ? (
              <View style={styles.container}>
                <View style={styles.detail}>
                  <Text style={styles.textTitle}>
                    User Name: {"  "}{" "}
                    <Text style={styles.textContent}>
                      {this.state.displayName}
                    </Text>
                  </Text>
                  <Text style={styles.textTitle}>Clothes</Text>
                  <Text style={styles.textContent}>
                    Jacket x{this.state.Jacket2}
                  </Text>
                  <Text style={styles.textContent}>
                    T-Shirt x{this.state.Tshirt2}
                  </Text>
                  <Text style={styles.textContent}>
                    Shorts x{this.state.Shorts2}
                  </Text>
                  <Text style={styles.textTitle}>Drop Time: </Text>
                  <Text style={styles.textContent}>
                    {this.state.orderDropdatetime2}
                  </Text>
                  <Text style={styles.textTitle}>Pick Time: </Text>
                  <Text style={styles.textContent}>
                    {this.state.orderPickdatetime2}
                  </Text>
                  <Text style={styles.textTitle}>
                    Address :{" "}
                    <Text style={styles.textContent}>{this.state.address}</Text>
                  </Text>

                  {/* this order not already match */}
                </View>
              </View>
            ) : null}
            <View style={styles.container}>
              {this.state.selectstatus != null ? (
                <View style={styles.statusSuccessPos}>
                  <Text style={styles.statusSuccessText}>
                    This order is matching with {this.state.laundry}
                    {"\n    "}
                    Send the clothes at {this.state.Laddress}
                    {"\n           "}
                    Amount {this.state.bid} baht
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.container}>
              {this.state.selectstatus != null ? (
                <Button
                  primary
                  vertical
                  style={{ marginTop: 250, padding: 10, alignSelf: "center" }}
                  onPress={() => this.finishOrder()}
                >
                  <Text style={styles.buttonText}>Click for Finish</Text>
                </Button>
              ) : null}
            </View>
            <View style={styles.container}>
              {this.state.selectstatus == null ? (
                <View style={styles.statusAlertPos}>
                  <Text style={styles.statusAlertText}>
                    This order is not match
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.container}>
              {this.state.selectstatus == null ? (
                <Button
                  primary
                  vertical
                  style={{ marginTop: 150, padding: 10, alignSelf: "center" }}
                  onPress={() => this.removeOrder()}
                >
                  <Text style={styles.buttonText}>Cancel Order</Text>
                </Button>
              ) : null}
            </View>
          </View>
        ) : null}
        <View style={styles.container}>
          {this.state.orderstatus2 == 0 ? (
            <View style={styles.statusAlertPos}>
              <Text style={styles.statusAlertText}>No Order Yet!</Text>
            </View>
          ) : null}
        </View>
        <Overlay
          visible={this.state.modalVisible}
          onClose={this.onClose}
          closeOnTouchOutside
          containerStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.60)",
          }}
        >
          <View>
          <Text>
            You have finished the order! Plz rating for {this.state.laundry}
          </Text>
        
          <AirbnbRating
            showRating
            onFinishRating={this.ratingCompleted}
            style={{ paddingVertical: 10 }}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Comment"
            value={this.state.comment}
            onChangeText={(val) => this.updateInputVal(val, "comment")}
            maxLength={50}
          />
          <Button
            vertical
            onPress={() =>
              this.FinFunc(
                this.state.Lrate,
                this.state.displayName,
                this.state.comment
              )
            }
          >
            <Text>OK</Text>
          </Button>
          </View>
        </Overlay>
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
    marginTop: 10,
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

  statusAlertText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#a91e0f",
  },

  statusSuccessText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#8da835",
  },

  detail: {
    backgroundColor: "#EFEFEF",
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    flexDirection: "column",
    borderRadius: 15,
  },

  statusAlertPos: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 140,
    padding: 10,
    backgroundColor: "#ffe3e1",
  },

  statusSuccessPos: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    padding: 10,
    backgroundColor: "#eaffd7",
  },
}); /*
        <View style={styles.NextButton}>
          <Button vertical onPress={this.onButtonPressed.bind(this)}>
            <Icon name="send" />
            <Text>Order!</Text>
          </Button>
        </View>*/
