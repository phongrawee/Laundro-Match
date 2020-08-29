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
import { TextInput } from "react-native-gesture-handler";
export default class Feed extends Component {
  state = {
    modalVisible: false,
  };
  constructor() {
    super();
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      list: [],
      ordername: "",
      bid: '',
      orderkey: "",
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  onClose = () => this.setState({ modalVisible: false });

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
  componentDidMount() {
    firebase
      .database()
      .ref("OrderDetail")
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
          });
        });
        this.setState({ list: li });
      });
  }
  bidpress = () => {
    this.setState({ modalVisible: true });
  };
  setname(input, key) {
    this.setState({ ordername: input })
    this.setState({ orderkey: key });
  }
  setbid(input, key) {
    this.setname(input, key);
    this.bidpress();
  }
  setbidinput(Lname,ordername, bid,key) {
    var dbA = firebase.database().ref("BidOrder");
    var userid = dbA.child(key);
    userid
      .set({
        'Laundry': Lname,
        'customer': ordername,
        'Bidamount': bid,
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <FlatList
            style={{ width: "100%" }}
            data={this.state.list}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.setbid(item.name, item.key)}
                  >
                    <Text>User : {item.name}</Text>
                    <Text>Amount of clothes</Text>
                    <Text>Jacket x{item.Jacket}</Text>
                    <Text>T-Shirt x{item.Tshirt}</Text>
                    <Text>Shorts x{item.Shorts}</Text>
                    <Text>Drop Time : {item.orderDropdatetime}</Text>
                    <Text>Pick Time : {item.orderPickdatetime}</Text>
                    <Text>Address : {item.address}</Text>
                  </TouchableOpacity>
                  <Overlay
                    visible={this.state.modalVisible}
                    onClose={this.onClose}
                    closeOnTouchOutside
                  >
                    <Text>User : {this.state.ordername}</Text>
                    <Text>Input Bid :</Text>
                    <TextInput
                      value={this.state.bid}
                      onChangeText={(val) => this.updateInputVal(val, "bid")}
                    >
                     
                    </TextInput>
                    <Button
                      title="Bid"
                      style={styles.NextButton}
                      onPress={() =>
                        this.setbidinput(this.state.displayName,this.state.ordername, this.state.bid,this.state.orderkey)
                      }
                    >
                  <Text>OK</Text>
                    </Button>
                  </Overlay>
                </View>
              );
            }}
          />
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
//{item.name} {item.email}{item.address} {item.Jacket}{item.Shorts}{item.TShirt}{item.orderdate}{item.orderDropdatetime}{item.orderPickdatetime}
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
