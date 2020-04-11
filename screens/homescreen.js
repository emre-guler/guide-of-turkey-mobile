import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Platform, StatusBar, Dimensions, Alert } from 'react-native';
import LoadScreen from './loadscreen';
import { Icon } from 'native-base';
import { Header, SearchBar, Text } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import List from './components/List';
import SearchItem from './components/searchlistitem';
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window')
class Homescreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoad: true,
      search: '',
      first: 'none',
      second : 'flex',
      image: [
        require('./assets/denizli.png'),
        require('./assets/konser.png'),
        require('./assets/gezilecekalanlar.png'),
        require('./assets/tarihialanlar.png'),
      ]
    }
    this.getSearchData = this.getSearchData.bind(this.state);
  }
  static navigationOptions = {
    header: null
  }
  componentWillMount() {
      this.startHeaderHeight = 80
      if (Platform.OS == 'android') {
          this.startHeaderHeight = 100 + StatusBar.currentHeight
      }
  }
  typeTriggered = (id) => {
    fetch('https://1c7af09d.ngrok.io/api/guidedata/data/typeContent',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': id,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          responseJson = JSON.parse(responseJson);
          this.props.updatePlaceTypeData(responseJson);
          const {navigate} = this.props.navigation;
          console.log(responseJson);
          navigate("TypeResult");
      })
  }
  getCities = () => {
    fetch('https://1c7af09d.ngrok.io/api/guidedata/data/homepagecity',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson = JSON.parse(responseJson);
        this.props.updateCityData(responseJson);
      });
  }
  getTypes = () => {
    fetch('https://1c7af09d.ngrok.io/api/guidedata/data/homepagetype',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson = JSON.parse(responseJson);
        this.props.updateTypeData(responseJson);
      });
  }
  placeTriggered = (id, type) => {
      fetch('https://1c7af09d.ngrok.io/api/guidedata/data/contentpage',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'ContentID': id,
            'ContentType': type
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
    getSearchData = () => {
    if(this.state.search == "")
    {
      null;
    }
    else
    {
      this.props.deleteSearchResult('');
      fetch('https://1c7af09d.ngrok.io/api/guidedata/data/search',{
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              'searchText': this.state.search,
              'searchType': 'generalSearch'
          })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson == "wrongParameter")
          {
            Alert.alert("Bir sorun oluştu.");
          }
          else
          {
              responseJson = JSON.parse(responseJson);
              counter = 0;
              responseJson.forEach(element => {
                  element = JSON.parse(element);
                  responseJson[counter] = element;
                  counter++;
              });
              this.props.updateSearchResult(responseJson);
          }
      })
    }
  }
  updateSearch = (newValue) => {
    if(newValue == ''){
      this.setState({ first: 'none', second: 'flex'});
    }
    else{
      this.setState({ search: newValue, first: 'flex', second: 'none' });
      this.getSearchData();
    }
  }
  render(){
    const state = this.state;
    if(!state.isLoad){
      return(
        <LoadScreen />
      );
    }
    else{
      return(
        <ScrollView contentContainerStyle={styles.main} style={{backgroundColor: 'white'}}>
          <Header
            containerStyle={{backgroundColor: '#E5E4EA'}}
            leftComponent={<Icon style={{color: 'red'}} name="person" onPress={() => this.props.navigation.navigate('profilemenuscreen') }/>} 
            centerComponent={<SearchBar placeholder='Nereyi keşfetmek istiyorsun?' onChangeText={this.updateSearch} onCancel={this.clearSearch} value={this.state.search} lightTheme={true} containerStyle={styles.searchbar} />} 
            rightComponent={<Icon style={{color: '#FCAF17'}} name="star-half" onPress={() => this.props.navigation.navigate('favoritesscreen')}/>}
          />
          <View style={{display: this.state.first}}>
              <ScrollView contentContainerStyle={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                {
                  this.props.searchResult == "" || this.props.searchResult == undefined ? null : this.props.searchResult.map((data) => (data.map((item) => (<TouchableOpacity onPress={() => this.placeTriggered(item.ID,item.Type)}><SearchItem name={item.Name.slice(0,10)} rating={(item.Rating == undefined ? null : (item.Rating + " / 5"))} ratingStar={(item.Rating == undefined ? null : "★")} explain={item.Explain.slice(0,37) + "..."} /></TouchableOpacity>))))
                }
              </ScrollView>
          </View>
          <View style={{display: this.state.second}}>
            <View>
              <Text h4 style={{position: 'absolute', zIndex: 50, margin: 10}} h4Style={{fontSize: 24, fontFamily: 'sans-serif'}}></Text>
              <View style={{backgroundColor: 'white', width: '100%'}}>
                <SliderBox 
                  images={state.image} 
                  dotColor="red"
                  inactiveDotColor="#90A4AE" 
                  paginationBoxVerticalPadding={20} 
                  autoplay 
                  circleLoop
                />
              </View>
            </View>
            <View style={{marginBottom: 15}}>
              <SafeAreaView style={{ flex: 1 }}>
                  <View style={{ flex: 1 }}>
                      <ScrollView scrollEventThrottle={16} >
                          <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                Ne tür bir yer arıyorsun?
                              </Text>
                              <View style={{ height: 130, marginTop: 20 }}>
                                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} >
                                    {this.props.typeData == "" || this.props.typeData == undefined ? this.getTypes() : this.props.typeData.map((data) => (<TouchableOpacity onPress={() => this.typeTriggered(data.ID)}><List imageUri={data.photoUrl} name={data.TypeName} /></TouchableOpacity>))}
                                  </ScrollView>
                              </View>
                          </View>
                      </ScrollView>
                  </View>
              </SafeAreaView>
            </View>
            <View style={{marginBottom: 15}}>
              <SafeAreaView style={{ flex: 1 }}>
                  <View style={{ flex: 1 }}>
                      <ScrollView scrollEventThrottle={16} >
                          <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                Popüler Şehirler
                              </Text>
                              <View style={{ height: 130, marginTop: 20 }}>
                                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} >
                                      {this.props.cityData == "" || this.props.cityData == undefined ? this.getCities() : this.props.cityData.map((data) => (<TouchableOpacity onPress={() => this.placeTriggered(data.ID, 'City')}><List imageUri={data.photoUrl} name={data.Name} /></TouchableOpacity>))}
                                  </ScrollView>
                              </View>
                          </View>
                      </ScrollView>
                  </View>
              </SafeAreaView>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    searchResult: state.searchResult,
    typeData: state.typeData,
    cityData: state.cityData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearchResult: (data) => dispatch({
      type: 'updateSearchResult',
      payload: data
    }),
    deleteSearchResult: (data) => dispatch({
      type: 'deleteSearchResult',
      payload: data
    }),
    updateContentData: (data) => dispatch({
      type: 'updateContentData',
      payload: data
    }),
    updateTypeData: (data) => dispatch({
      type: 'updateTypeData',
      payload: data
    }),
    updateCityData: (data) => dispatch({
      type: 'updateCityData',
      payload: data
    }),
     updatePlaceTypeData: (data) => dispatch({
       type: 'updatePlaceTypeData',
       payload: data
     })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center'
  },
  searchbar: {
    width: 300,
  },
  carousel:{
    height: 200
  }
});