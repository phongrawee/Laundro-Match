import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import firebase from "../database/firebase";

export default class Landing1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.images}
          source={require("../src/img/usingapp.jpg")}
        />
        <Text style={styles.Heading}>Using LaundroMatch</Text>
        <Text style={styles.Content}>
          Our application allow you to get more comfortable to know which
          laundry can wash the clothes for you at the moment and you can select
          the laundry by decide with the cost which laundry offer for the order,{" "}
        </Text>
        <Button
          color="#3740FE"
          title="NEXT"
          onPress={() => this.props.navigation.navigate("Landing2")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  Heading: {
    marginTop: 15,
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  Content: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 60,
  },
  images: {
    width: 300,
    height: 300,
    marginTop: 15,
  },
});
