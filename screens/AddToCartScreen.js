//This is an example code for Bottom Navigation//
import React, {Fragment} from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import envs from '../globalVariable';
import FastImage from 'react-native-fast-image';
import {Checkbox} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './stylesheets/StylesAddToCart';
import {GlobalStyle} from './globalStyle/globalstyle';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Feather from 'react-native-vector-icons/Feather';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {Dropdown} from 'react-native-material-dropdown';
import Overlay from 'react-native-modal-overlay';
// FetchRequest is functional component to call API globally
import FetchRequest from '../services/fetchRequests/fetchRequests';

//import all the basic component we have used

export default class AddToCartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      errors: false,
      count: 1,
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      SelectCity: '',
      ZipCode: '',
      Details: {},
      OrderTotal: '',
      discount: '',
      shipmentCharges: '',
      subTotal: '',
      checkedCash: false,
      checkedWire: false,
      auth_token: '',
      Validations: true,
      products: [],
      ProductSlugHere: '',
      product: {},
      productValidation: true,
      modalVisible: false,
      selectLocality: '',
      setLocality: [],
      CouponCode: '',
      Apply: true,
      selectedAddressId: '',
      visible: true,
      timePassed: false,
      Email: '',
      Password: '',
      checked: 0,
      secureText: true,
      isValidPassword: true,
      selectedCity: '',
      selectedAddress: '',
      poppit_qty: 1,
      poppit_image: this.props.navigation.state.params
        ? this.props.navigation.state.params.product_image
        : '',
      poppit_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.product_id
        : '',
      Templateid: this.props.navigation.state.params
        ? this.props.navigation.state.params.Templateid
        : '',
      poppit_name: this.props.navigation.state.params
        ? this.props.navigation.state.params.product_name
        : '',
      poppit_price: this.props.navigation.state.params
        ? this.props.navigation.state.params.product_price
        : '',
      poppit_sub_cat_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.sub_cat_id
        : '',
      poppit_address_Details: this.props.navigation.state.params
        ? this.props.navigation.state.params.Address_Details
        : '',
      // Array for selection city in Address
      CityList: [
        {
          value: 'Lahore',
        },
        {
          value: 'Faisalabad',
        },
        {
          value: 'Rawalpindi',
        },
        {
          value: 'Multan',
        },
        {
          value: 'Hyderabad',
        },
        {
          value: 'Gujranwala',
        },
        {
          value: 'Peshawar',
        },
        {
          value: 'Rahim_Yar_Khan',
        },
        {
          value: 'Quetta',
        },
        {
          value: 'Muzaffarabad',
        },
        {
          value: 'Battagram',
        },
        {
          value: 'Kotli',
        },
        {
          value: 'Islamabad',
        },
        {
          value: 'Bahawalpur',
        },
        {
          value: 'Sargodha',
        },
        {
          value: 'Sialkot',
        },
        {
          value: 'Sukkur',
        },
        {
          value: 'Larkana',
        },
        {
          value: 'Shekhupura',
        },
        {
          value: 'Bhimbar',
        },
        {
          value: 'Jhang_Sadr',
        },
        {
          value: 'Gujrat',
        },
        {
          value: 'Mardan',
        },
        {
          value: 'Malir_Cantonment',
        },
        {
          value: 'Kasur',
        },
        {
          value: 'Mingora',
        },
        {
          value: 'Dera_Ghazi_Khan',
        },
        {
          value: 'Sahiwal',
        },
        {
          value: 'Nawabshah',
        },
        {
          value: 'Okara',
        },
        {
          value: 'Mirpur',
        },
      ],
    };
  }

  //Handler for the Submit onPress, API of CheckOut

  CheckOut = async () => {
    if (this.state.productValidation) {
      showMessage({
        message: 'Warning!',
        description: 'Please Select any Product To CheckOut',
        type: 'warning',
        duration: 3000,
      });
    } else {
      if (this.state.Templateid) {
        this.getLocality(this.state.poppit_address_details, 'create_address');
        showMessage({
          message: 'Success!',
          description:
            'Please select address & payment method to place your order.',
          type: 'success',
          duration: 3000,
        });
      } else {
        let callMe = await FetchRequest.apiCall(
          '/api/v1/orders/checkout.json',
          'GET',
          '',
          (headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.state.auth_token,
          }),
        );

        this.getLocality(callMe.content.address_Details, 'create_address');
        this.setState({Details: callMe.content.data});
        this.setState({OrderTotal: callMe.content.OrderTotal});
        this.setState({discount: callMe.content.discount});
        this.setState({shipmentCharges: callMe.content.shipmentCharges});
        this.setState({subTotal: callMe.content.subTotal});
        showMessage({
          message: 'Success!',
          description:
            'Please select address & payment method to place your order.',
          type: 'success',
          duration: 3000,
        });
      }
    }
  };

  // API of add quantity

  AddQuantity = async (respQty) => {
    let callMe = await FetchRequest.apiCall(
      '/api/v1/orders/add_quantity.json?product_id=' +
        respQty.product_slug +
        '&pcs_id=' +
        respQty.pcs_id,
      'GET',
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
        description:
          'Sorry, you have exceeded the current limit of this product.',
        type: 'danger',
        duration: 3000,
      });
    } else {
      this.incrementCount(callMe.content.quantity, respQty);
      showMessage({
        message: 'Success!',
        description: 'Quantity Updated',
        type: 'success',
        duration: 3000,
      });
    }
  };

  // API of remove quantity in Cart List Items

  RemoveQuantity = async (respQty) => {
    let callMe = await FetchRequest.apiCall(
      '/api/v1/orders/reduce_quantity.json?product_id=' +
        respQty.product_slug +
        '&pcs_id=' +
        respQty.pcs_id,
      'GET',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );

    this.decrementCount(callMe.content.quantity, respQty);
  };

  // Decrement function of counter, Quantity of product
  // OnPress Incriment button respective Item in Cart array will decreased in quantity

  decrementCount(qty, resQtyHere) {
    if (qty >= 1) {
      resQtyHere.quantity = qty;
      var product = this.state.products.map((product) => {
        if (product.Cart_Details.product_slug === resQtyHere.product_slug)
          return {
            Cart_Details: resQtyHere,
          };
        return product;
      });
      this.setState({products: product});
      showMessage({
        message: 'Success!',
        description: 'Quantity Updated',
        type: 'success',
        duration: 3000,
      });
    }
  }

  // Increment function of counter, Quantity of product
  // OnPress Incriment button respective Item in Cart array will increased in quantity

  incrementCount(qty, resQtyHere) {
    resQtyHere.quantity = qty;
    var product = this.state.products.map((product) => {
      if (product.Cart_Details.product_slug === resQtyHere.product_slug)
        return {
          Cart_Details: resQtyHere,
        };
      return product;
    });
    this.setState({products: product});
  }

  // OnPress Next Button for checkOut or placeOrder

  onNextStep = () => {
    if (!this.state.isValid) {
      this.setState({errors: true});
    } else {
      this.setState({errors: false});
    }
  };

  // OnPress Delete button respective Item in Cart array will delete

  RemoveCartItem = async (removeItem) => {
    let callMe = await FetchRequest.apiCall(
      '/api/v1/orders/remove_item.json?product_id=' +
        removeItem.product_slug +
        '&product_color_id=' +
        removeItem.color_id +
        '&pcs_id=' +
        removeItem.pcs_id,
      'GET',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );

    var removeProduct = this.state.products.filter(
      (item) => item.Cart_Details.product_slug !== removeItem.product_slug,
    );
    this.setState({products: removeProduct});
    if (removeProduct.length == 0) {
      this.setState({productValidation: true});
    }
    showMessage({
      message: 'Success!',
      description: 'This Item has been Removed!!!',
      type: 'success',
      duration: 3000,
    });
  };

  // Get user auth_token to PlaceOrder

  componentDidMount = async () => {
    await this.setState({
      poppit_address_details: this.props.navigation.state.params
        .Address_Details,
    });
    if (this.state.Templateid) {
      await this.getLocality(
        this.state.poppit_address_details,
        'create_address',
      );
    }
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token});
    let ProductSlug = await AsyncStorage.getItem('@ProductSlug:ProductSlug');
    this.setState({ProductSlugHere: ProductSlug});
    let callMe = await FetchRequest.apiCall(
      '/api/v1/orders/cart.json',
      'GET',
      '',
    );

    this.setState({
      products: callMe.content,
      visible: false,
    });
    if (callMe.content.length > 0) {
      this.setState({
        productValidation: false,
      });
    }
    if (this.state.Templateid) {
      this.setState({
        productValidation: false,
      });
    }
  };

  // When User AddToCart product it will display as list of products in YourCart
  // in this loop multiple products will display, then user can also increase or
  // decrease quantity of product accordingly,

  RenderProduct = () => {
    if (this.state.products.length > 0) {
      return this.state.products.map((product) => {
        return (
          <View style={styles.productWrapper}>
            <View style={styles.imgBox}>
              <FastImage
                source={{
                  uri: envs.BASE_URL + product.Cart_Details.product_image,
                }}
                style={styles.ProductImage}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.productCartBox}>
              <View>
                <Text style={styles.productName}>
                  {product.Cart_Details.product_title}
                </Text>
              </View>
              <View style={styles.colorSelect}>
                <View style={styles.ColorAndSize}>
                  <View>
                    <TouchableOpacity style={styles.ColorBox}>
                      <Text style={styles.ColorSelection}>Color</Text>
                      <Text style={styles.SizeText}>
                        {' '}
                        {product.Cart_Details.color}{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.ColorBox}>
                      <Text style={styles.ColorSelection}>Size</Text>
                      <Text style={styles.SizeText}>
                        {' '}
                        {product.Cart_Details.size}{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text style={styles.ColorSelection}>
                Select Quantity of Product
              </Text>
              <View style={styles.counterWrapper}>
                {product.Cart_Details.quantity === 1 ? (
                  <View style={styles.btnInc}>
                    <Feather name="minus" size={16} color={'#ccc'}></Feather>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.btnInc}
                    onPress={() => this.RemoveQuantity(product.Cart_Details)}>
                    <Feather name="minus" size={16} color={'#000'}></Feather>
                  </TouchableOpacity>
                )}
                <View style={styles.Counting}>
                  <Text style={[styles.ColorSelection, {fontSize: 13}]}>
                    {product.Cart_Details.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.btnInc}
                  onPress={() => this.AddQuantity(product.Cart_Details)}>
                  <Feather name="plus" size={16} color={'#000'}></Feather>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.ColorBox}>
                  <Text style={styles.ColorSelection1}>Original Price: </Text>
                  <Text style={styles.PriceText1}>
                    {product.Cart_Details.original_price}
                  </Text>
                </TouchableOpacity>
              </View>
              {product.Cart_Details.discounted_price > 0 ? (
                <View>
                  <TouchableOpacity style={styles.ColorBox}>
                    <Text style={styles.ColorSelection}>
                      Discounted Price:{' '}
                    </Text>
                    <Text style={styles.PriceText}>
                      {product.Cart_Details.discounted_price}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View></View>
              )}
              <View style={styles.removeBasket}>
                <TouchableOpacity
                  style={styles.RemoveItem}
                  onPress={() => this.RemoveCartItem(product.Cart_Details)}>
                  <Feather name="trash-2" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      });
    } else {
      return (
        <View style={styles.productWrapper}>
          <View style={styles.imgBox}>
            <FastImage
              source={require('.././assets/no-product.jpg')}
              style={styles.ProductImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={[styles.productCartBox, {justifyContent: 'center'}]}>
            <Text style={[styles.productName, {fontSize: 16}]}>
              Cart is Empty
            </Text>
            <TouchableOpacity
              style={[styles.btnInc, {width: '80%'}]}
              onPress={() =>
                this.props.navigation.navigate('AllProductsScreen')
              }>
              <Text
                style={[
                  styles.productName,
                  {color: '#333', textAlign: 'center', fontSize: 12},
                ]}>
                Add Products{' '}
                <Feather name="plus" size={16} color={'#000'}></Feather>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  // after checkout, when address is being added; onPress of PlaceOrder Cart Details of
  // ordered products will show,

  ShowProduct = () => {
    if (this.state.products) {
      return this.state.products.map((product) => {
        return (
          <View style={styles.productWrapper}>
            <View style={styles.imgBox}>
              <FastImage
                source={{
                  uri: envs.BASE_URL + product.Cart_Details.product_image,
                }}
                style={styles.ProductImage}
                resizeMode={FastImage.resizeMode.resize}
              />
            </View>
            <View style={styles.productCartBox}>
              <View>
                <Text style={styles.productName}>
                  {product.Cart_Details.product_title}
                </Text>
              </View>
              <View style={styles.ColorAndSize}>
                <View>
                  <TouchableOpacity style={styles.ColorBox}>
                    <Text style={styles.ColorSelection}>Color</Text>
                    <Text style={styles.SizeText}>
                      {' '}
                      {product.Cart_Details.color}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={styles.ColorBox}>
                    <Text style={styles.ColorSelection}>Size</Text>
                    <Text style={styles.SizeText}>
                      {' '}
                      {product.Cart_Details.size}{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.ColorSelection}>
                  Select Quantity of Product
                </Text>
              </View>
              <View style={styles.counterWrapper}>
                <Text style={styles.ColorSelection}>Number of Products: </Text>
                <View style={styles.Counting}>
                  <Text style={styles.ColorSelection}>
                    {product.Cart_Details.quantity}
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity style={styles.ColorBox}>
                  <Text style={styles.ColorSelection1}>Original Price: </Text>
                  <Text style={styles.PriceText1}>
                    {product.Cart_Details.original_price}
                  </Text>
                </TouchableOpacity>
              </View>
              {product.Cart_Details.discounted_price > 0 ? (
                <View>
                  <TouchableOpacity style={styles.ColorBox}>
                    <Text style={styles.ColorSelection}>
                      Discounted Price:{' '}
                    </Text>
                    <Text style={styles.PriceText}>
                      {product.Cart_Details.discounted_price}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </View>
        );
      });
    }
  };

  show_poppit_product = () => {
    return (
      <View style={styles.productWrapper}>
        <View style={styles.imgBox}>
          <FastImage
            source={{
              uri: envs.BASE_URL + this.state.poppit_image,
            }}
            style={styles.ProductImage}
            resizeMode={FastImage.resizeMode.resize}
          />
        </View>
        <View style={styles.productCartBox}>
          <View>
            <Text style={styles.productName}>{this.state.poppit_name}</Text>
          </View>
          <View>
            <Text style={styles.ColorSelection}>
              Select Quantity of Product
            </Text>
          </View>
          <View style={styles.counterWrapper}>
            <Text style={styles.ColorSelection}>Number of Products: </Text>
            <View style={styles.Counting}>
              <Text style={styles.ColorSelection}>{this.state.poppit_qty}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.ColorBox}>
              <Text style={styles.ColorSelection1}>Original Price: </Text>
              <Text style={styles.PriceText1}>
                {this.state.Templateid
                  ? this.state.poppit_price
                  : this.state.OrderTotal}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Handler for the Submit onPress, API of Address

  OrderDetails = () => {
    if (!this.state.SelectCity) {
      showMessage({
        message: 'Warning!',
        description: 'Please Select City',
        type: 'warning',
        duration: 3000,
      });
    } else if (!this.state.selectLocality) {
      showMessage({
        message: 'Warning!',
        description: 'Please Select Your Address',
        type: 'warning',
        duration: 3000,
      });
    } else if (!this.state.checkedCash && !this.state.checkedWire) {
      showMessage({
        message: 'Warning!',
        description: 'Check Your Payment Method',
        type: 'warning',
        duration: 3000,
      });
    } else {
      this.setState({Validations: false});
      if (this.state.Templateid) {
        this.poppit_save_order();
      } else {
        this.PlaceOrder();
      }
    }
  };

  //API of Place Order, Handler for the onPress PlaceOrder

  PlaceOrder = async () => {
    let bodyData = JSON.stringify({
      order: {
        city: this.state.SelectCity,
        address_id: this.state.selectedAddressId,
        payment_method: this.state.checkedCash
          ? 'cash_on_delivery'
          : 'wire_transfer',
      },
    });
    let callMe = await FetchRequest.apiCallPost(
      '/api/v1/orders/save_order.json',
      'POST',
      bodyData,
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );

    showMessage({
      message: 'Success!',
      description: 'Order has been Placed, You can see details.',
      type: 'success',
      duration: 5000,
    });
    this.setState({
      productValidation: true,
    });
  };

  poppit_save_order = async () => {
    let bodyData = JSON.stringify({
      order: {
        address_id: this.state.selectedAddressId,
        payment_method: this.state.checkedCash
          ? 'cash_on_delivery'
          : 'wire_transfer',
        city: this.state.SelectCity,
      },
      customized_product: {quantity: this.state.poppit_qty},
      shiping_fee: this.state.shipmentCharges,
      product_id: this.state.poppit_id,
    });
    let callMe = await FetchRequest.apiCallPost(
      '/api/v1/customized_products/save_order.json',
      'POST',
      bodyData,
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
      showMessage({
        message: 'Message!',
        description: 'Custom Poppit Order has been placed',
        type: 'success',
        duration: 3000,
      });
      this.setState({
        productValidation: true,
      });
    }
  };

  select_locality_id = async (data) => {
    await this.state.setLocality.map((product) => {
      if (product.value == data) {
        this.setState({selectedAddressId: product.id});
      }
    });
    this.setState({selectLocality: data});
  };

  // OnPress Close New Address Overlay this Function will call

  onClose = () => {
    this.setState({modalVisible: false});
  };

  // OnPress toggle Overlay of New Address

  toggleOverlay(visible) {
    this.setState({modalVisible: visible});
  }

  // create address of user after getting params of city, zipCode, address

  CreateAddress = async () => {
    if (this.state.SelectCity == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please Select City',
        type: 'warning',
        duration: 3000,
      });
    } else if (this.state.selectLocality == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please Add Address',
        type: 'warning',
        duration: 3000,
      });
    } else if (this.state.ZipCode == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please enter ZipCode',
        type: 'warning',
        duration: 3000,
      });
    } else {
      let bodyData = JSON.stringify({
        city: this.state.SelectCity,
        locality: this.state.selectLocality,
        zipcode: this.state.ZipCode,
      });
      let callMe = await FetchRequest.apiCallPost(
        '/api/v1/addresses.json',
        'POST',
        bodyData,
        (headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.state.auth_token,
        }),
      );

      this.toggleOverlay(!this.state.modalVisible);
      this.getLocality(callMe.content.data, 'create_address');
      this.setState({
        selectedCity: this.state.SelectCity,
        selectedAddress:
          this.state.selectLocality +
          ' ' +
          this.state.SelectCity +
          ' ' +
          this.state.ZipCode,
      });
      showMessage({
        message: 'Success!',
        description: 'New Address has been Created',
        type: 'success',
        duration: 3000,
      });
    }
  };

  // onPress of New Address button new object created of user address

  AddNewAddress = async () => {
    let callMe = await FetchRequest.apiCall(
      '/api/v1/addresses/address_modal.json',
      'GET',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );

    this.toggleOverlay(!this.state.modalVisible);
  };

  // API to Apply coupon effect in checkout Option

  ApplyCoupon = async () => {
    let bodyData = JSON.stringify({
      code: this.state.CouponCode,
    });
    let callMe = await FetchRequest.apiCallPost(
      '/api/v1/coupons/apply_coupon.json',
      'POST',
      bodyData,
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );

    if (this.state.CouponCode == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please Enter CouponCode',
        type: 'warning',
        duration: 3000,
      });
    } else if (callMe.content.error) {
      showMessage({
        message: 'Error!',
        description: 'Failed! the requested coupon was not found.',
        type: 'danger',
        duration: 3000,
      });
    } else {
      this.setState({
        Apply: false,
        OrderTotal: callMe.content.Order_Detail.total,
        CouponCode: '',
      });
      showMessage({
        message: 'Success!',
        description: 'Successfully Coupon has been applied.',
        type: 'success',
        duration: 3000,
      });
    }
  };

  // API to cancel coupon effect from checkout Option

  CancelCoupon = async () => {
    let callMe = await FetchRequest.apiCallPost(
      '/api/v1/coupons/cancel_coupon.json',
      'GET',
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
        Apply: true,
        OrderTotal: callMe.content.Order_Detail.total,
        CouponCode: '',
      });
      showMessage({
        message: 'Success!',
        description: 'Coupon has been Canceled',
        type: 'success',
        duration: 3000,
      });
    }
  };

  // City of user where to get order

  Cities = async (data) => {
    let callMe = await FetchRequest.apiCall(
      '/api/v1/addresses/city_selection.json?city=' + data,
      'GET',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );

    this.setState({
      SelectCity: data,
      shipmentCharges: callMe.content.shipment_charges,
      subTotal: callMe.content.sub_total,
      OrderTotal: callMe.content.sub_total + callMe.content.shipment_charges,
    });
  };

  // Address of user to get order

  Locality = async () => {
    let callMe = await FetchRequest.apiCall(
      '/api/v1/addresses/locality_selection.json',
      'GET',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );
  };

  // get locality from user and append city, zip code, address

  getLocality = async (setLocalitySet, extraParam) => {
    if (extraParam == 'create_address') {
      await this.setState({setLocality: []});
      setLocalitySet.map((locality) => {
        this.state.setLocality.push({
          value:
            ' ' +
            locality.address_locality +
            ' ' +
            locality.city +
            ' ' +
            locality.address_zipcode,
          id: locality.address_id,
        });
      });
    } else {
      setLocalitySet.map((locality) => {
        this.state.setLocality.push({
          value:
            ' ' +
            locality.address_locality +
            ' ' +
            locality.city +
            ' ' +
            locality.address_zipcode,
          id: locality.address_id,
        });
      });
    }
  };

  // UI which will display according to use login,
  // if user auth_token didn't find then SignIn/Register Option will display
  // otherwise for form of Adress will display where auth user Add Address to fetch order

  store_token = (token) => {
    AsyncStorage.setItem('@lahanur_auth:token', token);
    showMessage({
      message: 'Success!',
      description: 'You have successfully logged in',
      type: 'success',
      duration: 3000,
    });
    this.props.navigation.push('AddToCartScreen');
  };

  LogIn = async () => {
    if (this.state.Email == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please Enter Your Email',
        type: 'warning',
        duration: 3000,
      });
    } else if (this.state.Password == '') {
      showMessage({
        message: 'Warning!',
        description: 'Password is Required to login your Account',
        type: 'warning',
        duration: 3000,
      });
    } else if (this.state.Email == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please Enter Email to validate User',
        type: 'warning',
        duration: 3000,
      });
    } else if (!this.validateEmail(this.state.Email)) {
      showMessage({
        message: 'Error!',
        description: 'Please Enter Valid Email',
        type: 'danger',
        duration: 3000,
      });
    } else {
      //Handler for the Submit onPress
      let bodyData = JSON.stringify({
        user: {
          email: this.state.Email,
          password: this.state.Password,
        },
      });
      let callMe = await FetchRequest.apiCallPost(
        'api/v1/sessions/log_in.json',
        'POST',
        bodyData,
        (headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      );

      if (callMe.content.auth_token) {
        this.store_token(callMe.content.auth_token);
      } else {
        showMessage({
          message: 'Warning!',
          description: 'Please Enter Valid Credentials',
          type: 'danger',
          duration: 3000,
        });
      }
    }
  };

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      this.setState({Password: val, isValidPassword: true});
    } else {
      this.setState({Password: val, isValidPassword: false});
    }
  };

  updateSecureTextEntry = () => {
    this.setState({secureText: !this.state.secureText});
  };

  CheckOutView = () => {
    if (this.state.auth_token) {
      return (
        // this form will display when auth_token will find in App
        <View>
          <View style={styles.HeadView}>
            <Text style={styles.HeadText}> BILLING INFORMATION </Text>
          </View>
          <View style={styles.checkOutView3}>
            <Text style={styles.detailsText1}> DELIVERY DETAILS </Text>
            <View>
              <Dropdown
                label="Select City"
                data={this.state.CityList}
                value={this.state.selectedCity}
                onChangeText={(data) => this.Cities(data)}
              />
              <Dropdown
                label="Select Locality"
                data={this.state.setLocality}
                value={this.state.selectedAddress}
                //onChangeText={data => this.setState({ selectLocality: data })}
                onChangeText={(data) => this.select_locality_id(data)}
              />
            </View>
            <View style={styles.ButtonsView}>
              <TouchableOpacity
                style={styles.btnBuyNow}
                onPress={() => this.AddNewAddress()}>
                <Text style={styles.btnText3}>New Address</Text>
              </TouchableOpacity>
            </View>

            {/* View of OverLay to add new Address in CheckOut procedure */}
            <Overlay
              visible={this.state.modalVisible}
              onClose={this.onClose}
              closeOnTouchOutside
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
                      <Text style={styles.HeadText1}>Add Address</Text>
                    </View>
                    <Dropdown
                      label="Select City"
                      data={this.state.CityList}
                      onChangeText={(data) => this.Cities(data)}
                    />
                    <TextInput
                      style={styles.inputModal}
                      placeholder="Type Address..."
                      value={this.state.selectLocality}
                      multiline={true}
                      onChangeText={(selectLocality) =>
                        this.setState({selectLocality})
                      }
                    />
                    <TextInput
                      style={styles.inputModal}
                      placeholder="Enter Zip Code..."
                      value={this.state.ZipCode}
                      keyboardType="numeric"
                      onChangeText={(ZipCode) => this.setState({ZipCode})}
                    />
                    <View style={styles.btnView}>
                      <TouchableOpacity
                        style={[styles.closeBtn, {backgroundColor: '#333'}]}
                        onPress={() => this.CreateAddress()}>
                        <Text style={styles.rememberText1}>Create</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={hideModal}>
                        <Text style={styles.rememberText1}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Fragment>
              )}
            </Overlay>
            <Text style={styles.detailsText1}> DELIVERY METHOD</Text>
            <View style={styles.CheckIcon}>
              <Checkbox
                onPress={() => {
                  this.state.checkedWire
                    ? this.setState({
                        checkedCash: !this.state.checkedCash,
                        checkedWire: !this.state.checkedWire,
                      })
                    : this.setState({
                        checkedCash: !this.state.checkedCash,
                      });
                }}
                color={'#F44336'}
                status={this.state.checkedCash ? 'checked' : 'unchecked'}
              />
              <Text style={styles.rememberText}>Cash On Delivery</Text>
            </View>
            {/* <View style={styles.CheckIcon}>
              <Checkbox
                onPress={() => {
                  this.state.checkedCash
                    ? this.setState({
                        checkedCash: !this.state.checkedCash,
                        checkedWire: !this.state.checkedWire,
                      })
                    : this.setState({
                        checkedWire: !this.state.checkedWire,
                      });
                }}
                color={'#F44336'}
                status={this.state.checkedWire ? 'checked' : 'unchecked'}
              />
              <Text style={styles.rememberText}>Wire Transfer</Text>
            </View> */}

            <Text style={[styles.btnText4, {marginLeft: 20, fontSize: 14}]}>
              Coupon Code
            </Text>
            <View style={styles.CouponView}>
              <TextInput
                style={styles.inputCoupon}
                placeholder="Add Coupon..."
                value={this.state.CouponCode}
                onChangeText={(CouponCode) => this.setState({CouponCode})}
              />
              {this.state.Apply ? (
                <TouchableOpacity
                  style={styles.btnCoupon}
                  onPress={this.ApplyCoupon}>
                  <Text style={styles.btnText4}>Apply</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.btnCoupon}
                  onPress={this.CancelCoupon}>
                  <Text style={styles.btnText4}>Cancel</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.HeadView}>
              <Text style={styles.HeadText}> CART DETAIL</Text>
            </View>
            <View style={styles.detailsView}>
              <View style={styles.list}>
                <Text style={styles.detailsText1}>Cart Subtotal:</Text>
                <Text style={styles.detailsText2}>
                  PKR{' '}
                  {this.state.Templateid
                    ? this.state.poppit_price
                    : this.state.subTotal}
                </Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.detailsText1}>Shipping:</Text>
                <Text style={styles.detailsText2}>
                  {this.state.shipmentCharges}
                </Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.detailsText1}>Order Total:</Text>
                <Text style={styles.detailsText1}>
                  {this.state.Templateid
                    ? this.state.poppit_price + this.state.shipmentCharges
                    : this.state.OrderTotal}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        // this form will display when auth_token will NOT find
        <View>
          <View style={styles.HeadView}>
            <Text style={styles.HeadText}> CHECKOUT OPTION</Text>
          </View>
          <View style={styles.checkOutView2}>
            <View style={styles.formHeadings}>
              <Text style={styles.detailsText1}>REGISTERED CUSTOMER</Text>
              <Text style={styles.detailsText}>
                If you have an account with us, please logIn
              </Text>
            </View>
            <ScrollView style={{padding: 10}}>
              <View style={styles.action}>
                <TextInput
                  placeholder="Your Email"
                  placeholderTextColor="#333"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={this.state.Email}
                  onChangeText={(Email) => this.setState({Email})}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Your Password"
                  placeholderTextColor="#333"
                  style={styles.textInput}
                  secureTextEntry={this.state.secureText}
                  autoCapitalize="none"
                  value={this.state.Password}
                  onChangeText={(value) => this.handlePasswordChange(value)}
                />
                <TouchableOpacity onPress={this.updateSecureTextEntry}>
                  {this.state.secureText ? (
                    <Feather name="eye-off" color="#333" size={20} />
                  ) : (
                    <Feather name="eye" color="#333" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {this.state.isValidPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Password must be 6 characters long.
                  </Text>
                </Animatable.View>
              )}
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EmailScreen')}>
                <Text style={[styles.errorMsg, {color: '#fe491a'}]}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
              <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} onPress={this.LogIn}>
                  <LinearGradient
                    colors={['#FE663E', '#fe491a']}
                    style={styles.signIn}>
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: '#333',
                        },
                      ]}>
                      Sign In
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('SignUpScreen')}
                  style={[
                    styles.signIn,
                    {
                      borderColor: '#333',
                      borderWidth: 1,
                      marginTop: 15,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#333',
                      },
                    ]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  };

  // Add and remove quantity of products in custom poppit render view
  ReducePoppitOrder = () => {
    this.setState({
      poppit_qty: this.state.poppit_qty - 1,
    });
  };

  AddPoppitOrder = () => {
    this.setState({
      poppit_qty: this.state.poppit_qty + 1,
    });
  };

  RenderPoppit = () => {
    return (
      <View>
        <View style={styles.productWrapper}>
          <View style={styles.imgBox}>
            <FastImage
              source={{
                uri: envs.BASE_URL + this.state.poppit_image,
              }}
              style={styles.ProductImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={styles.productCartBox}>
            <View>
              <Text style={styles.productName}>{this.state.poppit_name}</Text>
            </View>
            <Text style={[styles.ColorSelection, {fontSize: 15}]}>
              Select Quantity of Product
            </Text>
            <View style={styles.counterWrapper}>
              {this.state.poppit_qty === 1 ? (
                <View style={styles.btnInc}>
                  <Feather name="minus" size={16} color={'#ccc'}></Feather>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.btnInc}
                  onPress={this.ReducePoppitOrder}>
                  <Feather name="minus" size={16} color={'#000'}></Feather>
                </TouchableOpacity>
              )}
              <View style={styles.Counting}>
                <Text style={[styles.ColorSelection, {fontSize: 13}]}>
                  {this.state.poppit_qty}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btnInc}
                onPress={this.AddPoppitOrder}>
                <Feather name="plus" size={16} color={'#000'}></Feather>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.ColorBox}>
                <Text style={styles.ColorSelection1}>Original Price: </Text>
                <Text style={styles.PriceText1}>{this.state.poppit_price}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#333" barStyle="light-content" />
        <View style={GlobalStyle.container}>
          <View style={GlobalStyle.icons}>
            <View style={GlobalStyle.iconsLeft}>
              <View style={GlobalStyle.FiltersIcon}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Feather
                    name="arrow-left"
                    size={27}
                    color="black"
                    style={GlobalStyle.arrow}
                  />
                </TouchableOpacity>
              </View>
              <Text style={GlobalStyle.IconTextcart}>Cart Products</Text>
            </View>
            <View style={GlobalStyle.FiltersView}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('AllProductsScreen')
                }>
                <View style={GlobalStyle.FiltersIcon}>
                  <Text style={[GlobalStyle.IconText1, {fontSize: 12}]}>
                    <Feather name="shopping-cart" size={18} color="#333" />
                    {'  '}
                    Continue Shopping
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.container}>
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
                    resizeMode={'cover'}
                  />
                  <ActivityIndicator size="large" color="#fe491a" />
                  <Text style={GlobalStyle.texthead}>Loading...</Text>
                </View>
              </View>
            </Modal>
          ) : (
            <View style={styles.AddToCart}>
              {/* Three Progress Steps AddToCart, CheckOut and PlaceOrder */}
              <ProgressSteps
                activeStepIconBorderColor={'#fe491a'}
                completedStepIconColor={'#fe491a'}
                completedProgressBarColor={'#fe491a'}
                activeLabelColor={'#fe491a'}
                activeStepNumColor={'#fe491a'}>
                {/* First Step of Progress Bar to dsplay product which is added into the cart */}
                <ProgressStep
                  label="Your Cart"
                  nextBtnTextStyle={styles.buttonNextStyle}
                  previousBtnTextStyle={styles.buttonPreviousStyle}
                  nextBtnStyle={styles.nextBtn}
                  previousBtnStyle={styles.prevBtn}
                  onNext={this.CheckOut}
                  nextBtnText="Check Out"
                  errors={this.state.productValidation}>
                  <ScrollView style={{flex: 1}}>
                    <View style={styles.MainContainer}>
                      <View style={styles.ProductDetailsSection}>
                        {this.state.Templateid
                          ? this.RenderPoppit()
                          : this.RenderProduct()}
                      </View>
                    </View>
                  </ScrollView>
                </ProgressStep>

                {/* Second step of Progress Bar to choose checkout method */}

                <ProgressStep
                  label="CheckOut"
                  nextBtnTextStyle={styles.buttonNextStyle}
                  previousBtnTextStyle={styles.buttonNextStyle}
                  nextBtnStyle={styles.nextBtn}
                  previousBtnStyle={styles.nextBtn}
                  onNext={this.OrderDetails}
                  nextBtnText="Place Order"
                  errors={this.state.Validations}>
                  <View style={styles.Steps}>
                    <View style={styles.MainContainer}>
                      <ScrollView>
                        <View style={styles.ProductDetailsSection}>
                          {this.CheckOutView()}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </ProgressStep>

                {/* Third step of Progress Bar To Show Saved Order*/}

                <ProgressStep
                  label="Order Placed"
                  nextBtnTextStyle={styles.buttonNextStyle}
                  previousBtnTextStyle={styles.buttonNextStyle}
                  nextBtnStyle={styles.nextBtn}
                  previousBtnStyle={styles.nextBtn}
                  onPrevious={() =>
                    this.props.navigation.navigate('AddToCartScreen')
                  }
                  // onSubmit={this.PlaceOrder}
                  onSubmit={() => this.props.navigation.navigate('HomeScreen')}
                  finishBtnText="Home">
                  <View style={styles.Steps}>
                    <View style={styles.MainContainer}>
                      <ScrollView>
                        <View style={styles.ProductDetailsSection}>
                          <Text style={styles.detailsText1}>
                            ORDER HAS BEEN PLACED
                          </Text>
                          <View style={styles.ProductDetailsSection}>
                            {this.state.Templateid
                              ? this.show_poppit_product()
                              : this.ShowProduct()}
                          </View>
                          <View style={styles.AddressView}>
                            <Text style={styles.Address}>
                              Address: {this.state.selectLocality}
                            </Text>
                          </View>
                          <View style={styles.HeadView}>
                            <Text style={styles.HeadText}> CART DETAIL</Text>
                          </View>
                          <View style={styles.detailsView}>
                            <View style={styles.list}>
                              <Text style={styles.detailsText1}>
                                Cart Subtotal:
                              </Text>
                              <Text style={styles.detailsText2}>
                                PKR{' '}
                                {this.state.Templateid
                                  ? this.state.poppit_price
                                  : this.state.subTotal}
                              </Text>
                            </View>
                            <View style={styles.list}>
                              <Text style={styles.detailsText1}>Shipping:</Text>
                              <Text style={styles.detailsText2}>
                                {this.state.shipmentCharges}
                              </Text>
                            </View>
                            <View style={styles.list}>
                              <Text style={styles.detailsText1}>
                                Order Total:
                              </Text>
                              <Text style={styles.detailsText1}>
                                {this.state.Templateid
                                  ? this.state.poppit_price +
                                    this.state.shipmentCharges
                                  : this.state.OrderTotal}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </ProgressStep>
              </ProgressSteps>
            </View>
          )}
        </View>
      </View>
    );
  }
}
