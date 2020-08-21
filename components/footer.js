import React, { Component } from 'react';
import { StyleSheet, View, Text,TouchableHighlight,Image} from 'react-native';
import { Container, Footer, FooterTab, Button, Icon} from 'native-base';
import firebase from '../database/firebase';
import Dashboard from '../components/dashboard';


export default class FooterTabs extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }
signOut = () => {
  firebase.auth().signOut().then(() => {
    this.props.navigation.navigate('Login')
  })
  .catch(error => this.props.setState({ errorMessage: error.message }))
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
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
  return(
    
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
      );
  };
};


