import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import Estilo from '../../assets/style/register';
import { Link } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { TextInputMask } from 'react-native-masked-text';
import { registerUser } from '../../services/hooks/useRegister';
import Loader from '../../components/Loader/loader';
import Icon from 'react-native-vector-icons/FontAwesome6';

SplashScreen.preventAutoHideAsync();

const formatarData = (data: string): string => {
  const partes = data.split('/');
  if (partes.length === 3) {
    const [dia, mes, ano] = partes;
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }
  return data;
};

export default function Register() {
  const router = useRouter();
  const [name, onChangeName] = useState('');
  const [cpf, onChangeCpf] = useState('');
  const [endereco, onChangeEndereco] = useState('');
  const [email, onChangeEmail] = useState('');
  const [data, onChangeData] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const [fontsLoaded] = useFonts({
    'MinhaFonte-Regular': require('../../assets/fonts/superOcean.ttf'),
    'Fonte-texto': require('../../assets/fonts/TitilliumWeb-Regular.ttf'),
    'Poppins_Regular': require('../../assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins_Bold': require('../../assets/fonts/poppins/Poppins-Bold.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

      <View style={{ position: 'absolute', left: 10, top: 10, zIndex: 11 }}>
        <Pressable onPress={() => router.push('./main/login')} >
          <Image source={require('@/assets/images/back.svg')} />
        </Pressable>
      </View>

      <View style={Estilo.container}>
        <ImageBackground
          source={require('@/assets/images/forma01.png')}
          style={Estilo.forma001}
          resizeMode="contain"
        />
      </View>

      <View style={Estilo.title}>
        <Text style={Estilo.txt}>Bem vindo</Text>

        <Text style={{ fontFamily: "Fonte-texto", color: "#1261D7", textAlign: "center", fontWeight: 'bold' }}>
          Libere todo o potencial da sua{"\n"}
          aprendizagem! Seu estudo personalizado{"\n"}
          está pronto. Faça login para uma experiência{"\n"}
          adaptada às suas necessidades e alcance{"\n"}
          resultados incríveis.
        </Text>

        <View style={Estilo.containerRegis}>
          <TextInput
            style={Estilo.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="Nome Completo"
            keyboardType="default"
          />

          <TextInput
            style={Estilo.input}
            onChangeText={onChangeCpf}
            value={cpf}
            placeholder="CPF"
            keyboardType="numeric"
          />

          <TextInput
            style={Estilo.input}
            onChangeText={onChangeEndereco}
            value={endereco}
            placeholder="Endereço"
            keyboardType="default"
          />

          <TextInput
            style={Estilo.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />

          <TextInputMask
            style={Estilo.input}
            type={'custom'}
            options={{ mask: '99/99/9999' }}
            onChangeText={onChangeData}
            value={data}
            placeholder="Data de nascimento"
            keyboardType="numeric"
          />

          {/* Campo de senha com validação */}
          <View style={Estilo.boxInput}>
            <TextInput
              style={Estilo.inputPassword}
              onChangeText={(text) => {
                setPassword(text);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(text);
                if (text.length === 0) {
                  setErrorPassword('');
                } else if(text.length < 8 && !hasSpecialChar){
                  setErrorPassword('A senha deve conter 8 caracteres.')
                } else if (!hasSpecialChar) {
                  setErrorPassword('A senha precisa conter pelo menos um caractere especial.');
                } else {
                  setErrorPassword('');
                }
              }}
              value={password}
              placeholder="Senha"
              secureTextEntry={!showPassword}
              keyboardType="default"
              placeholderTextColor="#fff"
            />
            {password.length > 0 && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 10, top: 10 }}>
                <Icon name={showPassword ? 'eye-slash' : 'eye'} size={24} color="#FFF" />
              </TouchableOpacity>
            )}
          </View>

          {/* Mensagem de erro */}
          {errorPassword !== '' && (
            <Text style={{ color: 'red', marginTop: 5 }}>{errorPassword}</Text>
          )}

          <TextInput
            style={Estilo.input}
            onChangeText={(confirmText) =>{
              setConfirmPassword(confirmText);
              const Text = password;
              if(confirmText.length === 0){
                setErrorConfirmPassword('')
              } else if (confirmText != Text){
                setErrorConfirmPassword('As senhas não coincidem.')
              }else{
                setErrorConfirmPassword('')
              }
            }}
            value={confirmPassword}
            placeholder="Confirme a senha"
            secureTextEntry={!showPassword}
            keyboardType="default"
          />
          {/* Mensagem de erro  de confirmação*/}
          {errorConfirmPassword !== '' && (
            <Text style={{ color: 'red', marginTop: 5 }}>{errorConfirmPassword}</Text>
          )}

          <Pressable
            style={{ width: '75%', paddingTop: 10 }}
            onPress={async () => {
              try {
                setLoading(true);
                const user = {
                  name,
                  cpf,
                  endereco,
                  email,
                  data_nascimento: formatarData(data),
                  password: password
                };

                await registerUser(user);

                console.log("Cadastro realizado com sucesso!");

                setTimeout(() => {
                  setLoading(false);
                  router.push("/pages/main/login");
                }, 4000);
              } catch (error) {
                setLoading(false);
                console.error(error);
                alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
              }
            }}
          >
            <View style={Estilo.enter}>
              <Text style={{ fontFamily: "Poppins_Bold", color: "#fff", fontSize: 20 }}>Cadastrar</Text>
            </View>
          </Pressable>
        </View>

        <View style={Estilo.containerLogin}>
          <Text style={Estilo.textLogin}>Já possui uma conta?</Text>
          <Pressable onPress={() => router.push('./main/login')} >
            <Text style={[Estilo.textLogin, { borderBottomWidth: 2, borderColor: '#1261D7' }]}>Entrar</Text>
          </Pressable>
        </View>
      </View>

      <View style={Estilo.container002}>
        <ImageBackground
          source={require('@/assets/images/forma02.png')}
          style={Estilo.forma002}
          resizeMode="contain"
        />
      </View>

    </SafeAreaView>
  );
}
