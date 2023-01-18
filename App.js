import React, {Component} from 'react';
import {View, LogBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigator from './navigation/AppNavigator';
import 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_token: '',
    };
  }

   componentDidMount = async() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token});
    console.log(auth_token);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlashMessage position="top" />
        <AppNavigator />
      </View>
    );
  }
}
