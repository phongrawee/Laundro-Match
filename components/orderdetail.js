import React, { Component } from "react";
import { StyleSheet, View, Text, Alert, TextInput, Card, TouchableOpacity, Image } from "react-native";
import firebase from "../database/firebase";
import {Footer, FooterTab, Button, Icon, Container } from "native-base";
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
      Lrate: "3",
      comment: "",
      Service: "",
      Service2: "",
      date: "",
      time:"",
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
      .ref(`OrderDetail/${this.state.uid}/service`)
      .on("value", (snapshot) => {
        this.setState({ Service2: snapshot.val() });
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
      .ref(`MatchOrderDetail/${this.state.uid}/service`)
      .on("value", (snapshot) => {
        this.setState({ Service: snapshot.val() });
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
    var timestamp = Date.now();
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      date:
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
      time: timestamp,
    });
    this.setState({ modalVisible: true });
    console.log("Date", this.state.date);
  }
  FinFunc(rate, name, comment) {
    console.log("Date2", this.state.date);

    console.log("RRR", this.ratingCompleted);
    var dbA = firebase
      .database()
      .ref(`Rating/${this.state.laundryid}/${this.state.uid}`);
    dbA.set({
      Name: name,
      Rating: rate,
      Comment: comment,
      time: this.state.date,
      timestamp: this.state.time,
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

      <Container style={{backgroundColor:"#ebf0f7"}}>
        {this.state.orderstatus2 != 0 ? (
          <View style={styles.container}>
            {this.state.selectstatus != null ? (
            <View style={styles.card}  >
              <View style={styles.cardContent}>
              <View style={styles.alignsameline}>
                <Image style={styles.image} source={require("../src/img/green.png")}/><Text style={{color: "#429846", marginBottom:5, fontWeight: "bold"}}>Order is Matched</Text>
              </View>                    
              <View>
                  <Text style={styles.statusSuccessText}>- Matching with <Text style={{fontSize: 12, fontWeight: "bold"}}>{this.state.laundry}</Text></Text>
                  <Text style={styles.statusSuccessText}>- Send your clothes at <Text style={{fontSize: 12, fontWeight: "bold"}}>{this.state.Laddress}</Text></Text>
                  <Text style={{marginLeft: 40, marginBottom: 4, fontSize: 12, fontWeight: "normal",
                      color: "#4caf50",}}>- Bid amount <Text style={{fontSize: 12, fontWeight: "bold"}}>{this.state.bid} baht</Text> </Text>                  
                </View>
              <Text style={styles.textsub}>User Name</Text>  
              <Text style={styles.textContent}>{this.state.displayName}</Text>  
              <Text style={styles.textsub}>Your Clothes</Text>                        
              <Text style={styles.textContent}>Jacket x{this.state.Jacket}</Text>                                                                     
              <Text style={styles.textContent}>T-Shirt x{this.state.Tshirt}</Text>                                                                            
              <Text style={styles.textContent}>Shorts x{this.state.Shorts}</Text>
              <Text style={styles.textsub}>Service Type</Text> 
              <Text style={styles.textContent}>{this.state.Service}</Text>
              <Text style={styles.textsub}>Drop Time</Text> 
              <Text style={styles.textContent}>{this.state.orderDropdatetime}</Text>
              <Text style={styles.textsub}>Pick Time</Text> 
              <Text style={styles.textContent}>{this.state.orderPickdatetime}</Text>
              <Text style={styles.textsub}>Address</Text> 
              <Text style={styles.textContent}>{this.state.address}</Text>  
              <TouchableOpacity                          
                          style={styles.followButton} 
                          onPress={() => this.finishOrder()}>
                              <Text style={styles.followButtonText}>Finished Order</Text>  
              </TouchableOpacity>                                                           
              </View>
            </View>
            ) : null}
            
            
            
            {/*Detail before Matching*/}
            {this.state.selectstatus == null ? (
            <View style={styles.card}>
            
              <View style={styles.cardContent}>
              <View style={styles.alignsameline}>
                <Image style={styles.image} source={require("../src/img/red.png")}/><Text style={{color: "#e21b1b"}}>Order Not Matching</Text>
              </View>                              
              <Text style={styles.textsub}>User Name</Text>  
              <Text style={styles.textContent}>{this.state.displayName}</Text>               
              <Text style={styles.textsub}>Your Clothes</Text>                        
              <Text style={styles.textContent}>Jacket x{this.state.Jacket2}</Text>                                                                     
              <Text style={styles.textContent}>T-Shirt x{this.state.Tshirt2}</Text>                                                                            
              <Text style={styles.textContent}>Shorts x{this.state.Shorts2}</Text>              
              <Text style={styles.textsub}>Service Type</Text> 
              <Text style={styles.textContent}>{this.state.Service2}</Text>              
              <Text style={styles.textsub}>Drop Time</Text> 
              <Text style={styles.textContent}>{this.state.orderDropdatetime2}</Text>
              <Text style={styles.textsub}>Pick Time</Text> 
              <Text style={styles.textContent}>{this.state.orderPickdatetime2}</Text>
              <Text style={styles.textsub}>Address</Text> 
              <Text style={styles.textContent}>{this.state.address}</Text>                                                                          
               <View>
              <TouchableOpacity 
                          style={styles.followButton} 
                          onPress={() => this.removeOrder()}>
                              <Text style={styles.followButtonText}>Cancle Order</Text>  
              </TouchableOpacity>
              </View>
              </View>
             
            </View>
            
            
            ) : null}
                  
          </View>

        ) : null}
        
        <View style={styles.container}>
          {this.state.orderstatus2 == 0 ? (          
              <Text style={{alignSelf :"center", marginTop: 275}}>No Order Yet!</Text>           
          ) : null}
        </View>
        
        <Overlay
          visible={this.state.modalVisible}
          onClose={this.onClose}
          closeOnTouchOutside
          containerStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.80)",
          }}
        >
          <View>
          
            <Text style={styles.textTitle}>You have finished the order! </Text>
            <Text style={styles.textTitle}>Please rating for <Text style={{fontSize: 16, fontWeight: "bold"}}>{this.state.laundry}</Text> </Text>
          

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
            <TouchableOpacity 
                          style={styles.followButton2} 
                          
                          onPress={() =>
                            this.FinFunc(
                              this.state.Lrate,
                              this.state.displayName,
                              this.state.comment
                            )
                          }>
                              <Text style={styles.followButtonText}>Confirm</Text>  
              </TouchableOpacity>
            
            
          </View>
        </Overlay>
        





        <Footer>
          <FooterTab style={{ backgroundColor: "#145c9e" }}>
            <Button vertical onPress={() => this.GoHome()}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => this.GoUserOrder()}>
              <Icon name="cart" />
              <Text>Match</Text>
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

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"white",
    padding: 8,
    flexDirection:'row',
    borderRadius:30,
  },
  cardContent: {
    marginLeft:30,
    marginTop:10
  },

  image:{
    marginRight: 10,
    width:10,
    height:10,
  },
  alignsameline:{
   flexDirection:'row', 
   alignItems:'center',  
  },

  textContent:{
    fontSize:16,
    color:"#122c34",
    fontWeight:'bold'
  },

  textsub:{
    marginTop: 10
  } , 
  followButton: {
    marginTop:10,
    marginLeft:95,
    marginBottom: 8,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    borderRadius:30,
    backgroundColor: "#145c9e",

  },
  followButtonText:{
    color: "#ffffff",
    fontSize:12,
    fontWeight: "bold"
  },

  textTitle: {
    fontSize: 16,
    alignSelf: "center"
  },
  followButton2: {
    marginTop:10,
    marginLeft:65,
    marginBottom: 8,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    borderRadius:30,
    backgroundColor: "#145c9e",

  },
  

  statusSuccessText: {
    marginLeft: 40,
    marginBottom:2,
    fontSize: 12,
    fontWeight: "normal",
    color: "#4caf50",
    
  },

  

  
  
}); 