import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const dadosGabaritos: Record<string, { categoria: string; questao: number; resposta: string }[]> = {
  '2023': [
    { categoria: 'Linguagens', questao: 1, resposta: 'B' },
    { categoria: 'Linguagens', questao: 2, resposta: 'D' },
    { categoria: 'Linguagens', questao: 3, resposta: 'B' },
    { categoria: 'Linguagens', questao: 4, resposta: 'B' },
    { categoria: 'Linguagens', questao: 5, resposta: 'A' },
    { categoria: 'Exatas', questao: 1, resposta: 'A' },
    { categoria: 'Exatas', questao: 2, resposta: 'B' },
    { categoria: 'Exatas', questao: 3, resposta: 'B' },
    { categoria: 'Exatas', questao: 4, resposta: 'A' },
    { categoria: 'Exatas', questao: 5, resposta: 'B' },
    { categoria: 'Humanas', questao: 1, resposta: 'C' },
    { categoria: 'Humanas', questao: 2, resposta: 'A' },
    { categoria: 'Humanas', questao: 3, resposta: 'D' },
    { categoria: 'Humanas', questao: 4, resposta: 'B' },
    { categoria: 'Humanas', questao: 5, resposta: 'C' },
    { categoria: 'Natureza', questao: 1, resposta: 'B' },
    { categoria: 'Natureza', questao: 2, resposta: 'C' },
    { categoria: 'Natureza', questao: 3, resposta: 'A' },
    { categoria: 'Natureza', questao: 4, resposta: 'D' },
    { categoria: 'Natureza', questao: 5, resposta: 'A' },
  ],
};

export default function GabaritoEnemScreen() {
  const { ano } = useLocalSearchParams<{ ano: string }>();
  const gabarito = ano ? dadosGabaritos[ano] || [] : [];
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>('Linguagens');
  const [feedbackAnimado] = useState(new Animated.Value(0));

  const categorias = Array.from(new Set(gabarito.map((item) => item.categoria)));
  const gabaritoFiltrado = gabarito.filter((item) => item.categoria === categoriaSelecionada);

  const animarFeedback = () => {
    feedbackAnimado.setValue(0);
    Animated.spring(feedbackAnimado, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  if (!ano) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Ano da prova não especificado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gabarito ENEM {ano}</Text>

      <View style={styles.tabContainer}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.tabButton, categoriaSelecionada === cat && styles.tabSelected]}
            onPress={() => {
              setCategoriaSelecionada(cat);
              animarFeedback();
            }}
          >
            <Text style={[styles.tabText, categoriaSelecionada === cat && styles.tabTextSelected]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View style={{ transform: [{ scale: feedbackAnimado }] }}>
        {gabaritoFiltrado.length > 0 ? (
          gabaritoFiltrado.map((item) => (
            <View key={`${item.categoria}-${item.questao}`} style={styles.itemGabarito}>
              <Text style={styles.questaoNumero}>Questão {item.questao}:</Text>
              <View style={styles.badgeResposta}><Text style={styles.resposta}>{item.resposta}</Text></View>
            </View>
          ))
        ) : (
          <Text style={styles.errorText}>Nenhuma questão encontrada para essa categoria.</Text>
        )}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4FF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1261D7',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#1261D7',
    backgroundColor: '#fff',
  },
  tabSelected: {
    backgroundColor: '#1261D7',
  },
  tabText: {
    fontSize: 16,
    color: '#1261D7',
  },
  tabTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  itemGabarito: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  questaoNumero: {
    fontSize: 18,
    color: '#333',
  },
  badgeResposta: {
    backgroundColor: '#1261D7',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  resposta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
