import { View, Text, TextInput, Pressable, Image, ScrollView, Dimensions, ImageBackground } from "react-native"
import React from "react"
import { useFonts } from "expo-font";
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Estilo from '../../../assets/style/curso'

//pega a altura 
const { height } = Dimensions.get('window');
export default function curso() {

    const [text, onChangeText] = React.useState('');
    const [fontsLoaded] = useFonts({
        'Poppins_Regular': require('../../../assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins_Bold': require('../../../assets/fonts/poppins/Poppins-Bold.ttf')
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return (

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Estilo.formaImg}>
                <ImageBackground
                    source={require('../../../assets/images/formas/formaCurso001.png')} />
            </View>
            <View style={Estilo.main}>
                <View style={Estilo.header}>
                    <View>
                        <Text style={Estilo.title}><h1>Cursos</h1></Text>
                    </View>
                    <View style={Estilo.boxSearch}>
                        <TextInput
                            style={[Estilo.input, { outlineWidth: 0 }]}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Pesquise o nome do curso"
                            keyboardType="emailAddress" />
                        <View style={Estilo.imgSearch}>
                            <Pressable>
                                <Image source={require('../../../assets/images/lupa.png')} />
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={[Estilo.containerMain, { height }]}>


                </View>

            </View>
        </ScrollView>

    )
}
