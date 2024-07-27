import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PRIMARY } from '../Style/Color';
import CustomButton from './CustomButton';

// Import images
import facebookImage from '../images/facebook.png';
import googleImage from '../images/google.jpg';
import appleImage from '../images/apple.webp';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Please fill in both fields');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainHeading}>Welcome to Discover</Text>
        <Text style={styles.subHeading}>Please choose your login option below</Text>
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <CustomButton
          text="Login"
          onPressFunction={handleLogin}
        />
      </View>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>Or log in with</Text>
        <View style={styles.separator} />
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity onPress={() => {/* Handle Facebook login */}}>
          <Image source={facebookImage} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Handle Google login */}}>
          <Image source={googleImage} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Handle Apple login */}}>
          <Image source={appleImage} style={styles.image} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.message}>Don't have an account on Discover?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainHeading: {
    fontFamily: 'Poppins-SemiBold',
    color: PRIMARY,
    fontSize: 22,
    textAlign: 'center',
  },
  subHeading: {
    width: 230,
    fontFamily: 'Poppins',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 52,
    marginVertical: 10,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: PRIMARY,
    fontFamily: 'Poppins',
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    marginVertical: 20,
  },
  message: {
    fontFamily: 'Poppins',
    fontSize: 10,
    color: PRIMARY,
    textAlign: 'center',
  },
  createAccountText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: PRIMARY,
    textAlign: 'center',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: PRIMARY,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: PRIMARY,
  },
  orText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: PRIMARY,
    marginHorizontal: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  bottom: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    borderColor: PRIMARY,
    borderWidth: 1,
    borderRadius: 15,
    width: 102,
    height: 52,
    margin: 10,
  },
});

export default LoginScreen;