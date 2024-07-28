import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Notification from './Notification';
import { PRIMARY, SECONDARY } from '../Style/Color';

interface Props {
  notification: Notification;
  onPress: () => void;
}

const NotificationCard: React.FC<Props> = ({ notification, onPress }) => {
  return (
    <View>
      <View style={styles.notificationContainer}>
        <Image style={styles.image} source={notification.imageUrl} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.description}>{notification.description}</Text>
          <Text style={styles.day}>{notification.day}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: 'row',
    margin: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    color: PRIMARY,
    fontFamily: 'Poppins',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  day: {
    fontSize: 12,
    color: PRIMARY,
    fontFamily: 'Poppins',
  },
  button: {
    backgroundColor: '#776B5D',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 2.5,
    alignItems: 'center',
    marginTop: 25,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
  },
});

export default NotificationCard;
