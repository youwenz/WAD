import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './Screen/Login/App'; // Handles Onboarding, Login, Create Account
import MainAppStack from './Screen/App'; // Handles Home, Main Screens, etc.

const Stack = createStackNavigator();

const App: React.FC = () => {
  //set this state to true to bypass login page
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainAppStack />
      ) : (
        <AuthStack onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
};

export default App;
