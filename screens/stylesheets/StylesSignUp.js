import { StyleSheet, Dimensions, Platform } from "react-native";

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 0 : 35
  },
  HeadView: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#333',
  },
  DrawerIconTop: {
    flex: 1,
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
  },
  loginText: {
    color: '#fff',
    fontFamily: 'lexio',
    margin: 10,
    fontSize: 14,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loginIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CartLogin: {flexDirection: 'row'},
  CartIcon: {marginRight: 5, flexDirection: 'row'},
  DrawerIconView: {
    marginTop: Platform.OS === 'android' ? 0 : 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  logoimgbox: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoimg: {
    width: 150,
    height: 24,
  },
  view1: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "center",
    backgroundColor: "#333"
  },
  view2: { flex: 4, paddingHorizontal: 20, paddingVertical: 20 },
  view3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  isAccount: {
    fontSize: 13,
    marginTop: 12,
    alignSelf: "center",
    fontFamily: "Muli-Regular"
  },
  rememberText: {
    fontSize: 12,
    fontFamily: "Muli-Bold",
    textAlign: "left",
    marginLeft: -20,
    color: "#535c68",
    marginBottom: 2
  },
  textSmall: { fontSize: 12, textAlign: "center", fontFamily: "Muli-Regular" },
  textDetailed: {
    fontSize: 14,
    fontFamily: "Muli-Regular",
    textAlign: "justify"
  },
  textPolicy: {
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
    fontFamily: "Muli-Regular"
  },
  textTerms: {
    fontSize: 22,
    fontFamily: "Muli-Black",
    textAlign: "center",
    marginTop: 20
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    backgroundColor: "#fe491a",
    padding: 10,
    marginTop: 20,
    width: '100%',
    // width: Dimensions.get("window").width - 40,
    textAlign: "center",
    borderRadius: 4
  },
  input: {
    width: '100%',
    // width: Dimensions.get("window").width - 40,
    height: 40,
    borderBottomColor: "#333333",
    padding: 5,
    margin: 2,
    alignItems: "center",
    alignSelf: "center",
    borderBottomWidth: 0.5,
    marginBottom: 10
  },
  passwordInput: {
    fontSize: 20
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000041",
  },
  activityIndicatorHolder: {
    color: "#0000ff",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  texthead: {
    margin: 5,
    justifyContent: "center",
    fontSize: 12,
    color: '#fe491a',
    fontFamily: "Coyote-SemiBoldDEMO",
    letterSpacing: 2,
    alignItems: "center",
    alignSelf: "center",
  },
  containerpass: { flex: 1, justifyContent: "center" }
});
