import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import EnemModal from './EnemModal';

interface Prova {
  ano: string;
  imagem: any;
}

const provasEnem: Prova[] = [
  { ano: '2023', imagem: require('../assets/images/enem/enem2023.png') },
  { ano: '2022', imagem: require('../assets/images/enem/enem2022.png') },
  { ano: '2021', imagem: require('../assets/images/enem/enem2021.png') },
  { ano: '2020', imagem: require('../assets/images/enem/enem2020.png') },
  { ano: '2019', imagem: require('../assets/images/enem/enem2019.png') },
  { ano: '2017', imagem: require('../assets/images/enem/enem2017.png') },
];

export default function EnemLista() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProva, setSelectedProva] = useState<Prova | null>(null);

  const [fontsLoaded] = useFonts({
    Poppins_Regular: require('../assets/fonts/poppins/Poppins-Regular.ttf'),
    Poppins_Bold: require('../assets/fonts/poppins/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const openModal = (prova: Prova) => {
    setSelectedProva(prova);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProva(null);
  };

  return (
    <View style={styles.containerMain}>
      <Text style={styles.title}>Provas do ENEM</Text>

      <View style={styles.section}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {provasEnem.map((prova) => (
            <Pressable key={prova.ano} onPress={() => openModal(prova)} style={styles.imageContainer}>
              <Image
                source={prova.imagem}
                style={styles.provaImage}
                accessibilityLabel={`Prova ENEM ${prova.ano}`}
              />
              <Text style={styles.anoTexto}>{prova.ano}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {selectedProva && (
        <EnemModal
          visible={modalVisible}
          prova={selectedProva}
          onClose={closeModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_Bold',
    paddingLeft: 20,
    marginBottom: 10,
  },
  section: {
    paddingVertical: 12,
    paddingLeft: 10,
  },
  imageContainer: {
    marginRight: 16,
    alignItems: 'center',
  },
  provaImage: {
    width: 160,
    height: 220,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  anoTexto: {
    marginTop: 5,
    fontFamily: 'Poppins_Regular',
    fontSize: 14,
    color: '#333',
  },
});
