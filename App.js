import Homescreen  from './screens/homescreen';
import profilemenuscreen from './screens/profilemenuscreen';
import loginscreen from './screens/loginscreen';
import registerscreen from './screens/registerscreen';
import contentscreen from './screens/contentscreen';
import favoritesscreen from './screens/favoritesscreen';
import photosscreen  from './screens/photosscreen';
import Placetovisitscreen from './screens/placestovisitscreen';
import TypeResult from './screens/typeresultscreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

console.disableYellowBox = true;
const BottomTransation = (index, position, height) => {
  const sceneRange = [index - 1, index];
  const outputHieght = [height, 0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputHieght
  });
  return {
    transform: [{ translateY: transition}]
  }
}
const NavigationConfig = () => {
  return {
    screenInterpolator: (sceneProps) => {
      const position = sceneProps.position;
      const scene = sceneProps.scene;
      const index = scene.index;
      const height =  sceneProps.layout.initHeight;
      return BottomTransation(index, position, height);
    }
  }
}
const AppNavigator  = createStackNavigator({
  Homescreen : {
    screen : Homescreen,
  },
  profilemenuscreen: {
    screen : profilemenuscreen 
  },
  registerscreen: {
    screen: registerscreen
  },
  loginscreen: {
    screen: loginscreen
  },
  favoritesscreen: {
    screen: favoritesscreen
  },
  contentscreen: {
    screen: contentscreen
  },
  photosscreen: {
    screen: photosscreen
  },
  Placetovisitscreen: {
    screen: Placetovisitscreen
  },
  TypeResult: {
    screen: TypeResult
  }
}, { transitionConfig: NavigationConfig});
const AppConteiner = createAppContainer(AppNavigator);

const initalState = {
  loginActivity: '',
  userToken: '',
  nameSurname: '',
  phoneNumber: '',
  userID: '',
  favoriteCount: '',
  commentCount: '',
  favoritePlaces: '',
  searchResult: '',
  contentData: '',
  typeData: '',
  cityData: '',
  placeTypeData: '',
  placeToVisitData: ''
}
const reducer = (state = initalState, action) => {
  if(action.type == 'addLogin')
  {
    return {
      loginActivity: true,
      userToken: action.payload.newToken,
      nameSurname: action.payload.nameSurname,
      phoneNumber: action.payload.phoneNumber,
      userID: action.payload.userID,
      favoriteCount: action.payload.favoriteCount,
      commentCount: action.payload.commentCount,
      favoritePlaces: state.favoritePlaces,
      searchResult: state.searchResult,
      contentData: state.contentData,
      typeData: state.typeData,
      cityData: state.cityData,
      placeTypeData: state.placeTypeData,
      placeToVisitData: state.placeToVisitData
    }
  }
  else if(action.type == 'profileData')
  {
    return {
      loginActivity: state.loginActivity,
      userToken: state.userToken,
      nameSurname: state.nameSurname,
      phoneNumber: state.phoneNumber,
      userID: state.userID,
      favoriteCount: action.payload.favoriteCount,
      commentCount: action.payload.commentCount,
      favoritePlaces: state.favoritePlaces,
      searchResult: state.searchResult,
      contentData: state.contentData,
      typeData: state.typeData,
      cityData: state.cityData,
      placeTypeData: state.placeTypeData,
      placeToVisitData: state.placeToVisitData
    }
  }
  else if(action.type == 'addFavorite')
  {
    return {
      loginActivity: state.loginActivity,
      userToken: state.userToken,
      nameSurname: state.nameSurname,
      phoneNumber: state.phoneNumber,
      userID: state.userID,
      favoriteCount: state.favoriteCount,
      commentCount: state.commentCount,
      favoritePlaces: action.payload.data,
      searchResult: state.searchResult,
      contentData: state.contentData,
      typeData: state.typeData,
      cityData: state.cityData,
      placeTypeData: state.placeTypeData,
      placeToVisitData: state.placeToVisitData
    }
  }
  else if(action.type == 'updateSearchResult')
  {
    return {
      loginActivity: state.loginActivity,
      userToken: state.userToken,
      nameSurname: state.nameSurname,
      phoneNumber: state.phoneNumber,
      userID: state.userID,
      favoriteCount: state.favoriteCount,
      commentCount: state.commentCount,
      favoritePlaces: state.favoritePlaces,
      searchResult: action.payload,
      contentData: state.contentData,
      typeData: state.typeData,
      cityData: state.cityData,
      placeTypeData: state.placeTypeData,
      placeToVisitData: state.placeToVisitData
    }
  }
  else if(action.type == 'deleteSearchResult')
  {
    return {
      loginActivity: state.loginActivity,
      userToken: state.userToken,
      nameSurname: state.nameSurname,
      phoneNumber: state.phoneNumber,
      userID: state.userID,
      favoriteCount: state.favoriteCount,
      commentCount: state.commentCount,
      favoritePlaces: state.favoritePlaces,
      searchResult: action.payload,
      contentData: state.contentData,
      typeData: state.typeData,
      cityData: state.cityData,
      placeTypeData: state.placeTypeData,
      placeToVisitData: state.placeToVisitData
    }
  }
  else if(action.type == "updateContentData")
  {
    return {
      loginActivity: state.loginActivity,
      userToken: state.userToken,
      nameSurname: state.nameSurname,
      phoneNumber: state.phoneNumber,
      userID: state.userID,
      favoriteCount: state.favoriteCount,
      commentCount: state.commentCount,
      favoritePlaces: state.favoritePlaces,
      searchResult: state.payload,
      contentData: action.payload,
      typeData: state.typeData,
      cityData: state.cityData,
      placeTypeData: state.placeTypeData,
      placeToVisitData: state.placeToVisitData
    }
  }
  else if(action.type == "updateTypeData")
  {
    return {
      loginActivity: state.loginActivity,
      userToken: state.userToken,
      nameSurname: state.nameSurname,
      phoneNumber: state.phoneNumber,
      userID: state.userID,
      favoriteCount: state.favoriteCount,
      commentCount: state.commentCount,
      favoritePlaces: state.favoritePlaces,
      searchResult: state.payload,
      contentData: state.contentData,
      typeData: action.payload,
      cityData: state.cityData,
      placeTypeData: state.placeTypeData,
      placeToVisitData: state.placeToVisitData
    }
  }
  else if(action.type == "updateCityData")
  {
    return {
      loginActivity: state.loginActivity,
      userToken: state.userToken,
      nameSurname: state.nameSurname,
      phoneNumber: state.phoneNumber,
      userID: state.userID,
      favoriteCount: state.favoriteCount,
      commentCount: state.commentCount,
      favoritePlaces: state.favoritePlaces,
      searchResult: state.payload,
      contentData: state.contentData,
      typeData: state.typeData,
      cityData: action.payload,
      placeTypeData: state.placeTypeData,
      placeToVisitData: state.placeToVisitData
    }
  }
  else if(action.type == "updatePlaceTypeData")
  {
    return {
      loginActivity: state.loginActivity,
      userToken: state.userToken,
      nameSurname: state.nameSurname,
      phoneNumber: state.phoneNumber,
      userID: state.userID,
      favoriteCount: state.favoriteCount,
      commentCount: state.commentCount,
      favoritePlaces: state.favoritePlaces,
      searchResult: state.payload,
      contentData: state.contentData,
      typeData: state.typeData,
      cityData: state.cityData,
      placeTypeData: action.payload,
      placeToVisitData: state.placeToVisitData
    }
  }
  else if(action.type == "updateplaceToVisitData")
  {
    return {
      loginActivity: state.loginActivity,
      userToken: state.userToken,
      nameSurname: state.nameSurname,
      phoneNumber: state.phoneNumber,
      userID: state.userID,
      favoriteCount: state.favoriteCount,
      commentCount: state.commentCount,
      favoritePlaces: state.favoritePlaces,
      searchResult: state.payload,
      contentData: state.contentData,
      typeData: state.typeData,
      cityData: state.cityData,
      placeTypeData: state.placeTypeData,
      placeToVisitData: action.payload
    }
  }
  return state;
}
const store = createStore(reducer);
export default class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <AppConteiner />
      </Provider>
    )
  }
} 