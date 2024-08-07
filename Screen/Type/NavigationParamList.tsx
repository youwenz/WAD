import Homestay from '../../models/Homestay';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

// Define a type stack navigator screens
export type RootStackParamList = {
  Main: undefined;
  DetailScreen: DetailScreenParams;
  CalendarScreen: CalendarScreenParams;
  BookingDetails:BookingDetailsParams;
  PaymentMethodScreen: PaymentMethodScreenParams; 
  CreditDebitCardScreen:CreditDebitCardScreenParams;
  TngoScreen:TngoScreenParams;
};

// Create a type for stack navigation prop
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

// Define a type for route props to pass parameters
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// Define a type for your tab navigator screens
type MainTabParamList = {
  Home: undefined;
  Favourite: undefined;
  Notification: undefined;
  Profile: undefined;
};

// Create a type for tab navigation prop
export type MainTabNavigationProp<T extends keyof MainTabParamList> =
  StackNavigationProp<MainTabParamList, T>;

// Define a type for route props to pass parameters
export type MainTabRouteProp<T extends keyof MainTabParamList> = RouteProp<
  MainTabParamList,
  T
>;

interface DetailScreenParams {
  item: Homestay;
  title: string;
  imageUrl: string;
}

interface CalendarScreenParams {
  title: string;
  imageUrl: string;
}

interface HomescreenParams {}

interface BookingDetailsParams {  
  title: string;
  imageUrl: string;
}

interface PaymentMethodScreenParams {
  title: string;
  imageUrl: string;
}
