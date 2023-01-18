//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import envs from '../globalVariable';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './stylesheets/StylesProfile';
import Feather from 'react-native-vector-icons/Feather';
import {GlobalStyle} from './globalStyle/globalstyle';
//import all the basic component we have used
// FetchRequest is functional component to call API globally
import FetchRequest from '../services/fetchRequests/fetchRequests';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_token: '',
      name: '',
      email: '',
      image: '',
      phone_number: '',
      showAlert: false,
      visible: true,
    };
  }

  componentDidMount = async () => {
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token});

    let callMe = await FetchRequest.apiCall(
      '/customer/profile.json',
      'GET',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );
    this.setState({
      name: callMe.content.name,
      email: callMe.content.email,
      phone_number: callMe.content.phone_number,
      image: callMe.content.user_image,
      visible: false,
    });
  };

  LogOutUser = async () => {
    let callMe = await FetchRequest.apiCallPost(
      '/api/v1/sessions/log_out.json',
      'POST',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.auth_token,
      }),
    );
    this.showAlert();
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  logOut = async () => {
    let auth_token = await AsyncStorage.removeItem('@lahanur_auth:token');
    this.setState({auth_token});
    this.props.navigation.navigate('SignInScreen');
    this.hideAlert();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#333" barStyle="light-content" />
        <View style={styles.HeadView}>
          <View style={styles.DrawerIconView}>
            <TouchableOpacity
              style={styles.drawerIconTop}
              onPress={() => {
                this.props.navigation.openDrawer();
              }}>
              <Feather name="menu" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
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
              <View style={styles.header}>
                <View style={styles.view1}>
                  <Image
                    source={require('.././assets/lahanurletters.png')}
                    style={GlobalStyle.ImageLetters}
                    resizeMode="contain"
                  />
                </View>
              </View>
              {this.state.image ? (
                <Image
                  style={styles.avatar}
                  source={
                    this.state.image
                      ? {
                          uri: envs.BASE_URL + this.state.image,
                        }
                      : require('.././assets/user.png')
                  }
                />
              ) : (
                <Image
                  style={styles.avatar}
                  source={require('.././assets/user.png')}
                />
              )}
              <AwesomeAlert
                show={this.state.showAlert}
                showProgress={false}
                title="Lahanur"
                titleStyle={{
                  fontFamily: 'Coyote-SemiBoldDEMO',
                  color: '#fe491a',
                  fontSize: 24,
                }}
                contentContainerStyle={{width: '80%'}}
                message="Do you really want to log out?"
                messageStyle={{
                  fontFamily: 'Muli-SemiBold',
                  fontSize: 16,
                  color: '#333',
                }}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancel"
                confirmText="Log Out"
                confirmButtonColor="#fe491a"
                cancelButtonTextStyle={{
                  fontFamily: 'Muli-SemiBold',
                  fontSize: 14,
                }}
                confirmButtonTextStyle={{
                  fontFamily: 'Muli-SemiBold',
                  fontSize: 14,
                }}
                cancelButtonColor="#333"
                onCancelPressed={() => {
                  this.hideAlert();
                }}
                onConfirmPressed={() => {
                  this.logOut();
                }}
              />
              {this.state.auth_token ? (
                <View style={styles.body}>
                  <View style={styles.bodyContent}>
                    <Text style={styles.name}>{this.state.name}</Text>
                    <Text style={styles.description}>{this.state.email}</Text>
                    <Text style={styles.description}>
                      {this.state.phone_number}
                    </Text>
                  </View>
                  <View style={styles.btnView}>
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={() =>
                        this.props.navigation.navigate('EditProfile', {
                          name: this.state.name,
                          email: this.state.email,
                          phone_number: this.state.phone_number,
                          image: envs.BASE_URL + this.state.image,
                        })
                      }>
                      <Text style={styles.btnText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.buttonContainer,
                        {backgroundColor: '#fe491a'},
                      ]}
                      onPress={this.LogOutUser}>
                      <Text style={[styles.btnText, {color: '#333'}]}>
                        Log Out
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.body}>
                  <View style={styles.btnView1}>
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={() =>
                        this.props.navigation.navigate('SignInScreen')
                      }>
                      <Text style={styles.btnText}>Log In to Your Account</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
