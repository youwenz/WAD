import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PRIMARY } from '../Style/Color'; 
import BottomBar from '../Home/BottomBar'; 
import { getDBConnection, addBooking } from '../BookingDetails/bookingDb';

const CreditDebitCardScreen: React.FC = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [errors, setErrors] = useState({ cardNumber: '', cvv: '', cardHolderName: '' });
  const [success, setSuccess] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false); 
  const route = useRoute();
  const { hotelName, checkInDate, checkOutDate, price, phoneNumber, orderId } = route.params;

  const validateFields = () => {
    const newErrors = { cardNumber: '', cvv: '', cardHolderName: '' };

    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required.';
    } else if (cardNumber.length < 16 || cardNumber.length > 19) {
      newErrors.cardNumber = 'Card number must be between 16 and 19 digits.';
    }

    if (!cvv.trim()) {
      newErrors.cvv = 'CVV is required.';
    } else if (cvv.length < 3 || cvv.length > 4) {
      newErrors.cvv = 'CVV must be 3 or 4 digits.';
    }

    if (!cardHolderName.trim()) {
      newErrors.cardHolderName = 'Card holder name is required.';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleProceedPayment = async () => {
    if (!validateFields()) {
      Alert.alert(
        'Invalid Input',
        'Please ensure all fields are filled in correctly.',
        [{ text: 'OK' }]
      );
      return;
    }
  
    try {
      const db = await getDBConnection();
      await addBooking(db, hotelName, checkInDate, checkOutDate, price);
      setSuccess(true); // Set success to true to show the modal
      setModalVisible(true);
    } catch (error) {
      console.error('Failed to add booking:', error);
    }
  };
  
  // Navigation functions
  const handleBackToHome = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

  const handleViewBookingHistory = () => {
    setModalVisible(false);
    navigation.navigate('History');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.innerContainer}>
          <StatusBar barStyle="dark-content" />
          {!success ? (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Card Number:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="16-digits (without dash)"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                  maxLength={19} 
                />
                {errors.cardNumber ? <Text style={styles.errorText}>{errors.cardNumber}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>CVV:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="3 digits"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={3} 
                />
                {errors.cvv ? <Text style={styles.errorText}>{errors.cvv}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Card Holder Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={cardHolderName}
                  onChangeText={setCardHolderName}
                />
                {errors.cardHolderName ? <Text style={styles.errorText}>{errors.cardHolderName}</Text> : null}
              </View>
            </View>
          ) : (
           // Modal View
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
          )}
          <BottomBar style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.bottomBarButton}
              onPress={handleProceedPayment}
            >
              <Text style={styles.bottomBarButtonText}>Proceed Payment</Text>
            </TouchableOpacity>
          </BottomBar>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  innerContainer: { flex: 1, padding: 20 },
  formContainer: { flex: 1 },
  inputContainer: { marginBottom: 20, padding: 10, backgroundColor: 'white', borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  label: { fontSize: 16, color: '#776B5D', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#F9F9F9' },
  errorText: { color: '#FF6347', fontSize: 14, marginTop: 5, paddingLeft: 5 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF', 
    borderTopWidth: 1,
    borderTopColor: '#DCDCDC', 
    alignItems: 'center', 
    justifyContent: 'center',
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
  bottomBarButton: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY,
    borderRadius: 10,
  },
  bottomBarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreditDebitCardScreen;
