import { StyleSheet, Dimensions } from "react-native";
import { ApplicationStyles } from "../../Themes/";
// import Colors from '../../Themes/Colors'

const { width, height } = Dimensions.get("window");
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  main: {
    flex: 1,

    backgroundColor: "#fff",
    height: screenHeight,

    marginTop: 100
  },
  container: {
    height: screenHeight,

    alignItems: "center",
    justifyContent: "space-between"
  },
  header: {
    // height: 200,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold"
    // color: 'green'
  },
  sub: {
    color: "rgba(0, 0, 0, 0.4)",
    fontSize: 12,
    textAlign: "center"
  },
  messageList: {
    paddingVertical: 50
  },
  messageText: {},

  footer: {
    backgroundColor: "lightgreen",
    height: 200,
    width: screenWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 100,
    padding: 15
  },
  sendBtn: {
    width: 50,
    height: 40,
    backgroundColor: "green",
    borderRadius: 6,
    marginLeft: 5,
    justifyContent: "center",
    textAlign: "center"
  },
  sendBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  },
  mention: {
    fontSize: 16,
    fontWeight: "400",
    backgroundColor: "rgba(36, 77, 201, 0.05)",
    color: "#244dc9"
  }
});
