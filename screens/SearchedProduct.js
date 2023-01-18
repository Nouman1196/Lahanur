//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GlobalStyle} from './globalStyle/globalstyle';
import * as Animatable from 'react-native-animatable';
import envs from '../globalVariable';
import {styles} from './stylesheets/StylesProduct';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FetchRequest from '../services/fetchRequests/fetchRequests';
//import all the basic component we have used

export default class SearchedProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 3,
      cols: 2,
      Grid: true,
      wishListItems: '',
      color1: '#fe491a',
      color2: '#333',
      products: [],
      search: this.props.navigation.state.params
        ? this.props.navigation.state.params.search_here
        : ' ',
      visible: true,
    };
  }
  handleOnPress1 = () => {
    this.setState({
      rows: 3,
      cols: 2,
      color1: '#fe491a',
      color2: '#333',
      Grid: true,
    });
  };

  handleOnPress2 = () => {
    this.setState({
      rows: 2,
      cols: 1,
      color1: '#333',
      color2: '#fe491a',
      Grid: false,
    });
  };

  componentDidMount = async () => {
    let callMe = await FetchRequest.apiCall(
      'search.json?q=' + this.state.search,
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
            <Text style={GlobalStyle.IconText}>
              Search Result of "{this.state.search}"{' '}
            </Text>
          </View>
          <View style={GlobalStyle.FiltersView}>
            <View style={GlobalStyle.iconsRight}>
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
                            <View>
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
                            </View>
                          ) : (
                            <View>
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
                            </View>
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
                            <View>
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
                            </View>
                          ) : (
                            <View>
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
                            </View>
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
