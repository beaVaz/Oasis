import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: '#1261D7',
        position: 'relative', 
        zIndex: 0,
    },
    container: {
        height: '60%',
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        position: 'absolute', 
        bottom: 0,
        zIndex: 1, 
        borderTopLeftRadius: 50,  
        backgroundColor:'#FAFAFA',
        padding: 30,
        
    },
    mainTitle:{
        color:'#000',
        fontSize: 30,
        fontWeight:600,
        letterSpacing:1,
        marginBottom: 5,
      
    },
    subtitle:{
        fontSize:16,
    },
    button: {
        flexDirection: "row", 
        padding: 20,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: '#1261D7',
      },
      buttonImage: {
        width: 180,
        marginRight: 10,
      },
      infoTestBottons:{
        flexDirection:'row',
        gap: 30,
      },
     
      
});
