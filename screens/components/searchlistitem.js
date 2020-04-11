import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { connect } from 'react-redux'

class SearchItem extends Component {
    constructor(props)
    {
        super(props);
    }
    render(){
        return(
            <TouchableOpacity>
                <View style={{margin: 10, borderColor: '#818181', borderWidth: 1, borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'row'}}>
                    <View style={{marginRight: 10}}>
                        <Avatar rounded  source={{uri: 'https://cdn.imgbin.com/12/18/24/imgbin-computer-icons-service-avatar-user-guest-house-gaulish-language-ESzjqBp2ZNqMwHg07DDbjSDmV.jpg'}} size='medium' />
                    </View>
                    <View style={{display:'flex', flexDirection: 'column'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'sans-serif', color: '#818181',marginRight: 5, fontSize: 16}}>{this.props.name}</Text>
                            <Text style={{fontFamily:'sans-serif', color: '#F1C40E', fontSize: 16}}>{this.props.ratingStar}<Text style={{color: 'grey'}}>{this.props.rating}</Text></Text>
                        </View>
                        <View style={{marginTop: 5}}>
                            <Text style={{fontFamily: 'sans-serif', color: '#818181', fontSize: 16,}}>{this.props.explain}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchItem); 