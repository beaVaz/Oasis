import { Stack } from 'expo-router';
import React from 'react';

export default function ContentLayout() {
  return (
    <Stack>
      <Stack.Screen name="questoesHumanas" options={{ title: 'Ciências Humanas' }} />
      <Stack.Screen name="questoesNatureza" options={{ title: 'Ciências da Natureza' }} />
      <Stack.Screen name="questoesLinguagens" options={{ title: 'Códigos e Linguagens' }} />
      <Stack.Screen name="questoesExatas" options={{ title: 'Ciências Exatas' }} />
      <Stack.Screen name="gabaritoEnem" options={{ title: 'Gabarito ENEM' }} />

      <Stack.Screen 
        name="LessonScreenIntroEnem" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="LessonScreenIntroCorreios" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="cardQuestionEnem" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="cardQuestionCorreios" 
        options={{ headerShown: false }} 
      />

    </Stack>
  );
}
