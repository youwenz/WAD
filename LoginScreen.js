import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to Discover</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            onChangeText={(text) => setEmail(text)}
            value={email}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
        />
        
        <TouchableOpacity
            style={styles.buttonLogin}
            onPress={handleLogin}
        >
            <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        
        <View style={styles.seperate}/>

        <View style={styles.row}>
            <Text style={styles.message}>Don't have an account on Discover yet?</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('CreateAccount')}
            >
            <Text style={styles.caText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontWeight: '900',
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center'  // Center the text
  },
  label: {
    fontWeight: '800',
    fontSize: 15,
    marginBottom: 10
  },
  input: {
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10
  },
  buttonLogin: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'grey',
  },
  loginText: {
    color: 'white',
    fontWeight: '800',
  },
  caText: {
    fontSize: 12,
    color: 'grey',
    fontWeight: '800',
    marginLeft: 10,
  },
  message: {
    fontSize: 12,
    color: 'grey',
  },
  seperate:{
    height: 1,
    backgroundColor: 'grey',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
});

export default LoginScreen;