import React from "react";
import PropTypes from "prop-types";

import { View, Text } from "react-native";

import styles from "./AvatarStyles";

const getFirstChar = str => str.charAt(0).toUpperCase();

const alphabetColors = [
  "#FFD552",
  "#ffca0b",
  "#9C0D05",
  "#E1DB00",
  "#E99600",
  "#E1DB00",
  "#06BC0C",
  "#06BCAE",
  "#0695BC",
  "#0660BC",
  "#3006BC",
  "#6606BC",
  "#c31616",
  "#BC0680",
  "#BC0642",
  "#BC3406",
  "#BCA106",
  "#535322",
  "#497724",
  "#929292",
  "#606060",
  "#262626",
  "#7B9FAB",
  "#1393BD",
  "#5E13BD",
  "#E208A7"
];

const UserThumbnail = props => {
  const { user } = props;
  let name = user && user.name;
  if (!name || name === "") {
    if (user && user.first_name && user.last_name) {
      name = `${user.first_name} ${user.last_name}`;
    } else {
      return null;
    }
  }
  const text = getFirstChar(name);
  const bgIndex = Math.floor(text.charCodeAt(0) % alphabetColors.length);
  const bgColor = alphabetColors[bgIndex];

  const thumbnail = (
    <View
      style={[
        styles.wrapper,
        props.wrapperStyles,
        { backgroundColor: bgColor }
      ]}
    >
      <Text style={[styles.name, props.charStyles]}>{`${text}`}</Text>
    </View>
  );
  return thumbnail;
};

UserThumbnail.propTypes = {
  user: PropTypes.object,
  wrapperStyles: PropTypes.object,
  charStyles: PropTypes.object,
  to: PropTypes.string
};

export default UserThumbnail;
