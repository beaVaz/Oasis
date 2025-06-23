import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { Link, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Card, Button } from "@rneui/themed";
import * as Progress from "react-native-progress";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "Leia o trecho: \"Num país em que a educação é frequentemente negligenciada, reconhecer a importância da leitura crítica é dar um passo em direção a uma sociedade mais consciente.\" Qual a principal ideia transmitida?",
    options: [
      "A leitura crítica é desnecessária em uma sociedade educada.",
      "A negligência educacional impede o avanço da leitura crítica.",
      "Todos os países valorizam a educação igualmente.",
      "A sociedade atual já é totalmente consciente.",
    ],
    answer: "A negligência educacional impede o avanço da leitura crítica.",
  },
  {
    id: 2,
    question:
      "Leia o fragmento: \"A chuva fina caía sobre os telhados, mas dentro da casa reinava um silêncio profundo.\" O trecho estabelece um contraste entre:",
    options: [
      "A tempestade e a paz.",
      "O ambiente externo e o interno.",
      "O barulho e a confusão.",
      "O tempo e os sentimentos.",
    ],
    answer: "O ambiente externo e o interno.",
  },
  {
    id: 3,
    question:
      "Em uma propaganda lê-se: \"Você não precisa de muito para ser feliz. Só de um bom café.\" Esse enunciado é um exemplo de:",
    options: [
      "Linguagem técnica.",
      "Texto científico.",
      "Função apelativa da linguagem.",
      "Poema narrativo.",
    ],
    answer: "Função apelativa da linguagem.",
  },
  {
    id: 4,
    question:
      "Na tirinha, um aluno pergunta: \"Professor, por que temos que interpretar textos?\" e o professor responde: \"Porque é assim que você descobre que esse não é um teste de matemática.\" Qual o objetivo dessa tirinha?",
    options: [
      "Ensinar uma fórmula.",
      "Explicar regras gramaticais.",
      "Valorizar a interpretação textual.",
      "Apresentar um problema lógico.",
    ],
    answer: "Valorizar a interpretação textual.",
  },
  {
    id: 5,
    question:
      "Observe: \"A linguagem pode ser usada para informar, emocionar, persuadir ou expressar sentimentos.\" Esse conteúdo está relacionado com:",
    options: [
      "Ortografia oficial.",
      "Funções da linguagem.",
      "Teoria literária.",
      "Gêneros textuais.",
    ],
    answer: "Funções da linguagem.",
  },
];

const QuizScreen = () => {
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<"correct" | "incorrect" | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const scale = useSharedValue(1);
  const router = useRouter();

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    scale.value = withSpring(1.1);
    const isCorrect = option === questions[currentQuestion].answer;

    if (isCorrect) {
      setAnswerResult("correct");
      setScore((prev) => prev + 1);
      Alert.alert("Correto!", "Você acertou a questão.");
    } else {
      setAnswerResult("incorrect");
      Alert.alert("Errado!", "Resposta incorreta.");
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswerResult(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        Alert.alert(
          "Fim do Quiz!",
          `Você acertou ${score + (isCorrect ? 1 : 0)} de ${questions.length} questões.`,
          [{ text: "OK", onPress: () => router.push("/pages/main/pagesRoot/studyPlanCorreios") }]
        );
      }
    }, 1000);
  };

  const progressValue = (currentQuestion + (selectedAnswer ? 1 : 0)) / questions.length;

  return (
    <View style={localStyles.quizContainer}>
      <View style={localStyles.headerBack}>
        <Pressable onPress={() => router.push('/pages/main/pagesRoot/studyPlanCorreios')}>
          <Link href={'/pages/main/pagesRoot/studyPlanCorreios'}>
            <Image style={{ width: 30, height: 30 }} source={require('@/assets/images/Back.png')} />
          </Link>
        </Pressable>
        <View style={localStyles.headerTitle}>
          <Text style={{ fontFamily: 'Poppins_Bold', color: '#fff', fontSize: 18 }}>
            Voltar para página anterior
          </Text>
        </View>
      </View>

      <Text style={localStyles.header}>Quiz de Interpretação</Text>

      <View style={localStyles.infoContainer}>
        <Text style={localStyles.infoText}>Questão: {currentQuestion + 1}/{questions.length}</Text>
        <Text style={localStyles.infoText}>Pontuação: {score}</Text>
      </View>

      <Progress.Bar
        progress={progressValue}
        width={SCREEN_WIDTH * 0.7}
        color="#1261D7"
        borderRadius={5}
        style={{ marginVertical: 10 }}
      />

      <Card containerStyle={localStyles.card}>
        <Text style={localStyles.questionText}>{questions[currentQuestion].question}</Text>

        {questions[currentQuestion].options.map((option) => (
          <Animated.View key={option} style={{ transform: [{ scale }] }}>
            <Button
              title={option}
              onPress={() => handleAnswer(option)}
              buttonStyle={
                selectedAnswer === option
                  ? answerResult === "incorrect"
                    ? localStyles.incorrectOption
                    : localStyles.selectedOption
                  : localStyles.option
              }
              containerStyle={localStyles.optionContainer}
            />
          </Animated.View>
        ))}
      </Card>
    </View>
  );
};

export default function Test() {
  const [fontsLoaded] = useFonts({
    Poppins_Regular: require("@/assets/fonts/poppins/Poppins-Regular.ttf"),
    Poppins_Bold: require("@/assets/fonts/poppins/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
      <QuizScreen />
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f4f4f4",
  },
  headerBack: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#1261D7",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 1,
  },
  headerTitle: {
    flexDirection: "row",
    paddingRight: 50,
  },
  header: {
    fontSize: SCREEN_WIDTH * 0.06,
    fontFamily: "Poppins_Bold",
    marginTop: 80,
    marginBottom: 20,
    color: "#1261D7",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  infoText: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontFamily: "Poppins_Regular",
    color: "#333",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  questionText: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontFamily: "Poppins_Bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  optionContainer: {
    marginVertical: 10,
  },
  option: {
    backgroundColor: "#1261D7",
    paddingVertical: SCREEN_WIDTH * 0.035,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: "#2ecc71",
    paddingVertical: SCREEN_WIDTH * 0.035,
    borderRadius: 8,
  },
  incorrectOption: {
    backgroundColor: "#e74c3c",
    paddingVertical: SCREEN_WIDTH * 0.035,
    borderRadius: 8,
  },
});
