import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface DetailedActivity {
  titulo: string;
  descricao: string;
  concluida: boolean;
}

interface Props {
  selectedDate: string;
  activities: DetailedActivity[];
}

const DayActivityDetails: React.FC<Props> = ({ selectedDate, activities }) => {
  return (
    <View style={styles.container}>
      {activities.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{item.titulo}</Text>
          <Text style={styles.description}>{item.descricao}</Text>
          <Text style={styles.status}>
            Status: {item.concluida ? 'Concluída ✅' : 'Pendente ❌'}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1261D7',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    color: '#444',
  },
  status: {
    marginTop: 10,
    fontSize: 13,
    color: '#555',
  },
});

export default DayActivityDetails;
