import React,{Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types'
 
// init card component.
const Card = (props)=>{
    return (
        <View style={stlyes.containerStyle}> 
            {props.children} 
        </View>
    );
};
 
// style of card
const stlyes ={
    containerStyle:{
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#DDDDDD',
    shadowColor: '#000000',
    shadowOffset: {width :0, height:2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    padding: 10,
    }
};
 
// export to render
export {Card};
 