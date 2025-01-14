import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import styles from '../styles/SignUpStyles';

type Props = {
  navigation: {
    replace: (screen: string) => void;
    navigate: (screen: string) => void;
  };
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  const handleSignUp = async () => {
    if (!email || !password || !nickname) {
      Alert.alert('오류', '모든 필드를 입력해주세요.');
      return;
    }

    setIsLoading(true); // 로딩 시작
    try {
      // 회원가입 API 호출
      const response = await axios.post('http://10.0.2.2:8080/signup', {
        email,
        password,
        nickname,
      });

      // 회원가입 성공
      if (response.status === 200 || response.status === 201) {
        Alert.alert('회원가입 성공', '회원가입이 완료되었습니다!', [
          {
            text: '확인',
            onPress: () => navigation.replace('Home'), // 메인 화면으로 이동
          },
        ]);
      }
    } catch (error) {
      // 회원가입 실패
      console.error('회원가입 실패:', error);
      Alert.alert('회원가입 실패', '다시 시도해주세요.');
    } finally {
      setIsLoading(false); // 로딩 종료
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
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* 비밀번호 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* 닉네임 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="닉네임"
          placeholderTextColor="#999"
          value={nickname}
          onChangeText={setNickname}
        />
      </View>

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? '회원가입 중...' : '회원가입하기'}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SignUpScreen;
