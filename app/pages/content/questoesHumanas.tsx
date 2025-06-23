import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const dadosQuestoes = [
  {
    id: '1',
    pergunta:
      '“Como é horrível ver um filho comer e perguntar: ‘Tem mais?’ Esta palavra ‘tem mais’ fica oscilando dentro do cérebro de uma mãe que olha as panelas e não tem mais.” A frase está relacionada com qual problema social?',
    alternativas: [
      'Desigualdade social',
      'Violência doméstica',
      'Desemprego feminino',
      'Exclusão educacional',
      'Pobreza infantil',
    ],
    respostaCorreta: 'Desigualdade social',
    fonte: 'https://oglobo.globo.com/brasil/educacao/enem-e-vestibular/noticia/2024/10/03/enem-veja-as-dez-questoes-mais-faceis-de-ciencias-humanas-em-2023.ghtml',
  },
  {
    id: '2',
    pergunta:
      'Qual princípio iluminista inspirou a independência das colônias da América Latina no século XIX?',
    alternativas: [
      'Direito divino dos reis',
      'Liberdade individual e igualdade',
      'Domínio do absolutismo',
      'Expansão do feudalismo',
      'Supremacia do clero',
    ],
    respostaCorreta: 'Liberdade individual e igualdade',
    fonte: 'https://descomplica.com.br/enem/questoes/independencia-da-america-latina/',
  },
  {
    id: '3',
    pergunta:
      'O que caracterizou o movimento conhecido como “Diretas Já” no Brasil?',
    alternativas: [
      'A tentativa de impedir a renúncia de Jânio Quadros',
      'A reivindicação por eleições diretas para presidente',
      'A proclamação da República',
      'A renúncia de Fernando Collor',
      'A campanha pela Constituição de 1988',
    ],
    respostaCorreta: 'A reivindicação por eleições diretas para presidente',
    fonte: 'https://mundoeducacao.uol.com.br/historiadobrasil/diretas-ja.htm',
  },
  {
    id: '4',
    pergunta:
      'A Constituição de 1988 no Brasil é conhecida como “Constituição Cidadã” por quê?',
    alternativas: [
      'Garantir voto apenas a maiores de 21 anos',
      'Instituir o parlamentarismo como sistema político',
      'Garantir amplos direitos sociais e civis',
      'Retirar o direito à greve',
      'Fortalecer o regime militar',
    ],
    respostaCorreta: 'Garantir amplos direitos sociais e civis',
    fonte: 'https://www12.senado.leg.br/noticias/materias/2018/10/05/constituicao-cidada-faz-30-anos',
  },
  {
    id: '5',
    pergunta:
      'Durante a colonização, a economia brasileira era baseada principalmente em qual produto?',
    alternativas: [
      'Café',
      'Açúcar',
      'Minério de ferro',
      'Carne bovina',
      'Petróleo',
    ],
    respostaCorreta: 'Açúcar',
    fonte: 'https://mundoeducacao.uol.com.br/historiadobrasil/economia-acucareira.htm',
  },
];

export default function QuestoesHumanasScreen() {
  const router = useRouter();
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const questao = dadosQuestoes[questaoAtual];

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
    if (questaoAtual < dadosQuestoes.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    } else {
      router.push('/pages/main/provas');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Questões Humanas </Text>
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
                {questaoAtual === dadosQuestoes.length - 1
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
