import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Notification from './Notification';
import NotificationCard from './NotificationCard';
import {PRIMARY, SECONDARY} from '../Style/Color';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpeg');
const image3 = require('../../assets/images/image3.jpg');

const NotificationListScreen: React.FC = () => {
  const navigation = useNavigation();
  // State for notifications
  const [notifications] = useState<Notification[]>([
    new Notification(
      'New Recommended place',
      'Just for you',
      '1 day ago',
      image1,
    ),
    new Notification(
      'Your Booking Success',
      'You have been accepted...',
      '1 day ago',
      image2,
    ),
    new Notification(
      'Get an unlimited traveling',
      'Received summer spe..',
      '2 days ago',
      image3,
    ),
  ]);

  const renderItem = ({item}: {item: Notification}) => (
    <NotificationCard notification={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={() => {navigation.navigate('ChatScreen')}} style={styles.button}>
          <Icon
            name="message-circle"
            size={28}
            color={PRIMARY}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.title}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 30,
    color: PRIMARY,
    fontFamily: 'Poppins-SemiBold',
    padding: 10,
    paddingTop: 70,
    textAlign: 'left',
  },
  listContainer: {
    paddingBottom: 20,
  },
  heading: {
    flexDirection: 'row',
  },
  icon: {
    left: 5,
    top: 5,
  },
  button: {
    top: 70,
    left: 120,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export default NotificationListScreen;
