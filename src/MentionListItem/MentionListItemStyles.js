import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    suggestionItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        // marginBottom: 10,  
        // flex:1,
        // justifyContent: 'center',
        // alignItems: 'flex-start',
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.1)',
        height: 50,
        paddingHorizontal: 20,
        // : 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    text: {
        alignSelf: 'center',
        marginLeft: 12,
    },
    title: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.8)',
    },
    thumbnailWrapper: {
        width: 35,
        height: 35,
    },
    thumbnailChar: {
        fontSize: 16
    },    
})
