import React, { Component } from "react";
import { Container, Footer, FooterTab, Button, Icon } from "native-base";
import { StyleSheet, View, ScrollView, Image, Text } from "react-native";
import InputSpinner from "react-native-input-spinner";
import firebase from "../database/firebase";
import DateTimePickerModal from "react-native-modal-datetime-picker";
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

  inputuserorder(orderPickdatetime,orderDropdatetime,orderdate, uid, email, Tshirt, Shorts, Jacket,address,name) {
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
        name

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
      this.state.displayName,
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

          <View style={styles.col}>
          <Button vertical onPress={() => this.onPressButton()}>
              <Icon name="home"  />
              <Text>Set Drop Date/Time</Text>
            </Button>
            <Text>{this.state.DropDateDisplay}</Text>
            <DateTimePickerModal
              isVisible={this.state.visibility}
              onConfirm={this.handleConfirm}
              onCancel={this.onPressCancel}
              mode="datetime"
            />           
          </View>
          <View style={styles.col}>
          <Button vertical onPress={() => this.onPressButton2()}>
              <Icon name="home"  />
              <Text>Set Pick Date/Time</Text>
            </Button>
            <Text>{this.state.PickDateDisplay}</Text>
            <DateTimePickerModal
              isVisible={this.state.visibility2}
              onConfirm={this.handleConfirm2}
              onCancel={this.onPressCancel2}
              mode="datetime"
            />           
          </View>

          <View style={styles.NextButton}>
            <Button vertical onPress={() => this.functionCombined()}>
              <Icon name="send" />
              <Text>Order!</Text>
            </Button>
          </View>
        </ScrollView>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.GoHome()}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => this.GoFeed()}>
              <Icon name="chatbubbles"  />
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
