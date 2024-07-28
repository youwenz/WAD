import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Notification from './Notification';
import NotificationCard from './NotificationCard';
import { PRIMARY, SECONDARY } from '../Style/Color';

const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpeg');
const image3 = require('../../assets/images/image3.jpg');

const notificationList: Notification[] = [
  new Notification('New Recommended place', 'Just for you', '1 day ago', image1),
  new Notification('Your Booking Success', 'You have been accepted...', '1 day ago', image2),
  new Notification('Get an unlimited traveling', 'Received summer spe..', '2 day ago', image3),
];

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToDetail = (item: Notification) => {
    navigation.navigate('DetailScreen', { item });
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <NotificationCard notification={item} onPress={() => navigateToDetail(item)} />
  );

  return (
    <View style={styles.backgroundContainer}>
      <Text style={styles.title}>Notification</Text>
      <Text style={styles.subTitle}>Today</Text>
      <FlatList
        data={notificationList}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 30,
    color: PRIMARY,
    fontFamily: 'Poppins-SemiBold',
    padding: 10,
    paddingTop: 70,
  },
  subTitle: {
    fontSize: 18,
    color: PRIMARY,
    fontFamily: 'Poppins-SemiBold',
    margin: 10,
  },
});

export default NotificationScreen;
