//This is an example code for Bottom Navigation//
import React, {Component} from 'react';
//import react in our code.
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Modal,
  ActivityIndicator,
} from 'react-native';
import envs from '../globalVariable';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import {GlobalStyle} from './globalStyle/globalstyle';
import Feather from 'react-native-vector-icons/Feather';
import {Text, Searchbar} from 'react-native-paper';
import {styles} from './stylesheets/StylesCollections';
// FetchRequest is functional component to call API globally
import FetchRequest from '../services/fetchRequests/fetchRequests';
//import all the basic component we have used

export default class CollectionsScreen extends Component {
  //Home Screen to show in Home Option
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      auth_token: '',
      SectionSlug: '',
      search: '',
      visible: true,
    };
  }

  componentDidMount = async () => {
    // getting auth_token which is set during SignIn
    let auth_token = await AsyncStorage.getItem('@lahanur_auth:token');
    this.setState({auth_token});
    // integration of API for promo slides and sections
    let callMe = await FetchRequest.apiCall('/visitors.json', 'GET', '');
    this.setState({
      sections: callMe.content.sections,
      visible: false,
    });
  };

  SlugStore = async (Slug) => {
    await AsyncStorage.setItem('@SectionSlug:SectionSlug', Slug);
    this.props.navigation.navigate('CategoriesScreen');
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
          <View>
            {/* Search bar component in home Screen to search products form application */}
            <Searchbar
              returnKeyType="search"
              searchIcon={(styles.search, {size: 20, color: '#fe491a'})}
              placeholder="Search Here..."
              borderBottomWidth={0}
              fontSize={14}
              fontFamily={'Muli-SemiBold'}
              style={{height: 40}}
              onChangeText={(search) => this.setState({search})}
              value={this.state.search}
              onSubmitEditing={() =>
                this.props.navigation.push('SearchedProduct', {
                  search_here: this.state.search,
                })
              }
            />
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
                {this.state.sections.map((section) => {
                  return (
                    <View style={styles.CategoriesView}>
                      <TouchableOpacity
                        onPress={() => this.SlugStore(section.slug)}>
                        <FastImage
                          source={{
                            uri: envs.BASE_URL + section.section_image,
                          }}
                          style={styles.ImageMain}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => this.SlugStore(section.slug)}>
                          <Text style={styles.btnText}>{section.title}</Text>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
