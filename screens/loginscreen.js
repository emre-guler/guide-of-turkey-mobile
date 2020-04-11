import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Header, Input, Button} from 'react-native-elements';
import { Icon } from 'native-base';
import { connect } from 'react-redux'
let reponseJson = '';
class loginscreen extends Component{
    constructor(){
        super();
        this.state = {
            telephone: '',
            password: ''
        }
        this.login = this.login.bind(this);
    }
    static navigationOptions = {
        header: null
    }
    login = () => {
        if(this.state.telephone != '' && this.state.password != '')
        {
            fetch('https://1c7af09d.ngrok.io/api/guide/useroperations/login/',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'PhoneNumber': this.state.telephone,
                    'Password': this.state.password
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson == "wrongEntry")
                {
                    Alert.alert("Bilgilerinizi kontrol ederek tekrar deneyiniz.");
                }
                else
                {
                    responseJson = JSON.parse(responseJson);
                    this.props.addLogin(responseJson);
                    Alert.alert("Giriş başarılı şekilde gerçekleştirildi.");
                    const {navigate} = this.props.navigation;
                    navigate("profilemenuscreen");
                }
            })
        }
        else
        {
            Alert.alert('Tüm alanları eksiksiz olarak tamamladığınızdan emin olun.');
        }
    }
    phoneChange = (newValue) => {
        this.setState({ telephone: newValue });
    }
    passwordChange = (newValue) => {
        this.setState({ password: newValue});
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.main}>
                <Header 
                    containerStyle={styles.top}
                    rightComponent={<Icon style={{color: 'black'}} name='close' onPress={() => navigate('profilemenuscreen')}/>}
                />
                <View style={styles.title}>
                    <Text style={styles.titleText}>Guide Of Turkey - Giriş Yap</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.phonenumberContainer}>
                        <Input style={styles.inputs} placeholder="  0 (5XX) XXX XX XX" onChangeText={this.phoneChange} leftIcon={{type: 'font-awesome', name: 'phone'}} />
                    </View>
                    <View style={styles.passwordContainer}>
                        <Input  style={styles.inputs} placeholder="  ******" secureTextEntry onChangeText={this.passwordChange} leftIcon={{type: 'font-awesome', name: 'lock'}} />
                    </View>
                    <View>
                         <Button title='Giriş Yap'  buttonStyle={{backgroundColor: 'red'}} onPress={() => this.login()} />
                    </View>
                </View>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        userToken: state.userToken,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addLogin: (responseJson) => dispatch({
            type: 'addLogin',
            payload: {
                newToken: responseJson.Token,
                nameSurname: responseJson.FullName,
                phoneNumber: responseJson.PhoneNumber,
                userID: responseJson.userID,
                commentCount: responseJson.commentCount,
                favoriteCount: responseJson.favoriteCount
            }
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(loginscreen); 
const styles = StyleSheet.create({
    main: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },  
    top: {
        backgroundColor: 'white',
        borderBottomWidth: 0
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        color: 'red',
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%'
    },
    phonenumberContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 20
    },
    passwordContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 20
    },
    inputs: {
        borderBottomColor: 'red',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        width: '60%'
    },
});