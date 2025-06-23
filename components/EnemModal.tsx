import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

interface EnemModalProps {
  visible: boolean;
  prova: { ano: string; imagem: any } | null;
  onClose: () => void;
}

const EnemModal: React.FC<EnemModalProps> = ({ visible, prova, onClose }) => {
  if (!prova) return null;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>ENEM {prova.ano}</Text>

          <Link href={`/pages/content/questoesHumanas?ano=${prova.ano}`} asChild>
            <Pressable style={styles.primaryButton} onPress={onClose}>
              <Text style={styles.buttonText}>Ciências Humanas</Text>
            </Pressable>
          </Link>

          <Link href={`/pages/content/questoesNatureza?ano=${prova.ano}`} asChild>
            <Pressable style={styles.primaryButton} onPress={onClose}>
              <Text style={styles.buttonText}>Ciências da Natureza</Text>
            </Pressable>
          </Link>

          <Link href={`/pages/content/questoesLinguagens?ano=${prova.ano}`} asChild>
            <Pressable style={styles.primaryButton} onPress={onClose}>
              <Text style={styles.buttonText}>Códigos e Linguagens</Text>
            </Pressable>
          </Link>

          <Link href={`/pages/content/questoesExatas?ano=${prova.ano}`} asChild>
            <Pressable style={styles.primaryButton} onPress={onClose}>
              <Text style={styles.buttonText}>Ciências Exatas</Text>
            </Pressable>
          </Link>

          <Link href={`/pages/content/gabaritoEnem?ano=${prova.ano}`} asChild>
            <Pressable style={styles.primaryButton} onPress={onClose}>
              <Text style={styles.buttonText}>Ver Gabarito</Text>
            </Pressable>
          </Link>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default EnemModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: 300,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1261D7',
    marginBottom: 20,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#1261D7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 6,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#999',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
