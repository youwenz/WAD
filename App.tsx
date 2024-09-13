import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './Screen/Login/App';
import MainAppStack from './Screen/App';
import { navigationRef } from './Screen/NavigationService';
import { saveHomestayList } from './models/AsyncStorage';
import RNFS from 'react-native-fs';

const sourcePath = `reviews.json`; 
const destinationPath = `${RNFS.DocumentDirectoryPath}/reviews.json`; 

async function copyFileIfNotExists() {
  try {
    const fileExists = await RNFS.exists(destinationPath);

    if (!fileExists) {
      // Read file from assets and write it to the Document Directory
      const fileData = await RNFS.readFileAssets(sourcePath);
      await RNFS.writeFile(destinationPath, fileData, 'utf8');
      console.log('File copied successfully!');
    } else {
      console.log('File already exists in the Document Directory.');
    }
  } catch (error) {
    console.error('Error copying file:', error);
  }
}


const Stack = createStackNavigator();

const App: React.FC = () => {

  useEffect(() => {
    copyFileIfNotExists();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onLoginSuccess = async () => {
    setIsLoggedIn(true);
    
    await saveHomestayList();  
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
