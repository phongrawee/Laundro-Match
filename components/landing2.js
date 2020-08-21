import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import firebase from "../database/firebase";

export default class Landing1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.images}
          source={require("../src/img/gotolaundry.jpg")}
        />
        <Text style={styles.Heading}>Go to laundry</Text>
        <Text style={styles.Content}>
        Going to laundry that you select and drop your clothes off,{" "}
        </Text>
        <Button
          color="#3740FE"
          title="NEXT"
          onPress={() => this.props.navigation.navigate("Landing3")}
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
