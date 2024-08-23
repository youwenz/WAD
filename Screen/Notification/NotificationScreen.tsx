import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Notification from './Notification';
import NotificationCard from './NotificationCard';
import { PRIMARY } from '../Style/Color';

const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpeg');
const image3 = require('../../assets/images/image3.jpg');

const NotificationListScreen: React.FC = () => {
  // State for notifications
  const [notifications] = useState<Notification[]>([
    new Notification('New Recommended place', 'Just for you', '1 day ago', image1),
    new Notification('Your Booking Success', 'You have been accepted...', '1 day ago', image2),
    new Notification('Get an unlimited traveling', 'Received summer spe..', '2 days ago', image3),
  ]);

  const renderItem = ({ item }: { item: Notification }) => (
    <NotificationCard notification={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.title}
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
});

export default NotificationListScreen;
