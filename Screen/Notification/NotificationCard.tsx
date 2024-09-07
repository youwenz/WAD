import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Notification from './Notification';
import { PRIMARY } from '../Style/Color';


interface Props {
  notification: Notification;
}

const NotificationCard: React.FC<Props> = ({ notification }) => {
  return (
    <View style={styles.card}>
      <Image source={notification.imageUrl} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.description}>{notification.description}</Text>
        <Text style={styles.time}>{notification.day}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationCard;
