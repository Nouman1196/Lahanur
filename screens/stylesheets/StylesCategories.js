import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  btnText: {color: '#fff', fontSize: 12, fontFamily: 'Muli-SemiBold',},
  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
    flexGrow: 1,
  },
  ImageMain: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: -40,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderWidth:0,
  },
  boxContainer: {
    marginHorizontal: 4,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderWidth:0,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    borderBottomEndRadius:10,
    borderBottomStartRadius:10,
    borderWidth:0,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    padding: 10,
    backgroundColor: 'rgba(6,6,6,.8)',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 4,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleView: {
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
});
