// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import firebase from '../database/firebase';
//import FooterTabs from '../components/footer';
import { Container, Footer, FooterTab, Button, Icon} from 'native-base';
export default class Dashboard extends Component {
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
    .catch(error => this.setState({ errorMessage: error.message }))
  }  
  GoHome = () => {
      this.props.navigation.navigate('Dashboard');
  }
  GoFeed = () => {
    this.props.navigation.navigate('Feed');
}
  

  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
    return (
     
      
   <Container> 
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {this.state.displayName}
        </Text>
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
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});