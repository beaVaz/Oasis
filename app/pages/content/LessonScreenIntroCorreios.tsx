import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  ViewStyle,
  TextStyle,
  Pressable,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PRIMARY_COLOR = '#1261D7'; 
const TEXT_COLOR_PRIMARY = '#333333';
const TEXT_COLOR_SECONDARY = '#555555';
const BACKGROUND_COLOR = '#F4F7FC'; 
const CARD_BACKGROUND_COLOR = '#FFFFFF';
const ERROR_COLOR = '#D32F2F'; 

const LESSON_TITLE: string = "Interpretação de Texto";

interface LessonPart {
  type: 'text' | 'video';
  content: string; 
  title?: string;
  estimatedTime?: number; 
}

import { useFonts } from 'expo-font'; 
import { useEffect } from 'react';



// Component
const LessonScreen: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_Regular: require("@/assets/fonts/poppins/Poppins-Regular.ttf"),
    Poppins_Bold: require("@/assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/poppins/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {

    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  const initialLessonParts: LessonPart[] = [
    {
      type: 'video',
      title: 'Vídeo Introdutório: A Arte de Interpretar',
      content: require('@/assets/video/Generated File June 21, 2025 - 9_50AM.mp4'), // Ensure this path is correct
      estimatedTime: 5,
    },
    {
    type: 'text',
    title: '📚 O que é Interpretação de Textos em Concursos?',
    content: 'Interpretação de textos, nos concursos públicos como o dos Correios, é a habilidade de compreender o que o texto realmente comunica — tanto o que está explícito quanto o que está implícito. É necessário identificar ideias principais, intenções do autor, relações entre frases e o significado de palavras no contexto.\n📌 Nos concursos dos Correios, essa competência é frequentemente cobrada em questões de Língua Portuguesa, exigindo atenção a detalhes e compreensão crítica.',
    estimatedTime: 3,
  },
  {
    type: 'text',
    title: '🛠️ Estratégias-Chave para Gabaritar as Questões',
    content: `1️⃣ Leitura Atenta (e mais de uma vez): Leia primeiro para entender o tema geral e depois para captar detalhes importantes.\n
2️⃣ Identifique o Objetivo do Texto: Ele quer informar, opinar, convencer ou relatar?\n
3️⃣ Atenção ao Vocabulário: Entenda o significado de palavras-chave. Em provas, elas podem alterar o sentido de toda uma frase.\n
4️⃣ Observe os Conectivos: Palavras como "porém", "logo", "entretanto" indicam oposição, causa, conclusão. Elas ajudam a entender a lógica do texto.\n
5️⃣ Destaque a Ideia Central: A maioria das questões gira em torno do tema principal ou da intenção do autor.\n
6️⃣ Fato x Opinião: Muitas pegadinhas exploram a confusão entre uma informação objetiva e o ponto de vista do autor.\n
7️⃣ Cuidado com Interpretações Extremas: Respostas generalistas ou exageradas costumam estar erradas. Prefira alternativas mais equilibradas e fiéis ao texto.`,
    estimatedTime: 7,
  },
  {
    type: 'text',
    title: '💡 Técnica Eficiente: Pergunte Antes de Responder',
    content: '📝 Antes de olhar as alternativas, leia o enunciado e pense: "O que exatamente a questão quer saber?"\n\n🔎 Exemplo: Se a pergunta for sobre o "sentido de uma expressão", tente explicar essa expressão com suas próprias palavras antes de ver as opções.\n\n➡️ Isso evita distrações e aumenta sua precisão na resposta.',
    estimatedTime: 2,
  },
  {
    type: 'text',
    title: '🧪 Exemplo Estilo Concurso dos Correios',
    content: `📄 Texto: "O atendimento ao cliente nas agências dos Correios tem evoluído com o uso da tecnologia, mas ainda enfrenta desafios relacionados à agilidade e personalização do serviço."\n
❓ Questão: Qual é o foco da crítica feita pelo autor?\n
🧐 Análise: Embora reconheça avanços com a tecnologia, o autor aponta dois problemas: falta de agilidade e ausência de atendimento personalizado. Isso deve guiar sua escolha na alternativa mais precisa.`,
    estimatedTime: 5,
  },
  {
    type: 'text',
    title: '🔁 Recapitulando: A Chave é a Prática',
    content: 'Nesta aula, você entendeu como interpretar textos pensando nas provas de concurso dos Correios. Viu técnicas, armadilhas comuns e um exemplo aplicado.\n\n✅ Lembre-se: a interpretação melhora com treino. Resolva questões anteriores e simule provas reais para ganhar confiança.',
    estimatedTime: 3,
  }
]

  const [lessonParts] = useState<LessonPart[]>(initialLessonParts);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [lessonCompleted, setLessonCompleted] = useState<boolean>(false);
  const [xpGained, setXpGained] = useState<number>(0);

  const handleNext = (): void => {
    if (currentStepIndex < lessonParts.length - 1) {
      setCurrentStepIndex(prevIndex => prevIndex + 1);
    } else {
      handleCompleteLesson();
    }
  };

  const handlePrevious = (): void => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleCompleteLesson = (): void => {
    const earnedXp: number = 100; 
    setXpGained(earnedXp);
    setLessonCompleted(true);
    Alert.alert(
      "Aula Concluída!",
      `Parabéns! Você ganhou ${earnedXp} XP. Continue assim!`,
      [{ text: "OK" }]
    );
  };

  if (lessonCompleted) {
    return (
      <GestureHandlerRootView style={styles.gestureHandlerRoot}>
        <SafeAreaView style={[styles.container, styles.centeredScreen]}>

          <Text style={styles.completionTitle}>Missão Cumprida!</Text>
          <Text style={styles.completionText}>Você ganhou +{xpGained} XP!</Text>
        <TouchableOpacity
  onPress={() => {
    setLessonCompleted(false);
    setCurrentStepIndex(0);
    setXpGained(0);
    router.push('/pages/main/progress');
  }}
  style={[styles.button, styles.primaryButton, styles.continueButton]}
>
  <Text style={styles.buttonText}>Continuar Aprendendo</Text>
</TouchableOpacity>

        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }

  const currentPart = lessonParts[currentStepIndex];
  const progressPercentage = ((currentStepIndex + 1) / lessonParts.length) * 100;

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRoot}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBar}>
         <Pressable onPress={() => router.push('/pages/main/pagesRoot/studyPlanCorreios')} style={styles.backButton}>
  <Image style={styles.backIcon} source={require('@/assets/images/Back.png')} />
</Pressable>

          <Text style={styles.headerTitle}>{LESSON_TITLE}</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>

        <ScrollView style={styles.contentScrollArea} contentContainerStyle={styles.contentScrollContainer}>
          {currentPart ? (
            <View style={styles.card}>
              {currentPart.title && (
                <Text style={styles.partTitleText}>{currentPart.title}</Text>
              )}
              {currentPart.estimatedTime && (
                <Text style={styles.estimatedTimeText}>Tempo estimado: {currentPart.estimatedTime} min</Text>
              )}

              {currentPart.type === 'text' && (
                <Text style={styles.didacticText}>{currentPart.content}</Text>
              )}
              {currentPart.type === 'video' && currentPart.content && (
                <View style={styles.videoContainer}>
                  <Video
                    ref={videoRef}
                    style={styles.videoPlayer}
                    source={currentPart.content}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    onPlaybackStatusUpdate={newStatus => setStatus(() => newStatus)}
                    onError={(error) => Alert.alert("Erro no Vídeo", `Não foi possível carregar o vídeo. ${error}`)}
                  />
                  <View style={styles.videoControls}>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={() => status?.isLoaded && status.isPlaying ? videoRef.current?.pauseAsync() : videoRef.current?.playAsync()}
                      disabled={!status?.isLoaded}
                    >
                      <Text style={styles.controlButtonText}>{status?.isLoaded && status.isPlaying ? 'Pausar' : 'Reproduzir'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {!currentPart.content && currentPart.type === 'video' && (
                <Text style={styles.errorText}>Vídeo não encontrado. Verifique o caminho do arquivo.</Text>
              )}
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.didacticText}>Carregando conteúdo da aula...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.navigationFooter}>
          <TouchableOpacity
            onPress={handlePrevious}
            style={[styles.button, styles.secondaryButton, currentStepIndex === 0 && styles.disabledButton]}
            disabled={currentStepIndex === 0}
          >
            <Text style={styles.buttonText}>‹ Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.button, styles.primaryButton]}
          >
            <Text style={styles.buttonText}>
              {currentStepIndex === lessonParts.length - 1 ? 'Concluir Aula' : 'Próximo ›'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRoot: {
    flex: 1,
  } as ViewStyle,
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  } as ViewStyle,
  centeredScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  } as ViewStyle,
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 15 : 10,
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  } as ViewStyle,
  backButton: {
    padding: 5, // Easier to tap
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: PRIMARY_COLOR,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600', // Semibold
    color: TEXT_COLOR_PRIMARY,
    fontFamily: 'Poppins-SemiBold',
  } as TextStyle,
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    width: '100%',
  } as ViewStyle,
  progressBarFill: {
    height: '100%',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 4,
  } as ViewStyle,
  contentScrollArea: {
    flex: 1,
  } as ViewStyle,
  contentScrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  partTitleText: {
    fontSize: 20, // Slightly larger
    fontWeight: 600, 
    color: PRIMARY_COLOR,
    marginBottom: 12,
    fontFamily: 'Poppins-SemiBold',
  } as TextStyle,
  estimatedTimeText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: TEXT_COLOR_SECONDARY,
    marginBottom: 15,
    fontStyle: 'italic',
  } as TextStyle,
  didacticText: {
    fontSize: 16,
    lineHeight: 26, // Improved readability
    color: TEXT_COLOR_PRIMARY,
    fontFamily: 'Poppins-Regular', // Make sure Poppins-Regular is linked
    textAlign: 'justify',
  } as TextStyle,
  videoContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden', // Ensures children (video) also have rounded corners
    backgroundColor: '#000',
  } as ViewStyle,
  videoPlayer: {
    width: '100%',
    aspectRatio: 9 / 16, // Common video aspect ratio
  } as ViewStyle,
  videoControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent controls background
  } as ViewStyle,
  controlButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  } as ViewStyle,
  controlButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  } as TextStyle,
  errorText: {
    fontSize: 14,
    color: ERROR_COLOR,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    paddingVertical: 10,
  } as TextStyle,
  navigationFooter: {
    fontFamily: 'Poppins-Regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: CARD_BACKGROUND_COLOR,
  } as ViewStyle,
  button: {
    fontFamily: 'Poppins-Regular',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25, 
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: SCREEN_WIDTH * 0.4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  } as ViewStyle,
  primaryButton: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: PRIMARY_COLOR,
  } as ViewStyle,
  secondaryButton: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#757575', 
  } as ViewStyle,
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600', 
    fontFamily: 'Poppins-SemiBold',
  } as TextStyle,
  disabledButton: {
    backgroundColor: '#BDBDBD', 
    elevation: 0,
    shadowOpacity: 0,
  } as ViewStyle,

  completionTitle: {
    fontSize: 26,
    fontWeight: 'bold', 
    color: PRIMARY_COLOR,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 10,
  } as TextStyle,
  completionText: {
    fontSize: 18,
    color: TEXT_COLOR_PRIMARY,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 30,
  } as TextStyle,
  continueButton: {
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    paddingVertical: 15, 
  } as ViewStyle,


});

export default LessonScreen;
