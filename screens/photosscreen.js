import React, { Component } from 'react';
import LoadScreen from './loadscreen';
import Gallery from 'react-native-image-gallery';

export default class photosscreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoad: false,
        };
    }
    static navigationOptions = {
        header: null
    }
    render(){
        const {navigate} = this.props.navigation;
        if(this.state.isLoad){
            return(
                <LoadScreen />
            )
        }
        else {
            return (
                <Gallery
                    style={{ flex: 1, backgroundColor: 'black' }}
                    images={[
                        {source: require('./assets/nusret.jpg')},
                        {source: require('./assets/restaurants.png')},
                        {source: require('./assets/gelik.jpg')},
                        {source: require('./assets/konser.png')},
                        {source: require('./assets/develi.jpg')},
                        {source: require('./assets/antalya.png')}
                    ]}
                />
            )
        }
    }
}