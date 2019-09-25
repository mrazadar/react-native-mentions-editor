import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {                
        // paddingVertical: Metrics.baseMargin,
        backgroundColor: "#fff",
        
        // height: 72,
        // alignSelf: 'center',
        // borderWidth: 1,
        borderColor: "green",
         borderWidth: 1,
         width:300
        // backgroundColor: Colors.$teal,
    },
    textContainer: {
        alignSelf: 'stretch',
        
        position: 'relative',
        minHeight: 40,
        maxHeight: 140,
        // flex: 1,
        // flexGrow: 1,
        //  borderWidth: 1,
        // backgroundColor: Colors.$blue05,
    },
    input: {
        // ...Fonts.style.medium,
        fontSize: 16,

        color: '#000',
        fontWeight: '400',
        paddingHorizontal: 20,
        minHeight: 40,
        // maxHeight: 140,
        position: 'absolute',
        top: 0,
        color: 'transparent',
        alignSelf: 'stretch',
        width: '100%',
        
        // borderWidth: 1,
        // backgroundColor: Colors.$orange,
    },
    formmatedTextWrapper: {
        minHeight: 40,
        // maxHeight: 140,
        position: 'absolute',
        top: 0,
        // top: 30,
        // color: 'transparent',
        paddingHorizontal: 20,
        paddingVertical: 5,
        width: "100%",
        // backgroundColor: 'green'
        // backgroundColor: 'transparent'
    },
    formmatedText: {
        fontSize: 16,
        fontWeight: '400',                
    },
    mention: {
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: 'rgba(36, 77, 201, 0.05)',
        color: '#244dc9',
    },


     
})
