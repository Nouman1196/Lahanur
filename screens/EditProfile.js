//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import envs from '../globalVariable';
import {styles} from './stylesheets/StylesProfile';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {showMessage} from 'react-native-flash-message';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import {GlobalStyle} from './globalStyle/globalstyle';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
//import all the basic component we have used

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_token: '',
      first_name: '',
      name: this.props.navigation.state.params
        ? this.props.navigation.state.params.name
        : 'Missing Name',
      last_name: '',
      email: this.props.navigation.state.params
        ? this.props.navigation.state.params.email
        : 'Missing Email',
      phone_number: this.props.navigation.state.params
        ? this.props.navigation.state.params.phone_number
        : 'Missing Phone Number',
      password: '',
      c_password: '',
      current_password: '',
      avatar: this.props.navigation.state.params
        ? this.props.navigation.state.params.image
        : null,
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      secureText: true,
      secureText2: true,
      secureText3: true,
      isValidPassword1: true,
      isValidPassword2: true,
      isValidPassword3: true,
      isValidPhoneNumber: true,
    };
  }

  componentDidMount = async () => {
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token});
    let user = this.state.name.split(' ');
    this.setState({
      first_name: user[0],
      last_name: user[1],
    });
  };

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      // customButtons: [
      //   {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      // ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      // else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      //   showMessage({
      //     message: 'Alert!',
      //     description: response.customButton,
      //     type: 'success',
      //     duration: 3000,
      //   });
      // }
      else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.uri };
        // alert(JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          // fileUri: response.uri,
          avatar: response.uri,
        });
      }
    });
  };

  handlePasswordChange = (val, type, isValid) => {
    if (val.trim().length >= 6) {
      this.setState({[type]: val, [isValid]: true});
    } else {
      this.setState({[type]: val, [isValid]: false});
    }
  };

  updateSecureTextEntry = () => {
    this.setState({secureText: !this.state.secureText});
  };
  updateSecureTextEntry2 = () => {
    this.setState({secureText2: !this.state.secureText2});
  };
  updateSecureTextEntry3 = () => {
    this.setState({secureText3: !this.state.secureText3});
  };

  handlePhoneChange = (val) => {
    if (val.trim().length == 11) {
      this.setState({phone_number: val, isValidPhoneNumber: true});
    } else {
      this.setState({phone_number: val, isValidPhoneNumber: false});
    }
  };

  CheckSamilirity = () => {
    if (this.state.current_password == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please Enter Your Current Password',
        type: 'warning',
        duration: 3000,
      });
    } else if (this.state.password) {
      if (this.state.password !== this.state.c_password) {
        showMessage({
          message: 'Warning!',
          description: 'Please Enter Again Password for Confirmation',
          type: 'warning',
          duration: 3000,
        });
      }
    } else if (this.state.email) {
      if (!this.validateEmail(this.state.email)) {
        showMessage({
          message: 'Warning!',
          description: 'Please Enter Valid Email',
          type: 'warning',
          duration: 3000,
        });
      }
    } else if (this.state.auth_token) {
      this.UpdateProfile();
    }
  };

  UpdateProfile = async () => {
    let options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: this.state.auth_token,
      },
      method: 'PUT',
    };
    let file_url = this.state.fileData;
    options.body = new FormData();
    if (this.state.first_name) {
      options.body.append('first_name');
    }
    if (this.state.last_name) {
      options.body.append('last_name');
    }
    if (this.state.email) {
      options.body.append('email');
    }
    if (this.state.phone_number) {
      options.body.append('phone_number');
    }
    if (this.state.password) {
      options.body.append('password');
    }
    if (this.state.c_password) {
      options.body.append('c_password');
    }
    if (this.state.current_password) {
      options.body.append('current_password');
    }
    if (this.state.avatar) {
      options.body.append('avatar');
    }
    options.body.append('avatar', file_url);
    options.body.append('first_name', this.state.first_name);
    options.body.append('last_name', this.state.last_name);
    options.body.append('email', this.state.email);
    options.body.append('phone_number', this.state.phone_number);
    options.body.append('password', this.state.password);
    options.body.append('c_password', this.state.c_password);
    options.body.append('current_password', this.state.current_password);
    await fetch(
      envs.BASE_URL + 'api/v1/registrations/edit_profile.json',
      options,
    )
      .then((response) => {
        return response.json().then((responseJson) => {
          if (responseJson.message) {
            showMessage({
              message: 'Message!',
              description: responseJson.message,
              type: 'success',
              duration: 3000,
            });
            this.logOut();
            // this.props.navigation.navigate('ProfileScreen');
          } else {
            showMessage({
              message: 'Error!',
              description: responseJson.error,
              type: 'danger',
              duration: 3000,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  logOut = async () => {
    let auth_token = await AsyncStorage.removeItem('@lahanur_auth:token');
    this.setState({auth_token});
    this.props.navigation.navigate('SignInScreen');
  };
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.view1}>
              <Image
                source={require('.././assets/lahanurletters.png')}
                style={GlobalStyle.ImageLetters}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.avatarView}>
            {this.state.avatar && (
              <Image source={{uri: this.state.avatar}} style={styles.avatar} />
            )}
            <TouchableOpacity onPress={this.chooseImage}>
              <Icon
                type="font-awesome"
                name="camera"
                size={30}
                color={'#fe491a'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={[styles.bodyContent, {alignItems: 'flex-start'}]}>
              {/* <Text style={styles.text_footer}>First Name</Text> */}
              <View style={styles.action}>
                {/* <FontAwesome name="user-o" color={'#333'} size={20} /> */}
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor="#333"
                  style={styles.textInput}
                  value={this.state.first_name}
                  onChangeText={(first_name) => this.setState({first_name})}
                />
              </View>
              {/* <Text style={styles.text_footer}>Last Name</Text> */}
              <View style={styles.action}>
                {/* <FontAwesome name="user-o" color={'#333'} size={20} /> */}
                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor="#333"
                  style={styles.textInput}
                  value={this.state.last_name}
                  onChangeText={(last_name) => this.setState({last_name})}
                />
              </View>
              {/* <Text style={styles.text_footer}>Email</Text> */}
              <View style={styles.action}>
                {/* <Feather name="mail" color={'#333'} size={20} /> */}
                <TextInput
                  placeholder="Your Email"
                  placeholderTextColor="#333"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email})}
                />
              </View>
              {/* <Text style={styles.text_footer}>Phone</Text> */}
              <View style={styles.action}>
                {/* <Feather name="phone" color={'#333'} size={20} /> */}
                <TextInput
                  placeholder="Your Contact"
                  placeholderTextColor="#333"
                  keyboardType="numeric"
                  style={styles.textInput}
                  value={this.state.phone_number}
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
              {/* <Text style={styles.text_footer}>New Password</Text> */}
              <View style={styles.action}>
                {/* <Feather name="lock" color={'#333'} size={20} /> */}
                <TextInput
                  placeholder="New Password"
                  placeholderTextColor="#333"
                  style={styles.textInput}
                  secureTextEntry={this.state.secureText}
                  autoCapitalize="none"
                  value={this.state.password}
                  onChangeText={(value) =>
                    this.handlePasswordChange(
                      value,
                      'password',
                      this.state.secureText,
                    )
                  }
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({secureText: !this.state.secureText})
                  }>
                  {this.state.secureText ? (
                    <Feather name="eye-off" color="#333" size={20} />
                  ) : (
                    <Feather name="eye" color="#333" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {this.state.isValidPassword1 ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Password must be 6 characters long.
                  </Text>
                </Animatable.View>
              )}
              {/* <Text style={styles.text_footer}>Confirm Password</Text> */}
              <View style={styles.action}>
                {/* <Feather name="lock" color={'#333'} size={20} /> */}
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#333"
                  style={styles.textInput}
                  secureTextEntry={this.state.secureText2}
                  autoCapitalize="none"
                  value={this.state.c_password}
                  onChangeText={(value) =>
                    this.handlePasswordChange(
                      value,
                      'c_password',
                      this.state.secureText2,
                    )
                  }
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({secureText2: !this.state.secureText2})
                  }>
                  {this.state.secureText2 ? (
                    <Feather name="eye-off" color="#333" size={20} />
                  ) : (
                    <Feather name="eye" color="#333" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {this.state.isValidPassword2 ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Password must be 6 characters long.
                  </Text>
                </Animatable.View>
              )}
              {/* <Text style={styles.text_footer}>Current Password</Text> */}
              <View style={styles.action}>
                {/* <Feather name="lock" color={'#333'} size={20} /> */}
                <TextInput
                  placeholder="Current Password"
                  placeholderTextColor="#333"
                  style={styles.textInput}
                  secureTextEntry={this.state.secureText3}
                  autoCapitalize="none"
                  value={this.state.current_password}
                  onChangeText={(value) =>
                    this.handlePasswordChange(
                      value,
                      'current_password',
                      this.state.secureText3,
                    )
                  }
                  // onChangeText={(Password) => this.setState({Password})}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({secureText3: !this.state.secureText3})
                  }>
                  {this.state.secureText3 ? (
                    <Feather name="eye-off" color="#333" size={20} />
                  ) : (
                    <Feather name="eye" color="#333" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {this.state.isValidPassword3 ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Password must be 6 characters long.
                  </Text>
                </Animatable.View>
              )}
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.UpdateProfile}>
                <Text style={styles.btnText}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
