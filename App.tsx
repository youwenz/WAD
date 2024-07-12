import * as React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from './Screen/Home/HomeScreen';
import DetailScreen from './Screen/Home/DetailScreen';
import { PRIMARY, SECONDARY } from './Screen/Style/Color';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function FavouriteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Favourite!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar translucent backgroundColor="transparent" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function MainTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favourite') {
            iconName = 'heart';
          } else if (route.name === 'Notification') {
            iconName = 'bell';
          } else {
            iconName = 'user';
          }

          if (iconName !== 'Notification') {
            return <Icon name={iconName} size={size} color={color} />;
          } else {
            return <FAIcon name={iconName} size={size} color={color} />;
          }
        },
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              marginBottom: 12,
              fontSize: 12,
              textAlign: 'center',
              color: focused ? PRIMARY : 'rgba(119,107,93,0.4)',
              marginTop: -14,
            }}>
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: 'rgba(119,107,93,0.4)',
        tabBarStyle: { height: 70, backgroundColor: 'white' },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
            headerShown: false,
          }}/>
      <Tab.Screen name="Favourite" component={FavouriteScreen} options={{
            headerShown: false,
          }}/>
      <Tab.Screen name="Notification" component={ProfileScreen} options={{
            headerShown: false,
          }}/>
      <Tab.Screen name="Profile" component={SettingsScreen} options={{
            headerShown: false,
          }}/>
    </Tab.Navigator>
  );
}
