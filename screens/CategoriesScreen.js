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
// FetchRequest is functional component to call API globally
import FetchRequest from '../services/fetchRequests/fetchRequests';
//import all the basic component we have used

export default class CategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 3,
      cols: 2,
      color1: '#fe491a',
      color2: '#333',
      categories: [],
      columnWrapperStyle: '',
      auth_token:'',
      horizontal: '',
      numColumns: 0,
      Grid: true,
      visible: true,
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
      Grid: false,
      clicked2: !this.state.clicked2,
      rows: 2,
      cols: 1,
      color1: '#333',
      color2: '#fe491a',
    });
  };

  SlugStore = async (Slug) => {
    await AsyncStorage.setItem('@CategorySlug:CategorySlug', Slug);
    this.props.navigation.navigate('SubCategoriesScreen');
  };

  componentDidMount = async () => {
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token: auth_token});
    let SectionSlug = await AsyncStorage.getItem('@SectionSlug:SectionSlug');
    // slug example 'fashion'
    let callMe = await FetchRequest.apiCall(
      '/sections/' + SectionSlug + '.json',
      'GET',
      '',
    );
    this.setState({categories: callMe.content.categories, visible: false});
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
            <Text style={GlobalStyle.IconText}>Categories</Text>
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
            {this.state.Grid ? (
              <FlatList
                data={this.state.categories}
                key={'_'}
                keyExtractor={(item) => '_' + item.id}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                horizontal={false}
                numColumns={2}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => this.SlugStore(item.slug)}>
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
                          uri: envs.BASE_URL + item.category_image,
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
            ) : (
              <FlatList
                data={this.state.categories}
                key={'#'}
                keyExtractor={(item) => '#' + item.id}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => this.SlugStore(item.slug)}>
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
                          uri: envs.BASE_URL + item.category_image,
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
            )}
          </View>
        )}
      </View>
    );
  }
}
