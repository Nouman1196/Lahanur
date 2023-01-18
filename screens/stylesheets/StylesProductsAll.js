import { StyleSheet, Platform, Dimensions } from "react-native";

const marginHorizontal = 4;
const marginVertical = 4;
export const styles = StyleSheet.create({
  ButtonsViewFilter: {
    height:40,
    justifyContent: "center",
    alignSelf: "center",
    width: Dimensions.get("window").width - 240,
  },
  btnFilter: {
    alignItems: "center",
    backgroundColor: "#333",
    borderWidth: 2,
    borderColor: "#333",
    paddingHorizontal:15,
    paddingVertical:5,
    marginHorizontal:5,
    flex: 1,
    justifyContent: "center"
  },
  btnFilter1: {
    alignItems: "center",
    backgroundColor: "#333",
    borderWidth: 2,
    // borderRadius: 3,
    borderColor: "#333",
    paddingVertical: 0.5,
    paddingHorizontal: 15,
    marginRight: 5,
  },
  btnText4: {
    color: "#fe491a",
    fontSize: 12,
    fontFamily:'Muli-SemiBold',
    justifyContent: "center",
    alignItems: "center"
  },
  HeadText1: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Muli-Bold",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center"
  },
  HeadView1: {
    height: 50,
    backgroundColor: "#333",
    justifyContent: "center"
  },
  joinText: {
    fontFamily: 'Muli-SemiBold',
    padding: 3,
    fontSize: 16,
    alignItems: "center",
    color: "#fe491a"
  },
  slider: {
    marginTop: 20,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  },
  dropdownView: {
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    marginTop: 20,
    width: Dimensions.get("window").width - 80
  },
  btnText: {
    color: "#fff",
    fontSize: 10,
    letterSpacing: 2,
    fontFamily: "Muli-Bold",
    textTransform: "uppercase"
  },
  btnView: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  closeBtn: {
    height: 30,
    paddingHorizontal:15,
    margin: 12,
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "#fe491a"
  },
  closeBtn1: {
    height: 30,
    paddingHorizontal:15,
    margin: 12,
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "#333"
  },
  Apply: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    padding: 3,
    fontSize: 18,
    alignItems: "center",
    color: "#fff"
  },
  button: {
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    padding: 10,
    backgroundColor: "rgba(6,6,6,.8)",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 80,
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    justifyContent: "center",
    alignItems: "center"
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    padding: 0,
    margin: 0,
  },
  iconsLeft: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  FiltersIcon: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconsRight: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10
  },
  IconText: {
    color: "#333",
    marginBottom: 10,
    fontSize: 16
  },
  FiltersView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  IconText1: {
    color: "#333",
    marginRight: 5,
    fontSize: 14,
    alignSelf: "center"
  },
  prodbox: {
    marginVertical: 20,
  },
  ImageMain: {
    alignItems: "center",
    alignSelf: "center",
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
  boxContainer: {
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    color: "#333333",
    fontSize: 10,
    fontFamily: "Muli-Bold",
    textAlign: "left"
  },
  iconsPost: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  iconsLeftProduct: {
    flex: 1,
    justifyContent: "center"
  },
  iconsRightHeart: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    // flex: 0,
    justifyContent: "center",
    // alignItems: "flex-end"
  },
  twoIcons: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center"
  },
  twoIconsChildView: {
    flex: 1,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff'
  },
  twoIconsChildView1: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: 20,
  },
  IconTextProduct: {
    color: "#707374",
    fontSize: 10,
    fontFamily: "Muli-Regular",
  },
  logoimgbox: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoimg: {
    width: 150,
    height: 24,
  },
  buttonOver: {
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
    marginTop: 100,
  },
});
