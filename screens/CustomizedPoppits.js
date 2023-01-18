//This is an example code for Bottom Navigation//
import React, {Fragment, Component} from 'react';
//import react in our code.
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Modal,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import envs from '../globalVariable';
import ImagePicker from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import Overlay from 'react-native-modal-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import Slideshow from 'react-native-image-slider-show';
import * as Animatable from 'react-native-animatable';
import {GlobalStyle} from './globalStyle/globalstyle';
import Feather from 'react-native-vector-icons/Feather';
import {Text, Searchbar} from 'react-native-paper';
import {styles} from './stylesheets/StylesCustomPoppits';
import Icon from 'react-native-vector-icons/FontAwesome';
// FetchRequest is functional component to call API globally
import FetchRequest from '../services/fetchRequests/fetchRequests';
//import all the basic component we have used

export default class CustomizedPoppits extends Component {
  //Home Screen to show in Home Option
  constructor(props) {
    super(props);
    this.state = {
      rows: 3,
      cols: 2,
      color1: '#fe491a',
      color2: '#333',
      columnWrapperStyle: '',
      auth_token: '',
      horizontal: '',
      numColumns: 0,
      Grid: true,
      visible: true,
      position: 1,
      interval: null,
      dataSource: [],
      modalVisible: false,
      poppitImage: [],
      fileData: '',
      description: '',
      id_of_custom_product: this.props.navigation.state.params
        ? this.props.navigation.state.params.id_of_custom_product
        : '',
      typePoppit: this.props.navigation.state.params
      ? this.props.navigation.state.params.typePoppit
      : '',
    };
  }

  componentDidMount = async () => {
    // getting auth_token which is set during SignIn
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token});
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 3000),
    });
    // integration of API for promo slides and sections
    let callMe = await FetchRequest.apiCall(
      '/customized_products/customized_poppit',
      'GET',
      '',
    );
    // integration of API for promo slides and sections
    this.setState({
      dataSource: callMe.content['customized poppet'].images,
      visible: false,
    });
    var images = [];
    callMe.content['customized poppet'].images.map((cp) => {
      var image = {
        url: envs.BASE_URL + cp,
      };
      images.push(image);
    });
    this.setState({
      dataSource: images,
    });
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        this.state.poppitImage.push({
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });
        this.setState({
          fileData: response.data,
          poppitImage: this.state.poppitImage,
        });
      }
    });
  };

  CreatePoppit = async () => {
    let options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: this.state.auth_token,
      },
      method: 'POST',
    };
    let file_url = this.state.fileData;
    options.body = new FormData();
    if (this.state.description) {
      options.body.append('customized_product[description]');
    }
    options.body.append('customized_product[template]');
    if (this.state.poppitImage) {
      for (var i = 0; i < this.state.poppitImage.length; i++) {
        options.body.append('customized_product[images][]', {
          uri: this.state.poppitImage[i]['uri'],
          name: this.state.poppitImage[i]['name'],
          type: this.state.poppitImage[i]['type'],
        });
      }
    }
    options.body.append(
      'customized_product[description]',
      this.state.description,
    );
    options.body.append(
      'customized_product[template]',
      this.state.id_of_custom_product,
    );
    await fetch(
      envs.BASE_URL + '/api/v1/customized_products/create_poppit',
      options,
    )
      .then((response) => {
        return response.json().then((responseJson) => {
          if (responseJson.error) {
            showMessage({
              message: 'Error!',
              description:
                'Please follow all given instructions to create poppit',
              type: 'danger',
              duration: 3000,
            });
          } else if (responseJson) {
            showMessage({
              message: 'Message!',
              description: 'Poppit has been created',
              type: 'success',
              duration: 3000,
            });
            this.props.navigation.navigate('AddToCartScreen', {
              product_image: responseJson.FirstImage,
              product_id: responseJson.product_id,
              Templateid: responseJson.Templateid,
              product_name: responseJson.title,
              product_price: responseJson.price,
              sub_cat_id: responseJson.sub_cat_id,
              Address_Details: responseJson.Address_Details.data,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // OnPress Close New Address Overlay this Function will call

  onClose = () => {
    this.setState({modalVisible: false});
  };

  // OnPress toggle Overlay of New Address

  toggleOverlay(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
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
            <Text style={GlobalStyle.IconText}>Customized Poppits</Text>
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
            </View>
          </View>
        </View>
        <ScrollView>
          <View>
            {/* Search bar component in home Screen to search products form application */}
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
                  dataSource={this.state.dataSource}
                  position={this.state.position}
                  onPositionChanged={(position) => this.setState({position})}
                  dotColor="#333333"
                  arrowLeft
                  arrowRight
                  inactiveDotColor="#fff"
                  paginationBoxVerticalPadding={10}
                />
                {/* View of OverLay to add new Address in CheckOut procedure */}
                <Overlay
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
                        <View>
                          <TouchableOpacity
                            style={styles.crossBtn}
                            onPress={hideModal}>
                            <Text>
                              <Feather name="x" size={20} color={'#333'} />
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <Text style={styles.HeadText1}>Instructions</Text>
                        </View>
                        {this.state.typePoppit ? (
                          <View>
                            <Text style={styles.instructions}>
                              1. Upload a clear front facing photo
                            </Text>
                            <Text style={styles.instructions}>
                              2. Photo should be in a valid file format (.png,
                              .jpg)
                            </Text>
                            <Text style={styles.instructions}>
                              3. File should be of 5 MB maximum in size
                            </Text>
                            <Text style={styles.instructions}>
                              4. Now you can order Customized Poppits from
                              Lahanur for just Rs. 4000!
                            </Text>
                            <Text style={styles.instructions}>
                              5. If you would like your Poppit to be dressed in
                              a particular outfit, simply share the image of the
                              outfit as a reference 6. Customers need to pay in
                              advance when ordering Customized Poppits. COD is
                              not available for this product
                            </Text>
                          </View>
                        ) : (
                          <View>
                            <Text style={styles.instructions}>
                              1. Upload a clear front-facing photo
                            </Text>
                            <Text style={styles.instructions}>
                              2. Photo should be in a valid file format (.png,
                              .jpg)
                            </Text>
                            <Text style={styles.instructions}>
                              3. File should be of 5 MB maximum in size.
                            </Text>
                            <Text style={styles.instructions}>
                              4. Now you can order a Customized Caricature from
                              Lahanur for just Rs. 2500!
                            </Text>
                            <Text style={styles.instructions}>
                              5. If you would like your Caricature to be dressed
                              in a particular outfit, simply share the image of
                              the outfit as a reference.
                            </Text>
                            <Text style={styles.instructions}>
                              6. Caricature will be delivered in AI vector file.
                            </Text>
                            <Text style={styles.instructions}>
                              7. Customers need to pay in advance when ordering
                              Customized Caricature. COD is not available for
                              this product.
                            </Text>
                          </View>
                        )}
                      </View>
                    </Fragment>
                  )}
                </Overlay>
                <View
                  style={{
                    marginHorizontal: 15,
                  }}>
                  <View style={styles.action}>
                    <Text style={styles.text_footer}>
                      {' '}
                      <Feather name="camera" size={15} color={'#333'} /> Add
                      Images
                    </Text>
                  </View>
                  <View style={styles.poppitImageView}>
                    <TouchableOpacity
                      onPress={this.chooseImage}
                      activeOpacity={0.7}>
                      <View
                        style={[
                          styles.poppitImageViewAdd,
                          {paddingVertical: 20, marginRight: 5, marginTop: 5},
                        ]}>
                        <Feather name="image" size={40} color={'#333'} />
                        <View style={styles.imgStyle}>
                          <Feather name="plus" size={20} color={'#fff'} />
                        </View>
                      </View>
                    </TouchableOpacity>
                    {this.state.poppitImage.map((image, index) => {
                      return (
                        <View
                          style={[
                            styles.poppitImageViewAdd,
                            {paddingVertical: 10, marginRight: 5, marginTop: 5},
                          ]}>
                          <Image
                            key={index}
                            source={{uri: image.uri}}
                            style={styles.poppitImage}
                          />
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.action}>
                    <View style={styles.headingHolder}>
                      <Text style={styles.text_footer}>
                        <Feather name="file-text" size={15} color={'#333'} />{' '}
                        Description
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.toggleOverlay(!this.state.modalVisible)
                        }>
                        <Text style={styles.text1}>
                          See Instructions{' '}
                          <Feather
                            name="info-circle"
                            size={15}
                            color={'#0000CD'}
                          />
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.InputHolder}>
                      <TextInput
                        placeholder="Write your description here..."
                        placeholderTextColor="#9C9C99"
                        style={styles.textInput}
                        autoCapitalize="none"
                        value={this.state.description}
                        onChangeText={(description) =>
                          this.setState({description})
                        }
                        multiline={true}
                      />
                    </View>
                  </View>
                  <View style={styles.btnView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.CreatePoppit}>
                      <Text style={styles.buttonText}>Create Order</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
