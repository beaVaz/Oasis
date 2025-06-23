import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const dadosQuestoesLinguagens2023 = [
  {
    id: '1',
    pergunta: `"No man is an island..." Nesse poema, a expressão "No man is an island" ressalta o(a):`,
    alternativas: [
      'Medo da morte',
      'Ideia de conexão',
      'Conceito de solidão',
      'Risco de devastação',
      'Necessidade de empatia',
    ],
    respostaCorreta: 'Ideia de conexão',
    fonte: 'ENEM 2023 – Linguagens, Códigos e suas Tecnologias, Q1',
  },
  {
    id: '2',
    pergunta: `“Things We Carry on the Sea” destaca a trajetória de refugiados. Essa imagem de viagem marítima serve para enfatizar o(a):`,
    alternativas: [
      'Risco de choques culturais',
      'Impacto do ensino de história',
      'Importância da luta ambiental',
      'Existência de experiências plurais',
      'Necessidade de capacitação profissional',
    ],
    respostaCorreta: 'Existência de experiências plurais',
    fonte: 'ENEM 2023 – Linguagens, Códigos e suas Tecnologias, Q2',
  },
  {
    id: '3',
    pergunta: `Cartaz em inglês: “Food for thought” e lixo. Esse cartaz sugere que:`,
    alternativas: [
      'Os lixões precisam de ampliação',
      'O desperdício degrada o ambiente',
      'Os mercados doam alimentos perecíveis',
      'A desnutrição compromete o raciocínio',
      'As residências carecem de refrigeradores',
    ],
    respostaCorreta: 'O desperdício degrada o ambiente',
    fonte: 'ENEM 2023 – Linguagens, Códigos e suas Tecnologias, Q3',
  },
  {
    id: '4',
    pergunta: `No cartum sobre ambiente de trabalho homogêneo, o cartum tem por objetivo:`,
    alternativas: [
      'Criticar um padrão de vestimenta',
      'Destacar a falta de diversidade',
      'Indicar um modo de interação',
      'Elogiar um modelo de organização',
      'Salientar o espírito de cooperação',
    ],
    respostaCorreta: 'Destacar a falta de diversidade',
    fonte: 'ENEM 2023 – Linguagens, Códigos e suas Tecnologias, Q1 (cartum)',
  },
  {
    id: '5',
    pergunta: `No poema Spanglish de Tato Laviera, o eu lírico destaca a:`,
    alternativas: [
      'Convergência linguístico-cultural',
      'Característica histórico-cultural',
      'Tendência estilístico-literária',
      'Discriminação cultural',
      'Censura musical',
    ],
    respostaCorreta: 'Convergência linguístico-cultural',
    fonte: 'ENEM 2023 – Linguagens, Códigos e suas Tecnologias, Q5 (poema Spanglish)',
  },
];

export default function QuestoesLinguagensScreen() {
  const router = useRouter();
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const questao = dadosQuestoesLinguagens2023[questaoAtual];

  function selecionarResposta(alt: string) {
    setRespostaSelecionada(alt);
    if (alt === questao.respostaCorreta) {
      setFeedback('Resposta correta! 🎉');
    } else {
      setFeedback(`Resposta incorreta! A resposta certa é: ${questao.respostaCorreta}`);
    }
  }

  function proximaQuestao() {
    setRespostaSelecionada(null);
    setFeedback(null);
    if (questaoAtual < dadosQuestoesLinguagens2023.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    } else {
      router.push('/pages/main/provas');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Códigos e Linguagens</Text>
      <View style={styles.questaoContainer}>
        <Text style={styles.pergunta}>
          {questao.id}. {questao.pergunta}
        </Text>
        {questao.alternativas.map((alt, index) => {
          const isSelected = alt === respostaSelecionada;
          const isCorrect = alt === questao.respostaCorreta;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.alternativa,
                isSelected && (isCorrect ? styles.correto : styles.incorreto),
              ]}
              disabled={!!respostaSelecionada}
              onPress={() => selecionarResposta(alt)}
            >
              <Text style={styles.alternativaTexto}>
                ({String.fromCharCode(65 + index)}) {alt}
              </Text>
            </TouchableOpacity>
          );
        })}
        {feedback && (
          <>
            <Text
              style={
                feedback.startsWith('Resposta correta')
                  ? styles.feedbackCorreto
                  : styles.feedbackIncorreto
              }
            >
              {feedback}
            </Text>
            <Text style={styles.fonte}>Fonte: {questao.fonte}</Text>
            <TouchableOpacity style={styles.botaoProximo} onPress={proximaQuestao}>
              <Text style={styles.botaoProximoTexto}>
                {questaoAtual === dadosQuestoesLinguagens2023.length - 1
                  ? 'Finalizar e voltar'
                  : 'Próxima questão'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1261D7',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'#fff',
  },
  questaoContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    fontSize:18,
    textAlign:"justify",
  },
  pergunta: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 15,
  },
  alternativa: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  alternativaTexto: {
    fontSize: 18,
  },
  correto: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
  },
  incorreto: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
  },
  feedbackCorreto: {
    color: '#28a745',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize:18,
  },
  feedbackIncorreto: {
    color: '#dc3545',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize:18,
  },
  fonte: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
    color: '#555',
  },
  botaoProximo: {
    marginTop: 15,
    backgroundColor: '#1261D7',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoProximoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
