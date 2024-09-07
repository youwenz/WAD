import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import LoginScreen from './LoginScreen';
import CreateAccountScreen from './CreateAccountScreen';
import OnboardingScreen from './OnboardingScreen';
import HomeScreen from './HomeScreen';
import ChangePassword from './ChangePassword';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  CreateAccount: undefined;
  Home: undefined;
  ChangePassword: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC<{onLoginSuccess: () => void}> = ({onLoginSuccess}) => {
  return (
    <>
    <StatusBar translucent backgroundColor="transparent" />
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {props => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
    </>
  );
};

export default App;
