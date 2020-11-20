import { StyleSheet } from "react-native";

const editorMinHeight = 36

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderColor: "green",
    borderWidth: 1,
    width: 300
  },
  textContainer: {
    alignSelf: "stretch",
    position: "relative",
    minHeight: editorMinHeight,
    maxHeight: 140
  },
  input: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
    paddingHorizontal: 20,
    minHeight: editorMinHeight,
    position: "absolute",
    top: 0,
    color: "transparent",
    alignSelf: "stretch",
    width: "100%"
  },
  formmatedTextWrapper: {
    minHeight: editorMinHeight,
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
    backgroundColor: "rgba(36, 77, 201, 0.05)",
    color: "#244dc9"
  },
  placeholderText: {
    color: "rgba(0, 0, 0, 0.1)",
    fontSize: 16
  }
});
