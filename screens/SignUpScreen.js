import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FetchRequest from '../services/fetchRequests/fetchRequests';
import {showMessage} from 'react-native-flash-message';
import {styles} from './stylesheets/StylesSignIn';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      TermsofService: true,
      PhoneNumber: '',
      checked: 0,
      secureText: true,
      isValidPassword: true,
      isValidPhoneNumber: true,
    };
  }

  store_token = (token) => {
    AsyncStorage.setItem('@lahanur_auth:token', token);
    showMessage({
      message: 'Success!',
      description: 'You have Sign Up Successfully',
      type: 'success',
      duration: 3000,
    });
    this.props.navigation.navigate('SignInScreen');
    this.setState({
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
    });
  };

  CreateAccount = async () => {
    if (this.state.FirstName == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please Enter Your First Name',
        type: 'warning',
        duration: 3000,
      });
    } else if (this.state.LastName == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please Enter Your Last Name',
        type: 'warning',
        duration: 3000,
      });
    } else if (this.state.Email == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please Enter Your Email',
        type: 'warning',
        duration: 3000,
      });
    } else if (this.state.PhoneNumber == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please Enter Your Contact Number',
        type: 'warning',
        duration: 3000,
      });
    } else if (this.state.Password == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please Create Password',
        type: 'warning',
        duration: 3000,
      });
    } else if (!this.validateEmail(this.state.Email)) {
      showMessage({
        message: 'Error!',
        description: 'Email you are using is Invalid',
        type: 'danger',
        duration: 3000,
      });
    } else {
      //Handler for the Submit onPress
      let bodyData = JSON.stringify({
        user: {
          first_name: this.state.FirstName,
          last_name: this.state.LastName,
          email: this.state.Email,
          password: this.state.Password,
          terms_of_service: this.state.TermsofService,
          phone_number: this.state.PhoneNumber,
        },
      });
      let callMe = await FetchRequest.apiCallPost(
        '/api/v1/registrations/sign_up.json',
        'POST',
        bodyData,
        (headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      );
      if (callMe.content.user) {
        this.store_token(callMe.content.user.auth_token);
      } else {
        showMessage({
          message: 'Error!',
          description: callMe.content.error,
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

  handlePhoneChange = (val) => {
    if (val.trim().length == 11) {
      this.setState({PhoneNumber: val, isValidPhoneNumber: true});
    } else {
      this.setState({PhoneNumber: val, isValidPhoneNumber: false});
    }
  };

  updateSecureTextEntry = () => {
    this.setState({secureText: !this.state.secureText});
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#333" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <View style={styles.action}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#333"
                style={styles.textInput}
                value={this.state.FirstName}
                onChangeText={(FirstName) => this.setState({FirstName})}
              />
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#333"
                style={styles.textInput}
                value={this.state.LastName}
                onChangeText={(LastName) => this.setState({LastName})}
              />
            </View>
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
                placeholder="Your Contact"
                placeholderTextColor="#333"
                keyboardType="numeric"
                style={styles.textInput}
                value={this.state.PhoneNumber}
                onChangeText={(value) => this.handlePhoneChange(value)}
              />
            </View>
            {this.state.isValidPhoneNumber ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Phone Number must be 11 characters long.
                </Text>
              </Animatable.View>
            )}
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
                  <Feather name="eye-off" color="#333" size={18} />
                ) : (
                  <Feather name="eye" color="#333" size={18} />
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
            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                By signing up, you agree to our
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('TermsScreen')}>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                  {' '}
                  Terms of service
                </Text>
              </TouchableOpacity>
              <Text style={styles.color_textPrivate}> and </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('PrivacyScreen')}>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                  Privacy policy
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={this.CreateAccount}>
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
                    Sign Up
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignInScreen')}
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
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}
