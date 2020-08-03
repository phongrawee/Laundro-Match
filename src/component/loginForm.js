import React,{Component} from 'react';
import {Text,View,TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Card from './common/card';
import Button from './common/button';

 
class LoginForm extends Component{
    render(){
    return (
        <View>
          <Card>
                <View  style={coinDetailStyle.containerMain}>
                   
                    <View  style={coinDetailStyle.containerInput}>
                        <Text style={coinDetailStyle.textForm}>Email</Text>
                        <TextInput  style={coinDetailStyle.textInputEmail}
                                    autoCorrect={false}
                                    placeholder='Email'></TextInput>
                    </View>
                    <View  style={coinDetailStyle.containerInput}>
                        <Text style={coinDetailStyle.textForm}>Password</Text>
                        <TextInput  style={coinDetailStyle.textInputPassword}
                        autoCorrect={false}
                        placeholder='Password'
                        secureTextEntry={true}></TextInput>
                    </View>
                    <Button style={coinDetailStyle.buttonLogin}>Login</Button>
                  
                </View>
                
            </Card>
        </View>
    );
    }
};
 
  
 
const coinDetailStyle ={
    containerMain:{
        flexDirection: 'column'
    },
    containerInput:{
        flexDirection: 'row',
        marginBottom: 6,
    },
    textForm:{
        fontSize: 18,
        flex: 1,
    },
    textInputEmail:{
        padding:4,
        fontSize: 18,
        height:30,
        width:100,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        flex:2,
    },
    textInputPassword:{
        padding: 4,
        fontSize: 18,
        height:30,
        width:100,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        flex:2
    },
    buttonLogin:{
        marginTop: 20,
        fontSize:20,
        alignContent: 'center',
    }
 
};
 
// export to render
export default LoginForm;