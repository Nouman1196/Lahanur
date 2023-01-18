import {StyleSheet, Dimensions, Platform} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    height: 160,
    backgroundColor: '#222121',
    opacity: 0.9,
    marginBottom: -5,
  },
  view1: {height: 100, alignItems: 'center', justifyContent: 'center'},
  ImageLetters: {
    alignItems: 'center',
    width: Dimensions.get('window').width - 150,
    height: 50,
    marginTop: 50,
  },
  ImageLetters1: {
    alignItems: 'center',
    width: Dimensions.get('window').width - 180,
    height: 25,
    margin: 30,
    marginTop: 10,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingVertical: 20,
    backgroundColor: '#222121',
    opacity: 0.9,
    marginBottom: -5,
    paddingLeft: 20,
  },
  title: {
    fontSize: 14,
    marginTop: 4,
    color:'#fff',
    fontFamily:'Muli-SemiBold',
  },
  caption: {
    fontSize: 11,
    lineHeight: 12,
    color:'#fff',
    fontFamily:'Muli-Regular',
  },
  avatarBig: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: '#fe491a',
    alignSelf: 'center',
  }
});
