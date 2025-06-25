import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Pressable } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useScroll } from "../../../contexts/ScrollContext";
import { Link, useRouter } from "expo-router"; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios'; 
import { useIsFocused } from '@react-navigation/native'; 

SplashScreen.preventAutoHideAsync();

const UserDashboard = () => {
  const [fontsLoaded] = useFonts({
    "Poppins_Regular": require("../../../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins_Bold": require("../../../assets/fonts/poppins/Poppins-Bold.ttf"),
  });

  const { setTabBarVisible, isTabBarVisible } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  const [userName, setUserName] = useState("Estudante"); 
  const [userFirstName, setUserFirstName] = useState("Estudante"); 
  const [profilePicUri, setProfilePicUri] = useState<string | null>(null); 
  const [isLoadingProfile, setIsLoadingProfile] = useState(true); 
  
  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadFonts = async () => { 
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    loadFonts();
  }, [fontsLoaded]);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!fontsLoaded) return;

      setIsLoadingProfile(true);
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const API_BASE_URL = 'http://localhost:3000/api'; 
          const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data) {
            const fullName = response.data.name || "Estudante";
            setUserName(fullName);
            setUserFirstName(fullName.split(" ")[0]); 
            setProfilePicUri(response.data.profileImageUrl || null); 
          } else {
            setUserName("Estudante");
            setUserFirstName("Estudante");
            setProfilePicUri(null);
          }
        } else {
          router.replace("/pages/main/login");
          return; 
        }
      } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          await AsyncStorage.removeItem('userToken');
          router.replace("/pages/main/login"); 
        } else {
          setUserName("Estudante");
          setUserFirstName("Estudante");
          setProfilePicUri(null);
        }
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (isFocused && fontsLoaded) { 
      loadProfileData();
    } else if (!isFocused && isLoadingProfile) {
        setIsLoadingProfile(false);
    }
  }, [isFocused, fontsLoaded, router]);


  if (!fontsLoaded) { 
    return <ActivityIndicator size="large" color="#1261D7" style={styles.loading} />;
  }

  const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [{ data: [2, 3, 5, 1, 4, 2, 6] }],
  };

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const SCROLL_THRESHOLD = 10; 
    const HIDE_THRESHOLD = 50; 

    if (currentScrollY <= 0) { 
        if (!isTabBarVisible) setTabBarVisible(true);
        setLastScrollY(0);
        return;
    }

    if (currentScrollY > lastScrollY && Math.abs(currentScrollY - lastScrollY) > SCROLL_THRESHOLD) {
        if (isTabBarVisible && currentScrollY > HIDE_THRESHOLD) { 
            setTabBarVisible(false);
        }
    }
    else if (currentScrollY < lastScrollY && Math.abs(currentScrollY - lastScrollY) > SCROLL_THRESHOLD) {
        if (!isTabBarVisible) {
            setTabBarVisible(true);
        }
    }
    setLastScrollY(Math.max(0, currentScrollY));
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/pages/main/')}>
          <Image style={styles.backIcon} source={require('@/assets/images/Back.png')} />
        </Pressable>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {isLoadingProfile ? (
          <View style={styles.loadingProfile}>
            <ActivityIndicator size="large" color="#1261D7" />
            <Text style={styles.loadingText}>Carregando perfil...</Text>
          </View>
        ) : (
          <> {/* <--- FRAGMENT ABERTO */} 
            <View style={styles.profileSection}>
              <Image 
                source={profilePicUri ? { uri: profilePicUri } : require('@/assets/images/User.png')} 
                style={styles.profilePic} 
              />
              <Text style={styles.userName}>Olá, {userFirstName}!</Text>
            </View>

            {/* Estatísticas */}
            <View style={styles.statsCard}>
              <Text style={styles.sectionTitle}>Progresso</Text>
              <ProgressBar progress={0.6} color="#1261D7" style={styles.progressBar} />
            </View>

            {/* Gráfico */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Tempo de Estudo (Horas)</Text>
              <BarChart
                data={data}
                width={screenWidth * 0.9}
                height={220}
                yAxisLabel=""
                chartConfig={{
                  backgroundGradientFrom: "#1261D7",
                  backgroundGradientTo: "#1261D7",
                  decimalPlaces: 0,
                  barRadius: 10,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: () => "#FFF",
                }}
                style={{ borderRadius: 20 }}
              />
            </View>

            {/* Metas */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Metas da Semana</Text>
              <Text style={styles.sectionText}>- Revisar 3 capítulos de Matemática</Text>
              <Text style={styles.sectionText}>- Resolver 10 questões de Física</Text>
              <Text style={styles.sectionText}>- Fazer 2 redações</Text>
            </View>

            {/* Botões */}
            <Link href="./EditProfileScreen" asChild>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="person-circle-outline" size={24} color="#FFF" />
                <Text style={styles.buttonText}>Editar Perfil</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.button} onPress={() => alert("Relatórios em breve!")}>
              <Ionicons name="document-text-outline" size={24} color="#FFF" />
              <Text style={styles.buttonText}>Ver Relatórios</Text>
            </TouchableOpacity>
          </> 
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingProfile: { 
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50, 
  },
  loadingText: { 
    marginTop: 10,
    fontSize: 16,
    color: '#1261D7',
    fontFamily: "Poppins_Regular",
  },
  scrollContent: { paddingBottom: 20, flexGrow: 1 }, 
  header: {
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 15,
    paddingVertical: 15, 
    backgroundColor: "#1261D7", 
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  backIcon: { 
    width: 30, 
    height: 30,
  },
  headerTitle: { 
    flex: 1, 
    textAlign: "center", 
    fontSize: 20, 
    color: "#FFF", 
    fontFamily: "Poppins_Bold",
    marginRight: 30 
  },
  profileSection: { alignItems: "center", marginVertical: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E0E0E0' },
  userName: { fontSize: 22, fontFamily: "Poppins_Bold", marginTop: 10, textAlign: "center", color: '#333' },
  statsCard: { padding: 20, borderRadius: 10, marginBottom: 20, alignItems: "center", backgroundColor: '#FFF', marginHorizontal:15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
  progressBar: { height: 10, borderRadius: 5, marginVertical: 10, width: "100%", backgroundColor: '#E0E0E0' },
  chartContainer: { backgroundColor: "#FFF", padding: 20, borderRadius: 10, marginBottom: 20, marginHorizontal:15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
  chartTitle: { fontSize: 18, textAlign: "center", marginBottom: 15, color: "#333", fontFamily: "Poppins_Bold" },
  section: { backgroundColor: "#FFF", padding: 20, borderRadius: 10, marginBottom: 20, marginHorizontal:15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
  sectionTitle: { fontSize: 18, textAlign: "center", color: "#333", fontFamily: "Poppins_Bold", marginBottom:10 },
  sectionText: { color: "#555", fontFamily: "Poppins_Regular", fontSize: 16, textAlign: "left", marginBottom: 5 },
  button: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#1261D7", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25, marginBottom: 10, marginHorizontal:15, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
  buttonText: { color: "#fff", fontSize: 16, marginLeft: 10, fontFamily: "Poppins_Bold" },
});

export default UserDashboard;