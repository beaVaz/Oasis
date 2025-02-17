import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import ColorList from "../../../components/ColorList";
import StyleOfIndex from "../../../assets/style/home";

export default function Index() {
  const router = useRouter(); 

  return (
    <View style={StyleOfIndex.background}>
      <View style={StyleOfIndex.container}>
        <Text style={StyleOfIndex.mainTitle}>Vestibulares</Text>
        <Text style={StyleOfIndex.subtitle}>Os vestibulares mais concorridos</Text>
        <View style = {StyleOfIndex.infoTestBottons}>
            
        {/* Botão com Imagem */}
        <Pressable style={StyleOfIndex.button} onPress={() => router.push("/pages/main/pagesRoot/vestibulares")}>
          <Image source={require("../../../assets/images/enem/image3.png")} style={StyleOfIndex.buttonImage} />
        </Pressable>

        <Pressable style={StyleOfIndex.button} onPress={() => router.push("/pages/main/pagesRoot/vestibulares")}>
          <Image source={require("../../../assets/images/enem/image3.png")} style={StyleOfIndex.buttonImage} />
        </Pressable>

        <Pressable style={StyleOfIndex.button} onPress={() => router.push("/pages/main/pagesRoot/vestibulares")}>
          <Image source={require("../../../assets/images/enem/image3.png")} style={StyleOfIndex.buttonImage} />
        </Pressable>
        
        <Pressable style={StyleOfIndex.button} onPress={() => router.push("/pages/main/pagesRoot/vestibulares")}>
          <Image source={require("../../../assets/images/enem/image3.png")} style={StyleOfIndex.buttonImage} />
        </Pressable>
    </View>
</View>
        <View>
      </View>
    </View>
  );
}
