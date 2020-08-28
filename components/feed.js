import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import firebase from "../database/firebase";
import { Container, Footer, FooterTab, Button, Icon } from "native-base";
export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      list: [],
      list2: [],
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
            email : child.val().email,
            Jacket: child.val().Jacket,
            Shorts: child.val().Shorts,
            TShirt: child.val().TShirt,
            orderDropdatetime: child.val().orderDropdatetime,
            orderPickdatetime: child.val().orderPickdatetime,
            orderdate: child.val().orderdate,
            address: child.val().address,
          });
        });
        this.setState({ list: li });
      });
  }

  render() {
    return (
      <Container>
        <View
          style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        >
          <FlatList
            style={{ width: "100%" }}
            data={this.state.list}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>
                    {item.key} {item.email}{item.address} 
                    </Text>
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
    padding: 35,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});
