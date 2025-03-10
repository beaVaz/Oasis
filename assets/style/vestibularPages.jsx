import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginBottom:40,   
    },
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 120, // Ajuste para dispositivos móveis
        height: 120,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1261D7',
        marginBottom: 10,
        textAlign: 'center',
    },
    secondaryText:{
        fontSize: 18,
        fontWeight: '700',
        fontFamily: "Poppins_Bold",
        color:'#1261D7',
        marginBottom: 15,
        textAlign: 'center',
        textTransform: "uppercase",
    },
    subtitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1261D7',
        marginBottom: 18,
        padding:8,
        paddingHorizontal:20,
        textAlign: 'center',
        backgroundColor:'#BAD6FF',
        borderRadius:20,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 22,
        color: '#333',
        textAlign: 'justify',
        marginBottom: 25,
    },

});
