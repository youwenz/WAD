import * as React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../Screen/Home/HomeScreen';
import DetailScreen from '../Screen/Home/DetailScreen';
import {PRIMARY, SECONDARY} from '../Screen/Style/Color';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import ProfileScreen from '../Screen/Profile/ProfileScreen';
import NotificationScreen from '../Screen/Notification/NotificationScreen';
import WishListScreen from '../Screen/WishList/WishListScreen';
import CalendarScreen from '../Screen/Home/CalendarScreen';
import {RootStackParamList} from '../Screen/Type/NavigationParamList';
import BookingDetailsScreen from '../Screen/BookingDetails/BookingDetailsScreen';
import PaymentMethodScreen from '../Screen/Payment/PaymentMethodScreen';
import CreditDebitCardScreen from '../Screen/Payment/CreditDebitCardScreen';
import TngoScreen from '../Screen/Payment/TngoScreen';
import {FavouritesProvider} from '../Screen/WishList/FavouriteContext';
import ChatScreen from '../Screen/Notification/ChatScreen';
import {saveHomestayList} from '../models/AsyncStorage';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

interface ScreenProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const MainTabScreenWrapper: React.FC<{ setIsLoggedIn: (isLoggedIn: boolean) => void }> = (props) => {
  return <MainTabScreen {...props} />;
};
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC<ScreenProps> = ({setIsLoggedIn}) => {
  saveHomestayList();
  return (
    <SafeAreaProvider>
      <FavouritesProvider>
        <StatusBar translucent backgroundColor="transparent" />
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main">
            {props => <MainTabScreenWrapper {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen
            name="CalendarScreen"
            component={CalendarScreen}
            options={{
              headerShown: true,
              title: 'Available date',
            }}
          />
          <Stack.Screen
            name="BookingDetailsScreen"
            component={BookingDetailsScreen}
            options={{
              headerShown: true,
              title: 'Booking Details',
            }}
          />
          <Stack.Screen
            name="PaymentMethodScreen"
            component={PaymentMethodScreen}
            options={{
              headerShown: true,
              title: 'Payment Method',
            }}
          />
          <Stack.Screen
            name="CreditDebitCardScreen"
            component={CreditDebitCardScreen}
            options={{
              headerShown: true,
              title: 'Credit/Debit Card Payment',
            }}
          />
          <Stack.Screen
            name="TngoScreen"
            component={TngoScreen}
            options={{
              headerShown: true,
              title: "Touch 'n Go Payment",
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{headerShown: true, title: 'Chat with host'}}
          />
        </Stack.Navigator>
      </FavouritesProvider>
    </SafeAreaProvider>
  );
}

function MainTabScreen({setIsLoggedIn}: { setIsLoggedIn: (isLoggedIn: boolean) => void }) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'WishList') {
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
        tabBarLabel: ({focused}) => (
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
        tabBarStyle: {height: 70, backgroundColor: 'white'},
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}>
        {props => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default App;
