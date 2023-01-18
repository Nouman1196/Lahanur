import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F9E8E5',
    backgroundColor:'#333'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    // paddingHorizontal: 20,
    // paddingVertical: 40
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header: {
    color: '#fe491a',
    fontSize: 45,
    textAlign: 'center',
    fontFamily: 'enchanting',
  },
  text_footer: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Muli-Bold',
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
