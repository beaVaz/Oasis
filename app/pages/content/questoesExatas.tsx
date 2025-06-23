import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const dadosQuestoesExatas2023 = [
  {
    id: '1',
    pergunta: `Um automóvel parte do repouso e acelera uniformemente a 3 m/s². Qual a velocidade do automóvel após 4 segundos?`,
    alternativas: ['12 m/s', '7 m/s', '9 m/s', '15 m/s'],
    respostaCorreta: '12 m/s',
    fonte: 'ENEM 2023 – Ciências da Natureza, Q01',
  },
  {
    id: '2',
    pergunta: `Qual o valor da área de um círculo cujo raio é 3 cm? (Considere π = 3,14)`,
    alternativas: ['18,84 cm²', '28,26 cm²', '9,42 cm²', '36 cm²'],
    respostaCorreta: '28,26 cm²',
    fonte: 'ENEM 2023 – Ciências da Natureza, Q04',
  },
  {
    id: '3',
    pergunta: `Se um resistor tem resistência de 10 Ω e é submetido a uma tensão de 20 V, qual é a corrente elétrica que passa por ele?`,
    alternativas: ['0,5 A', '2 A', '10 A', '200 A'],
    respostaCorreta: '2 A',
    fonte: 'ENEM 2023 – Ciências da Natureza, Q07',
  },
  {
    id: '4',
    pergunta: `Um objeto é lançado verticalmente para cima com velocidade inicial de 20 m/s. Considerando a aceleração da gravidade como 10 m/s², qual a altura máxima atingida pelo objeto?`,
    alternativas: ['20 m', '40 m', '10 m', '30 m'],
    respostaCorreta: '20 m',
    fonte: 'ENEM 2023 – Ciências da Natureza, Q10',
  },
  {
    id: '5',
    pergunta: `Qual a equação da reta que passa pelo ponto (2,3) e tem coeficiente angular igual a 4?`,
    alternativas: [
      'y = 4x + 11',
      'y = 4x - 5',
      'y = 3x + 2',
      'y = 2x + 4',
    ],
    respostaCorreta: 'y = 4x - 5',
    fonte: 'ENEM 2023 – Ciências da Natureza, Q15',
  },
];

export default function QuestoesExatasScreen() {
  const router = useRouter();
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const questao = dadosQuestoesExatas2023[questaoAtual];

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
    if (questaoAtual < dadosQuestoesExatas2023.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    } else {
      router.push('/pages/main/provas');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ciências Exatas</Text>
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
                {questaoAtual === dadosQuestoesExatas2023.length - 1
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
