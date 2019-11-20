import React from "react";
import PropTypes from "prop-types";

import {
  View,
  TextInput,
  Text,
  Animated,
  Platform,
  ScrollView
} from "react-native";

import EU from "./EditorUtils";
import styles from "./EditorStyles";
import MentionList from "../MentionList";

export class Editor extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    initialValue: PropTypes.string,
    clearInput: PropTypes.bool,
    onChange: PropTypes.func,
    showEditor: PropTypes.bool,
    toggleEditor: PropTypes.func,
    showMentions: PropTypes.bool,
    onHideMentions: PropTypes.func,
    editorStyles: PropTypes.object,
    placeholder: PropTypes.string,
    renderMentionList: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.mentionsMap = new Map();
    let msg = "";
    let formattedMsg = "";
    if (props.initialValue && props.initialValue !== "") {
      const { map, newValue } = EU.getMentionsWithInputText(props.initialValue);
      this.mentionsMap = map;
      msg = newValue;
      formattedMsg = this.formatText(newValue);
      setTimeout(()=>{
        this.sendMessageToFooter(newValue);
      });
    }
    this.state = {
      clearInput: props.clearInput,
      inputText: msg,
      formattedText: formattedMsg,
      keyword: "",
      textInputHeight: "",
      isTrackingStarted: false,
      suggestionRowHeight: new Animated.Value(0),
      triggerLocation: "anywhere", //'new-words-only', //anywhere
      trigger: "@",
      selection: {
        start: 0,
        end: 0
      },
      menIndex: 0,
      showMentions: false,
      editorHeight: 72,
      scrollContentInset: { top: 0, bottom: 0, left: 0, right: 0 },
      placeholder: props.placeholder || "Type something..."
    };
    this.isTrackingStarted = false;
    this.previousChar = " ";
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.clearInput !== prevState.clearInput) {
      return { clearInput: nextProps.clearInput };
    }

    if (nextProps.showMentions && !prevState.showMentions) {
      const newInputText = `${prevState.inputText}${prevState.trigger}`;
      return {
        inputText: newInputText,
        showMentions: nextProps.showMentions
      };
    }

    if (!nextProps.showMentions) {
      return {
        showMentions: nextProps.showMentions
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (this.state.inputText !== "" && this.state.clearInput) {
      this.setState({
        inputText: "",
        formattedText: ""
      });
      this.mentionsMap.clear();
    }

    if (EU.whenTrue(this.props, prevProps, "showMentions")) {
      //don't need to close on false; user show select it.
      this.onChange(this.state.inputText, true);
    }
  }

  updateMentionsMap(selection, count, shouldAdd) {
    this.mentionsMap = EU.updateRemainingMentionsIndexes(
      this.mentionsMap,
      selection,
      count,
      shouldAdd
    );
  }

  startTracking(menIndex) {
    this.isTrackingStarted = true;
    this.menIndex = menIndex;
    this.setState({
      keyword: "",
      menIndex,
      isTrackingStarted: true
    });
  }

  stopTracking() {
    this.isTrackingStarted = false;
    // this.closeSuggestionsPanel();
    this.setState({
      isTrackingStarted: false
    });
    this.props.onHideMentions();
  }

  updateSuggestions(lastKeyword) {
    this.setState({
      keyword: lastKeyword
    });
  }

  resetTextbox() {
    this.previousChar = " ";
    this.stopTracking();
    this.setState({ textInputHeight: this.props.textInputMinHeight });
  }

  identifyKeyword(inputText) {
    /**
     * filter the mentions list
     * according to what user type with
     * @ char e.g. @billroy
     */
    if (this.isTrackingStarted) {
      let pattern = null;
      if (this.state.triggerLocation === "new-word-only") {
        pattern = new RegExp(
          `\\B${this.state.trigger}[a-z0-9_-]+|\\B${this.state.trigger}`,
          `gi`
        );
      } else {
        //anywhere
        pattern = new RegExp(
          `\\${this.state.trigger}[a-z0-9_-]+|\\${this.state.trigger}`,
          `i`
        );
      }
      const str = inputText.substr(this.menIndex);
      const keywordArray = str.match(pattern);
      if (keywordArray && !!keywordArray.length) {
        const lastKeyword = keywordArray[keywordArray.length - 1];
        this.updateSuggestions(lastKeyword);
      }
    }
  }

  checkForMention(inputText, selection) {
    /**
     * Open mentions list if user
     * start typing @ in the string anywhere.
     */
    const menIndex = selection.start - 1;
    // const lastChar = inputText.substr(inputText.length - 1);
    const lastChar = inputText.substr(menIndex, 1);
    const wordBoundry =
      this.state.triggerLocation === "new-word-only"
        ? this.previousChar.trim().length === 0
        : true;
    if (lastChar === this.state.trigger && wordBoundry) {
      this.startTracking(menIndex);
    } else if (lastChar.trim() === "" && this.state.isTrackingStarted) {
      this.stopTracking();
    }
    this.previousChar = lastChar;
    this.identifyKeyword(inputText);
  }

  getInitialAndRemainingStrings(inputText, menIndex) {
    /**
     * extractInitialAndRemainingStrings
     * this function extract the initialStr and remainingStr
     * at the point of new Mention string.
     * Also updates the remaining string if there
     * are any adjcent mentions text with the new one.
     */
    // const {inputText, menIndex} = this.state;
    let initialStr = inputText.substr(0, menIndex).trim();
    if (!EU.isEmpty(initialStr)) {
      initialStr = initialStr + " ";
    }
    /**
     * remove the characters adjcent with @ sign
     * and extract the remaining part
     */
    let remStr =
      inputText
        .substr(menIndex + 1)
        .replace(/\s+/, "\x01")
        .split("\x01")[1] || "";

    /**
     * check if there are any adjecent mentions
     * subtracted in current selection.
     * add the adjcent mentions
     * @tim@nic
     * add nic back
     */
    const adjMentIndexes = {
      start: initialStr.length - 1,
      end: inputText.length - remStr.length - 1
    };
    const mentionKeys = EU.getSelectedMentionKeys(
      this.mentionsMap,
      adjMentIndexes
    );
    mentionKeys.forEach(key => {
      remStr = `@${this.mentionsMap.get(key).username} ${remStr}`;
    });
    return {
      initialStr,
      remStr
    };
  }

  onSuggestionTap = user => {
    /**
     * When user select a mention.
     * Add a mention in the string.
     * Also add a mention in the map
     */
    const { inputText, menIndex } = this.state;
    const { initialStr, remStr } = this.getInitialAndRemainingStrings(
      inputText,
      menIndex
    );

    const username = `@${user.username}`;
    const text = `${initialStr}${username} ${remStr}`;
    //'@[__display__](__id__)' ///find this trigger parsing from react-mentions

    //set the mentions in the map.
    const menStartIndex = initialStr.length;
    const menEndIndex = menStartIndex + (username.length - 1);

    this.mentionsMap.set([menStartIndex, menEndIndex], user);

    // update remaining mentions indexes
    let charAdded = Math.abs(text.length - inputText.length);
    this.updateMentionsMap(
      {
        start: menEndIndex + 1,
        end: text.length
      },
      charAdded,
      true
    );

    this.setState({
      inputText: text,
      formattedText: this.formatText(text)
    });
    this.stopTracking();
    this.sendMessageToFooter(text);
  };

  handleSelectionChange = ({ nativeEvent: { selection } }) => {
    const prevSelc = this.state.selection;
    let newSelc = { ...selection };
    if (newSelc.start !== newSelc.end) {
      /**
       * if user make or remove selection
       * Automatically add or remove mentions
       * in the selection.
       */
      newSelc = EU.addMenInSelection(newSelc, prevSelc, this.mentionsMap);
    }
    // else{
    /**
     * Update cursor to not land on mention
     * Automatically skip mentions boundry
     */
    // setTimeout(()=>{

    // })
    // newSelc = EU.moveCursorToMentionBoundry(newSelc, prevSelc, this.mentionsMap, this.isTrackingStarted);
    // }
    this.setState({ selection: newSelc });
  };

  formatMentionNode = (txt, key) => (
    <Text key={key} style={styles.mention}>
      {txt}
    </Text>
  );

  formatText(inputText) {
    /**
     * Format the Mentions
     * and display them with
     * the different styles
     */
    if (inputText === "" || !this.mentionsMap.size) return inputText;
    const formattedText = [];
    let lastIndex = 0;
    this.mentionsMap.forEach((men, [start, end]) => {
      const initialStr =
        start === 1 ? "" : inputText.substring(lastIndex, start);
      lastIndex = end + 1;
      formattedText.push(initialStr);
      const formattedMention = this.formatMentionNode(
        `@${men.username}`,
        `${start}-${men.id}-${end}`
      );
      formattedText.push(formattedMention);
      if (
        EU.isKeysAreSame(EU.getLastKeyInMap(this.mentionsMap), [start, end])
      ) {
        const lastStr = inputText.substr(lastIndex); //remaining string
        formattedText.push(lastStr);
      }
    });
    return formattedText;
  }

  formatTextWithMentions(inputText) {
    if (inputText === "" || !this.mentionsMap.size) return inputText;
    let formattedText = "";
    let lastIndex = 0;
    this.mentionsMap.forEach((men, [start, end]) => {
      const initialStr =
        start === 1 ? "" : inputText.substring(lastIndex, start);
      lastIndex = end + 1;
      formattedText = formattedText.concat(initialStr);
      formattedText = formattedText.concat(`@[${men.username}](id:${men.id})`);
      if (
        EU.isKeysAreSame(EU.getLastKeyInMap(this.mentionsMap), [start, end])
      ) {
        const lastStr = inputText.substr(lastIndex); //remaining string
        formattedText = formattedText.concat(lastStr);
      }
    });
    return formattedText;
  }

  sendMessageToFooter(text) {
    this.props.onChange({
      displayText: text,
      text: this.formatTextWithMentions(text)
    });
  }

  onChange = (inputText, fromAtBtn) => {
    let text = inputText;
    const prevText = this.state.inputText;
    let selection = { ...this.state.selection };
    if (fromAtBtn) {
      //update selection but don't set in state
      //it will be auto set by input
      selection.start = selection.start + 1;
      selection.end = selection.end + 1;
    }
    if (text.length < prevText.length) {
      /**
       * if user is back pressing and it
       * deletes the mention remove it from
       * actual string.
       */

      let charDeleted = Math.abs(text.length - prevText.length);
      const totalSelection = {
        start: selection.start,
        end: charDeleted > 1 ? selection.start + charDeleted : selection.start
      };
      /**
       * REmove all the selected mentions
       */
      if (totalSelection.start === totalSelection.end) {
        //single char deleting
        const key = EU.findMentionKeyInMap(
          this.mentionsMap,
          totalSelection.start
        );
        if (key && key.length) {
          this.mentionsMap.delete(key);
          /**
           * don't need to worry about multi-char selection
           * because our selection automatically select the
           * whole mention string.
           */
          const initial = text.substring(0, key[0]); //mention start index
          text = initial + text.substr(key[1]); // mentions end index
          charDeleted = charDeleted + Math.abs(key[0] - key[1]); //1 is already added in the charDeleted
          // selection = {
          //     start: ((charDeleted+selection.start)-1),
          //     end: ((charDeleted+selection.start)-1)
          // }
          this.mentionsMap.delete(key);
        }
      } else {
        //multi-char deleted
        const mentionKeys = EU.getSelectedMentionKeys(
          this.mentionsMap,
          totalSelection
        );
        mentionKeys.forEach(key => {
          this.mentionsMap.delete(key);
        });
      }
      /**
       * update indexes on charcters remove
       * no need to worry about totalSelection End.
       * We already removed deleted mentions from the actual string.
       * */
      this.updateMentionsMap(
        {
          start: selection.end,
          end: prevText.length
        },
        charDeleted,
        false
      );
    } else {
      //update indexes on new charcter add

      let charAdded = Math.abs(text.length - prevText.length);
      this.updateMentionsMap(
        {
          start: selection.end,
          end: text.length
        },
        charAdded,
        true
      );
      /**
       * if user type anything on the mention
       * remove the mention from the mentions array
       * */
      if (selection.start === selection.end) {
        const key = EU.findMentionKeyInMap(
          this.mentionsMap,
          selection.start - 1
        );
        if (key && key.length) {
          this.mentionsMap.delete(key);
        }
      }
    }

    this.setState({
      inputText: text,
      formattedText: this.formatText(text)
      // selection,
    });
    this.checkForMention(text, selection);
    // const text = `${initialStr} @[${user.username}](id:${user.id}) ${remStr}`; //'@[__display__](__id__)' ///find this trigger parsing from react-mentions

    this.sendMessageToFooter(text);
  };

  onContentSizeChange = evt => {
    /**
     * this function will dynamically
     * calculate editor height w.r.t
     * the size of text in the input.
     */
    if (evt) {
      // const iosTextHeight = 20.5
      const androidTextHeight = 20.5;
      // const textHeight = Platform.OS === 'ios' ? iosTextHeight : androidTextHeight

      const height =
        Platform.OS === "ios"
          ? evt.nativeEvent.contentSize.height
          : evt.nativeEvent.contentSize.height - androidTextHeight;
      let editorHeight = 40;
      editorHeight = editorHeight + height;
      this.setState({
        editorHeight
      });
    }
  };

  render() {
    const { props, state } = this;
    const { editorStyles = {} } = props;

    if (!props.showEditor) return null;

    const mentionListProps = {
      list: props.list,
      keyword: state.keyword,
      isTrackingStarted: state.isTrackingStarted,
      onSuggestionTap: this.onSuggestionTap.bind(this),
      editorStyles
    };

    return (
      <View styles={editorStyles.mainContainer}>
        {props.renderMentionList ? (
          props.renderMentionList(mentionListProps)
        ) : (
          <MentionList
            list={props.list}
            keyword={state.keyword}
            isTrackingStarted={state.isTrackingStarted}
            onSuggestionTap={this.onSuggestionTap}
            editorStyles={editorStyles}
          />
        )}
        <View style={[styles.container, editorStyles.mainContainer]}>
          <ScrollView
            ref={scroll => {
              this.scroll = scroll;
            }}
            onContentSizeChange={() => {
              this.scroll.scrollToEnd({ animated: true });
            }}
            style={[styles.editorContainer, editorStyles.editorContainer]}
          >
            <View style={[{ height: this.state.editorHeight }]}>
              <View
                style={[
                  styles.formmatedTextWrapper,
                  editorStyles.inputMaskTextWrapper
                ]}
              >
                {state.formattedText !== "" ? (
                  <Text
                    style={[styles.formmatedText, editorStyles.inputMaskText]}
                  >
                    {state.formattedText}
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.placeholderText,
                      editorStyles.placeholderText
                    ]}
                  >
                    {state.placeholder}
                  </Text>
                )}
              </View>
              <TextInput
                ref={input => props.onRef && props.onRef(input)}
                style={[styles.input, editorStyles.input]}
                multiline
                autoFocus
                numberOfLines={100}
                name={"message"}
                value={state.inputText}
                onBlur={props.toggleEditor}
                onChangeText={this.onChange}
                selection={this.state.selection}
                selectionColor={"#000"}
                onSelectionChange={this.handleSelectionChange}
                placeholder={state.placeholder}
                onContentSizeChange={this.onContentSizeChange}
                scrollEnabled={false}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Editor;
