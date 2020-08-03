import React from 'react';
import { Text, View } from 'react-native';
import LoginForm from './src/component/loginForm';
import Headers from './src/component/common/header';
const App=()=> {
  return (
    <View >
        <Headers headerText='Login'/>
      <LoginForm/>
    </View>
  );
}
export default App;