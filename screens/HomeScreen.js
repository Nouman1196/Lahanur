import React, {Fragment, Component} from 'react';
import {useTheme} from '@react-navigation/native';
//This is an example code for Bottom Navigation//
//import react in our code.
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import envs from '../globalVariable';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import AwesomeAlert from 'react-native-awesome-alerts';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar, Text, Searchbar} from 'react-native-paper';
import {styles} from './stylesheets/StylesHome';
import Slideshow from 'react-native-image-slider-show';
import Overlay from 'react-native-modal-overlay';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {GlobalStyle} from './globalStyle/globalstyle';
// FetchRequest is functional component to call API globally
import FetchRequest from '../services/fetchRequests/fetchRequests';
//import all the basic component we have used

export default class HomeScreen extends Component {
  //Home Screen to show in Home Option
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      images: [],
      promo_slides: [],
      position: 1,
      interval: null,
      sections: [],
      auth_token: '',
      SectionSlug: '',
      search: '',
      modalVisible: false,
      name: '',
      email: '',
      image: '',
      phone_number: '',
      showAlert: false,
      visible: true,
      categories: {},
      rows: 3,
      cols: 2,
      SectionSlug: [],
    };
  }

  componentDidMount = async () => {
    // applied interval on slide show to change images
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.images.length
              ? 0
              : this.state.position + 1,
        });
      }, 3000),
    });
    // // clear intervals
    clearInterval(this.state.interval);
    // getting auth_token which is set during SignIn
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token: auth_token});
    let SectionSlug = await AsyncStorage.getItem('@SectionSlug:SectionSlug');
    // integration of API for promo slides and sections
    let callMe = await FetchRequest.apiCall('/visitors.json', 'GET', '');
    this.setState({
      sections: callMe.content.sections,
      promo_slides: callMe.content.promo_slides,
      SectionSlug: callMe.content.sections.slug,
    });
    var images = [];
    callMe.content.promo_slides.map((ps) => {
      var image = {
        url: envs.BASE_URL + ps.promo_image,
        title: ps.title,
        caption: ps.description,
      };
      images.push(image);
    });
    this.profile();
    this.setState({images: images, categories: this.setCategories()});
    setTimeout(() => {
      this.setState({timePassed: true, visible: false});
    }, 2000);
  };

  setCategories = () => {
    let allCategories = {};
    // slug example 'fashion'
    this.state.sections.map((section) => {
      let callMe = FetchRequest.apiCall(
        '/sections/' + section.slug + '.json',
        'GET',
        '',
      ).then((data) => {
        allCategories[section.slug] = data.content.categories;
      });
    });
    return allCategories;
  };

  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  // OnPress Close New Address Overlay this Function will call

  onClose = () => {
    this.setState({modalVisible: false});
  };

  // OnPress toggle Overlay of New Address

  toggleOverlay(visible) {
    this.setState({modalVisible: visible});
  }

  profile = async () => {
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
    this.setState({
      name: callMe.content.name,
      email: callMe.content.email,
      phone_number: callMe.content.phone_number,
      image: callMe.content.user_image,
    });
  };

  myprofile = () => {
    this.hideMenu();
    this.props.navigation.navigate('ProfileScreen');
  };

  // subscribeNewsLetter = () => {
  //   this.hideMenu();
  //   this.setState({modalVisible: true});
  // };

  showCart = () => {
    this.hideMenu();
    this.props.navigation.navigate('AddToCartScreen');
  };
  WishList = () => {
    this.hideMenu();
    this.props.navigation.navigate('WishListScreen');
  };

  logoutMenu = () => {
    this.hideMenu();
    this.LogOutUser();
  };

  Subscribe = async () => {
    // News Letter Subscription API
    if (!this.state.subscribe) {
      Alert.alert('Please Enter Your Email');
    } else {
      let bodyData = JSON.stringify({
        newsletter: {
          email: this.state.subscribe,
        },
      });
      let callMe = await FetchRequest.apiCallPost(
        '/newsletters.json',
        'POST',
        bodyData,
        (headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.state.auth_token,
        }),
      );
      if (callMe.content.message) {
        Alert.alert(callMe.content.message);
        this.toggleOverlay(!this.state.modalVisible);
      } else {
        Alert.alert(callMe.content.error);
      }
    }
  };

  Unsubscribe = async () => {
    // News Letter UnSubscription API
    let callMe = await FetchRequest.apiCall(
      '/newsletters/newsletter_unsubscribe.json?email=' + this.state.subscribe,
      'GET',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );
    if (callMe.content.notice) {
      Alert.alert(callMe.content.notice);
    } else {
      Alert.alert(callMe.content.alert);
    }
  };

  LogOutUser = async () => {
    let callMe = await FetchRequest.apiCallPost(
      '/api/v1/sessions/log_out.json',
      'POST',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );
    this.showAlert();
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  logOut = async () => {
    let auth_token = await AsyncStorage.removeItem('@lahanur_auth:token');
    this.setState({auth_token});
    this.props.navigation.navigate('SignInScreen');
    this.hideAlert();
  };

  SlugStore = async (Slug) => {
    await AsyncStorage.setItem('@CategorySlug:CategorySlug', Slug);
    this.props.navigation.navigate('SubCategoriesScreen');
  };

  logFunc = () => {
    if (this.state.auth_token) {
      return (
        <View style={styles.CartLogin}>
          <View style={styles.CartIcon}>
            <TouchableOpacity activeOpacity={0.7} onPress={this.showMenu}>
              <View style={styles.CartIcon}>
                <Avatar.Image
                  size={35}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: 63,
                    borderWidth: 2,
                    borderColor: '#fe491a',
                    alignSelf: 'center',
                  }}
                  source={
                    this.state.image
                      ? {
                          uri: envs.BASE_URL + this.state.image,
                        }
                      : require('.././assets/user.png')
                  }
                  activeOpacity={0.7}
                />
                <Menu
                  style={styles.menu}
                  ref={this.setMenuRef}
                  button={
                    <Feather
                      name="chevron-down"
                      style={[
                        styles.loginText,
                        {fontSize: 18, marginRight: -5, marginTop: 2},
                      ]}
                    />
                  }>
                  <MenuItem
                    textStyle={[
                      GlobalStyle.craftText,
                      {color: '#fe491a', fontSize: 14},
                    ]}
                    onPress={this.myprofile}>
                    <Feather name="user" size={14} color="#fe491a" />{' '}
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#fe491a',
                        fontFamily: 'lexio',
                      }}>
                      {this.state.name ? this.state.name : 'Profile'}
                    </Text>
                  </MenuItem>
                  <MenuDivider color={'#fe491a'} />
                  {/* <MenuDivider color={'#333'} /> */}
                  {/* <MenuItem
                    onPress={this.subscribeNewsLetter}
                    textStyle={{color: '#333', fontFamily: 'Muli-SemiBold'}}>
                    <Feather name="bell" size={14} color="#333" /> Subscribe
                  </MenuItem> */}
                  <MenuDivider color={'#333'} />
                  <MenuItem
                    onPress={this.WishList}
                    textStyle={{color: '#333', fontFamily: 'Muli-SemiBold'}}>
                    <Feather name="heart" size={14} color="#333" /> Show
                    WishList
                  </MenuItem>
                  <MenuDivider color={'#333'} />
                  <MenuItem
                    onPress={this.showCart}
                    textStyle={{color: '#333', fontFamily: 'Muli-SemiBold'}}>
                    <Feather name="shopping-cart" size={14} color="#333" /> Show
                    Cart
                  </MenuItem>
                  <MenuDivider color={'#fe491a'} />
                  <MenuItem
                    onPress={this.logoutMenu}
                    textStyle={{color: '#fe491a', fontFamily: 'Muli-SemiBold'}}>
                    <Feather name="log-out" size={14} color="#fe491a" /> LogOut
                  </MenuItem>
                </Menu>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.loginIcon}
          onPress={() => this.props.navigation.navigate('SignInScreen')}>
          <Feather
            name="log-in"
            style={styles.gridIcon}
            color={'#fff'}
            size={16}
          />
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
    const width =
      Dimensions.get('window').width / this.state.cols -
      4 * (this.state.cols + 1);
    const height =
      Dimensions.get('window').height / this.state.rows -
      4 * (this.state.rows + 1);
    return (
      <View style={GlobalStyle.container}>
        <StatusBar backgroundColor="#333" barStyle="light-content" />
        <View style={GlobalStyle.HeadView}>
          <TouchableOpacity
            style={GlobalStyle.drawerIconTop}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <Feather name="menu" size={25} color="white" />
          </TouchableOpacity>
          <Text style={[GlobalStyle.header, {marginLeft: 20}]}>Lahanur</Text>
          {this.logFunc()}
        </View>
        <ScrollView>
          {/* Search bar component in home Screen to search products form application */}
          <Searchbar
            returnKeyType="search"
            searchIcon={(styles.search, {size: 20, color: '#fe491a'})}
            placeholder="Search Here..."
            borderBottomWidth={0}
            fontSize={14}
            fontFamily={'Muli-SemiBold'}
            style={{height: 40}}
            onChangeText={(search) => this.setState({search})}
            value={this.state.search}
            onSubmitEditing={() =>
              this.props.navigation.navigate('SearchedProduct', {
                search_here: this.state.search,
              })
            }
          />
          {/* View of OverLay to add new Address in CheckOut procedure */}
          {/* <Overlay
            visible={this.state.modalVisible}
            onClose={this.onClose}
            animationType="zoomIn"
            containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
            childrenWrapperStyle={{
              backgroundColor: '#fff',
              borderRadius: 20,
              borderWidth: 0,
            }}
            animationDuration={500}>
            {(hideModal) => (
              <Fragment>
                <View style={{width: '100%'}}>
                  <View style={styles.HeadView1}>
                    <Text style={styles.HeadText1}>
                      NEWSLETTER SUBSCRIPTION
                    </Text>
                  </View>
                  <Text style={styles.joinText}>Join Our News Letter</Text>
                  <TextInput
                    style={styles.inputModal}
                    placeholder="Enter Email..."
                    value={this.state.subscribe}
                    onChangeText={(subscribe) => this.setState({subscribe})}
                  />
                  <View style={styles.btnView}>
                    <TouchableOpacity
                      style={styles.subsBtn}
                      onPress={() => this.Subscribe()}>
                      <Text style={styles.rememberText1}>Subscribe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.subsBtn}
                      onPress={() => this.Unsubscribe()}>
                      <Text style={styles.rememberText1}>Unsubscribe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.subsBtn, {backgroundColor: '#fe491a'}]}
                      onPress={hideModal}>
                      <Text style={styles.rememberText1}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Fragment>
            )}
          </Overlay> */}
          <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            title="Lahanur"
            titleStyle={{
              fontFamily: 'Coyote-SemiBoldDEMO',
              color: '#fe491a',
              fontSize: 24,
            }}
            contentContainerStyle={{width: '80%'}}
            message="Do you really want to log out?"
            messageStyle={{
              fontFamily: 'Muli-SemiBold',
              fontSize: 16,
              color: '#333',
            }}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Cancel"
            confirmText="Log Out"
            confirmButtonColor="#fe491a"
            cancelButtonTextStyle={{fontFamily: 'Muli-SemiBold', fontSize: 14}}
            confirmButtonTextStyle={{fontFamily: 'Muli-SemiBold', fontSize: 14}}
            cancelButtonColor="#333"
            onCancelPressed={() => {
              this.hideAlert();
              console.log('Cancel Pressed');
            }}
            onConfirmPressed={() => {
              this.logOut();
            }}
          />
          {this.state.visible ? (
            <Modal
              transparent
              animationType={'slide'}
              onRequestClose={() => {
                console.log('Noop');
              }}>
              <View style={GlobalStyle.modalBackground}>
                <View style={GlobalStyle.activityIndicatorHolder}>
                  <Animatable.Image
                    animation="bounceIn"
                    duraton="2500"
                    source={require('../assets/logo.png')}
                    style={{height: 100, width: 100}}
                    resizeMode="cover"
                  />
                  <ActivityIndicator size="large" color="#fe491a" />
                  <Text style={GlobalStyle.texthead}>Loading...</Text>
                </View>
              </View>
            </Modal>
          ) : (
            <View>
              <Slideshow
                dataSource={this.state.images}
                dotColor="#333333"
                arrowLeft
                arrowRight
                inactiveDotColor="#fff"
                paginationBoxVerticalPadding={10}
                position={this.state.position}
                onPositionChanged={(position) => this.setState({position})}
                captionStyle={styles.sliderText}
                titleStyle={styles.sliderHeading}
              />
              <View style={styles.CategoriesView}>
                {this.state.sections.map((section) => {
                  return (
                    <View style={{flex: 1}}>
                      <View style={styles.titleView}>
                        <Text style={styles.titleText}>{section.title}</Text>
                      </View>
                      <Animatable.View
                        style={{flex: 1}}
                        animation="fadeInLeft"
                        duration={800}>
                        <ScrollView horizontal={true}>
                          {Object.entries(this.state.categories).map(
                            ([key, sectionCategories]) =>
                              key == section.slug ? (
                                sectionCategories.map((category) => (
                                  <TouchableOpacity
                                    onPress={() =>
                                      this.SlugStore(category.slug)
                                    }>
                                    <View
                                      style={[
                                        styles.boxContainer,
                                        {
                                          width: width + 20,
                                          height: height - 30,
                                        },
                                      ]}>
                                      <FastImage
                                        source={{
                                          uri:
                                            envs.BASE_URL +
                                            category.category_image,
                                        }}
                                        style={[
                                          styles.ImageMain,
                                          {
                                            width: width + 20,
                                            height: height - 30,
                                          },
                                        ]}
                                        resizeMode={FastImage.resizeMode.cover}
                                      />
                                      <TouchableOpacity
                                        style={[
                                          styles.buttonCard,
                                          {
                                            width: width + 20,
                                          },
                                        ]}
                                        onPress={() =>
                                          this.SlugStore(category.slug)
                                        }>
                                        <Text style={styles.btnText}>
                                          {category.title}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </TouchableOpacity>
                                ))
                              ) : (
                                <View></View>
                              ),
                          )}
                        </ScrollView>
                      </Animatable.View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
