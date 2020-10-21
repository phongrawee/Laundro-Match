import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "../database/firebase";
import { Container, Footer, FooterTab, Button, Icon } from "native-base";
import Overlay from "react-native-modal-overlay";
import { TextInput } from "react-native-gesture-handler";
export default class Feed extends Component {
  state = {
    modalVisible: false,
    shopVisible: false,
  };
  constructor() {
    super();
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      list: [],
      ratelist: [],
      ordername: "",
      bid: "",
      orderkey: "",
      average: "",
      num: "",
      address: "",
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  onClose = () => this.setState({ modalVisible: false });
  onClose2 = () => this.setState({ shopVisible: false });

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
  componentWillMount() {
    firebase
      .database()
      .ref("OrderDetail")
      .orderByChild("orderDropdatetime")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            name: child.val().name,
            email: child.val().email,
            Jacket: child.val().Jacket,
            Shorts: child.val().Shorts,
            Tshirt: child.val().Tshirt,
            orderDropdatetime: child.val().orderDropdatetime,
            orderPickdatetime: child.val().orderPickdatetime,
            orderdate: child.val().orderdate,
            address: child.val().address,
            expire: child.val().expire,
          });
        });
        this.setState({ list: li });
      });
    var count = 0;
    var total = 0;
    firebase
      .database()
      .ref("Rating")
      .child(this.state.uid)
      .orderByChild("timestamp")
      .on("value", (snapshot) => {
        var rateli = [];
        snapshot.forEach((child) => {
          total = total + parseInt(child.val().Rating);
          rateli.push({
            key: child.key,
            Name: child.val().Name,
            Rating: child.val().Rating,
            Comment: child.val().Comment,
            time: child.val().time,
            timestamp: child.val().timestamp,
          });
          count++;
        });
        var avg = total / count;
        this.setState({ average: avg.toFixed(2) });
        this.setState({ num: count });
        this.setState({ ratelist: rateli });

        console.log("avg", avg.toFixed(2));
        console.log("total", total);
        console.log("count", count);
      });
    firebase
      .database()
      .ref(`Users/${this.state.uid}/address`)
      .on("value", (snapshot) => {
        this.setState({ address: snapshot.val() });
      });
  }

  bidpress = () => {
    this.setState({ modalVisible: true });
  };
  shoppress = () => {
    this.setState({ shopVisible: true });
  };
  setname(input, key) {
    this.setState({ ordername: input });
    this.setState({ orderkey: key });
  }
  setbid(input, key) {
    this.setname(input, key);
    this.bidpress();
  }
  savebid(Lname, bid, key) {
    if (this.state.bid == "") {
      Alert.alert("Notification", "Please bid at least 1 baht!");
      console.log("Error");
    } else {
      console.log("Pass");
      this.setbidinput2(Lname, bid, key);
      this.Alertfunc();
    }
  }
  setbidinput(ordername, key) {
    var dbA = firebase.database().ref("BidOrder");
    var userid = dbA.child(key);
    userid.set({
      customer: ordername,
    });
  }
  setbidinput2(Lname, bid, key) {
    var dbA = firebase.database().ref("BidOrder");
    var userid = dbA.child(key);

    var laundrybider = userid.child(this.state.uid);
    laundrybider.set({
      Laundry: Lname,
      Bidamount: bid,
      Rating: this.state.average,
      CusNum: this.state.num,
      Location: this.state.address,
    });
  }
  Alertfunc() {
    Alert.alert(
      "Confirm",
      "You have bid " + this.state.ordername + " " + this.state.bid + " baht",
      [{ text: "OK", onPress: () => this.setState({ modalVisible: false }) }],
      { cancelable: false }
    );
  }
  render() {
    return (
      <Container>
        <TouchableOpacity
          style={styles.containerItem}
          onPress={() => this.shoppress()}
        >
          <Text style={styles.textTitle}>Your Shop Infomation</Text>
        </TouchableOpacity>
        <Overlay
          visible={this.state.shopVisible}
          onClose={this.onClose2}
          closeOnTouchOutside
          containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.60)" }}
        >
          <View>
            <Text style={styles.textTitle}>
              {this.state.displayName}'s Laundry Shop
            </Text>
            <Text style={styles.textTitle}>
              Average Rating : {this.state.average}
            </Text>
            <View style={styles.containerFlatlist}>
              <FlatList
                style={{ width: "100%" }}
                data={this.state.ratelist}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <View style={styles.alignDetail}>
                        <Text style={styles.textTitle}>
                          Username:{"  "}
                          <Text style={styles.textContent}>{item.Name}</Text>
                        </Text>
                        <Text style={styles.textTitle}>
                          Rating : {item.Rating}
                        </Text>
                        <Text style={styles.textTitle}>
                          Comment :
                          <Text style={styles.textContent}>{item.Comment}</Text>
                        </Text>
                        <Text style={styles.textTitle}>
                          Date/Time :
                          <Text style={styles.textContent}>{item.time}</Text>
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </Overlay>

        <View style={styles.containerFlatlist}>
          <FlatList
            style={{ width: "100%" }}
            data={this.state.list}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    style={styles.containerItem}
                    onPress={() => this.setbid(item.name, item.key)}
                  >
                    <View style={styles.alignDetail}>
                      <Text style={styles.textTitle}>
                        Username:{"  "}
                        <Text style={styles.textContent}>{item.name}</Text>
                      </Text>

                      <Text style={styles.textTitle}>Amount of clothes</Text>
                      <Text style={styles.textContent}>
                        Jacket x{item.Jacket}
                      </Text>
                      <Text style={styles.textContent}>
                        T-Shirt x{item.Tshirt}
                      </Text>
                      <Text style={styles.textContent}>
                        Shorts x{item.Shorts}
                      </Text>
                      <Text style={styles.textTitle}>Drop Time</Text>
                      <Text style={styles.textContent}>
                        {item.orderDropdatetime}
                      </Text>
                      <Text style={styles.textTitle}>Pick Time</Text>
                      <Text style={styles.textContent}>
                        {item.orderPickdatetime}
                      </Text>
                      <Text style={styles.textTitle}>
                        Address: {"  "}
                        <Text style={styles.textContent}>{item.address}</Text>
                      </Text>
                      <Text style={styles.textTitle}>
                        Expire Time: {"  "}
                        <Text style={styles.textContent}>{item.expire}</Text>
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <Overlay
                    visible={this.state.modalVisible}
                    onClose={this.onClose}
                    closeOnTouchOutside
                    containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.60)" }}
                  >
                    <Text style={styles.textTitle}>
                      Customer Name:{"  "}
                      <Text style={styles.textContent}>
                        {this.state.ordername}
                      </Text>
                    </Text>
                    <Text style={styles.textTitle}>Input Bid :</Text>
                    <TextInput
                      keyboardType="numeric"
                      style={{
                        backgroundColor: "#E0E0E0",
                        width: 50,
                        height: 40,
                        margin: 10,
                      }}
                      value={this.state.bid}
                      onChangeText={(val) => this.updateInputVal(val, "bid")}
                    ></TextInput>
                    <Text style={styles.textTitle}>Baht</Text>
                    <Button
                      title="Bid"
                      block
                      primary
                      style={{ marginTop: 10, padding: 5, alignSelf: "center" }}
                      onPress={() =>
                        this.savebid(
                          this.state.displayName,
                          this.state.bid,
                          this.state.orderkey
                        )
                      }
                    >
                      <Text style={styles.buttonText}>Place a Bid</Text>
                    </Button>
                  </Overlay>
                </View>
              );
            }}
          />
        </View>
        <Footer>
          <FooterTab
            style={{ backgroundColor: "#145c9e" }}
            FooterTab
            style={{ backgroundColor: "#145c9e" }}
          >
            <Button vertical onPress={() => this.GoHome()}>
              <Icon name="home" />
              <Text>Home</Text>
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
//{item.name} {item.email}{item.address} {item.Jacket}{item.Shorts}{item.TShirt}{item.orderdate}{item.orderDropdatetime}{item.orderPickdatetime}
const styles = StyleSheet.create({
  containerFlatlist: {
    flex: 1,
    padding: 8,
    marginHorizontal: 16,
  },

  containerItem: {
    marginTop: 10,
    padding: 10,
    elevation: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#efefef",
    borderRadius: 8,
  },

  alignDetail: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
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
});
