import * as React from 'react';
import {Text, View, StatusBar, ImageBackground} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from './Screen/Home/HomeScreen';

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

function FavouriteScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Favourite!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile!</Text>
    </View>
  );
}
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white', // Set background color of the entire app
  },
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
      <StatusBar translucent backgroundColor="transparent" />
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
              let iconName: string;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Favourite') {
                iconName = 'heart';
              } else if (route.name === 'Profile') {
                iconName = 'user';
              } else {
                iconName = 'settings';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  marginBottom: 12,
                  fontSize: 12,
                  textAlign: 'center',
                  color: focused ? 'blue' : 'grey',
                  marginTop: -14,
                }}>
                {route.name}
              </Text>
            ),
            tabBarStyle: {height: 70, backgroundColor: 'white'},
          })}>
          <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Favourite" component={FavouriteScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
