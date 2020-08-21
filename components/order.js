import React, { Component } from 'react';
import { Container, Footer, FooterTab, Button, Icon} from 'native-base';
import { StyleSheet, View,TouchableHighlight,Image, Text} from 'react-native';
import InputSpinner from "react-native-input-spinner";
import firebase from '../database/firebase';

export default class Order extends Component {

  constructor(props) {
		super(props);
		this.state = {
			value: 1,
			valueReal: 1.5,
			colorLeft: this.getRandomColor(),
      colorRight: this.getRandomColor(),
      uid: ''
		};
  }
  
	getRandomColor() {
		var letters = "0123456789ABCDEF";
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
    signOut = () => {
        firebase.auth().signOut().then(() => {
          this.props.navigation.navigate('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }  
      GoHome = () => {
          this.props.navigation.navigate('Dashboard');
      }
      GoFeed = () => {
        this.props.navigation.navigate('Feed');
    }
      GoOrder = () => {
        this.props.navigation.navigate('Order');
      }
  render() {
    return (
      <Container>
<View style={styles.col}>
					<Text style={styles.text}>T-shirt</Text>
					<InputSpinner
						value={this.state.value}
						style={styles.spinner}
					/>
				</View>
<Footer>
      <FooterTab>
        <Button vertical>
          <Icon name="home"onPress={() => this.GoHome()} />
          <Text>Home</Text>
        </Button>
        <Button vertical>
          <Icon name="chatbubbles"onPress={() => this.GoFeed()} />
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
		paddingTop: 40,
	},
	col: {
		flex: 1,
		marginBottom: 20,
		flexDirection: "row",
	},
	text: {
		flex: 3,
		marginRight: 20,
	},
	title: {
		marginBottom: 40,
		fontSize: 30,
	},
	spinner: {
		flex: 1,
		width: "auto",
		minWidth: 300,
	},
	simbol: {
		marginLeft: 10,
		marginRight: 10,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		textAlignVertical: "center",
		lineHeight: 50,
	},
  imagestyle: {
    width: 200,
    height: 200,
    resizeMode: "contain"
  }
});