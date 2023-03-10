import {StyleSheet, Platform, Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ContactForm: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  txtContactUs: {
    justifyContent: 'center',
    fontFamily: 'Coyote-SemiBoldDEMO',
    alignItems: 'center',
    fontSize: 35,
    // fontWeight: 'bold',
    paddingTop: 5,
    color: '#fe491a',
  },
  txtHeading: {
    fontSize: 16,
    fontFamily: 'Coyote-SemiBoldDEMO',
    paddingVertical: 5,
    color: '#fe491a',
    borderBottomWidth: 0.8,
    borderColor: '#fe491a',
  },
  txtSmall: {
    fontSize: 14,
    fontFamily: 'Muli-SemiBold',
    // alignSelf:'flex-start',
    alignSelf: 'center',
    margin: 10,
    color: '#9C9C99',
  },
  contactdetails: {
    // width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 30,
  },
  txtInfo: {
    fontSize: 14,
    fontFamily: 'Muli-SemiBold',
    alignSelf: 'center',
    padding: 6,
    color: '#9C9C99',
  },
  search: {color: '#fe491a'},
  text: {justifyContent: 'center', alignItems: 'center', fontSize: 25},
  barBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    paddingBottom: 10,
  },
  input: {
    width: '90%',
    // paddingHorizontal: 20,
    // width: Dimensions.get("window").width - 20,
    height: 40,
    borderBottomColor: '#333333',
    paddingTop: 5,
    margin: 2,
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    fontFamily: 'Muli-SemiBold',
    marginBottom: 10,
  },
  inputComment: {
    width: '90%',
    height: 90,
    borderBottomColor: '#333333',
    paddingTop: 5,
    fontFamily: 'Muli-SemiBold',
    margin: 2,
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  postbtn: {
    width: '90%',
  },
  text_footer: {
    color: '#333',
    flex:1,
    alignSelf:'flex-start',
    justifyContent:'flex-start',
    fontSize: 14,
    fontFamily: 'Muli-SemiBold',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    alignSelf: 'center',
    backgroundColor: '#fe491a',
    padding: 10,
    marginTop: 20,
    width: '100%',
    // width: Dimensions.get("window").width - 100,
    textAlign: 'center',
    fontFamily: 'Muli-Bold',
    borderRadius: 4,
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
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
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    borderBottomWidth:0,
    marginBottom: -10,
    color: '#333',
    fontFamily: 'Muli-Regular',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    fontFamily: 'Muli-Regular',
  },
});
