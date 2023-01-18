import {StyleSheet, Dimensions} from 'react-native';

export const GlobalStyle = StyleSheet.create({
  header: {
    color: '#fe491a',
    fontFamily: 'Coyote-SemiBoldDEMO',
    fontSize: 22,
  },

  drawerIconTop: {
    justifyContent:'flex-start'
  },

  HeadView: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'android' ? 0 : 15,
  },

  AddCartIcon: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 30,
    backgroundColor: '#fff',
    paddingHorizontal: Platform.OS === 'android' ? 20 : 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  craftText: {
    fontFamily: 'enchanting',
    fontSize: 18,
    marginBottom: 5,
    paddingVertical: 10,
  },

  missOut: {
    fontFamily: 'enchanting',
    fontSize: 38,
    marginBottom: 10,
  },

  madeOfPak: {
    fontFamily: 'lexio',
    fontSize: 16,
  },

  madeOfPakGreen: {
    fontFamily: 'lexio',
    color: 'green',
  },

  welcome: {
    fontSize: 45,
    fontFamily: 'enchanting',
    paddingVertical: 15,
  },

  ImageLetters: {
    alignItems: 'center',
    width: Dimensions.get('window').width - 100,
    height: 30,
    marginTop: 20,
  },

  Logo: {
    alignItems: 'center',
    width: 110,
    height: 110,
  },
  
  icons: {
    // flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 15,
    paddingHorizontal: Platform.OS === 'android' ? 15 : 20,
  },

  iconsLeft: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 5,
  },

  FiltersIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 0,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  iconsRight: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },

  gridIcon: {
    marginRight: 10,
  },

  IconText: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Muli-Regular',
    marginLeft: 10,
    marginTop: 5,
  },

  IconTextcart: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Muli-Regular',
    marginLeft: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  FiltersView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 5,
  },

  IconText1: {
    color: '#000',
    marginRight: 10,
    fontSize: 14,
    alignSelf: 'center',
    fontFamily: 'Muli-Bold',
  },

  arrow: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 0,
  },

  arrowcart: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 0,
  },

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000041',
  },

  activityIndicatorHolder: {
    color: '#0000ff',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  texthead: {
    margin: 5,
    justifyContent: 'center',
    fontSize: 12,
    color: '#fe491a',
    fontFamily: 'Coyote-SemiBoldDEMO',
    letterSpacing: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
