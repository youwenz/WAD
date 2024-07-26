import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const CreateAccountScreen = ({ navigation }) => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    // Show an alert indicating registration success
    Alert.alert(
      "Registration Successful !",
      "Your account was created successfully.\nPlease log in to access.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate('Login')
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="John"
        onChangeText={(text) => setFName(text)}
        value={fName}
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Doe"
        onChangeText={(text) => setLName(text)}
        value={lName}
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="011-37653753"
        onChangeText={(text) => setPhone(text)}
        value={phone}
      />
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="30"
        onChangeText={(text) => setAge(text)}
        value={age}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.back}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  back: {
    fontWeight: '800',
    marginLeft: 10,
  }
});

export default CreateAccountScreen;