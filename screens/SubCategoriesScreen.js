//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import envs from '../globalVariable';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import {GlobalStyle} from './globalStyle/globalstyle';
import {styles} from './stylesheets/StylesCategories';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showMessage} from 'react-native-flash-message';
// FetchRequest is functional component to call API globally
import FetchRequest from '../services/fetchRequests/fetchRequests';
import {ScrollView} from 'react-native-gesture-handler';
//import all the basic component we have used

export default class SubCategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 3,
      cols: 2,
      color1: '#fe491a',
      color2: '#333',
      sub_categories: [],
      category: '',
      backSlug: '',
      Grid: true,
      visible: true,
      auth_token: '',
      poppits: {},
      id_of_custom_product: '',
      caricature: {},
      id_of_custom_caricature: '',
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

  SlugStore = async (constraints) => {
    await AsyncStorage.setItem(
      '@SubCategoryConstraints:SubCategoryConstraints',
      constraints,
    );
    this.props.navigation.navigate('ProductsScreen');
  };

  customProductId = () => {
    this.props.navigation.navigate('CustomizedPoppits', {
      id_of_custom_product: this.state.caricature
        ? this.state.id_of_custom_caricature
        : this.state.id_of_custom_product,
      typePoppit: this.state.id_of_custom_product ? true : false,
    });
  };

  componentDidMount = async () => {
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token: auth_token});
    // slug example bags
    let CategorySlug = await AsyncStorage.getItem('@CategorySlug:CategorySlug');
    let callMe = await FetchRequest.apiCall(
      '/categories/' + CategorySlug + '.json',
      'GET',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );
    this.setState({
      sub_categories: callMe.content.sub_categories,
      category: callMe.content.section.slug,
      backSlug: callMe.content.category.slug,
      poppits: callMe.content['customized poppits'],
      caricature: callMe.content['customized caricature'],
      id_of_custom_product: callMe.content['customized poppits']
        ? callMe.content['customized poppits'].id
        : '',
      id_of_custom_caricature: callMe.content['customized caricature']
        ? callMe.content['customized caricature'].id
        : '',
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
    const poppits = this.state.poppits;
    const caricature = this.state.caricature;
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
            <Text style={GlobalStyle.IconText}>Sub Categories</Text>
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
            {/* Sections of Sub Categories */}
            {this.state.Grid ? (
              <View>
                <ScrollView>
                  <View style={styles.titleView}>
                    <Text style={styles.titleText}>Featured Products</Text>
                  </View>
                  <FlatList
                    data={this.state.sub_categories}
                    key={'_'}
                    keyExtractor={(item) => '_' + item.id}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => this.SlugStore(item.slug)}>
                        <View
                          style={[
                            styles.boxContainer,
                            {
                              width: width,
                              height: height,
                            },
                          ]}>
                          <FastImage
                            source={{
                              uri: envs.BASE_URL + item.sub_category_image,
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
                          <TouchableOpacity
                            style={[
                              styles.button,
                              {
                                width: width - 10,
                              },
                            ]}
                            onPress={() => this.SlugStore(item.slug)}>
                            <Text style={styles.btnText}>{item.title}</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  {this.state.poppits ? (
                    <View>
                      <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                          Customized Products
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.boxContainer,
                          {
                            width: width,
                            height: height,
                          },
                        ]}
                        onPress={
                          this.state.auth_token
                            ? this.customProductId
                            : () =>
                                showMessage({
                                  message: 'Warning!',
                                  description: 'Login first to place order ',
                                  type: 'warning',
                                  duration: 3000,
                                })
                        }>
                        <View
                          style={[
                            styles.boxContainer,
                            {
                              width: width,
                              height: height,
                            },
                          ]}>
                          <FastImage
                            source={{
                              uri:
                                envs.BASE_URL +
                                poppits.customized_product_image,
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
                          <TouchableOpacity
                            style={[
                              styles.button,
                              {
                                width: width - 10,
                              },
                            ]}
                            onPress={
                              this.state.auth_token
                                ? this.customProductId
                                : () =>
                                    showMessage({
                                      message: 'Warning!',
                                      description:
                                        'Login first to place order ',
                                      type: 'warning',
                                      duration: 3000,
                                    })
                            }>
                            <Text style={styles.btnText}>{poppits.title}</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View></View>
                  )}
                  {this.state.caricature ? (
                    <View>
                      <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                          Customized Products
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.boxContainer,
                          {
                            width: width,
                            height: height,
                          },
                        ]}
                        onPress={
                          this.state.auth_token
                            ? this.customProductId
                            : () =>
                                showMessage({
                                  message: 'Warning!',
                                  description: 'Login first to place order ',
                                  type: 'warning',
                                  duration: 3000,
                                })
                        }>
                        <View
                          style={[
                            styles.boxContainer,
                            {
                              width: width,
                              height: height,
                            },
                          ]}>
                          <FastImage
                            source={{
                              uri:
                                envs.BASE_URL +
                                caricature.customized_product_image,
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
                          <TouchableOpacity
                            style={[
                              styles.button,
                              {
                                width: width - 10,
                              },
                            ]}
                            onPress={
                              this.state.auth_token
                                ? this.customProductId
                                : () =>
                                    showMessage({
                                      message: 'Warning!',
                                      description:
                                        'Login first to place order ',
                                      type: 'warning',
                                      duration: 3000,
                                    })
                            }>
                            <Text style={styles.btnText}>
                              {caricature.title}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </ScrollView>
              </View>
            ) : (
              <View>
                <ScrollView>
                  <View style={styles.titleView}>
                    <Text style={styles.titleText}>Featured Products</Text>
                  </View>
                  <FlatList
                    data={this.state.sub_categories}
                    key={'#'}
                    keyExtractor={(item) => '#' + item.id}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => this.SlugStore(item.slug)}>
                        <View
                          style={[
                            styles.boxContainer,
                            {
                              width: width,
                              height: height,
                            },
                          ]}>
                          <FastImage
                            source={{
                              uri: envs.BASE_URL + item.sub_category_image,
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
                          <TouchableOpacity
                            style={[
                              styles.button,
                              {
                                width: width - 10,
                              },
                            ]}
                            onPress={() => this.SlugStore(item.slug)}>
                            <Text style={styles.btnText}>{item.title}</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  {this.state.poppits ? (
                    <View>
                      <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                          Customized Products
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.boxContainer,
                          {
                            width: width,
                            height: height,
                          },
                        ]}
                        onPress={
                          this.state.auth_token
                            ? this.customProductId
                            : () =>
                                showMessage({
                                  message: 'Warning!',
                                  description: 'Login first to place order ',
                                  type: 'warning',
                                  duration: 3000,
                                })
                        }>
                        <View
                          style={[
                            styles.boxContainer,
                            {
                              width: width,
                              height: height,
                            },
                          ]}>
                          <FastImage
                            source={{
                              uri:
                                envs.BASE_URL +
                                poppits.customized_product_image,
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
                          <TouchableOpacity
                            style={[
                              styles.button,
                              {
                                width: width - 10,
                              },
                            ]}
                            onPress={
                              this.state.auth_token
                                ? this.customProductId
                                : () =>
                                    showMessage({
                                      message: 'Warning!',
                                      description:
                                        'Login first to place order ',
                                      type: 'warning',
                                      duration: 3000,
                                    })
                            }>
                            <Text style={styles.btnText}>{poppits.title}</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View></View>
                  )}
                  {this.state.caricature ? (
                    <View>
                      <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                          Customized Products
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.boxContainer,
                          {
                            width: width,
                            height: height,
                          },
                        ]}
                        onPress={
                          this.state.auth_token
                            ? this.customProductId
                            : () =>
                                showMessage({
                                  message: 'Warning!',
                                  description: 'Login first to place order ',
                                  type: 'warning',
                                  duration: 3000,
                                })
                        }>
                        <View
                          style={[
                            styles.boxContainer,
                            {
                              width: width,
                              height: height,
                            },
                          ]}>
                          <FastImage
                            source={{
                              uri:
                                envs.BASE_URL +
                                caricature.customized_product_image,
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
                          <TouchableOpacity
                            style={[
                              styles.button,
                              {
                                width: width - 10,
                              },
                            ]}
                            onPress={
                              this.state.auth_token
                                ? this.customProductId
                                : () =>
                                    showMessage({
                                      message: 'Warning!',
                                      description:
                                        'Login first to place order ',
                                      type: 'warning',
                                      duration: 3000,
                                    })
                            }>
                            <Text style={styles.btnText}>
                              {caricature.title}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </ScrollView>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
