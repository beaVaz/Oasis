import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const vestibulares = [
  { id: "1", nome: "ENEM", rota: "/vestibulares/enem" },
  { id: "2", nome: "Fuvest", rota: "/vestibulares/fuvest" },
  { id: "3", nome: "Unicamp", rota: "/vestibulares/unicamp" },
];

export default function Vestibulares() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F8F8F8" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Vestibulares</Text>
      <Text style={{ fontSize: 16, color: "#666", marginBottom: 20 }}>
        Selecione um vestibular para mais informações.
      </Text>

    
    </View>
  );
}
