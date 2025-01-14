import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import HomeScreen from "../screens/HomeScreen";
import MyPetScreen from "../screens/MyPetScreen";
import PetRegistrationScreen from "../screens/PetRegistrationScreen";
import PetInputScreen from "../screens/PetInputScreen";
import KakaoMapScreen from "../screens/KakaoMapScreen";

export type PetData = {
  이름: string;
  품종: string;
  나이: string;
  성별: string;
  거주지: string;
  특징: string;
};

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  MyPet: undefined;
  PetRegistration: undefined;
  PetInput: {
    fieldKey: keyof PetData;
    value: string;
    onSave: (value: string) => void;
  };
  KakaoMap: { onAddressSelect: (address: string) => void };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyPet" component={MyPetScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PetRegistration" component={PetRegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PetInput" component={PetInputScreen} options={{ headerShown: false }} />
        <Stack.Screen name="KakaoMap" component={KakaoMapScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
