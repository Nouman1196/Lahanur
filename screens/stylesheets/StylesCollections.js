import { StyleSheet, Platform, Dimensions } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  CartLogin: { flexDirection: "row" },
  CartIcon: { marginRight: 20 },
  search: {
    color: "#fe491a"
  },
  ImageMain: {
    height: 190,
    width: '99%',
    alignSelf: "center",
    borderWidth:2,
    borderColor:'#333',
  },
  CategoriesView: {
    margin: 2,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 4,
    padding: 8,
    marginTop:78,
    backgroundColor: "rgba(5,5,4,.6)",
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    width: 230,
  },
  btnText: {
    color: "#fff",
    fontSize: 11,
    letterSpacing: 1,
    fontFamily: 'Muli-Bold',
    textTransform:'uppercase'
  },
});
