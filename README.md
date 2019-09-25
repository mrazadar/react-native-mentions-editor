# react-native-mentions-editor [![npm version](https://badge.fury.io/js/react-native-mentions-editor.svg)](https://badge.fury.io/js/react-native-mentions-editor)
Mentions textbox for React Native. Tested on iOS and should work on Android as well. Because it's a plain Javascript base solution with some react-native input support. 
Required react-native version >= 0.59   

## Demo

![alt text](screens/screen1.gif "Screenshots")
![alt text](screens/screen2.gif "Screenshots")

## Installation

```yarn add react-native-mentions-editor```
or
```npm install --save react-native-mentions-editor```

## Usage

```js
import Editor, {displayTextWithMentions} from 'react-native-mentions-editor';
    const users = [ 
        { "id": 1, "name": "Raza Dar", "username": "mrazadar", "gender": "male"},
        { "id": 2, "name": "Peter Pan", "username": "peter.pan", "gender": "male"},
        { "id": 3, "name": "John Doe", "username": "john.doe", "gender": "male"}, 
        { "id": 4, "name": "Meesha Shafi", "username": "meesha.shafi", "gender": "female"}
    ];
    <Editor 
        list={users}  //pass the list of mentions 
        message={this.state.message} 
        clearInput={this.state.clearInput}
        onChange={this.onChangeHandler}
        showEditor={this.state.showEditor}
        toggleEditor={this.toggleEditor}
        showMentions={this.state.showMentions}
        onHideMentions={this.onHideMentions}
    />       
```

## Example 

Check full example in the `example` folder. 

## react-Native version support ( >= 0.59 )

- This library only supports RN > 0.58 and above due to react-native/TextInput.onSelectionChange function support. Check the example [here](https://github.com/mrazadar/react-native-mentions-editor/example/index.js)

- `SuggestionsDataSource` prop is renamed to `suggestionsData`. This now accepts an array of objects. DataSource, No more!

- `SuggestionsPanelHeight` prop is renamed to `suggestionRowHeight` in order to support vertical lists. 


## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Muhammad Raza Dar