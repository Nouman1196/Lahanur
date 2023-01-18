// This is the code of SignUp Screen
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StatusBar,
  Modal,
  ActivityIndicator,
} from 'react-native';
//import react in our code.
import {styles} from './stylesheets/StylesSignUp';
import {GlobalStyle} from './globalStyle/globalstyle';
import * as Animatable from 'react-native-animatable';
//import all the basic component we have used
import FetchRequest from '../services/fetchRequests/fetchRequests';
// FetchRequest is functional component to call API globally

class PrivacyScreen extends Component {
  // initialization of states and props

  constructor(props) {
    super(props);
    this.state = {
      PrivacyPolicy: '',
      visible: true,
    };
  }

  componentDidMount = async () => {
    //Handler for the Submit onPress
    let callMe = await FetchRequest.apiCall(
      '/api/v1/registrations/term_condition',
      'GET',
      '',
      (headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    );
    this.setState({
      PrivacyPolicy: callMe.content.privacy,
      visible: false,
    });
  };

  render() {
    //SignUp screen to Create user account
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <StatusBar backgroundColor="#333" barStyle="light-content" />
          <View style={styles.Container}>
            <View style={styles.view1}>
              <Text
                style={[
                  GlobalStyle.craftText,
                  {
                    color: '#fe491a',
                    alignSelf: 'center',
                    fontSize: 22,
                    fontFamily: 'Coyote-SemiBoldDEMO',
                  },
                ]}>
                Privacy Policy
              </Text>
              <Image
                source={require('./../assets/logowhite.png')}
                style={GlobalStyle.Logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.view2}>
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
                <Text style={styles.textDetailed}>
                  {this.state.PrivacyPolicy}
                </Text>
              )}
            </View>
            <View style={styles.view3}>
              <Text style={GlobalStyle.craftText}>We Craft You Love</Text>
              <Text style={GlobalStyle.madeOfPak}>
                Made Of
                <Text style={GlobalStyle.madeOfPakGreen}> Pakistan</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

export default PrivacyScreen;
