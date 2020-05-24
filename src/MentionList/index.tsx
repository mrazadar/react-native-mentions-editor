import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, FlatList, Animated, View, ScrollViewProps } from "react-native";

import MentionListItem from "../MentionListItem";
// Styles
import styles from "../MentionList/MentionListStyles";

interface Props {
  list: any,
  editorStyles: any,
  isTrackingStarted: boolean,
  suggestions: any,
  keyword: string,
  onSuggestionTap: Function
  mentionsListProps: ScrollViewProps
}

export class MentionList extends React.PureComponent<Props> {
  static propTypes = {
    list: PropTypes.array,
    editorStyles: PropTypes.object,
    isTrackingStarted: PropTypes.bool,
    suggestions: PropTypes.array,
    keyword: PropTypes.string,
    onSuggestionTap: PropTypes.func
  };

  previousChar = " ";

  renderSuggestionsRow = ({ item }) => {
    return (
      <MentionListItem
        onSuggestionTap={this.props.onSuggestionTap}
        item={item}
        editorStyles={this.props.editorStyles}
      />
    );
  };
  render() {
    const { props } = this;

    const { keyword, isTrackingStarted } = props;
    const withoutAtKeyword = keyword.substr(1, keyword.length);
    const list = this.props.list;
    const suggestions =
      withoutAtKeyword !== ""
        ? list.filter(user => user.username.includes(withoutAtKeyword))
        : list;
    if (!isTrackingStarted) {
      return null;
    }
    return (
      <Animated.View
        style={[
          { ...styles.suggestionsPanelStyle },
          this.props.editorStyles.mentionsListWrapper
        ]}
      >
        <FlatList
          {...props.mentionsListProps}
          style={styles.mentionsListContainer}
          keyboardShouldPersistTaps={"always"}
          ListEmptyComponent={
            <View style={styles.loaderContainer}>
              <ActivityIndicator />
            </View>
          }
          //enableEmptySections={true}
          data={suggestions}
          keyExtractor={(item: any, index: number) => `${item.id}-${index}`}
          renderItem={rowData => {
            return this.renderSuggestionsRow(rowData);
          }}
        />
      </Animated.View>
    );
  }
}

export default MentionList;
