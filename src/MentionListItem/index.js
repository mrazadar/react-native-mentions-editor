import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";

// Styles
import styles from "./MentionListItemStyles";

import Avatar from "../Avatar";

export class MentionListItem extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onSuggestionTap: PropTypes.func,
    editorStyles: PropTypes.object
  };

  onSuggestionTap = (user, hidePanel) => {
    this.props.onSuggestionTap(user);
  };

  render() {
    const { item: user, index, editorStyles } = this.props;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.suggestionItem, editorStyles.mentionListItemWrapper]}
          onPress={() => this.onSuggestionTap(user)}
        >
          <Avatar
            user={user}
            wrapperStyles={styles.thumbnailWrapper}
            charStyles={styles.thumbnailChar}
          />

          <View style={[styles.text, editorStyles.mentionListItemTextWrapper]}>
            <Text style={[styles.title, editorStyles.mentionListItemTitle]}>
              {user.name}
            </Text>
            <Text
              style={[styles.username, editorStyles.mentionListItemUsername]}
            >
              @{user.username}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MentionListItem;
