import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Linking,
} from 'react-native';
import envs from '../globalVariable';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FetchRequest from '../services/fetchRequests/fetchRequests';
import {showMessage} from 'react-native-flash-message';
import {styles} from './stylesheets/StylesSignIn';

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      checked: 0,
      secureText: true,
      isValidPassword: true,
      auth_token: '',
    };
  }

  componentDidMount = async () => {
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({
      auth_token: auth_token,
    });
  };

  store_token = (token) => {
    AsyncStorage.setItem('@lahanur_auth:token', token);
    showMessage({
      message: 'Success!',
      description: 'You have successfully logged in',
      type: 'success',
      duration: 3000,
    });
    this.props.navigation.navigate('HomeScreen');
    this.setState({
      Password: '',
    });
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
          Authorization: this.state.auth_token,
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

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#333" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
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
                defaultValue=""
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
              onPress={() =>
                Linking.openURL(envs.BASE_URL + '/users/password/new/')
              }>
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
        </Animatable.View>
      </View>
    );
  }
}
