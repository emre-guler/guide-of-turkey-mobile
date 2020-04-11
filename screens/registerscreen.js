import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Icon } from 'native-base';
import { Header, CheckBox, Input, Button} from 'react-native-elements';

export default class registerscreen extends Component{
    constructor(){
        super();
        this.state = {
            fullname: '',
            phonenumber: '',
            password: '',
            checked: false,
        }
        this.register = this.register.bind(this);
    };
    static navigationOptions = {
        header: null
    }
    register = () => {
        if(this.state.fullname != '' && this.state.phonenumber != '' && this.state.password != '' && this.state.checked != false)
        {
            fetch('https://1c7af09d.ngrok.io/api/guide/useroperations/register/',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'Fullname':  this.state.fullname,
                    'PhoneNumber': this.state.phonenumber,
                    'Password': this.state.password
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson == 'success')
                {
                    Alert.alert('Hesap başarı ile oluşturuldu giriş yaparak devam edebilirsiniz.');
                }
                else if(responseJson == 'saveControlProblem')
                {
                    Alert.alert('Bir sorun oluştu lütfen daha sonra tekrar deneyin.');
                }
                else if(responseJson == 'sameNumber')
                {
                    Alert.alert('Aynı numara üzerinden bir hesap zaten var. Tekrar deneyin.');
                }
            })
        }
        else
        {
            Alert.alert('Tüm alanları eksiksiz olarak tamamladığınızdan emin olun.');
        }
    }
    fullnameChange = (newValue) => {
        this.setState({fullname: newValue});
    }
    phoneChange = (newValue) => {
        this.setState({phonenumber: newValue});
    }
    passwordChange = (newValue) => {
        this.setState({password: newValue});
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
                    <Text style={styles.titleText}>Guide Of Turkey - Kayıt Ol</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.fullnameContainer}>
                        <Input style={styles.inputs} placeholder="  Ad ve Soyad" onChangeText={this.fullnameChange} leftIcon={{type: 'font-awesome', name: 'address-card'}} />
                    </View>
                    <View style={styles.phonenumberContainer}>
                        <Input style={styles.inputs} placeholder="  Telefon Numarası" onChangeText={this.phoneChange} leftIcon={{type: 'font-awesome', name: 'phone'}} />
                    </View>
                    <View style={styles.passwordContainer}>
                        <Input  style={styles.inputs} placeholder="  Şifre" secureTextEntry onChangeText={this.passwordChange} leftIcon={{type: 'font-awesome', name: 'lock'}} />
                    </View>
                    <View>
                         <CheckBox title="Kullanım şartlarını okudum ve kabul ediyorum." onPress={() => this.setState({checked: !this.state.checked})} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={this.state.checked} checkedColor='red' uncheckedColor='red' />
                         <Button title='Kayıt Ol'  buttonStyle={{backgroundColor: 'red'}} onPress={() => this.register()} />
                    </View>
                </View>
            </View>
        );
    }
}
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
    menuContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%'
    },
    fullnameContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 20
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
    }
});