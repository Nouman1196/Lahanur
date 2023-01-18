import {StyleSheet, Dimensions, Platform} from 'react-native';

const {height} = Dimensions.get('screen');
const height_logo = height * 0.18;
const width_logo = height * 0.18;
const width_banner = height * 0.38;
const height_banner = height * 0.24;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  justify: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  logo: {
    width: width_logo,
    height: height_logo,
  },
  title: {
    color: '#fe491a',
    fontSize: 20,
    paddingTop: 15,
    fontFamily: 'enchanting',
  },
  text: {
    color: '#fe491a',
    fontSize: 13,
    padding: 10,
    fontFamily: 'enchanting',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  signIn: {
    padding: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  textSign: {
    color: '#333',
    fontSize: 13,
    letterSpacing: 2,
    paddingHorizontal: 5,
    fontFamily: 'Muli-Bold',
  },
  banner: {
    width: width_banner,
    height: height_banner,
    borderWidth: 0.1,
    borderRadius: 10,
    borderColor: '#FE663E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: width_banner,
    height: height_banner,
    borderWidth: 0.1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: '#FE663E',
    borderRadius: 10,
  },
  bannerBtn: {
    height: 40,
    width: width_banner,
    borderWidth: 0,
    borderColor: '#FE663E',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  accSec: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
  },
});
