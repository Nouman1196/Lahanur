import React, {Component} from 'react';
import {View, Text, ActivityIndicator, YellowBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import RootStackScreen from './screens/RootStackScreen';

import FlashMessage from 'react-native-flash-message';
// YellowBox.ignoreWarnings([
//   'Warning: Async Storage has been extracted from react-native core',
// ]);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDarkTheme: false,
      setIsDarkTheme: false,
      isLoading: true,
      auth_token: ''
    };
  }

  toggleTheme = () => {
    this.setState({setIsDarkTheme: !this.state.setIsDarkTheme, isDarkTheme: !this.state.isDarkTheme});
  };

  async componentDidMount() {
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token});
    console.log(auth_token);
  }


  DrawerRender = () => {
    const Drawer = createDrawerNavigator();
    if (this.state.auth_token) {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        </Drawer.Navigator>
      );
    } else {
      return <RootStackScreen />;
    }
  };

  render() {
    const CustomDefaultTheme = {
      ...NavigationDefaultTheme,
      ...PaperDefaultTheme,
      colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        background: '#ffffff',
        text: '#333333',
      },
    };

    const CustomDarkTheme = {
      ...NavigationDarkTheme,
      ...PaperDarkTheme,
      colors: {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
        background: '#333333',
        text: '#ffffff',
      },
    };

    const theme = this.state.isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
    
    return (
      <PaperProvider theme={theme}>
        <FlashMessage position="top" />
        <NavigationContainer theme={theme}>
        {this.DrawerRender()}
        </NavigationContainer>
      </PaperProvider>
    );
  }
}
