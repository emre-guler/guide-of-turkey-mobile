import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default class LoadScreen extends Component {
    static navigationOptions = {
        header : null  
    };
    render(){
        return(
            <View style={styles.screen}>
                <LottieView 
                    source={require('./assets/animation.json')}
                    autoPlay
                    loop
                    style={styles.gif}
                />
                <Text style={styles.text}>Guide Of Turkey</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    screen: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    gif: {
        height: 200
    },
    text: {
        fontSize: 24,
        color: 'rgb(21,189,206)',
        fontFamily: 'sans-serif'
    }
})