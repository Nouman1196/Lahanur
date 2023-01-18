//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
//import all the basic component we have used
import envs from '../globalVariable';
import WishListService from '../services/wishlistRequests/WishlistService';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import {GlobalStyle} from './globalStyle/globalstyle';
import {EventRegister} from 'react-native-event-listeners';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './stylesheets/StylesProduct';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
// FetchRequest is functional component to call API globally
import FetchRequest from '../services/fetchRequests/fetchRequests';

export default class ProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 3,
      cols: 2,
      color1: '#fe491a',
      color2: '#333',
      products: [],
      Grid: true,
      wishListItems: '',
      visible: true,
      auth_token: '',
    };
  }
  handleOnPress1 = () => {
    this.setState({
      clicked1: !this.state.clicked1,
      rows: 3,
      cols: 2,
      color1: '#fe491a',
      color2: '#333',
      Grid: true,
    });
  };

  handleOnPress2 = () => {
    this.setState({
      clicked2: !this.state.clicked2,
      rows: 2,
      cols: 1,
      color1: '#333',
      color2: '#fe491a',
      Grid: false,
    });
  };

  SlugStore = async (Slug) => {
    await AsyncStorage.setItem('@ProductSlug:ProductSlug', Slug);
    this.props.navigation.navigate('ProductDetailsScreen');
  };

  AddToWishList = async (id) => {
    let callMe = await FetchRequest.apiCallPost(
      '/api/v1/products/' + id + '/add_to_wishlist.json',
      'POST',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );
    if (callMe.content.error) {
      showMessage({
        message: 'Error!',
        description: callMe.content.error,
        type: 'danger',
        duration: 3000,
      });
    } else {
      this.setState({
        wishListItems: this.state.wishListItems + ' ' + id,
      });
      let res = await AsyncStorage.setItem(
        '@wishListItems:wishListItems',
        this.state.wishListItems,
      );
      //EventRegister.emit('update-product_wishlist', {id: id, state: "added"});
      showMessage({
        message: 'Success!',
        description: 'Product is Added to WishList',
        type: 'success',
        duration: 3000,
      });
      this.componentDidMount();
    }
  };

  RemoveFromWishList = async (id) => {
    let callMe = await FetchRequest.apiCallPost(
      '/api/v1/products/' + id + '/remove_from_wishlist.json',
      'DELETE',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );
    if (callMe.content.error) {
      showMessage({
        message: 'Error!',
        description: callMe.content.error,
        type: 'danger',
        duration: 3000,
      });
    } else {
      this.setState({
        wishListItems: this.state.wishListItems.replace(id, ''),
      });
      let res = await AsyncStorage.setItem(
        '@wishListItems:wishListItems',
        this.state.wishListItems,
      );
      //EventRegister.emit('update-product_wishlist', {id: id, state: "removed"});
      showMessage({
        message: 'Success!',
        description: 'Product is Removed from WishList',
        type: 'success',
        duration: 3000,
      });
      this.componentDidMount();
    }
  };

  // AddToWishList = async (id) => {
  //   let response = await WishListService.AddToWishList(id);
  //   if (response.error) {
  //     showMessage({
  //       message: 'Error!',
  //       description: response.error,
  //       type: 'danger',
  //       duration: 3000,
  //     });
  //   } else {
  //     this.setState({
  //       wishListItems: this.state.wishListItems + ' ' + id,
  //     });
  //     let res = await AsyncStorage.setItem(
  //       '@wishListItems:wishListItems',
  //       this.state.wishListItems,
  //     );
  //     //EventRegister.emit('update-product_wishlist', {id: id, state: "added"});
  //     showMessage({
  //       message: 'Success!',
  //       description: 'Product is Added to WishList',
  //       type: 'success',
  //       duration: 3000,
  //     });
  //     this.componentDidMount();
  //   }
  // };

  // RemoveFromWishList = async (id) => {
  //   let response = await WishListService.RemoveFromWishList(id);
  //   if (response.error) {
  //     showMessage({
  //       message: 'Error!',
  //       description: response.error,
  //       type: 'danger',
  //       duration: 3000,
  //     });
  //   } else {
  //     this.setState({
  //       wishListItems: this.state.wishListItems.replace(id, ''),
  //     });
  //     let res = await AsyncStorage.setItem(
  //       '@wishListItems:wishListItems',
  //       this.state.wishListItems,
  //     );
  //     //EventRegister.emit('update-product_wishlist', {id: id, state: "removed"});
  //     showMessage({
  //       message: 'Success!',
  //       description: 'Product is Removed from WishList',
  //       type: 'success',
  //       duration: 3000,
  //     });
  //     this.componentDidMount();
  //   }
  // };

  WishList = async (id) => {
    let searched = this.state.wishListItems.search(id);
    if (searched == -1) {
      this.AddToWishList(id);
    } else {
      this.RemoveFromWishList(id);
    }
  };

  iconName = (id) => {
    if (this.state.wishListItems) {
      let Items = this.state.wishListItems.search(id);
      if (Items == -1) {
        return 'heart-o';
      } else {
        return 'heart';
      }
    } else {
      return 'heart-o';
    }
  };

  iconColor = (id) => {
    if (this.state.wishListItems) {
      let Items = this.state.wishListItems.search(id);
      if (Items == -1) {
        return 'black';
      } else {
        return 'red';
      }
    } else {
      return 'black';
    }
  };

  componentDidMount = async () => {
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token: auth_token});
    // await AsyncStorage.removeItem('@wishListItems:wishListItems', this.state.wishListItems);
    let SubCategoryConstraints = await AsyncStorage.getItem(
      '@SubCategoryConstraints:SubCategoryConstraints',
    );
    let wishListItems = await AsyncStorage.getItem(
      '@wishListItems:wishListItems',
    );
    if (wishListItems) {
      this.setState({
        wishListItems: wishListItems,
      });
    } else {
      this.setState({
        wishListItems: '',
      });
    }
    this.listener = EventRegister.addEventListener(
      'update-product_wishlist',
      (data) => {
        switch (data.state) {
          case 'added':
            this.setState({
              wishListItems: this.state.wishListItems + ' ' + data.id,
            });
          case 'removed':
            this.setState({
              wishListItems: this.state.wishListItems.replace(data.id, ''),
            });
        }
        console.log(`product id: ${data.id} -> state: ${data.state}`);
      },
    );
    let callMe = await FetchRequest.apiCall(
      '/search/scg_' + SubCategoryConstraints + '.json',
      'GET',
      '',
    );
    this.setState({
      products: callMe.content.products,
      visible: false,
    });
  };

  render() {
    const {color1, color2} = this.state;
    const width =
      Dimensions.get('window').width / this.state.cols -
      4 * (this.state.cols + 1);
    const height =
      Dimensions.get('window').height / this.state.rows -
      4 * (this.state.rows + 1);
    return (
      <View style={GlobalStyle.container}>
        <StatusBar backgroundColor="#333" barStyle="light-content" />
        <View style={GlobalStyle.icons}>
          <View style={GlobalStyle.iconsLeft}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Feather
                name="arrow-left"
                size={25}
                color="black"
                style={GlobalStyle.arrow}
              />
            </TouchableOpacity>
            <Text style={GlobalStyle.IconText}>Products</Text>
          </View>
          <View style={GlobalStyle.FiltersView}>
            <View style={GlobalStyle.iconsRight}>
              {this.state.auth_token ? (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('WishListScreen')
                  }>
                  <Feather
                    style={[styles.gridIcon, {marginRight: 5}]}
                    name="heart"
                    size={20}
                    color={'#333'}
                  />
                </TouchableOpacity>
              ) : (
                <View></View>
              )}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('AddToCartScreen')
                }>
                <Feather
                  name="shopping-cart"
                  size={20}
                  color="black"
                  style={[GlobalStyle.arrow, {marginRight: 5}]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleOnPress1}>
                <Feather
                  style={styles.gridIcon}
                  name="grid"
                  size={20}
                  color={color1}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleOnPress2}>
                <Icon
                  name="th-list"
                  size={20}
                  type="font-awesome"
                  style={{marginLeft: 5}}
                  color={color2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Products Section */}
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
          <View style={{flex: 1}}>
            {this.state.products ? (
              <View style={{flex: 1}}>
                {this.state.Grid ? (
                  <FlatList
                    data={this.state.products}
                    key={'_'}
                    keyExtractor={(item) => '_' + item.id}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({item}) => (
                      <View style={styles.prodbox}>
                        <View
                          style={[
                            styles.boxContainer,
                            {
                              width: width,
                              height: height,
                            },
                          ]}>
                          {item.in_stock == true ? (
                            <TouchableOpacity
                              onPress={() => this.SlugStore(item.slug)}>
                              <FastImage
                                source={{
                                  uri: envs.BASE_URL + item.product_image,
                                }}
                                style={[
                                  styles.ImageMain,
                                  {
                                    width: width - 10,
                                    height: height - 10,
                                  },
                                ]}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity>
                              <FastImage
                                source={{
                                  uri: envs.BASE_URL + item.product_image,
                                }}
                                style={[
                                  styles.ImageMain,
                                  {
                                    width: width - 10,
                                    height: height - 10,
                                  },
                                ]}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                              <View style={styles.buttonOver}>
                                <Text style={styles.btnText}>Out of Stock</Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          <View style={styles.iconsPost}>
                            <View style={styles.iconsLeftProduct}>
                              <Text style={styles.price}>
                                Price: {item.price} PKR
                              </Text>
                              <Text
                                numberOfLines={1}
                                style={styles.IconTextProduct}>
                                {item.name}
                              </Text>
                            </View>
                            {item.in_stock == true ? (
                              <View style={styles.iconsRightHeart}>
                                {this.state.auth_token ? (
                                  <View style={styles.twoIcons}>
                                    <View style={styles.twoIconsChildView1}>
                                      <TouchableOpacity
                                        onPress={() => this.WishList(item.id)}>
                                        <Icon
                                          name={this.iconName(item.id)}
                                          color={this.iconColor(item.id)}
                                          type="font-awesome"
                                          size={22}></Icon>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                ) : (
                                  <View></View>
                                )}
                              </View>
                            ) : (
                              <View />
                            )}
                          </View>
                        </View>
                      </View>
                    )}
                  />
                ) : (
                  <FlatList
                    data={this.state.products}
                    key={'#'}
                    keyExtractor={(item) => '#' + item.id}
                    renderItem={({item}) => (
                      <View style={styles.prodbox}>
                        <View
                          style={[
                            styles.boxContainer,
                            {
                              width: width,
                              height: height,
                            },
                          ]}>
                          {item.in_stock == true ? (
                            <TouchableOpacity
                              onPress={() => this.SlugStore(item.slug)}>
                              <FastImage
                                source={{
                                  uri: envs.BASE_URL + item.product_image,
                                }}
                                style={[
                                  styles.ImageMain,
                                  {
                                    width: width - 10,
                                    height: height - 10,
                                  },
                                ]}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity>
                              <FastImage
                                source={{
                                  uri: envs.BASE_URL + item.product_image,
                                }}
                                style={[
                                  styles.ImageMain,
                                  {
                                    width: width - 10,
                                    height: height - 10,
                                  },
                                ]}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                              <View style={styles.buttonOver}>
                                <Text style={styles.btnText}>Out of Stock</Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          <View style={styles.iconsPost}>
                            <View style={styles.iconsLeftProduct}>
                              <Text style={styles.price}>
                                Price: {item.price} PKR
                              </Text>
                              <Text
                                numberOfLines={1}
                                style={styles.IconTextProduct}>
                                {item.name}
                              </Text>
                            </View>
                            {item.in_stock == true ? (
                              <View style={styles.iconsRightHeart}>
                                {this.state.auth_token ? (
                                  <View style={styles.twoIcons}>
                                    <View style={styles.twoIconsChildView1}>
                                      <TouchableOpacity
                                        onPress={() => this.WishList(item.id)}>
                                        <Icon
                                          name={this.iconName(item.id)}
                                          color={this.iconColor(item.id)}
                                          type="font-awesome"
                                          size={22}></Icon>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                ) : (
                                  <View></View>
                                )}
                              </View>
                            ) : (
                              <View />
                            )}
                          </View>
                        </View>
                      </View>
                    )}
                  />
                )}
              </View>
            ) : (
              <View
                style={{flex: 1, justifyContent: 'center', marginBottom: 150}}>
                <FastImage
                  source={require('.././assets/no-product.jpg')}
                  style={[
                    styles.ImageMain,
                    {
                      width: width - 10,
                      height: height - 10,
                    },
                  ]}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View
                  style={[
                    styles.button,
                    {
                      width: width - 10,
                    },
                  ]}>
                  <Text style={styles.btnText}>Empty</Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
