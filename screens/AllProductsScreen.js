//This is an example code for Bottom Navigation//
import React, {Fragment} from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  Modal,
  ActivityIndicator,
} from 'react-native';
import envs from '../globalVariable';
import FastImage from 'react-native-fast-image';
import {GlobalStyle} from './globalStyle/globalstyle';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import {EventRegister} from 'react-native-event-listeners';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {styles} from './stylesheets/StylesProductsAll';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Overlay from 'react-native-modal-overlay';
import Slider from 'react-native-slider';
import MultiSelect from 'react-native-multiple-select';
//import all the basic component we have used
import FetchRequest from '../services/fetchRequests/fetchRequests';
import {call} from 'react-native-reanimated';
// FetchRequest is functional component to call API globally
export default class AllProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      render: false,
      renderPrevious: false,
      visible: true,
      //Loading state used while loading the data for the first time
      offset: 1,
      rows: 3,
      cols: 2,
      favorite1: false,
      color1: '#fe491a',
      color2: '#333',
      products: [],
      value: 0,
      modalVisible: false,
      SelectedCollection: '',
      SelectedCollectionSlug: '',
      Collection: [],
      SelectedCategory: '',
      SelectedCategorySlug: '',
      Category: [],
      SelectedSubCategory: '',
      SelectedSubCategorySlug: '',
      SubCategory: [],
      SelectedTags: '',
      SelectedTagsSlug: '',
      Tags: [],
      SelectedColors: '',
      SelectedColorSlug: '',
      Colors: [],
      SelectedSize: '',
      Size: [],
      SelectedSizeSlug: '',
      SelectedSellingType: '',
      SelectedSellingTypeSlug: '',
      SellingType: [],
      allConstarints: '',
      wishListItems: '',
      Grid: true,
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
      Grid: true,
    });
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
        description: 'Product is Removed from WishList',
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
    let wishListItems = await AsyncStorage.getItem(
      '@wishListItems:wishListItems',
    );
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token: auth_token});
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
      '/search.json?page=' + this.state.offset,
      'GET',
      '',
    );
    this.setState({
      // products: [...this.state.products, ...callMe.results],
      products: callMe.content.products,
      Collection: callMe.content.filters.collections,
      Tags: callMe.content.filters.tags,
      Colors: callMe.content.filters.colors,
      Size: callMe.content.filters.sizes,
      SellingType: callMe.content.filters.selling_type,
      loading: false,
      visible: false,
      //updating the loading state to false
    });
  };

  loadMoreData = async () => {
    //On click of Load More button We will call the web API again
    this.setState({render: true});
    this.state.offset = this.state.offset + 1;
    let callMe = await FetchRequest.apiCall(
      '/search.json?page=' + this.state.offset,
      'GET',
      '',
    );
    this.setState({
      // products: [...this.state.products, ...callMe.results],
      products: callMe.content.products,
      Collection: callMe.content.filters.collections,
      Tags: callMe.content.filters.tags,
      Colors: callMe.content.filters.colors,
      Size: callMe.content.filters.sizes,
      SellingType: callMe.content.filters.selling_type,
      loading: false,
      render: false,
      //updating the loading state to false
    });
  };

  loadPreviousData = async () => {
    //On click of Load More button We will call the web API again
    this.setState({renderPrevious: true});
    this.state.offset = this.state.offset - 1;
    let callMe = await FetchRequest.apiCall(
      '/search.json?page=' + this.state.offset,
      'GET',
      '',
    );
    this.setState({
      // products: [...this.state.products, ...callMe.results],
      products: callMe.content.products,
      Collection: callMe.content.filters.collections,
      Tags: callMe.content.filters.tags,
      Colors: callMe.content.filters.colors,
      Size: callMe.content.filters.sizes,
      SellingType: callMe.content.filters.selling_type,
      loading: false,
      renderPrevious: false,
      //updating the loading state to false
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

  clearSelectedCategories = () => {
    this._multiSelect._removeAllItems();
  };

  onSelectedCollection = (selectedItems) => {
    this.setState({SelectedCollection: selectedItems});
  };

  onSelectedCategory = (selectedItems) => {
    this.setState({SelectedCategory: selectedItems});
  };

  onSelectedSubCategory = (selectedItems) => {
    this.setState({SelectedSubCategory: selectedItems});
  };

  onSelectedTags = (selectedItems) => {
    this.setState({SelectedTags: selectedItems});
  };

  onSelectedColor = (selectedItems) => {
    this.setState({SelectedColors: selectedItems});
  };

  onSelectedSize = (selectedItems) => {
    this.setState({SelectedSize: selectedItems});
  };

  onSelectedSellerType = (selectedItems) => {
    this.setState({SelectedSellingType: selectedItems});
  };

  priceSlug = (data) => {
    this.setState({SelectedPriceSlug: 'pr_' + data + '/'});
    this.setState({value: data});
  };

  CollectionSlug = async (data) => {
    this.state.Collection.map((collection) => {
      if (collection.value == data) {
        this.setState({
          SelectedCollectionSlug: 'sc_' + collection.slug + '/',
        });
      }
    });
    this.setState({SelectedCollection: data});
  };

  CategorySlug = async (data) => {
    this.state.Category.map((cat) => {
      if (cat.value == data) {
        this.setState({SelectedCategorySlug: 'cg_' + cat.slug + '/'});
      }
    });
    this.setState({SelectedCategory: data});
  };

  SubCategorySlug = async (data) => {
    this.state.SubCategory.map((scat) => {
      if (scat.value == data) {
        this.setState({SelectedSubCategorySlug: 'scg_' + scat.slug + '/'});
      }
    });
    this.setState({SelectedSubCategory: data});
  };

  TagsSlug = async (data) => {
    this.state.Tags.map((tags) => {
      if (tags.value == data) {
        this.setState({SelectedTagsSlug: 'tag_' + tags.slug + '/'});
      }
    });
    this.setState({SelectedTags: data});
  };

  ColorSlug = async (data) => {
    this.state.Colors.map((color) => {
      if (color.value == data) {
        this.setState({SelectedColorSlug: 'cl_' + color.slug + '/'});
      }
    });
    this.setState({SelectedColors: data});
  };

  SizeSlug = async (data) => {
    this.state.Size.map((size) => {
      if (size.value == data) {
        this.setState({SelectedSizeSlug: 'sz_' + size.slug + '/'});
      }
    });
    this.setState({SelectedSize: data});
  };

  SellingTypeSlug = async (data) => {
    this.state.SellingType.map((sell) => {
      if (sell.value == data) {
        this.setState({SelectedSellingTypeSlug: 'sl_' + sell.slug + '/'});
      }
    });
    this.setState({SelectedSellingType: data});
  };

  CollectionsURL = async () => {
    if (this.state.SelectedCollection) {
      let something = '';
      await this.state.SelectedCollection.map((coll) => {
        something = something + 'sc_' + coll + '/';
      });
      this.setState({SelectedCollectionSlug: something});
    }
  };

  TagsURL = async () => {
    if (this.state.SelectedTags) {
      let something = '';
      await this.state.SelectedTags.map((tag) => {
        something = something + 'tag_' + tag + '/';
      });
      this.setState({SelectedTagsSlug: something});
    }
  };

  CategoryURL = async () => {
    if (this.state.SelectedCategory) {
      let something = '';
      await this.state.SelectedCategory.map((cat) => {
        something = something + 'cg_' + cat + '/';
      });
      this.setState({SelectedCategorySlug: something});
    }
  };

  SubCategoryURL = async () => {
    if (this.state.SelectedSubCategory) {
      let something = '';
      await this.state.SelectedSubCategory.map((scat) => {
        something = something + 'scg_' + scat + '/';
      });
      this.setState({SelectedSubCategorySlug: something});
    }
  };

  ColorsURL = async () => {
    if (this.state.SelectedColors) {
      let something = '';
      await this.state.SelectedColors.map((color) => {
        something = something + 'cl_' + color + '/';
      });
      this.setState({SelectedColorSlug: something});
    }
  };

  SizeURL = async () => {
    if (this.state.SelectedSize) {
      let something = '';
      await this.state.SelectedSize.map((size) => {
        something = something + 'sz_' + size + '/';
      });
      this.setState({SelectedSizeSlug: something});
    }
  };

  SellingTypeURL = async () => {
    if (this.state.SelectedSellingType) {
      let something = '';
      await this.state.SelectedSellingType.map((sell) => {
        something = something + 'sl_' + sell + '/';
      });
      this.setState({SelectedSellingTypeSlug: something});
    }
  };

  allURLs = () => {
    this.CollectionsURL();
    this.TagsURL();
    this.CategoryURL();
    this.SubCategoryURL();
    this.ColorsURL();
    this.SizeURL();
    this.SellingTypeURL();
  };

  SlugStore = async (Slug) => {
    await AsyncStorage.setItem('@ProductSlug:ProductSlug', Slug);
    this.props.navigation.navigate('ProductDetailsScreen');
  };

  // value + SelectedCollectionSlug + SelectedTagsSlug + SelectedColorSlug + SelectedSizeSlug + SelectedSellingTypeSlug

  Filter = async () => {
    await this.allURLs();
    let allSlugs =
      this.state.SelectedCollectionSlug +
      this.state.SelectedCategorySlug +
      this.state.SelectedSubCategorySlug +
      this.state.SelectedTagsSlug +
      this.state.SelectedColorSlug +
      this.state.SelectedSizeSlug +
      this.state.SelectedSellingTypeSlug;
    // this.state.SelectedPriceSlug;
    let callMe = await FetchRequest.apiCall(
      '/search.json?constraints=' + allSlugs,
      'GET',
      '',
    );
    this.setState({
      products: callMe.content.products,
    });
    showMessage({
      message: 'Success!',
      description: 'Selected filters have been applied',
      type: 'success',
      duration: 3000,
    });
    this.toggleOverlay(!this.state.modalVisible);
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
        <View style={GlobalStyle.HeadView}>
          <TouchableOpacity
            style={GlobalStyle.drawerIconTop}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <Feather name="menu" size={25} color="white" />
          </TouchableOpacity>
          <Text style={[GlobalStyle.header, {flex: 1, textAlign: 'center'}]}>
            Lahanur
          </Text>
        </View>
        {/* <ScrollView> */}
        <View style={{flex: 5, backgroundColor: '#fff'}}>
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
              <Text style={GlobalStyle.IconText}>All Products</Text>
            </View>
            <View style={GlobalStyle.FiltersView}>
              <View style={GlobalStyle.iconsRight}>
                <TouchableOpacity
                  onPress={() => this.toggleOverlay(!this.state.modalVisible)}>
                  <MaterialCommunityIcons
                    style={styles.gridIcon}
                    name="filter-menu"
                    size={23}
                    color={'#333'}
                  />
                </TouchableOpacity>
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
              {this.state.products ? (
                <View>
                  {this.state.Grid ? (
                    <FlatList
                      columnWrapperStyle={{justifyContent: 'space-between'}}
                      horizontal={false}
                      numColumns={2}
                      key={'_'}
                      keyExtractor={(item) => '_' + item.id}
                      data={this.state.products}
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
                                  <Text style={styles.btnText}>
                                    Out of Stock
                                  </Text>
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
                                  <View style={styles.twoIcons}>
                                    <View style={styles.twoIconsChildView1}>
                                      {this.state.auth_token ? (
                                        <TouchableOpacity
                                          onPress={() =>
                                            this.WishList(item.id)
                                          }>
                                          <Icon
                                            name={this.iconName(item.id)}
                                            color={this.iconColor(item.id)}
                                            type="font-awesome"
                                            size={22}></Icon>
                                        </TouchableOpacity>
                                      ) : (
                                        <View></View>
                                      )}
                                    </View>
                                  </View>
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
                                  <Text style={styles.btnText}>
                                    Out of Stock
                                  </Text>
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
                                  <View style={styles.twoIcons}>
                                    <View style={styles.twoIconsChildView1}>
                                      {this.state.auth_token ? (
                                        <TouchableOpacity
                                          onPress={() =>
                                            this.WishList(item.id)
                                          }>
                                          <Icon
                                            name={this.iconName(item.id)}
                                            color={this.iconColor(item.id)}
                                            type="font-awesome"
                                            size={22}></Icon>
                                        </TouchableOpacity>
                                      ) : (
                                        <View></View>
                                      )}
                                    </View>
                                  </View>
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
                <View>
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
        <View
          style={{
            flex: 0.62,
            flexDirection: 'row',
            // margin: 10,
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          <View style={styles.ButtonsViewFilter}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.btnFilter, {flexDirection: 'row'}]}
              onPress={this.loadPreviousData}>
              <Text style={styles.btnText4}>
                Previous
                {this.state.renderPrevious ? (
                  <ActivityIndicator color="#fe491a" size={10} />
                ) : null}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ButtonsViewFilter}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.btnFilter, {flexDirection: 'row'}]}
              onPress={this.loadMoreData}>
              <Text style={styles.btnText4}>
                Load More
                {this.state.render ? (
                  <ActivityIndicator color="#fe491a" size={10} />
                ) : null}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </ScrollView> */}
        <Overlay
          visible={this.state.modalVisible}
          onClose={this.onClose}
          animationType="zoomIn"
          containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
          childrenWrapperStyle={{backgroundColor: '#eee', borderRadius: 20}}
          animationDuration={500}>
          {(hideModal) => (
            <ScrollView>
              <View style={{height: '80%'}}>
                <View style={styles.HeadView1}>
                  <Text style={styles.HeadText1}>
                    Filters of Lahanur Products
                  </Text>
                </View>
                <Text style={styles.joinText}>
                  Apply filters on all Products
                </Text>

                {/* <View style={styles.slider}>
                  <Slider
                    minimumValue={0}
                    maximumValue={10000}
                    thumbTintColor={'#fe491a'}
                    maximumTrackTintColor={'#333'}
                    minimumTrackTintColor={'#fe491a'}
                    value={this.state.price}
                    onValueChange={(value) => this.priceSlug(value)}
                  />
                  <Text style={[styles.joinText, {color: '#333'}]}>
                    Price Range(PKR): {this.state.value.toFixed(0)}
                  </Text>
                </View> */}
                <View style={styles.dropdownView}>
                  <MultiSelect
                    items={this.state.Collection}
                    uniqueKey="id"
                    onSelectedItemsChange={this.onSelectedCollection}
                    selectedItems={this.state.SelectedCollection}
                    selectText="   Collections  "
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={(items) => this.CollectionSlug(items)}
                    tagRemoveIconColor="#fe491a"
                    tagBorderColor="#fe491a"
                    tagTextColor="#fe491a"
                    selectedItemTextColor="#fe491a"
                    selectedItemIconColor="#fe491a"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#fe491a', height: 40}}
                    submitButtonColor="#fe491a"
                    submitButtonText="OK"
                  />
                </View>
                <View style={styles.dropdownView}>
                  <MultiSelect
                    items={this.state.Tags}
                    uniqueKey="id"
                    onSelectedItemsChange={this.onSelectedTags}
                    selectedItems={this.state.SelectedTags}
                    selectText="   Tags  "
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={(items) => this.TagsSlug(items)}
                    tagRemoveIconColor="#fe491a"
                    tagBorderColor="#fe491a"
                    tagTextColor="#fe491a"
                    selectedItemTextColor="#fe491a"
                    selectedItemIconColor="#fe491a"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#fe491a', height: 40}}
                    submitButtonColor="#fe491a"
                    submitButtonText="OK"
                  />
                </View>
                <View style={styles.dropdownView}>
                  <MultiSelect
                    items={this.state.Colors}
                    uniqueKey="id"
                    onSelectedItemsChange={this.onSelectedColor}
                    selectedItems={this.state.SelectedColors}
                    selectText="   Colors  "
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={(items) => this.ColorSlug(items)}
                    tagRemoveIconColor="#fe491a"
                    tagBorderColor="#fe491a"
                    tagTextColor="#fe491a"
                    selectedItemTextColor="#fe491a"
                    selectedItemIconColor="#fe491a"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#fe491a', height: 40}}
                    submitButtonColor="#fe491a"
                    submitButtonText="OK"
                  />
                </View>
                <View style={styles.dropdownView}>
                  <MultiSelect
                    items={this.state.Size}
                    uniqueKey="id"
                    onSelectedItemsChange={this.onSelectedSize}
                    selectedItems={this.state.SelectedSize}
                    selectText="   Size  "
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={(items) => this.SizeSlug(items)}
                    tagRemoveIconColor="#fe491a"
                    tagBorderColor="#fe491a"
                    tagTextColor="#fe491a"
                    selectedItemTextColor="#fe491a"
                    selectedItemIconColor="#fe491a"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#fe491a', height: 40}}
                    submitButtonColor="#fe491a"
                    submitButtonText="OK"
                  />
                </View>
                <View style={styles.dropdownView}>
                  <MultiSelect
                    items={this.state.SellingType}
                    uniqueKey="id"
                    onSelectedItemsChange={this.onSelectedSellerType}
                    selectedItems={this.state.SelectedSellingType}
                    selectText="   Selling Type  "
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={(items) => this.SellingTypeSlug(items)}
                    tagRemoveIconColor="#fe491a"
                    tagBorderColor="#fe491a"
                    tagTextColor="#fe491a"
                    selectedItemTextColor="#fe491a"
                    selectedItemIconColor="#fe491a"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#fe491a', height: 40}}
                    submitButtonColor="#fe491a"
                    submitButtonText="OK"
                  />
                </View>
                <View style={styles.btnView}>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={this.Filter}>
                    <Text style={styles.Apply}>Apply</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeBtn1}
                    onPress={hideModal}>
                    <Text style={styles.Apply}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </Overlay>
      </View>
    );
  }
}
