import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header, Avatar, Card, Icon, Button } from 'react-native-elements';
import LoadScreen from './loadscreen';
import { connect } from 'react-redux';

class favoritesscreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoad: false
        }
    }
    static navigationOptions = {
        header: null
    }
    getData = () => {
        if(this.props.favoritePlaces == '' || this.props.favoritePlaces == undefined)
        {
            fetch('https://1c7af09d.ngrok.io/api/guidedata/data/favorite',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'UserID': this.props.userId,
                    'userToken': this.props.userToken
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson == "TokenError")
                {
                    Alert.alert("Bir sorun oluştu daha sonra tekrar deneyiniz.");
                }
                else
                {
                    responseJson = JSON.parse(responseJson);
                    this.props.addFavorite(responseJson);
                    this.setState({isLoad: true});
                }
            })
        }
        else
        {
            return (
                this.props.favoritePlaces.map((item, counter)=> (
                    <View style={{margin: 5, display: 'flex', flexDirection: 'row'}}>
                        <Text style={{fontFamily: 'sans-serif', fontSize: 16}}> {counter + 1} </Text>
                        <Text style={{fontFamily: 'sans-serif', fontSize: 16}}> {item} </Text>
                    </View>
                ))
            );
        }
    }
    loginActivityControl = () => {
        if(this.props.loginActivity == '' || this.props.loginActivity == undefined){
            return(
                <View>
                    <Card title="Yıldızladığınız Yerler / Mekanlar">
                        <Text style={{marginBottom: 10}}>
                            Bu özelliği sadece üyelerimiz kullanabilir, hesabınızı oluşturun ve Guide Of Turkey serüvenine katılın. Tarihi yerlere, mekanlara vb. yerlere oy verin, yorum yapın diğer kişilere yardımcı olun!
                        </Text>
                        <Text style={{marginTop: 10, marginBottom: 10}}>
                                Zaten bir hesabınız var mı o zaman yolculuğa giriş yaparak devam edin!
                            </Text>
                    </Card>
                </View>
            )
        }
        else{
            const state = this.state;
            if(this.props.favoritePlaces == '' || this.props.favoritePlaces == undefined)
            {
                if(!state.isLoad)
                {
                    return(
                        <View>
                            <LoadScreen />
                            {this.getData()}
                        </View>
                    )
                }
                else
                {
                    return(
                        <View>
                            <Header
                                containerStyle={styles.top}
                                rightComponent={<Icon style={{color: 'black'}} name='close' onPress={() => this.props.navigation.navigate('Homescreen')}/>}
                            />
                            <View>
                                <Card title="Yıldızladığınız Yerler / Mekanlar">
                                    <View style={{marginBottom: 10}}>
                                        {this.getData()}
                                    </View>
                                    <Button 
                                        icon={<Icon type='font-awesome' name='user-plus' color="#fff" />}
                                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'red'}}
                                        title='Yeni yerler eklemeye devam et!'
                                        onPress={() => this.props.navigation.navigate('Homescreen')}
                                    />
                                </Card>
                            </View>
                        </View>
                    )
                }
            }
            else
            {
                return(
                    <View>
                        <Header
                            containerStyle={styles.top}
                            rightComponent={<Icon style={{color: 'black'}} name='close' onPress={() => this.props.navigation.navigate('Homescreen')}/>}
                        />
                        <View>
                            <Card title="Yıldızladığınız Yerler / Mekanlar">
                                <View style={{marginBottom: 10}}>
                                    {this.getData()}
                                </View>
                                <Button 
                                    icon={<Icon type='font-awesome' name='user-plus' color="#fff" />}
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'red'}}
                                    title='Yeni yerler eklemeye devam et!'
                                    onPress={() => this.props.navigation.navigate('Homescreen')}
                                />
                            </Card>
                        </View>
                    </View>
                )
            }
        }
    }
    render(){
        return(
            <View>
                {this.loginActivityControl()}
            </View>
        );
    }
}
function mapStateToProps(state){
    return {
        loginActivity: state.loginActivity,
        userId: state.userID,
        userToken: state.userToken,
        favoritePlaces: state.favoritePlaces
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addFavorite: (responseJson) => dispatch({
            type: 'addFavorite',
            payload: {
                data: responseJson
            }
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(favoritesscreen)
const styles = StyleSheet.create({
    top: {
        backgroundColor: 'white',
        borderBottomWidth: 0
    },
});