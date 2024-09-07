import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './Screen/Login/App';
import MainAppStack from './Screen/App';
import { navigationRef } from './Screen/NavigationService';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? (
        <MainAppStack setIsLoggedIn={setIsLoggedIn}/>
      ) : (
        <AuthStack onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
};

export default App;
