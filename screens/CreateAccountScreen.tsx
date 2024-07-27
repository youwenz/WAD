import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { PRIMARY } from '../Style/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomButton from './CustomButton';

interface CreateAccountScreenProps {
  navigation: StackNavigationProp<any, 'CreateAccount'>; // Use 'any' if RootStackParamList is removed
}

const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({ navigation }) => {
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleCreateAccount = (): void => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Get the best out of derleng by creating an account</Text>

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="John"
        onChangeText={setFName}
        value={fName}
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Doe"
        onChangeText={setLName}
        value={lName}
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="011-37653753"
        onChangeText={setPhone}
        value={phone}
      />
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="30"
        onChangeText={setAge}
        value={age}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <View style={styles.button}>
        <CustomButton 
          text="Create Account"
          onPressFunction={handleCreateAccount}
        />
      </View>

      <View style={styles.bottom}>
        <Text style={styles.message}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.back}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontFamily: 'Poppins',
    fontSize: 12,
    padding: 12,
    textAlign: 'center',
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    height: 52,
    borderRadius: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 15,
    borderColor: PRIMARY,
    borderWidth: 1,
    color: PRIMARY,
    backgroundColor: 'white', 
  },
  button: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontFamily: 'Poppins-Mixed',
    fontSize: 10,
    color: PRIMARY,
  },
  back: {
    fontFamily: 'Poppins-Mixed',
    fontWeight: 'bold',
    fontSize: 10,
    color: PRIMARY,
  }
});

export default CreateAccountScreen;