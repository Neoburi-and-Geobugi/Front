import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';
import SignUp from '../screens/SingUpScreen';
import PostLostPet from '../screens/PostLostPet'; // PostLostPet 화면

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  PostLostPet: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PostLostPet" component={PostLostPet}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
