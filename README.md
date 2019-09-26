# react-native-mentions-editor [![npm version](https://badge.fury.io/js/react-native-mentions-editor.svg)](https://badge.fury.io/js/react-native-mentions-editor)
Mentions textbox for React Native. Tested on iOS and should work on Android as well. Because it's a plain Javascript base solution with some react-native input support. 
Required react-native version >= 0.59   - Inspiration [react-native-mentions](https://github.com/harshq/react-native-mentions)


## Installation

```yarn add react-native-mentions-editor```
or
```npm install --save react-native-mentions-editor```


## Demo

![alt text](screens/mention1.gif "Screenshots")
![alt text](screens/mention2.gif "Screenshots")

## Usage

```js
import Editor, {displayTextWithMentions} from 'react-native-mentions-editor';
const users = [ 
    { "id": 1, "name": "Raza Dar", "username": "mrazadar", "gender": "male"},
    { "id": 3, "name": "Atif Rashid", "username": "atif.rashid", "gender": "male"},
    { "id": 4, "name": "Peter Pan", "username": "peter.pan", "gender": "male"},
    { "id": 5, "name": "John Doe", "username": "john.doe", "gender": "male"}, 
    { "id": 6, "name": "Meesha Shafi", "username": "meesha.shafi", "gender": "female"}
];
<Editor 
    list={users} 
    initialValue={this.state.initialValue}
    clearInput={this.state.clearInput}
    onChange={this.onChangeHandler}
    showEditor={this.state.showEditor}
    toggleEditor={this.toggleEditor}
    showMentions={this.state.showMentions}
    onHideMentions={this.onHideMentions}
/>

const formatMentionNode = (txt, key)=> (
  <Text key={key} style={styles.mention}>
      {txt}
  </Text>
)

<Text style={styles.messageText}>
    {displayTextWithMentions(message.text, formatMentionNode)}
</Text>
```
## How it works 

This component used special mark-up `@[username](id:1)` to differentiate mentions in the input value. 
Whenever input value change the `onChange` callback will be called, with an object containing two properties. 

```js 
this.props.onChange({
    displayText: text,// displayText: "Hey @mrazadar this is good work"
    text: this.formatTextWithMentions(text) //text: "Hey @[mrazadar](id:1) this is good work" 
});
```

`displayText` Will have raw text user will see on the screen. You can see that in the comment. 
`text` Will have formatted text with some markup to parse mentions on the server and other clients. There is a function called `displayTextWithMentions` you can use this function to parse this mark-up with the parser function (Which format the mention node according to formatter function. Check the example app). 


## Props

`list: array` This should be the list of objects to be used as options for the mentions list. **Note** This must container `id` and `username` properties to uniqely identify object in the list. 

`initialValue: string` Use this to initialize TextInput with the initial value. 

`clearInput: bool` When true input will be clear automatically. 

`onChange: function` This function will be called on input change event.  

`showEditor: bool` Programmatically show/hide editor by using this property. 

`toggleEditor: function` Use this to handle `blur` event on input. 

`showMentions: bool` Use this property to programmatically trigger the `mentionsList` this will add `@` character in the value.

`onHideMentions: function` This callback will be called when user stop tracking of mention. 

`placholder: string` Placholder for empty input. 

`eidtorStyles: object` This object will contain the overriding styles for different nodes. Check the below object to see how you can override styles. 

```js 
eidtorStyles: {
    mainContainer: {}, 
    editorContainer: {...}, 
    inputMaskTextWrapper: {},
    inputMaskText: {},
    input: {},
    mentionsListWrapper:{},
    mentionListItemWrapper: {} 
    mentionListItemTextWrapper: {},
    mentionListItemTitle: {}
    mentionListItemUsername: {}
}
```

## Example 

Check full example in the `example` folder. 

## react-Native version support ( >= 0.59 )

- This library only supports RN > 0.58 and above due to `react-native/TextInput.onSelectionChange` function support. Check the example [here](https://github.com/mrazadar/react-native-mentions-editor/example/index.js)

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Muhammad Raza Dar