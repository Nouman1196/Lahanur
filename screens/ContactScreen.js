//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './stylesheets/StylesContact';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {GlobalStyle} from './globalStyle/globalstyle';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
// FetchRequest is functional component to call API globally
import FetchRequest from '../services/fetchRequests/fetchRequests';
//import all the basic component we have used

export default class ContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      Subject: '',
      auth_token: '',
      Comment: '',
    };
  }

  // Validation for Email Syntax

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  // API of Contact Us Screen

  ContactUs = async () => {
    if (this.state.Name == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please enter Your Name.',
        type: 'warning',
        duration: 3000,
      });
    } else if (!this.validateEmail(this.state.Email)) {
      showMessage({
        message: 'Warning!',
        description: 'Please Enter Valid Email',
        type: 'warning',
        duration: 3000,
      });
    } else if (this.state.Subject == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please enter Subject of Your Comment.',
        type: 'warning',
        duration: 3000,
      });
    } else if (this.state.Comment == '') {
      showMessage({
        message: 'Warning!',
        description: 'Please enter Your Comment.',
        type: 'warning',
        duration: 3000,
      });
    } else {
      let bodyData = JSON.stringify({
        contact: {
          name: this.state.Name,
          email: this.state.Email,
          subject: this.state.Subject,
          comment: this.state.Comment,
        },
      });
      let callMe = await FetchRequest.apiCallPost(
        '/api/v1/visitors/save_contact_us.json',
        'POST',
        bodyData,
        (headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.state.auth_token,
        }),
      );
      showMessage({
        message: 'Notice!',
        description: callMe.content.notice,
        type: 'success',
        duration: 5000,
      });
      this.setState({
        Name: '',
        Email: '',
        Subject: '',
        Comment: '',
      });
    }
  };

  componentDidMount = async () => {
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token});
  };

  render() {
    return (
      <View style={styles.container}>
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
        <ScrollView>
          <View style={styles.ContactForm}>
            {/* <Text style={styles.txtContactUs}>Contact Us</Text> */}
            <Icon type="font-awesome" name="comment-o" size={80} color="#333" />
            <Text style={styles.txtHeading}>Leave a Comment</Text>
            <Text style={styles.txtSmall}>
              Your email address will not be published.
            </Text>
            {/* <Text style={styles.text_footer}>Name</Text> */}
            <View style={styles.action}>
              {/* <Feather name="user" color={'#333'} size={20} /> */}
              <TextInput
                placeholder="Name..."
                value={this.state.Name}
                placeholderTextColor="#9C9C99"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(Name) => this.setState({Name})}
              />
            </View>
            {/* <Text style={styles.text_footer}>Email</Text> */}
            <View style={styles.action}>
              {/* <Feather name="mail" color={'#333'} size={20} /> */}
              <TextInput
                placeholder="Your Email"
                placeholderTextColor="#9C9C99"
                style={styles.textInput}
                autoCapitalize="none"
                value={this.state.Email}
                onChangeText={(Email) => this.setState({Email})}
              />
            </View>
            {/* <Text style={styles.text_footer}>Subject</Text> */}
            <View style={styles.action}>
              {/* <Feather name="file-text" color={'#333'} size={20} /> */}
              <TextInput
                placeholderTextColor="#9C9C99"
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Subject..."
                value={this.state.Subject}
                onChangeText={(Subject) => this.setState({Subject})}
                multiline={true}
              />
            </View>
            {/* <Text style={styles.text_footer}>Comment</Text> */}
            <View style={styles.action}>
              {/* <Feather name="message-circle" color={'#333'} size={20} /> */}
              <TextInput
                placeholder="Comment..."
                placeholderTextColor="#9C9C99"
                style={styles.textInput}
                autoCapitalize="none"
                value={this.state.Comment}
                onChangeText={(Comment) => this.setState({Comment})}
                multiline={true}
              />
            </View>
            <TouchableOpacity onPress={this.ContactUs} style={styles.postbtn}>
              <Text style={styles.btnText}>POST COMMENT</Text>
            </TouchableOpacity>
            <View style={styles.contactdetails}>
              <Text style={styles.txtHeading}>Contact Details</Text>
              <Text style={styles.txtInfo}>
                {' '}
                <Feather name="phone" size={24} color="#333" /> +92-423-5302240
              </Text>
              <Text style={styles.txtInfo}>
                {' '}
                <Feather name="mail" size={24} color="#333" />{' '}
                support@lahanur.com
              </Text>
              <Text style={styles.txtInfo}>
                {' '}
                <Feather name="map-pin" size={24} color="#333" /> Block G-4,
                Johar Town, Lahore, Pakistan
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
