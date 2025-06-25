import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Calendar, LocaleConfig, MarkedDates } from "react-native-calendars";

import DayActivityDetails, {
  DetailedActivity,
} from "../../../components/DayActivityDetails";
import HomeStyle from "../../../assets/style/home";

const coursesInProgress = [
  {
    id: "1",
    title: "React Native Avançado",
    progress: "50%",
    image: require("../../../assets/images/imagensTec/mountain-4694346_640.png"),
  },
  {
    id: "2",
    title: "Introdução ao TypeScript",
    progress: "30%",
    image: require("../../../assets/images/imagensTec/landscape-1844231_640.png"),
  },
  {
    id: "3",
    title: "UI/UX para Mobile",
    progress: "75%",
    image: require("../../../assets/images/imagensTec/landscape-1844226_640.png"),
  },
  {
    id: "4",
    title: "Flutter Básico",
    progress: "20%",
    image: require("../../../assets/images/imagensTec/ai-generated-8722240_640.png"),
  },
];

const activitiesByDate: Record<string, DetailedActivity[]> = {
  "2025-06-12": [
    {
      title: "Assistir aula de UI",
      description: "Aula sobre design de interfaces no mobile",
      completed: true,
    },
    {
      title: "Quiz de TypeScript",
      description: "Quiz de revisão do módulo",
      completed: false,
    },
  ],
  "2025-06-15": [
    {
      title: "Estudo React",
      description: "Estudo de navegação com React Navigation",
      completed: true,
    },
  ],
};

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

export default function ProgressScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [dayActivities, setDayActivities] = useState<DetailedActivity[]>([]);

  useEffect(() => {
    const newMarkedDates: MarkedDates = {};

    Object.keys(activitiesByDate).forEach((date) => {
      newMarkedDates[date] = {
        dots: [{ key: "activity", color: "#1261D7" }],
      };
    });

    if (selectedDate) {
      newMarkedDates[selectedDate] = {
        selected: true,
        selectedColor: "#1261D7",
        dots: [{ key: "activity", color: "#fff" }],
      };
    }

    setMarkedDates(newMarkedDates);
    setDayActivities(selectedDate ? activitiesByDate[selectedDate] || [] : []);
  }, [selectedDate]);

  const onDaySelect = useCallback((date: string) => {
    setSelectedDate((prev) => (prev === date ? null : date));
  }, []);

  const formatDateBR = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <View style={styles.header}>
        <ImageBackground
          source={require("@/assets/images/forma001.png")}
          style={HomeStyle.forma001Back}
          resizeMode="contain"
        />
        <ImageBackground
          source={require("@/assets/images/forma004.png")}
          style={HomeStyle.forma002Back}
          resizeMode="contain"
        />
        <Text style={styles.title}>Meu Progresso e Atividades</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/progress.png")}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.calendarSection}>
        <Text style={styles.sectionTitle}>Calendário de Atividades</Text>
        <Calendar
          onDayPress={(day) => onDaySelect(day.dateString)}
          markedDates={markedDates}
          markingType={"multi-dot"}
          theme={{
            selectedDayBackgroundColor: "#1261D7",
            selectedDayTextColor: "#fff",
            todayTextColor: "#1261D7",
            arrowColor: "#1261D7",
            monthTextColor: "#1261D7",
            textDayFontFamily: "Poppins_Regular",
            textMonthFontFamily: "Poppins_Bold",
            textDayHeaderFontFamily: "Poppins_Bold",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          firstDay={1}
          enableSwipeMonths={true}
          monthFormat={"MMMM yyyy"}
        />
        {selectedDate && (
          <Animatable.Text
            animation="bounceIn"
            iterationCount={1}
            style={styles.selectedDateText}
          >
            {`Data selecionada: ${formatDateBR(selectedDate)}`}
          </Animatable.Text>
        )}
      </View>

      <View style={styles.activitiesSection}>
        {selectedDate && dayActivities.length > 0 ? (
          dayActivities.map((activity, i) => (
            <Animatable.View
              key={i}
              animation="fadeInUp"
              duration={500}
              delay={i * 150}
              style={styles.activityCard}
            >
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDescription}>
                {activity.description}
              </Text>
              <Text
                style={[
                  styles.activityStatus,
                  activity.completed ? styles.completed : styles.inProgress,
                ]}
              >
                {activity.completed ? "✅ Concluída" : "⏳ Em andamento"}
              </Text>
            </Animatable.View>
          ))
        ) : selectedDate ? (
          <View style={styles.noActivityContainer}>
            <Text style={styles.noActivityText}>
              Nenhuma atividade registrada para {formatDateBR(selectedDate)}.
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.coursesSection}>
        <Text style={styles.sectionTitle}>Seus cursos em andamento</Text>
        {coursesInProgress.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <Image source={course.image} style={styles.courseImage} />
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseProgress}>
                Progresso: {course.progress}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  header: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: Platform.OS === "android" ? 25 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_Bold",
    color: "#1261D7",
    textAlign: "center",
    marginTop: 10,
  },
  imageContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  headerImage: {
    width: 200,
    height: 150,
  },
  calendarSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins_Bold",
    color: "#333",
    marginBottom: 10,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1261D7",
    marginTop: 15,
    textAlign: "center",
  },
  activitiesSection: {
    marginBottom: 10,
  },
  activityCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: "Poppins_Bold",
    color: "#1261D7",
    marginBottom: 6,
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: "Poppins_Regular",
    color: "#555",
  },
  activityStatus: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: "Poppins_Regular",
  },
  completed: {
    color: "#2ecc71",
  },
  inProgress: {
    color: "#f39c12",
  },
  coursesSection: {
    marginBottom: 15,
  },
  courseCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  courseImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  courseInfo: {
    flexShrink: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_Regular",
    color: "#1267D7",
  },
  courseProgress: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontFamily: "Poppins_Regular",
  },
  noActivityContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  noActivityText: {
    fontSize: 14,
    fontFamily: "Poppins_Regular",
    color: "#777",
    textAlign: "center",
  },
});
