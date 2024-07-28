import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { PRIMARY } from '../Style/Color';
import CustomButton from '../Home/CustomButton';
import BottomBar from '../Home/BottomBar';

const BookingDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const totalPrice = "$100"; // Replace with actual price

  const handleSubmit = () => {
    navigation.navigate('PaymentMethodScreen');
    console.log('Button pressed!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset if necessary
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.detailsContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.detailText}>Name:</Text>
                <TextInput style={styles.input} placeholder="Enter your name" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.detailText}>Guest Number:</Text>
                <TextInput style={styles.input} placeholder="Enter guest number" keyboardType="numeric" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.detailText}>Phone:</Text>
                <View style={styles.phoneContainer}>
                  <Picker
                    selectedValue={selectedCountryCode}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}
                  >
                    <Picker.Item label="+1 (USA)" value="+1" />
                    <Picker.Item label="+44 (UK)" value="+44" />
                    <Picker.Item label="+60 (Malaysia)" value="+60" />
                    <Picker.Item label="+91 (India)" value="+91" />
                  </Picker>
                  <TextInput style={styles.input} placeholder="Enter phone number" keyboardType="phone-pad" />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.detailText}>Email:</Text>
                <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.detailText}>ID Number:</Text>
                <View style={styles.idContainer}>
                  <TextInput
                    style={[styles.input, styles.idInput]}
                    placeholder="Enter ID number"
                    secureTextEntry={!isPasswordVisible}
                  />
                  <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.iconContainer}>
                    <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color="gray" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <BottomBar style={styles.bottomBar}>
            <View style={styles.bottomBarContent}>
              <Text style={styles.totalPrice}>Total Price: {totalPrice}</Text>
              <CustomButton text="Next" onPressFunction={handleSubmit} />
            </View>
          </BottomBar>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // Space for the BottomBar
  },
  detailsContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#776B5D", 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
    padding: 10,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    marginRight: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    color: "#776B5D",
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idInput: {
    flex: 1, 
  },
  iconContainer: {
    marginLeft: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY,
    marginRight: 20,
  },
});

export default BookingDetailsScreen;
