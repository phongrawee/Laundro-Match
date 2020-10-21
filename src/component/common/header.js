import React from 'react';
import PropTypes from 'prop-types';
import {Text,View} from 'react-native';
 
// style
    const viewStyle={
        backgroundColor: '#F8F8F8',
        justifyContent :'center',
        alignItems:'center',
        height:60,
        paddingTop:15,
        shadowColor:'#000000',
        shadowOffset:{width:0 ,height:2},
        shadowOpacity:0.2,
        elavation:2,
        position:'relative'
    };
 
    const textStyle ={
        fontSize : 20
    };
 
// init component
const Headers = (props) =>{
    return(
        <View style={viewStyle}> 
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
        );
    };
 
Headers.PropTypes = {
    headerText: PropTypes.string.isRequired
};
 
// export to render
export {Headers};
