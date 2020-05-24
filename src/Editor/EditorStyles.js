import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    
    borderColor: "green",
    borderWidth: 1,
    width: 300
  },
  textContainer: {
    alignSelf: "stretch",
    position: "relative",
    minHeight: 40,
    maxHeight: 140
  },
  input: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
    paddingHorizontal: 20,
    minHeight: 40,
    position: "absolute",
    top: 0,
    alignSelf: "stretch",
    width: "100%",
    height: '100%' // added for android
  },
  formmatedTextWrapper: {
    minHeight: 40,
    position: "absolute",
    top: 0,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "100%"
  },
  formmatedText: {
    fontSize: 16,
    fontWeight: "400"
  },
  mention: {
    fontSize: 16,
    fontWeight: "400",
    color: "#244dc9"
  },
  placeholderText: {
    color: "rgba(0, 0, 0, 0.1)",
    fontSize: 16
  }
});
