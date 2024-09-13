import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { PRIMARY } from '../Style/Color';
import CustomButton from '../Home/CustomButton';
import BottomBar from '../Home/BottomBar';

const BookingDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', email: '', password: '' });

  const { hotelName, hotelImage, price } = route.params;

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = { name: '', phone: '', email: '', password: '' };

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!phone.trim() || isNaN(Number(phone)) || phone.length < 8 || phone.length > 15) {
      newErrors.phone = 'Please enter a valid phone number (8-15 digits).';
    }
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password.trim() || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = () => {
    if (validateFields()) {
      navigation.navigate('PaymentMethodScreen', {
        hotelName,
        hotelImage,
        price,
        checkInDate: route.params.checkInDate,
        checkOutDate: route.params.checkOutDate,
      });
      console.log('Button pressed!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.detailsContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.detailText}>Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                />
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
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
                  <TextInput
                    style={styles.input}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
                {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.detailText}>Email:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.detailText}>Password:</Text>
                <View style={styles.idContainer}>
                  <TextInput
                    style={[styles.input, styles.idInput]}
                    placeholder="Enter your password"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.iconContainer}>
                    <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color="gray" />
                  </TouchableOpacity>
                </View>
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              </View>
            </View>
          </ScrollView>
          <BottomBar style={styles.bottomBar}>
            <View style={styles.bottomBarContent}>
              <Text style={styles.totalPrice}>Total Price: ${price}</Text>
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
    paddingBottom: 100,
  },
  detailsContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailText: {
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
    backgroundColor: '#F9F9F9',
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
    color: '#776B5D',
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
  errorText: {
    color: '#FF6347',
    fontSize: 14,
    marginTop: 5,
    paddingLeft: 5,
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
