import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import firebase from "../database/firebase";
import { Container, Footer, FooterTab, Button, Icon, Card } from "native-base";
import Overlay from "react-native-modal-overlay";
import { ceil } from "react-native-reanimated";


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
      .orderByChild("Rating")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            Laundry: child.val().Laundry,
            Bidamount: child.val().Bidamount,
            Rating: child.val().Rating,
            CusNum:child.val().CusNum,
            Location:child.val().Location,
          });
        });
        li.reverse();
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
          address: this.state.Laddress
        });
        this.setState({ selectstatus: true });
        this.setState({ modalVisible: false });
        firebase.database().ref("OrderDetail").child(this.state.uid).remove();

      });
      var MatchDetail = firebase.database().ref("MatchOrderDetail");
      var userid2 = MatchDetail.child(userid);
      userid2
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
      <View style={styles.container}>
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
                        <View style={styles.container}>
                         
                          <View style={styles.card}  >
                          <View style={styles.cardContent}>
                          <Text style={styles.textHeading}>{item.Laundry}</Text>
                          <View style={styles.alignsameline}>
                          <Image style={styles.image} source={require("../src/img/cash.png")}/><Text style={styles.textContent}>{item.Bidamount} Baht</Text>
                          </View>
                          <View style={styles.alignsameline}>
                          <Image style={styles.image} source={require("../src/img/star.png")}/><Text style={styles.textContent}>{item.Rating} ({item.CusNum})</Text>
                          </View>  
                          <View style={styles.alignsameline}>
                          <Image style={styles.image} source={require("../src/img/location.png")}/><Text style={styles.textContent}>{item.Location} </Text>  
                          </View>                                               
                          <TouchableOpacity 
                          style={styles.followButton} 
                          onPress={() =>
                            this.selectlaundry(
                              item.Laundry,
                              item.Bidamount,
                              item.key
                            )
                          }>
                              <Text style={styles.followButtonText}>Select</Text>  
                          </TouchableOpacity>
                          </View>
                          </View>
                     
                          <Overlay
                            visible={this.state.modalVisible}
                            onClose={this.onClose}
                            closeOnTouchOutside
                            containerStyle={{
                              backgroundColor: "rgba(0, 0, 0, 0.80)",
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
              <View style={styles.container}>
              <View style={styles.textStatusContainer}>
                <Text>No Laundry Bid yet</Text>
              </View>
              </View>
            ) : null}
          </View>
        ) : null}

        {this.state.orderstatus == null ? (
          <View style={styles.container}>
          <View style={styles.textStatusContainer}>
            <Text>You are not have an order</Text>
          </View>
          </View>
        ) : null}

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ebf0f7",  
    justifyContent: "center"
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
    backgroundColor: "white",
    borderWidth:2,
    borderColor:"#145c9e",
  },
  followButtonText:{
    color: "#145c9e",
    fontSize:12,
    fontWeight: "bold"
  },
  textHeading:{
    fontSize:20,
    flex:1,
    marginLeft: 30,
    color:"#145c9e",
    fontWeight:'bold'
  },

  textContent:{
    fontSize:16,
    flex:1,
    marginTop: 5,
    color:"#122c34",
    fontWeight:'bold'
  },
  
  image:{
    marginLeft: 50,
    marginRight: 10,
    width:20,
    height:20,
    
  },
  alignsameline:{
    margin: 5,
   flexDirection:'row', 
   alignItems:'center',
   alignSelf: "center"
  },
  textStatusContainer:{
    color: "#dcdcdc",
    fontSize:12,
    alignSelf: "center",
    
  },
});
