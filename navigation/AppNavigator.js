//This is an example code for App Navigation//
import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
//import { createBottomTabNavigator } from "react-navigation-tabs";
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
// import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import {
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Title, Caption, Paragraph} from 'react-native-paper';
//import react in our code.
import HomeScreen from '../screens/HomeScreen';
// import AccountScreen from "../screens/AccountScreen";
import ContactScreen from '../screens/ContactScreen';
import SplashScreen from '../screens/SplashScreen';
// import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import TermsAndConditions from '../screens/TermsConditions';
import PrivacyPolicy from '../screens/PrivacyPolicy';
// import PushNotificationScreen from "../screens/PushNotificationScreen";
import CategoriesScreen from '../screens/CategoriesScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CollectionsScreen from '../screens/CollectionsScreen';
import AllProductsScreen from '../screens/AllProductsScreen';
import WishListScreen from '../screens/WishListScreen';
import SearchedProduct from '../screens/SearchedProduct';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfile';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AddToCartScreen from '../screens/AddToCartScreen';
import SubCategoriesScreen from '../screens/SubCategoriesScreen';
import TermsScreen from '../screens/TermsScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import CustomizedPoppits from '../screens/CustomizedPoppits';
import FetchRequest from '../services/fetchRequests/fetchRequests';
// import AllProductsDetails from "../screens/AllProductsDetails";
import {styles} from '../screens/stylesheets/StylesAppNavigator';
import envs from '../globalVariable';
//import all the basic component we have used

const {width} = Dimensions.get('window');

class CustomDrawerNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_token: '',
      name: '',
      email: '',
      image: '',
    };
  }
  componentDidMount = async () => {
    // getting auth_token which is set during SignIn
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token: auth_token});
    // get user data
    let callMe = await FetchRequest.apiCall(
      '/customer/profile.json',
      'GET',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );
    console.log(callMe.content);
    this.setState({
      name: callMe.content.name,
      email: callMe.content.email,
      image: callMe.content.user_image,
    });
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.drawerContent}>
          {this.state.auth_token ? (
            <View style={styles.userInfoSection}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 20,
                    marginHorizontal: 5,
                  }}>
                  {this.state.image ? (
                    <Avatar.Image
                      style={styles.avatarBig}
                      source={{
                        uri: envs.BASE_URL + this.state.image,
                      }}
                      size={60}
                    />
                  ) : (
                    <Avatar.Image
                      style={styles.avatarBig}
                      source={require('../assets/user.png')}
                      size={60}
                    />
                  )}
                  <View
                    style={{
                      marginLeft: 15,
                      flexDirection: 'column',
                      width: (width / 4) * 2,
                    }}>
                    <Title style={styles.title}>{this.state.name}</Title>
                    <Caption style={styles.caption}>{this.state.email}</Caption>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.Container}>
              <View style={styles.view1}>
                <Image
                  source={require('../assets/logowhite.png')}
                  style={styles.ImageLetters}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/lahanurletters.png')}
                  style={styles.ImageLetters1}
                  resizeMode="contain"
                />
              </View>
            </View>
          )}
          <ScrollView>
            <DrawerItems
              {...this.props}
              activeBackgroundColor="#333"
              activeTintColor="#fe491a"
              height={60}
              inactiveTintColor="#333"
              labelStyle={{
                fontSize: 12,
                fontWeight: '200',
                fontFamily: 'Muli-Bold',
              }}
              itemStyle={{
                borderBottomWidth: 0.5,
                borderColor: '#333',
              }}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    SplashScreen: {screen: SplashScreen},
    SignInScreen: {screen: SignInScreen},
    SignUpScreen: {screen: SignUpScreen},
    TermsScreen: {screen: TermsScreen},
    PrivacyScreen: {screen: PrivacyScreen},
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

// Side Drawer Navigator code
const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'HOME',
        drawerIcon: () => (
          <Icon type="font-awesome" name="home" size={22} color={'#fe491a'} />
        ),
      },
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    CollectionsScreen: {
      screen: CollectionsScreen,
      navigationOptions: {
        title: 'COLLECTIONS',
        drawerIcon: () => (
          <Icon type="font-awesome" name="tags" size={22} color={'#fe491a'} />
        ),
      },
    },
    AllProductsScreen: {
      screen: AllProductsScreen,
      navigationOptions: {
        title: 'PRODUCTS',
        drawerIcon: () => (
          <Icon
            type="font-awesome"
            name="shopping-bag"
            size={20}
            color={'#fe491a'}
          />
        ),
      },
    },
    ContactScreen: {
      screen: ContactScreen,
      navigationOptions: {
        title: 'CONTACT US',
        drawerIcon: () => (
          <Icon
            type="font-awesome"
            name="comments"
            size={22}
            color={'#fe491a'}
          />
        ),
      },
    },
    TermsAndConditions: {
      screen: TermsAndConditions,
      navigationOptions: {
        title: 'TERMS & CONDITIONS',
        drawerIcon: () => (
          <Icon type="font-awesome" name="gavel" size={22} color={'#fe491a'} />
        ),
      },
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
      navigationOptions: {
        title: 'PRIVACY POLICY',
        drawerIcon: () => (
          <Icon
            type="font-awesome"
            name="user-secret"
            size={22}
            color={'#fe491a'}
          />
        ),
      },
    },
  },
  {
    drawerPosition: 'left',
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    initialRouteName: 'HomeScreen',
    drawerWidth: (width / 2.5) * 2,
  },
);

const ActualStack = createStackNavigator(
  {
    RootStack: RootStack,
    AppDrawerNavigator: AppDrawerNavigator,
    Home: {screen: HomeScreen},
    ProfileScreen: {screen: ProfileScreen},
    EditProfile: {screen: EditProfile},
    Collections: {screen: CollectionsScreen},
    ProductsAll: {screen: AllProductsScreen},
    WishListScreen: {screen: WishListScreen},
    SearchedProduct: {screen: SearchedProduct},
    Contact: {screen: ContactScreen},
    TermsAndConditions: {screen: TermsAndConditions},
    PrivacyPolicy: {screen: PrivacyPolicy},
    CategoriesScreen: {screen: CategoriesScreen},
    SubCategoriesScreen: {screen: SubCategoriesScreen},
    CustomizedPoppits: {screen: CustomizedPoppits},
    ProductsScreen: {screen: ProductsScreen},
    ProductDetailsScreen: {screen: ProductDetailsScreen},
    AddToCartScreen: {screen: AddToCartScreen},
  },
  {
    initialRouteName: 'RootStack',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const InitialStack = createSwitchNavigator(
  {
    ActualStack: ActualStack,
  },
  {
    initialRouteName: 'ActualStack',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(InitialStack);
