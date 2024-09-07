import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './Screen/Login/App';
import MainAppStack from './Screen/App';
import { navigationRef } from './Screen/NavigationService';
import { saveHomestayList } from './models/AsyncStorage';


const Stack = createStackNavigator();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onLoginSuccess = async () => {
    setIsLoggedIn(true);
    
    // Call the function to save the homestay list after login
    await saveHomestayList();  // Ensure this is async as it involves AsyncStorage
  };
  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? (
        <MainAppStack setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AuthStack onLoginSuccess={onLoginSuccess} />
      )}
    </NavigationContainer>
  );
};

export default App;
