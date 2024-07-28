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
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomBar from '../Home/BottomBar';
import { PRIMARY } from '../Style/Color';

const CreditDebitCardScreen: React.FC = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleProceedPayment = () => {
    console.log('Payment processed');
    setModalVisible(true);
  };

  const handleBackToHome = () => {
    setModalVisible(false);
    navigation.navigate('Home');
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
          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Card Number:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter card number"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
              />
              <Text style={styles.label}>Card Holder Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter card holder name"
                value={cardHolderName}
                onChangeText={setCardHolderName}
              />
              <Text style={styles.label}>CVV:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter CVV"
                keyboardType="numeric"
                value={cvv}
                onChangeText={setCvv}
              />
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
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <BottomBar style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.bottomBarButton}
          onPress={handleProceedPayment}
        >
          <Text style={styles.bottomBarButtonText}>Proceed Payment</Text>
        </TouchableOpacity>
      </BottomBar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 100, 
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#776B5D', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
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
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreditDebitCardScreen;
