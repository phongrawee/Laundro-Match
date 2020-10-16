import React, { Component } from "react";
import { Container, Footer, FooterTab, Button, Icon } from "native-base";
import { StyleSheet, View, ScrollView, Image, Text, Alert, TouchableHighlight ,TextInput} from "react-native";
import InputSpinner from "react-native-input-spinner";
import firebase from "../database/firebase";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "react-native";

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
      Service: "Wash only",
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
    var timestamp = Date.now();
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
      time: timestamp,
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
    timestamp,
    uid,
    email,
    Tshirt,
    Shorts,
    Jacket,
    address,
    name,
    service
  ) {
    var Detail = firebase.database().ref("OrderDetail");
    var userid = Detail.child(uid);
    var exp = timestamp + 10800000;
    var expdate = new Date(exp);

    var date = expdate.getDate(); //Current Date
    var month = expdate.getMonth() + 1; //Current Month
    var year = expdate.getFullYear(); //Current Year
    var hours = expdate.getHours(); //Current Hours
    var min = expdate.getMinutes(); //Current Minutes
    var sec = expdate.getSeconds(); //Current Seconds
    var expdatetime =
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec;
    userid
      .set({
        orderPickdatetime,
        orderDropdatetime,
        orderdate,
        timestamp,
        email,
        Tshirt,
        Shorts,
        Jacket,
        address,
        name,
        status: "In Progress",
        expire: expdatetime,
        service,
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  Historyuserorder(
    orderPickdatetime,
    orderDropdatetime,
    orderdate,
    uid,
    email,
    Tshirt,
    Shorts,
    Jacket,
    address,
    name,
    service
  ) {
    var Detail = firebase.database().ref("History");
    var userid = Detail.child(uid);
    userid
      .push({
        orderPickdatetime,
        orderDropdatetime,
        orderdate,
        email,
        Tshirt,
        Shorts,
        Jacket,
        address,
        name,
        service,
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
  GoUserOrder = () => {
    this.props.navigation.navigate("UserOrder");
  };

  GoOrderDetail() {
    this.props.navigation.navigate("OrderDetail");
  }
  functionTwo() {
    this.inputuserorder(
      this.state.DropDateDisplay,
      this.state.PickDateDisplay,
      this.state.date,
      this.state.time,
      this.state.uid,
      this.state.email,
      this.state.Tshirt,
      this.state.Shorts,
      this.state.Jacket,
      this.state.address,
      this.state.displayName,
      this.state.Service
    );
    this.Historyuserorder(
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
      this.state.Service
    );
  }
  functionCombined() {
    if (
      (this.state.Tshirt == 0 &&
        this.state.Shorts == 0 &&
        this.state.Jacket == 0) ||
      this.state.DropDateDisplay == "" ||
      this.state.PickDateDisplay == ""
    ) {
      Alert.alert("Notification","Please Enter details to order!");
      console.log("Error");
    } else {
      console.log("Pass");
      this.functionTwo();
      this.Alertfunc();
    }
  }
  Alertfunc() {
    Alert.alert(
      "Confirm",
      "Success Ordering",
      [{ text: "OK", onPress: () => this.GoOrderDetail() }],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.sertype}>
          <Text style={styles.heading}>Select a Service Type</Text>         
          <View style={styles.backgroundtype}>
            <Picker
              placeholder={"Selcet a service..."}
              selectedValue={this.state.Service}
              style={styles.serpicker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ Service: itemValue })
              }
            >
              <Picker.Item label="Wash only" value="Wash only" />
              <Picker.Item label="Iron only" value="Iron only" />
              <Picker.Item label="Wash&Iron" value="Wash&Iron" />
            </Picker>
         </View>
        </View>
        <View style={styles.clothes}>
          
          <Text style={styles.heading}>Select Your Clothes</Text>    
          <View style={styles.backgroundclothes}>
            <View style={styles.alignsameline}>
            <Text style={styles.content}>T-Shirt          </Text>
            <InputSpinner
              value={this.state.value}    
              onChange={(val) => this.updateInputVal(val, "Tshirt")}
              colorLeft={"#4ea5d9"}
              colorRight={"#4ea5d9"}
              textColor={"#122c34"}
              colorPress={"#44cfcb"}
            /> 
            </View>
            
            <View style={styles.alignsameline}>
            <Text style={styles.content}>Shorts          </Text>
            <InputSpinner
              value={this.state.value}
              
              onChange={(val) => this.updateInputVal(val, "Shorts")}
              colorLeft={"#4ea5d9"}
              colorRight={"#4ea5d9"}
              textColor={"#122c34"}
              colorPress={"#44cfcb"}
            />
            </View>
            <View style={styles.alignsameline}>
            <Text style={styles.content}>Jacket          </Text>
            <InputSpinner
              value={this.state.value}
              
              onChange={(val) => this.updateInputVal(val, "Jacket")}
              colorLeft={"#4ea5d9"}
              colorRight={"#4ea5d9"}
              textColor={"#122c34"}
              colorPress={"#44cfcb"}
            />
            </View>
            </View>
        </View>


        <View style={styles.datetime}>
          <Text style={styles.heading}>Select Date/Time</Text>
          
          <TouchableHighlight
              style={styles.submit}
              onPress={() => this.onPressButton()}
              underlayColor='#145c9e'>
              <Text style={styles.datetimeText}>Click to select Drop Off date/time</Text>
          </TouchableHighlight>
               <DateTimePickerModal
              isVisible={this.state.visibility}
              onConfirm={this.handleConfirm}
              onCancel={this.onPressCancel}
              mode="datetime"
            />
            <Text style={styles.result}>{this.state.DropDateDisplay}</Text>
          
            <TouchableHighlight
              style={styles.submit}
              onPress={() => this.onPressButton2()}
              underlayColor='#145c9e'>
              <Text style={styles.datetimeText}>Click to select Pick Up date/time</Text>
          </TouchableHighlight>
          <DateTimePickerModal
              isVisible={this.state.visibility2}
              onConfirm={this.handleConfirm2}
              onCancel={this.onPressCancel2}
              mode="datetime"
            />
            <Text style={styles.result}>{this.state.PickDateDisplay}</Text>

            <TouchableHighlight
              style={styles.submitcolor}
              onPress={() => this.functionCombined()}
              underlayColor='#054a91'>
              <Text style={styles.submitText}>Submit</Text>
          </TouchableHighlight>
        </View>

        


        <Footer>
          <FooterTab style={{ backgroundColor: "#145c9e" }}>
            <Button vertical onPress={() => this.GoHome()}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => this.GoUserOrder()}>
              <Icon name="navigate" />
              <Text>Order</Text>
            </Button>
            <Button vertical>
              <Icon name="person" onPress={() => this.GoOrderDetail()} />
              <Text>OrderDetail</Text>
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
  },
 sertype: {
    backgroundColor:"#ffffff",
    flex: 0.8, 
   
 },
  clothes: {
    backgroundColor: "#ffffff",
    flex: 2,   
  },
  datetime: {
    backgroundColor: "#ffffff",
    flex: 2,
   
  },
  heading: {
    fontSize: 17,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 42,
    color: "#122c34",
    fontWeight: "bold"
  },
  content:{
    fontSize: 14,
    fontWeight: "bold",
    color: "#122c34"
  },
   serpicker: {
    marginTop: 3,
    height: 25, width: 150,
    alignSelf: "center",
    
   },
   
   alignsameline:{
     margin: 5,
    flexDirection:'row', 
    alignItems:'center',
    alignSelf: "center"
   },
   backgroundclothes: {
      backgroundColor:'#c2ebff',
      width:"80%",
      alignSelf: "center",
      borderRadius: 10,
      
   },
   backgroundtype: {
    backgroundColor:'#c2ebff',
    width:"40%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop:10,
   
 },
 submit:{
  marginRight:40,
  marginLeft:40,
  marginTop:10,
  marginBottom: 3,
  paddingTop:4,
  paddingBottom:4,
  backgroundColor:'#4ea5d9',
  borderRadius:5,
  width: "70%",
  alignSelf: "center",
  

},
result:{

  paddingTop:4,
  paddingBottom:4,
  backgroundColor:'#efefef',
  borderRadius:5,
  width: "70%",
  alignSelf: "center",
  textAlign: "center"

},
datetimeText:{
  color:'#fff',
  textAlign:'center',
  overflow: 'hidden',
  fontSize: 14,
  
},

submitText:{
    color:'#fff',
    textAlign:'center',
    overflow: 'hidden',
    fontSize: 14,
    fontWeight: "bold"
},

submitcolor: {
  marginRight:40,
  marginLeft:40,
  marginTop:10,
  marginBottom: 3,
  paddingTop:5,
  paddingBottom:5,
  backgroundColor:'#145c9e',
  borderRadius:5,
  width: "40%",
  alignSelf: "center"
}

});
