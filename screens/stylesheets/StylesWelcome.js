import { StyleSheet, Dimensions, Platform } from "react-native";
export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view1: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 5,},
  view2: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20},
  view3: {
    flexDirection: "row",
    flex: 1,
    alignItems:'center',
    paddingHorizontal: 20,
  },
  NotNowView: {
    flex:.3
  },
  bodyText: {
    fontSize: 18,
    padding: 8,
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    fontFamily: 'Muli-Light',
  },
  btnText: { 
    color: "#fff",
    fontSize: 16,
    fontFamily:'Muli-Bold',
    justifyContent: 'center',
  },
  NotNow: {
    color: "#333333",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: "#FF0000",
    fontFamily:'Muli-Bold',
    justifyContent: 'center',
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#FF0000",
    padding: 10,
    flex: 1,
    borderRadius: 4,
    fontFamily:'Muli-Light',
    marginRight: 5
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 10,
    flex: 1,
    borderRadius: 4,
    marginLeft: 5
  },
});
