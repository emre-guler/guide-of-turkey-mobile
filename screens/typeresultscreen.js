import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import List from './components/List';
import { connect } from 'react-redux'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

class TypeResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstContainer: 'none',
            secondContainer: 'flex'
        }
    }
    static navigationOptions = {
        header: null
    }
    placeClicked = (id) => {
        fetch('https://1c7af09d.ngrok.io/api/guidedata/data/contentpage',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'ContentID': id,
            'ContentType': "Place"
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson == "somethingwentwrong")
          {
              Alert.alert("Bir sorun oluştu.");
          }
          else
          {
              responseJson = JSON.parse(responseJson);
              this.props.updateContentData(responseJson);
              const {navigate} = this.props.navigation;
              navigate("contentscreen");
          }
      })
    }
    render() { 
        const {navigate} = this.props.navigation;
            return(
                <View>
                    <View style={{display: this.state.secondContainer}}>
                        <Header 
                            containerStyle={{ backgroundColor: 'white', borderBottomWidth: 0}}
                            rightComponent={<Icon style={{color: 'black'}} name='close' onPress={() => navigate('contentscreen')}/>}
                        />
                        <ScrollView style={{marginBottom: 100}}>
                            <View  style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center'}}>
                                {this.props.placeTypeData == "" ? null : this.props.placeTypeData.map((data) => (<TouchableOpacity onPress={() => this.placeClicked(data.ID)}><List photoUrl={data.photoUrl} name={data.Name} /></TouchableOpacity>))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )
        }
}
function maptStateToProps(state) {
    return {
        placeTypeData: state.placeTypeData
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateContentData: (data) => dispatch({
            type: 'updateContentData',
            payload: data
        })
    }
}
export default connect(maptStateToProps, mapDispatchToProps)(TypeResults);