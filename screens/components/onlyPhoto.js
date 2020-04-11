import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
export default class OnlyPhoto extends Component{
    render(){
        return(
            <TouchableOpacity style={{height: 100, width: 100, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd', backgroundColor:'white'}} onPress={this.props.press}>
                <View style={{ flex: 2 }}>
                    <Image source={this.props.imageUri}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}