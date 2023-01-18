import React from 'react';
import {View, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './stylesheets/StylesSplash';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#333" barStyle="light-content" />
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {textAlign: 'center', paddingVertical: 10, color: '#fe491a'},
          ]}>
          We Craft, You Love!
        </Text>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/logowhite.png')}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text
          style={[
            styles.title,
            {
              color: '#333',
              alignSelf: 'center',
              paddingTop: 15,
              fontSize: 15,
              fontFamily: 'lexio',
            },
          ]}>
          Stay connected with Lahanur!
        </Text>
        <View style={styles.justify}>
          <Animatable.View
            animation="bounceIn"
            duraton="1500"
            style={{marginVertical: 30, alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('HomeScreen')}>
              <View style={styles.banner}>
                <Image
                  style={styles.bannerImage}
                  resizeMode="cover"
                  source={require('.././assets/fashion.png')}
                />
                <LinearGradient
                  colors={['#fe491a', '#FE663E', '#fe491a']}
                  style={styles.bannerBtn}>
                  <Text style={[styles.textSign, {fontSize: 15}]}>
                    Get Started
                  </Text>
                  <MaterialIcons name="navigate-next" color="#333" size={22} />
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </Animatable.View>

          <View style={styles.accSec}>
            <Animatable.View
              animation="fadeInLeftBig"
              duraton="25000"
              style={styles.button}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignInScreen')}>
                <LinearGradient
                  colors={['#fe491a', '#FE663E', '#fe491a']}
                  style={styles.signIn}>
                  <Text style={styles.textSign}>Sign In</Text>
                  <MaterialIcons name="person" color="#333" size={22} />
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
            <View style={styles.button}>
              <Text style={styles.text}>OR</Text>
            </View>
            <Animatable.View
              animation="fadeInRightBig"
              duraton="25000"
              style={styles.button}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}
                style={{flexDirection: 'row'}}>
                <View
                  style={[
                    styles.signIn,
                    {height: 35, borderWidth: 2, borderColor: '#333'},
                  ]}>
                  <Text style={styles.textSign}>Sign Up</Text>
                  <MaterialIcons name="person-add" color="#333" size={22} />
                </View>
              </TouchableOpacity>
            </Animatable.View>
          </View>
          
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;
