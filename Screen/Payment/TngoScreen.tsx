import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomBar from '../Home/BottomBar';
import { PRIMARY } from '../Style/Color';
import { getDBConnection, addBooking } from '../BookingDetails/bookingDb';

const TngoScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);

  const { hotelName, checkInDate, checkOutDate, price, phoneNumber, orderId } = route.params;

  const handleProceedPayment = async () => {
    try {
      const db = await getDBConnection();
      console.log('Database connection established');
      await addBooking(db, hotelName, checkInDate, checkOutDate, price);
      console.log('Booking added successfully');
      setModalVisible(true); 
    } catch (error) {
      console.error('Failed to add booking:', error);
    }
  };


  const handleBackToHome = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

  const handleViewBookingHistory = () => {
    setModalVisible(false);
    navigation.navigate('History');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.paymentDetailsContainer}>
          <Image
            source={require('../../assets/images/tngoIcon.png')}
            style={styles.logo}
          />
          {/* Dynamically display the phone number */}
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          {/* Dynamically display the price from the route params */}
          <Text style={styles.price}>RM {price}</Text>

          <View style={styles.paymentDetails}>
            <Text style={styles.detailLabel}>Payment Details</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Order Number:</Text>
              <Text style={styles.detailValue}>{orderId}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Merchant:</Text>
              <Text style={styles.detailValue}>travel.com</Text>
            </View>
          </View>
        </View>

        {/* Modal View */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Payment Complete</Text>
              <Text style={styles.modalMessage}>Your payment has been successfully processed.</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleBackToHome}
              >
                <Text style={styles.modalButtonText}>Back to Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleViewBookingHistory}
              >
                <Text style={styles.modalButtonText}>View Booking History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <BottomBar style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBarButton}
          onPress={handleProceedPayment}
        >
          <Text style={styles.bottomBarButtonText}>Proceed Payment</Text>
        </TouchableOpacity>
      </BottomBar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  paymentDetailsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  phoneNumber: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  paymentDetails: {
    width: '100%',
    paddingHorizontal: 20,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  detailTitle: {
    fontSize: 16,
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: PRIMARY,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomBarButton: {
    width: '100%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: PRIMARY,
  },
  bottomBarButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TngoScreen;
