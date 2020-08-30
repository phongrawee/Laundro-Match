import React, { Component } from "react";
import { Container, Footer, FooterTab, Button, Icon } from "native-base";
import { StyleSheet, View, ScrollView, Image, Text } from "react-native";
import InputSpinner from "react-native-input-spinner";
import firebase from "../database/firebase";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from "react-native-reanimated";

export default class Order extends Component {
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
  state = {
    visibility: false,
    visibility2: false,
    DropDateDisplay: "",
    PickDateDisplay: "",
  };
  handleConfirm = (date) => {
    this.setState({ DropDateDisplay: date.toString() });
  };
  onPressCancel = () => {
    this.setState({ visibility: false });
  };
  onPressButton = () => {
    this.setState({ visibility: true });
  };
  handleConfirm2 = (date) => {
    this.setState({ PickDateDisplay: date.toString() });
  };
  onPressCancel2 = () => {
    this.setState({ visibility2: false });
  };
  onPressButton2 = () => {
    this.setState({ visibility2: true });
  };

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

    firebase
      .database()
      .ref(`Users/${this.state.uid}/address`)
      .on("value", (snapshot) => {
        this.setState({ address: snapshot.val() });
      });
  }

  inputuserorder(
    orderPickdatetime,
    orderDropdatetime,
    orderdate,
    uid,
    email,
    Tshirt,
    Shorts,
    Jacket,
    address,
    name
  ) {
    var Detail = firebase.database().ref("OrderDetail");
    var userid = Detail.child(uid);
    userid
      .set({
        orderPickdatetime,
        orderDropdatetime,
        orderdate,
        email,
        Tshirt,
        Shorts,
        Jacket,
        address,
        name,
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
      this.state.DropDateDisplay,
      this.state.PickDateDisplay,
      this.state.date,
      this.state.uid,
      this.state.email,
      this.state.Tshirt,
      this.state.Shorts,
      this.state.Jacket,
      this.state.address,
      this.state.displayName
    );
  }
  functionCombined() {
    this.functionOne();
    this.functionTwo();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.clothes}>
          <Text style={styles.itemtext}>T-shirt</Text>
          <InputSpinner
            value={this.state.value}
            onChange={(val) => this.updateInputVal(val, "Tshirt")}
            colorLeft={"#62b1f6"}
            colorRight={"#62b1f6"}
            textColor={"#3f51b5"}
            colorPress={"#3f51b5"}
          />
        </View>
        <View style={styles.clothes}>
          <Text style={styles.itemtext}>Shorts</Text>
          <InputSpinner
            value={this.state.value}
            style={styles.spinner}
            onChange={(val) => this.updateInputVal(val, "Shorts")}
            colorLeft={"#62b1f6"}
            colorRight={"#62b1f6"}
            textColor={"#3f51b5"}
            colorPress={"#3f51b5"}
          />
        </View>
        <View style={styles.clothes}>
          <Text style={styles.itemtext}>Jacket</Text>
          <InputSpinner
            value={this.state.value}
            style={styles.spinner}
            onChange={(val) => this.updateInputVal(val, "Jacket")}
            colorLeft={"#62b1f6"}
            colorRight={"#62b1f6"}
            textColor={"#3f51b5"}
            colorPress={"#3f51b5"}
          />
        </View>

        <View style={styles.datetime}>
          <Button
            block
            info
            vertical
            onPress={() => this.onPressButton()}
            style={styles.Button}
            title="Drop off"
          >
            <Text style={styles.buttonText}>DROP OFF</Text>
          </Button>
          <DateTimePickerModal
            isVisible={this.state.visibility}
            onConfirm={this.handleConfirm}
            onCancel={this.onPressCancel}
            mode="datetime"
          />
          <Text style={styles.itemtext}>{this.state.DropDateDisplay}</Text>
        </View>

        <View style={styles.datetime}>
          <Button
            block
            info
            vertical
            onPress={() => this.onPressButton2()}
            style={styles.Button}
            title="Pick up"
          >
            <Text style={styles.buttonText}>PICK UP</Text>
          </Button>
          <DateTimePickerModal
            isVisible={this.state.visibility2}
            onConfirm={this.handleConfirm2}
            onCancel={this.onPressCancel2}
            mode="datetime"
          />
          <Text style={styles.itemtext}>{this.state.PickDateDisplay}</Text>
        </View>
        <View style={styles.orderButton}>
          <Button
            block
            primary
            style={styles.Button}
            title="Drop off"
            vertical
            onPress={() => this.functionCombined()}
          >
            <Text style={styles.buttonText}>CONFIRM</Text>
          </Button>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },

  itemtext: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 12,
    color: "#000",
    textAlign: "center",
    color: "#3f51b5",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,

    color: "#fff",
  },

  orderButton: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginVertical: 38,
    marginHorizontal: 28,
  },

  clothes: {
    backgroundColor: "#fff",
    padding: 6,
    marginVertical: 6,
    marginHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 15,
  },
  datetime: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 18,
    flexDirection: "column",
    borderRadius: 15,
  },
});
