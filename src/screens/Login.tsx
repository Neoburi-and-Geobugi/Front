import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../styles/LoginStyles';

type Props = {
  navigation: {
    replace: (screen: string) => void;
    navigate: (screen: string) => void;
  };
};

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // 임시로 fcmToken을 설정하는 코드 (실제 앱에서는 Firebase 등을 사용해 설정)
  const fcmToken = 'your-fcm-token'; // Firebase Cloud Messaging에서 받은 토큰

  const handleLogin = async () => {
    try {
      // 스프링 서버의 로그인 API 엔드포인트로 요청을 보냄
      const response = await axios.post('http://10.0.2.2:8080/user/sign-in', {
        email,
        password,
        fcmToken, // fcmToken을 함께 보냄
      });

      // 로그인 성공 시, 응답으로 받은 JWT 토큰을 AsyncStorage에 저장
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      
      // 로그인 성공 후 Home 화면으로 이동
      navigation.replace('PostLostPet');
    } catch (error) {
      // 로그인 실패 시 에러 메시지를 보여줌
      const err = error as Error;
      Alert.alert('로그인 실패', err.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/logbg.png')} // 배경 이미지 경로
      style={styles.container}
      resizeMode="cover"
    >
      {/* 이메일 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isFocused ? styles.inputFocus : null]}
          placeholder="이메일"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      {/* 비밀번호 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인하기</Text>
      </TouchableOpacity>

      {/* 회원가입 버튼 */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Login;
