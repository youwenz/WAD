import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StatusBar,
} from 'react-native';
import { getDBConnection, getAllBookings, deleteBooking } from '../BookingDetails/bookingDb';
import { PRIMARY } from '../Style/Color';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const BookingHistoryScreen: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null); // For modal selection
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const fetchBookings = async () => {
    try {
      const db = await getDBConnection();
      const bookingsList = await getAllBookings(db);
      setBookings(bookingsList);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBookings();
    }, [])
  );

  const handleDelete = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteBooking(db, id);
      setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
      setModalVisible(false); 
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedBookingId(id);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingInfo}>
        <Text style={styles.homestayName}>{item.homestay_name}</Text>
        <Text style={styles.date}>Check-In: {item.check_in_date}</Text>
        <Text style={styles.date}>Check-Out: {item.check_out_date}</Text>
        <Text style={styles.totalPrice}>Total: RM {item.total_price}</Text>
      </View>
      <TouchableOpacity onPress={() => openDeleteModal(item.id)}>
        <FontAwesomeIcon name="trash" size={24} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Booking History</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('ChatScreen'); }} style={styles.chatButton}>
          <Icon name="message-circle" size={28} color={PRIMARY} />
        </TouchableOpacity>
      </View>
      {bookings.length === 0 ? (
        <Text style={styles.noBookingText}>No bookings found.</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Booking</Text>
            <Text style={styles.modalMessage}>Are you sure you want to delete this booking?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(selectedBookingId!)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: PRIMARY,
    fontFamily: 'Poppins-SemiBold',
  },
  chatButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  noBookingText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
  bookingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  bookingInfo: {
    flex: 1,
  },
  homestayName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY,
  },
  date: {
    fontSize: 16,
    color: '#777',
    marginVertical: 2,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY, 
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: 'black',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default BookingHistoryScreen;
