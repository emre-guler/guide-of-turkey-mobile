import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, Dimensions, StatusBar, Platform, Alert } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Text, Rating, Avatar, Icon, Card, Button } from 'react-native-elements';
import OnlyPhoto from './components/onlyPhoto';
import List from './components/List';
import {connect } from 'react-redux';
import Moment from 'moment';

const { height, width } = Dimensions.get('window')
class contentscreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            rating: 4,
            placesToVisit: '',
            placePhotos: '',
            commentText: '',
            favoriteControl: false,
            commentData: '',
            userData: '',
        }
        this.commentTypeControl = this.commentTypeControl.bind(this);
    }
    static navigationOptions = {
        header: null
    }
    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
        fetch('https://1c7af09d.ngrok.io/api/guidedata/data/placecomments',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'PlaceID': this.props.contentData.ID,
                'Type': 'oneComment'
            })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson = JSON.parse(responseJson);
                this.setState({userData: JSON.parse(responseJson[1]), commentData: JSON.parse(responseJson[0])});
            })
            fetch('https://1c7af09d.ngrok.io/api/guidedata/data/placephotos',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'ContentID': this.props.contentData.ID,
                'ContentType': this.props.contentData.Type
            })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson == "somethingwentwrong")
                {
                    Alert.alert("Bir şeyler ters gitti.");
                }
                else
                {
                    responseJson = JSON.parse(responseJson);
                    this.setState({placePhotos: responseJson});
                }
            })
            fetch('https://1c7af09d.ngrok.io/api/guidedata/data/placetovisit',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': this.props.contentData.ID
            })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson = JSON.parse(responseJson);
                this.setState({placesToVisit: responseJson});    
                this.props.updateplaceToVisitData(responseJson);
            })
    }
    loginControlForFavorite = () => {
        if(this.props.loginActivity == "" || this.props.loginActivity == undefined)
        {
            null;
        }
        else
        {
            return (
                <View>
                    <TouchableOpacity style={{position: "absolute", right: 50, marginLeft: 200}} onPress={() => this.favoriteClicked(this.props.contentData.ID,this.props.userID, this.props.userToken)}>
                            {<Icon name="bookmark" type="font-awesome" color="black" size={40} />}
                    </TouchableOpacity>
                </View>
            )
        }
    }
    favoriteClicked = (contentID, userID, userToken) => {
        fetch('https://1c7af09d.ngrok.io/api/guide/useroperations/favorite',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'UserID': userID,
                'PlaceID': contentID,
                'userToken': userToken,
                'favoriteType': 'new'
            })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson == "saveControlProblem")
                {
                    Alert.alert("Bir şeyler ters gitti.");
                }
                else if(responseJson == "alreadyHave")
                {
                    Alert.alert("Bu alan zaten favorilerinizde.");
                }
                else
                {
                    Alert.alert("Favorilerinize başarılı şekilde eklendi!");
                }
            })
    }
    commentTypeControl = () =>
    {
        if(this.props.contentData.Type == "Place")
        {
            return (
                <View style={{margin: 20}}>
                    <Text h4 h4Style={{fontSize: 20, fontFamily: 'sans-serif'}} style={{marginBottom: 10, color:'#818181'}}>Yorumlar</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={{marginRight: 5}}>
                            <Avatar 
                                rounded
                                size='small'
                                source={{uri: 'https://cdn.imgbin.com/12/18/24/imgbin-computer-icons-service-avatar-user-guest-house-gaulish-language-ESzjqBp2ZNqMwHg07DDbjSDmV.jpg'}}
                            />
                        </View>
                        <View style={{width: '90%', minHeight: 150, height: 'auto' , backgroundColor: '#E5E4EA', borderRadius: 5}}>
                            <Text style={{padding: 5, fontFamily: 'sans-serif', fontWeight: "600"}}>
                                {this.state.userData.Fullname + "  "}<Text style={{fontFamily: 'sans-serif', fontSize: 12, color: 'grey'}}>{Moment(this.state.commentData.Date).format('DD/MM/YYYY')}</Text>
                            </Text>
                            <Text style={{padding: 5, fontFamily: 'sans-serif'}}>
                                {this.state.commentData.userComment}
                            </Text>
                            <Text style={{fontFamily:'sans-serif', color: '#F1C40E', padding: 5, fontSize: 20}}>★<Text style={{color: 'grey'}}>{this.state.commentData.Rating}/5</Text></Text>
                        </View>
                    </View>
                </View>
            );
        }
        else
        {
            null;
        }
    }
    commentTypeControlOther = () => {
        if(this.props.contentData.Type == "Place")
        {
            const {navigate} = this.props.navigation;
            return (
                <TouchableOpacity onPress={() => navigate('morecommentscreen')} style={{margin: 20, padding: 20, width: '100%', borderTopWidth: 0.5, borderColor:'#C0C0C0', borderBottomWidth: 0.5}}>
                        <Icon name="chevron-down" type="font-awesome" color="#818181" />
                </TouchableOpacity>
            )
        }
        else
        {
            null;
        }
    }
    typeControl = () => {
        if(this.props.contentData.Type == "Place")
        {
            return (
                <Rating 
                    imageSize={20}
                    defaultRating={this.props.contentData.Rating}
                    startingValue={this.props.contentData.Rating}
                    showRating
                />
            );
        }
        else
        {
            null;
        }
    }
    typeControlOther = () => {
        if(this.props.contentData.Type == "Place")
        {
            return (
                <View style={{margin: 15, display: 'flex', flexDirection: 'row'}}>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center', borderRightWidth: 0.7, borderRightColor: '#818181', padding: 20}}>
                        <Icon type="materiale" name='security' color="green" size={50} />
                        <Text style={{fontFamily: 'sans-serif', fontSize: 16, color: 'green'}}>Güvenlik</Text>
                        <Text style={{fontFamily: 'sans-serif', fontSize: 24, color: 'green'}}>5</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.7, borderRightColor: '#818181', padding: 20}}>
                        <Icon name='materiale' name='euro-symbol' color='rgb(249,166,2)' size={50} />
                        <Text style={{fontFamily: 'sans-serif', fontSize: 16, color: 'rgb(249,166,2)'}}>Pahalılık</Text>
                        <Text style={{fontFamily: 'sans-serif', fontSize: 24, color: 'rgb(249,166,2)'}}>3</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20}}>  
                        <Icon type='materiale' name='favorite' color='red' size={50} />
                        <Text style={{fontFamily: 'sans-serif', fontSize: 16, color: 'red'}}>Güzellik</Text>
                        <Text style={{fontFamily: 'sans-serif', fontSize: 24, color: 'red'}}>5</Text>
                    </View>
                </View>
            );
        }
        else
        {
            null;
        }
    }
    sendComment = () => {
        fetch('https://1c7af09d.ngrok.io/api/guide/useroperations/comment',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'PlaceID': this.props.contentData.ID,
                'UserID': this.props.userID,
                'Token': this.props.userToken,
                'UserComment': this.state.commentText,
                'Rating': this.state.Rating,
                'commentType': 'add'
            })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson == "saveControlProblem")
                {
                    Alert.alert("Bir şeyler ters gitti. :(");
                }
                else
                {
                    Alert.alert("Yorumunuz kayıt edildi.");
                }
        })
    }
    commentChange = (newValue) => {
        this.setState({ commentText: newValue});
    }
    ratingChange = (newValue) => {
        this.setState({ Rating: newValue});
    }
    loginActivity = () => {
        if(this.props.loginActivity == true && this.props.contentData.Type == "Place"){
            return(
                <View style={{margin: 20}}>
                    <Text h4 h4Style={{fontSize: 20, fontFamily: 'sans-serif'}} style={{marginBottom: 10, color:'#818181'}}>Yorum Yap</Text>
                    <View style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                        <TextInput 
                            underlineColorAndroid="transparent"
                            placeholder="Bu mekan / yer hakkında bir şeyler yaz ve oy ver!"
                            placeholderTextColor="grey"
                            multiline={true}
                            style={{width: 350, fontFamily: 'sans-serif', borderWidth: 1, borderColor: '#E9E9EA', padding: 10}}
                            numberOfLines={3}
                            onChangeText={this.commentChange}
                        />
                        <Rating 
                            imageSize={20}
                            defaultRating={5}
                            startingValue={5}
                            showRating
                            style={{marginTop:10, marginBottom: 10}}
                            onFinishRating={this.ratingChange}
                        />
                        <TouchableOpacity style={{display:'flex', width: '70%', height: 50, backgroundColor: 'red', justifyContent:'center', alignItems:'center'}} onPress={() => this.sendComment()}>
                            <Text style={{fontSize: 22, fontFamily: 'sans-serif', color: 'white'}}>Gönder</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else {
            if(this.props.contentData.Type == "Place")
            return(
                <View>
                    <Card title="Hesap Oluştur & Giriş Yap">
                        <Text style={{marginBottom: 10}}>
                            Yorum yapmak için üye olmanız gerekli.
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
            else
            {
                null;
            }
        }
    }
    render() {
        const {navigate} = this.props.navigation;
        return(
            <HeaderImageScrollView 
                maxHeight={200}
                minHeight={100}
                headerImage={require("./assets/gezilecekalanlar.png")}
                renderForeground={() => (
                    <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
                    <TouchableOpacity onPress={() => console.log("tap!!")}>
                        <Text h2 style={{backgroundColor: "transparent", fontFamily:'sans-serif', color: 'yellow'}}></Text>
                    </TouchableOpacity>
                    </View>
                )}
            >
                <View style={{marginBottom: 20}}>
                    {this.loginControlForFavorite()}
                    <TriggeringView>
                        <View style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <View>
                                <Text h4 h4Style={{fontFamily:'sans-serif', fontSize: 22, color: '#818181', margin: 10}}>{this.props.contentData.Name}</Text>
                                {this.typeControl()}
                            </View>
                            {this.typeControlOther()}
                            <View style={{margin: 20}}>
                                <Text h4 h4Style={{fontSize: 20, fontFamily: 'sans-serif'}} style={{margin: 10, color: '#818181'}}>Genel Bilgi</Text>
                                <Text style={{padding: 15, fontFamily: 'sans-serif'}}>{this.props.contentData.Explain}</Text>
                            </View>
                            <Text h4 h4Style={{fontFamily:'sans-serif', fontSize: 22, color: '#818181', margin: 5}}>Ziyaret Edilmesi Gereken Yerler</Text>
                            <View style={{margin: 20}}>
                                <View style={{display:'flex', flexDirection: 'row'}}>
                                      {this.state.placesToVisit == "" ? null : this.state.placesToVisit.map((data) => <TouchableOpacity onPress={() => navigate("Placetovisitscreen")}><List photoUrl={data.photoUrl} name={data.Name} /></TouchableOpacity>)}
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => navigate("Placetovisitscreen")} style={{margin: 20, padding: 20, width: '100%', borderTopWidth: 0.5, borderColor:'#C0C0C0', borderBottomWidth: 0.5}}>
                                <Icon name="chevron-down" type="font-awesome" color="#818181" />
                            </TouchableOpacity>
                            <Text h4 h4Style={{fontFamily:'sans-serif', fontSize: 22, color: '#818181', margin: 5}}>Fotoğraflar</Text>
                            <View style={{margin: 20}}>
                                <View style={{display:'flex', flexDirection: 'row'}}>
                                     {this.state.placePhotos == "" ? null : this.state.placePhotos.map((data) => (<TouchableOpacity onPress={() => console.log(item.ID)}><OnlyPhoto photoUrl={data.photoUrl} /></TouchableOpacity>))}
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => navigate('photosscreen')} style={{margin: 20, padding: 20, width: '100%', borderTopWidth: 0.5, borderColor:'#C0C0C0', borderBottomWidth: 0.5}}>
                                <Icon name="chevron-down" type="font-awesome" color="#818181"/>
                            </TouchableOpacity>
                            {this.commentTypeControl()}
                            {this.commentTypeControlOther()}
                            {this.loginActivity()}
                        </View>
                    </TriggeringView>
                </View>
            </HeaderImageScrollView>
        )
    }
}
function mapStateToProps(state) {
    return {
        loginActivity: state.loginActivity,
        contentData: state.contentData,
        favoritePlaces: state.favoritePlaces,
        userID : state.userID,
        userToken: state.userToken
    }
  }
  
function mapDispatchToProps(dispatch) {
    return {
        updateplaceToVisitData: (data) => dispatch({
            type: 'updateplaceToVisitData',
            payload: data
        }) 
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(contentscreen);