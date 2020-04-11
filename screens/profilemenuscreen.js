import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Header, Avatar, Card, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
class profilemenuscreen extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    static navigationOptions = {
        header: null
    }
    loginActivityControl = () => {
        if(this.props.loginActivity == '' || this.props.loginActivity == undefined){
            return(
                <View>
                    <Card title="Hesap Oluştur & Giriş Yap">
                        <Text style={{marginBottom: 10}}>
                            Hesabınızı oluşturun ve Guide Of Turkey serüvenine katılın. Tarihi yerlere, mekanlara vb. yerlere oy verin, yorum yapın diğer kişilere yardımcı olun!
                        </Text>
                        <Button 
                            icon={<Icon type='font-awesome' name='user-plus' color="#fff" />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'red'}}
                            title='  Şimdi Kayıt Ol'
                            onPress={() => this.props.navigation.navigate('registerscreen')}
                        />
                        <Text style={{marginTop: 10, marginBottom: 10}}>
                            Zaten bir hesabınız var mı? O zaman yolculuğa devam edelim!
                        </Text>
                        <Button 
                            icon={<Icon type='font-awesome' name='user' color="#fff" />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'red'}}
                            title='  Giriş Yap'
                            onPress={() => this.props.navigation.navigate('loginscreen')}
                        />
                    </Card>
                </View>
            )
        }
        else {
            return(
                <View>
                    <Card title="Hesap Bilgileri">
                        <View style={{display: 'flex', flexDirection: 'column', margin: 5}}>
                            <Text style={{margin: 5}}>
                                {this.props.nameSurname}
                            </Text>
                            <Text style={{margin: 5}}>
                                {this.props.phoneNumber}
                            </Text>
                            <Text style={{margin: 5}}>
                                Şimdiye kadar {this.props.commentCount} mekana / alana yorum yaptın!
                            </Text>
                            <Text style={{margin: 5}}>
                                Favori yerlerinde {this.props.favoriteCount} mekan kayıtlı!
                            </Text>
                        </View>
                        <Button 
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'red'}}
                            title='Çıkış Yap'
                            onPress={() => this.props.navigation.navigate('Homescreen')}
                        />
                    </Card>
                </View>
            )
        }
    }
    render(){
        return(
            <ScrollView containerStyle={styles.main}>
                <Header 
                    containerStyle={styles.top}
                    rightComponent={<Icon style={{color: 'black'}} name='close' onPress={() => this.props.navigation.navigate('Homescreen')}/>}
                />
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => console.log("x")}>
                        <Avatar 
                            containerStyle={styles.imageContainer}
                            rounded
                            size='xlarge'
                            source={{uri: 'https://cdn.imgbin.com/12/18/24/imgbin-computer-icons-service-avatar-user-guest-house-gaulish-language-ESzjqBp2ZNqMwHg07DDbjSDmV.jpg'}}
                            onPress={() => console.log('Fotoğrafa bakmak istendi.')}
                        />
                    </TouchableOpacity>
                    {this.loginActivityControl()}
                </View>
                <View style={styles.bottomSignature}>
                        <Text style={styles.signatureText}>Guide of Turkey</Text>
                </View>
            </ScrollView>
        );
    }
}
function mapStateToProps(state) {
    return {
        loginActivity: state.loginActivity,
        userToken: state.userToken,
        nameSurname: state.nameSurname,
        phoneNumber: state.phoneNumber,
        userID: state.userID,
        favoriteCount: state.favoriteCount,
        commentCount: state.commentCount
    }
}
function mapDispatchToProps(dispatch) {
    return {
        profileData: (data) => dispatch({
            type: 'profileData',
            payload: {
                favoriteCount: data[1],
                commentCount: data[0]
            }
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(profilemenuscreen) 
const styles = StyleSheet.create({
    main: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 50
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
    imageContainer: {
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 3,
    },
    image: {
        resizeMode: 'contain'
    },
    loginContainer: {

    },
    loginTextContainer: {
        margin: 15
    },
    bottomSignature: {
        position: 'absolute',
        bottom: -75
    },
    signatureText: {
        fontSize: 22,
        color: 'red',
        fontFamily: 'sans-serif'
    }
})