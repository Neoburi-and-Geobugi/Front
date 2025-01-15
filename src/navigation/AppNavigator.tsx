import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';
import SignUp from '../screens/SingUpScreen';
import PostLostPet from '../screens/PostLostPet';
import KakaoMapScreen from '../screens/KakaoMapScreen';
import PostDetailScreen from '../screens/PostDetailScreen';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  PostLostPet: undefined;
  KakaoMap: undefined;
  PostDetail: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="KakaoMap">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PostLostPet" component={PostLostPet} />
        <Stack.Screen name="KakaoMap" component={KakaoMapScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
