import {StyleSheet, Platform} from 'react-native';
export const styles = StyleSheet.create({
  HeadText1: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Muli-Bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginTop: -22,
  },
  instructions: {
    color: '#333',
    fontSize: 12,
    fontFamily: 'Muli-Regular',
    padding: 10,
    marginBottom: 7,
    backgroundColor: 'rgba(244, 243, 243, 0.9)',
    borderRadius: 6
  },
  crossBtn: {
    alignSelf: 'flex-end',
  },
  button: {
    height: 50,
    width: '50%',
    justifyContent: 'center',
    backgroundColor: '#fe491a',
  },
  ImagePickerBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#333',
    margin: 10,
  },
  poppitImageViewAdd: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'center',
    backgroundColor: '#eee',
    width: 80,
    height: 80,
  },
  poppitImageView: {
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    marginBottom: 5,
  },
  btnView: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  poppitImage: {
    flexWrap:'wrap',
    // marginLeft:5,
    // marginHorizontal: 2,
    // marginVertical:12,
    width: 60,
    height: 60,
    // borderRadius: 10,
    // borderWidth: 5,
    // borderColor: '#333',
  },
  textInput: {
    fontSize:14,
    color: '#333',
    fontFamily: 'Muli-Regular',
    padding: 10,
  },
  text_footer: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Muli-Bold',
  },
  text1: {
    color: '#0000CD',
    fontSize: 12,
    fontFamily: 'Muli-Bold',
    paddingTop: 5,
  },
  action: {
    marginBottom: 15,
    marginTop: 15,
  },
  InputHolder: {
    height: 100,
    minHeight: 100,
    borderRadius: 6,
    borderWidth:1,
    borderColor: '#ddd',
    backgroundColor: '#f3f3f3'
  },
  headingHolder: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Muli-Regular',
    textAlign: 'center',
    padding: 2,
  },
  imgStyle: {
    width: 20,
    marginLeft: -20,
    height: 20,
    backgroundColor: '#333',
    borderRadius: 50,
  },
});
