import {StyleSheet, Platform} from 'react-native';
export const styles = StyleSheet.create({
  loginText: {
    color: '#fff',
    justifyContent: 'center',
    fontFamily: 'lexio',
    padding: 5,
    fontSize: 12,
  },
  loginIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CartLogin: {justifyContent: 'flex-end'},
  CartIcon: {flexDirection: 'row',},
  search: {
    color: '#fe491a',
  },
  CategoriesView: {
    margin: 2,
    marginBottom: 10,
  },
  sliderHeading: {
    backgroundColor: 'rgba(5,5,4,.5)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 0,
    borderWidth: 2,
    color: '#fff',
    justifyContent: 'center',
    fontSize: 13,
    padding: 10,
    elevation: 1,
    fontFamily: 'Muli-Bold',
    letterSpacing: 2,
    borderBottomWidth: 0,
    justifyContent: 'center',
    left: '4%',
    width: 250,
  },
  sliderText: {
    backgroundColor: 'rgba(5,5,4,.5)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 0,
    borderColor: '#fff',
    shadowRadius: 0,
    borderWidth: 2,
    padding: 10,
    color: '#fff',
    fontSize: 11,
    elevation: 1,
    fontFamily: 'Muli-Bold',
    letterSpacing: 1,
    paddingTop: 10,
    marginTop: 0,
    justifyContent: 'center',
    textTransform: 'capitalize',
    left: '4%',
    borderTopWidth: 0,
    width: 250,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'rgba(5,5,4,.6)',
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 60,
    width: 235,
  },
  titleView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  titleText: {
    color: '#fe491a',
    fontSize: 18,
    letterSpacing: 3,
    fontFamily: 'Muli-Bold',
    textTransform: 'uppercase',
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Muli-SemiBold',
  },
  HeadView1: {
    height: 40,
    backgroundColor: '#333',
    justifyContent: 'center',
  },
  HeadText1: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Muli-Bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  inputModal: {
    height: 50,
    borderBottomColor: '#333333',
    borderBottomWidth: 0.5,
  },
  btnView: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subsBtn: {
    height: 30,
    paddingHorizontal: 5,
    margin: 3,
    paddingVertical: 2,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent:'center',
    backgroundColor: '#333',
  },
  rememberText1: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Muli-SemiBold',
    padding: 3,
    fontSize: 12,
    alignItems: 'center',
    color: '#fff',
  },
  joinText: {
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Muli-SemiBold',
    alignItems: 'center',
    color: '#fe491a',
  },
  // btnText: {color: '#fff', fontSize: 15, fontFamily: 'Muli-Regular'},
  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
    flexGrow: 1,
  },
  ImageMain: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: -37,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0,
  },
  boxContainer: {
    marginHorizontal: 4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonCard: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderWidth: 0,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    padding: 10,
    backgroundColor: 'rgba(6,6,6,.8)',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
