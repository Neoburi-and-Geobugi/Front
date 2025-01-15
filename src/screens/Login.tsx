import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8080/user/sign-in', {
        email,
        password,
        fcmToken: 'your-fcm-token',
      });

      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);

      navigation.replace('Home');
    } catch (error) {
      Alert.alert('로그인 실패', '아이디나 비밀번호를 확인해주세요.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/logbg.png')}
      style={styles.container}
      resizeMode="cover"
    >

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="envelope" size={15} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="이메일"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인하기</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  inputContainer: {
    width: '70%',
    marginBottom: 20,
    marginTop: 60
    
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4EBFF',
    borderRadius: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
    marginLeft: 15
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  button: {
    width: '70%',
    height: 50,
    backgroundColor: '#F3F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 20,
    marginTop: 20
  },
  buttonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 500,
  },
  signUpText: {
    fontSize: 13,
    color: '#999',
  },
  signUpLink: {
    color: '#A020F0',
    fontWeight: 'bold',
  },
});

export default Login;