import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Impedir que o SplashScreen se oculte automaticamente antes que o carregamento das fontes esteja completo
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins_Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins_Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf'),
    // Adicione outras fontes globais aqui se necessário
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null; // Ou um componente de carregamento personalizado
  }

  return (
    <Stack screenOptions={{ headerShown: false, title: " " }}>
      <Stack.Screen
        name='index'
        options={{
          headerShown: false
        }}
      />
      {/* Certifique-se de que as rotas para 'pages' estão configuradas aqui ou em um layout aninhado */}
      {/* Exemplo: <Stack.Screen name="pages" options={{ headerShown: false }} /> */}
    </Stack>
  );
}