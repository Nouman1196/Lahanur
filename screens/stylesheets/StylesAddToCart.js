import {StyleSheet, Platform, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#fff',
  },
  icons: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  AddToCart: {
    borderColor: '#ccc',
    borderTopWidth: 1,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  Steps: {alignItems: 'center', flex: 1},
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: 'grey',
  },
  nextBtn: {
    marginRight: -20,
    marginBottom: -20,
    color: '#333',
  },
  buttonNextStyle: {
    backgroundColor: '#333',
    padding: 6,
    paddingHorizontal:10,
    color: '#fe491a',
    fontSize: 12,
    fontFamily: 'Muli-SemiBold',
  },
  previousBtnTextStyle: {
    color: '#fe491a',
  },
  ProductDetailsSection: {
    width: Dimensions.get('window').width - 0,
    borderColor: '#fff',
    borderWidth: 2,
    flex: 1,
  },
  productWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#F9E8E5',
  },
  imgBox: {
    borderWidth: 0,
    borderRadius: 10,
    borderColor: '#ddd',
    alignItems: 'center',
    paddingRight: 10,
  },
  ProductImage: {
    alignSelf: 'center',
    width: 120,
    borderWidth: 0,
    borderRadius: 10,
    height: 120,
  },
  counterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 20,
    paddingTop: 10,
  },
  Counting: {
    flex: 0.2,
    padding: 4,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ColorAndSize: {
    flex: 1,
    flexDirection: 'row',
  },
  btnInc: {
    borderRadius: 3,
    borderWidth: 0,
    backgroundColor: '#fff',
    padding: 3,
  },
  productCartBox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontFamily: 'Muli-Bold',
    fontSize: 11,
    color: '#fe491a',
    textTransform: 'uppercase',
  },
  ColorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingRight: 3,
  },
  removeBasket: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  RemoveItem: {
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  PriceText: {
    alignSelf: 'flex-end',
    fontSize: 11,
    fontFamily: 'Muli-Bold',
    color: '#000',
  },
  PriceText1: {
    alignSelf: 'flex-end',
    fontSize: 10,
    fontFamily: 'Muli-Bold',
    color: '#000',
    // textDecorationLine: 'line-through'
  },
  ColorSelection: {
    fontSize: 10,
    fontFamily: 'Muli-Bold',
    color: '#333',
    marginRight: 5,
  },

  ColorSelection1: {
    fontSize: 10,
    fontFamily: 'Muli-SemiBold',
    color: '#000',
    marginRight: 5,
  },

  SizeText: {
    fontSize: 10,
    fontFamily: 'Muli-SemiBold',
    color: '#fe491a',
    fontWeight: 'bold',
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Muli-Bold',
    justifyContent: 'center',
  },
  HeadView: {
    height: 40,
    backgroundColor: '#fe491a',
    justifyContent: 'center',
  },
  HeadView1: {
    height: 40,
    backgroundColor: '#333',
    justifyContent: 'center',
  },
  formHeadings: {
    paddingVertical: 15,
    paddingLeft: 20,
  },
  HeadText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Muli-Bold',
  },
  HeadText1: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Muli-Bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  detailsView: {
    backgroundColor: '#ebebe4',
    flex: 1,
  },
  detailsText: {fontSize: 14, color: '#333'},
  list: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0.3,
    borderColor: '#333',
    padding: 10,
  },
  detailsText1: {
    flex: 0.5,
    fontSize: 12,
    paddingHorizontal:10,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    color: '#333',
    fontFamily: 'Muli-Bold',
  },
  detailsText2: {
    flex: 0.5,
    fontSize: 15,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    color: '#333',
  },
  AddressView: {
    flex: 1,
    padding: 5,
    marginLeft:5
  },
  Address: {
    fontSize: 13,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    color: '#333',
    fontFamily: 'Muli-SemiBold',
  },
  inputCoupon: {
    height: 40,
    borderBottomColor: '#333333',
    flex: 1,
    marginHorizontal: 20,
    borderBottomWidth: 0.5,
    width: Dimensions.get('window').width - 50,
  },
  inputModal: {
    height: 40,
    borderBottomColor: '#333333',
    borderBottomWidth: 0.5,
  },
  checkOutView2: {
    backgroundColor: '#ebebe4',
    marginBottom: 10,
  },
  checkOutView3: {
    backgroundColor: '#ebebe4',
    marginBottom: 10,
    paddingHorizontal:10
  },
  SignUp: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#fe491a',
    padding: 10,
    width: Dimensions.get('window').width - 280,
    borderRadius: 4,
    alignSelf: 'center',
    height: 40,
  },
  CheckIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 12,
    fontFamily: 'Muli-Bold',
    textAlign: 'left',
    color: '#535c68',
    marginBottom: 2,
  },
  rememberText1: {
    fontFamily: 'Muli-Bold',
    fontSize: 12,
    color: '#fff',
  },
  ButtonsView: {
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 5,
    width: Dimensions.get('window').width - 230,
  },
  btnBuyNow: {
    alignItems: 'center',
    backgroundColor: '#fe491a',
    paddingVertical: 5,
    paddingHorizontal:10,
    margin: 3,
  },
  btnText3: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Muli-SemiBold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText4: {
    color: '#fe491a',
    fontSize: 12,
    fontFamily: 'Muli-SemiBold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CouponView: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  btnCoupon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal:15,
    margin: 3,
  },
  closeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center',
    backgroundColor: '#fe491a',
  },
  btnView: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  line: {flexDirection: 'row'},
  leftLine: {
    backgroundColor: 'black',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  lineText: {alignSelf: 'center', paddingHorizontal: 5, fontSize: 24},
  rightLine: {
    backgroundColor: 'black',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  action: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
    fontFamily: 'Muli-Regular',
  },
  textInput: {
    fontSize:14,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    marginBottom: -10,
    borderBottomWidth:0,
    color: '#333',
    fontFamily: 'Muli-Regular',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 13,
    fontFamily: 'Muli-Regular',
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
  signIn: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 14,
    fontFamily: 'Muli-Bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  color_textPrivate: {
    color: '#333',
    fontSize:12,
    fontFamily: 'Muli-SemiBold',
  },
});