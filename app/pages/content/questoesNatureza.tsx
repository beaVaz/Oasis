import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const dadosQuestoesNatureza2023= [
  {
    id: '91',
    pergunta: `A tecnologia de vacinas de RNA mensageiro (RNAm)... Dessa forma, o RNAm desempenhará sua função específica atuando no mesmo compartimento celular de sempre. A imunização produzida por esse tipo de vacina é alcançada por meio da:`,
    alternativas: [
      'A estimulação de leucócitos induzida pela capa lipídica contendo RNAm.',
      'Atuação do RNAm como sequestrador do vírus para o meio extracelular.',
      'Tradução do RNAm em proteína viral, desencadeando a resposta antigênica.',
      'Competição entre o RNAm vacinal e o RNA viral pelos sítios dos ribossomos.',
      'Incorporação do RNAm viral ao genoma do hospedeiro, gerando novo fenótipo.',
    ],
    respostaCorreta: 'Tradução do RNAm em proteína viral, desencadeando a resposta antigênica.',
    fonte: 'Caderno de Ciências da Natureza – Questão 91 (ENEM 2023)',
  },
  {
    id: '92',
    pergunta: `Na fertilização in vitro, espermatozoides são adicionados aos gametas femininos... O coquetel de inibidores impediu o(a):`,
    alternativas: [
      'Formação do pronúcleo masculino.',
      'Início da divisão mitótica do zigoto.',
      'Término da segunda divisão meiótica do ovócito.',
      'Passagem do espermatozoide pela corona radiata e zona pelúcida.',
      'Fusão das membranas plasmáticas do ovócito e do espermatozoide.',
    ],
    respostaCorreta: 'Passagem do espermatozoide pela corona radiata e zona pelúcida.',
    fonte: 'Caderno de Ciências da Natureza – Questão 92 (ENEM 2023)',
  },
  {
    id: '93',
    pergunta: `O fogão por indução funciona a partir do surgimento de uma corrente elétrica induzida no fundo da panela... A corrente elétrica mencionada é induzida por:`,
    alternativas: [
      'Radiação.',
      'Condução.',
      'Campo elétrico variável.',
      'Campo magnético variável.',
      'Ressonância eletromagnética.',
    ],
    respostaCorreta: 'Campo magnético variável.',
    fonte: 'Caderno de Ciências da Natureza – Questão 93 (ENEM 2023)',
  },
  {
    id: '94',
    pergunta: `Uma cafeteria adotou copos fabricados a partir de uma composição de 50% plástico reciclado e 50% casca de café... Quais duas vantagens esse copo apresenta em comparação ao copo descartável?`,
    alternativas: [
      'Ter a durabilidade de uma cerâmica e ser totalmente biodegradável.',
      'Ser tão durável quanto uma cerâmica e ter alta condutividade térmica.',
      'Ser um mau condutor térmico e aumentar o resíduo biodegradável na natureza.',
      'Ter baixa condutividade térmica e reduzir o resíduo não biodegradável na natureza.',
      'Ter alta condutividade térmica e possibilitar a degradação do material no meio ambiente.',
    ],
    respostaCorreta: 'Ter baixa condutividade térmica e reduzir o resíduo não biodegradável na natureza.',
    fonte: 'Caderno de Ciências da Natureza – Questão 94 (ENEM 2023)',
  },
  {
    id: '95',
    pergunta: `O descarte de detergentes comuns nos esgotos domésticos ocasiona a formação de uma camada de espuma... Na hidratação do CaCl₂ anidro, o ganho percentual em massa é mais próximo de:`,
    alternativas: [
      '14%',
      '16%',
      '24%',
      '32%',
      '75%',
    ],
    respostaCorreta: '32%',
    fonte: 'Caderno de Ciências da Natureza – Questão 95 (ENEM 2023)',
  },
];


export default function QuestoesNaturezaScreen() {
  const router = useRouter();
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const questao = dadosQuestoesNatureza2023[questaoAtual];

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
    if (questaoAtual < dadosQuestoesNatureza2023.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    } else {
      router.push('/pages/main/provas');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ciências da Natureza</Text>
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
                {questaoAtual === dadosQuestoesNatureza2023.length - 1
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
