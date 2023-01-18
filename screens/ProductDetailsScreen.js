//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
//import all the basic component we have used
import envs from '../globalVariable';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import ImageView from 'react-native-image-view';
import {GlobalStyle} from './globalStyle/globalstyle';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {EventRegister} from 'react-native-event-listeners';
import {styles} from './stylesheets/StylesProductDetails';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-material-dropdown';
// FetchRequest is functional component to call API globally
import FetchRequest from '../services/fetchRequests/fetchRequests';

export default class ProductDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 3,
      cols: 2,
      rows1: 2,
      cols1: 1,
      favorite1: false,
      favorite2: false,
      favorite3: false,
      favorite4: false,
      selectedColor: '',
      SelectedColorId: '',
      SelectedSizeId: '',
      ValidInStock: true,
      color: [],
      selectedSize: '',
      size: [],
      product: {},
      isImageViewVisible: false,
      images: [],
      firstImage: '',
      auth_token: '',
      ProductSlugHere: '',
      backConstraints: '',
      relevant_products: [],
      description: this.props.navigation.state.params
        ? this.props.navigation.state.params.description
        : 'Missing Description',
      wishListItems: '',
      visible: true,
    };
  }

  SlugStore = async (Slug) => {
    await AsyncStorage.setItem('@ProductSlug:ProductSlug', Slug);
    this.props.navigation.push('ProductDetailsScreen');
    // screen.location.href = 'ProductDetailsScreen';
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
      EventRegister.emit('update-product_wishlist', {id: id, state: 'added'});
      showMessage({
        message: 'Success!',
        description: 'Item added in your wishlist',
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
      EventRegister.emit('update-product_wishlist', {id: id, state: 'removed'});
      showMessage({
        message: 'Success!',
        description: 'Item has been removed!',
        type: 'success',
        duration: 3000,
      });
      this.componentDidMount();
    }
  };

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
    // await AsyncStorage.removeItem('@wishListItems:wishListItems', this.state.wishListItems);
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token: auth_token});
    let ProductSlug = await AsyncStorage.getItem('@ProductSlug:ProductSlug');
    this.setState({ProductSlugHere: ProductSlug});
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
      },
    );
    let callMe = await FetchRequest.apiCall(
      '/products/' + ProductSlug + '.json',
      'GET',
      '',
    );

    this.setState({
      product: callMe.content.product,
      firstImage: callMe.content.product.images[0].product_image,
      backConstraints: callMe.content.product.constraints,
      relevant_products: callMe.content.product.related_products,
    });
    var images = [];
    callMe.content.product.images.map((ps) => {
      let image = {
        source: {
          uri: envs.BASE_URL + ps.product_image,
        },
      };
      images.push(image);
    });
    this.setState({images: images});
    this.setColor();
    this.setSize();
    this.setValidStock();
    this.setState({visible: false});
  };

  setColor = () => {
    if (this.state.product) {
      this.state.product.product_colors.map((product) => {
        this.state.color.push({value: product.name, id: product.id});
      });
    }
  };

  setSize = () => {
    this.state.product.product_sizes.map((product) => {
      this.state.size.push({
        value: product.name,
        id: product.id,
        stockVal: product.stock,
      });
    });
  };

  setValidStock = () => {
    this.state.product.product_sizes.map((product) => {
      if (product.stock > 0) {
        this.setState({
          ValidInStock: true,
        });
      } else {
        this.setState({
          ValidInStock: false,
        });
      }
    });
  };

  sizeId = async (data) => {
    await this.state.size.map((product) => {
      if (product.value == data) {
        this.setState({
          SelectedSizeId: product.id,
        });
        if (product.stockVal > 0) {
          this.setState({
            ValidInStock: true,
          });
        } else {
          this.setState({
            ValidInStock: false,
          });
        }
      }
    });
    this.setState({SelectedSize: data});
    // this.state.product.product_sizes.filter((size) => size.name == data)
  };

  colorId = async (data) => {
    await this.state.color.map((product) => {
      if (product.value == data) {
        this.setState({SelectedColorId: product.id});
      }
    });
    this.setState({selectedColor: data});
  };

  AddToCart = async () => {
    if (!this.state.selectedColor) {
      Alert.alert('Please select Color of Product');
    } else if (!this.state.SelectedSize) {
      Alert.alert('Please select Size of Product');
    } else if (!this.state.ValidInStock) {
      showMessage({
        message: 'Sorry!',
        description:
          "This product size is not available. You can't add it to your cart. Please try another size if avaible.",
        type: 'danger',
        duration: 5000,
      });
    } else {
      let callMe = await FetchRequest.apiCall(
        '/api/v1/orders/add_to_cart.json?product_id=' +
          this.state.ProductSlugHere +
          '&product_color_id=' +
          this.state.SelectedColorId +
          '&pcs_id=' +
          this.state.SelectedSizeId,
        'GET',
        '',
      );
      if (callMe.content.error) {
        showMessage({
          message: 'Error!',
          description: callMe.content.error,
          type: 'danger',
          duration: 3000,
        });
      } else {
        this.props.navigation.navigate('AddToCartScreen', {
          color: this.state.selectedColor,
          size: this.state.SelectedSize,
          sizeID: this.state.SelectedSizeId,
          colorID: this.state.SelectedColorId,
        });
      }
    }
  };

  render() {
    const width1 =
      Dimensions.get('window').width / this.state.cols1 -
      4 * (this.state.cols1 + 1);
    const height1 =
      Dimensions.get('window').height / this.state.rows1 -
      4 * (this.state.rows1 + 1);
    const width =
      Dimensions.get('window').width / this.state.cols -
      4 * (this.state.cols + 1);
    const height =
      Dimensions.get('window').height / this.state.rows -
      4 * (this.state.rows + 1);
    return (
      <View style={styles.container}>
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
            <Text style={[GlobalStyle.IconText, {fontSize: 10}]}>
              {this.state.product.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
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
              onPress={() => this.props.navigation.navigate('AddToCartScreen')}>
              <Feather
                name="shopping-cart"
                size={20}
                color="black"
                style={[GlobalStyle.arrow, {marginRight: 5}]}
              />
            </TouchableOpacity>
          </View>
        </View>
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
          <ScrollView>
            <View>
              <TouchableOpacity
                onPress={() => this.setState({isImageViewVisible: true})}>
                <View
                  style={[
                    styles.boxContainer,
                    {
                      width: width1,
                      height: height1,
                    },
                  ]}>
                  <View
                    style={[
                      styles.ImageMain,
                      {
                        width: width1,
                        height: height1,
                      },
                    ]}>
                    <FastImage
                      source={{
                        uri: envs.BASE_URL + this.state.product.product_image,
                      }}
                      style={[
                        styles.ImageMain,
                        {
                          width: width1,
                          height: height1,
                        },
                      ]}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <ImageView
                      images={this.state.images}
                      imageIndex={0}
                      resizeMode={'contain'}
                      animationType={'fade'}
                      isVisible={this.state.isImageViewVisible}
                      onClose={() =>
                        this.setState({
                          isImageViewVisible: false,
                        })
                      }
                    />
                    {this.state.ValidInStock ? (
                      <View></View>
                    ) : (
                      <View style={styles.buttonOver1}>
                        <Text style={styles.btnText}>Out of Stock</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.iconsPost}>
                <View style={styles.iconsLeftProduct}>
                  <Text style={styles.price}>
                    Price: {this.state.product.price}
                  </Text>
                  <Text style={styles.TextProductMain}>
                    Name: {this.state.product.name}
                  </Text>
                </View>
                <View style={styles.iconsRight}>
                  {this.state.auth_token && this.state.ValidInStock ? (
                    <TouchableOpacity
                      onPress={() => this.WishList(this.state.product.id)}>
                      <Icon
                        name={this.iconName(this.state.product.id)}
                        color={this.iconColor(this.state.product.id)}
                        type="font-awesome"
                        size={22}></Icon>
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
              <View style={styles.dropdownView}>
                <Dropdown
                  labelFontSize={12}
                  baseColor={'#333'}
                  itemTextStyle={{
                    fontFamily: 'Muli-SemiBold',
                    fontSize: 11,
                    color: '#333',
                  }}
                  itemColor={'#333'}
                  label="Select Color"
                  data={this.state.color}
                  onChangeText={(data) => this.colorId(data)}
                />
                <Dropdown
                  labelFontSize={12}
                  baseColor={'#333'}
                  itemTextStyle={{
                    fontFamily: 'Muli-SemiBold',
                    fontSize: 11,
                    color: '#333',
                  }}
                  itemColor={'#333'}
                  label="Select Size"
                  data={this.state.size}
                  onChangeText={(data) => this.sizeId(data)}
                />
              </View>
              <View style={styles.ButtonsView}>
                <TouchableOpacity
                  style={styles.btnBuyNow}
                  onPress={this.AddToCart}>
                  <Text style={styles.btnText2}>
                    <Feather
                      name="shopping-cart"
                      size={18}
                      color="#fff"
                      style={[GlobalStyle.arrow, {marginRight: 5}]}
                    />{' '}
                    ADD TO CART
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.productDetail}>
                <Text style={styles.txtProductDetails}>Product Details</Text>
                <Text style={styles.txtProduct}>Product Description: </Text>
                <Text style={styles.txtProduct1}>
                  {this.state.product.description}
                </Text>
                <View style={styles.txtView}>
                  <Text style={styles.txtProduct}>Tags: </Text>
                  <Text style={styles.txtProduct1}>
                    {' '}
                    {this.state.product.product_tags
                      ? this.state.product.product_tags[0].name
                      : 'Missing Tags'}{' '}
                  </Text>
                </View>
              </View>
              <View style={styles.releventPro}>
                <View style={styles.titleView}>
                  <Text style={styles.titleText}>You May Also Like</Text>
                </View>
                <FlatList
                  data={this.state.relevant_products}
                  key={'_'}
                  keyExtractor={(item) => '_' + item.id}
                  horizontal={true}
                  renderItem={({item}) => (
                    <View
                      style={[
                        styles.boxContainer,
                        {
                          width: width,
                          height: height,
                        },
                      ]}>
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
                      <View style={styles.singleProduct}>
                        <View style={styles.iconsLeftProduct}>
                          <Text style={styles.smPrice}>
                            Price: {item.price}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.IconTextProduct}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={styles.iconsRightHeart}>
                          <View style={styles.twoIcons}>
                            <View style={styles.twoIconsChildView1}>
                              {this.state.auth_token ? (
                                <TouchableOpacity
                                  onPress={() => this.WishList(item.id)}>
                                  <Icon
                                    name={this.iconName(item.id)}
                                    color={this.iconColor(item.id)}
                                    type="font-awesome"
                                    size={20}></Icon>
                                </TouchableOpacity>
                              ) : (
                                <View></View>
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
