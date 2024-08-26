import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { PRIMARY } from '../Style/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomButton from '../Home/CustomButton';
import { LogBox } from 'react-native';
import {getDBConnection, createTableUsers, createUsers} from './database';
import  validation  from './Validation';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]); 

type CreateAccountScreenProps = {
  navigation: StackNavigationProp<any, 'CreateAccount'>; 
};

const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({ navigation }) => {
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<any>(null);

  const _createTable = async () => {
    await createTableUsers(await getDBConnection());
  }

  const _insert = async () => {
    const fullName = `${fName} ${lName}`; 
    if(!validation(email,password,phone,age)){
      return;
    }else{
      await createUsers(await getDBConnection(),fullName,email,password,age,phone);
      Alert.alert(
        'Account Created!',
        'Your account has been successfully created. Please log in.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'), // Navigate to Login screen after dismissing the alert
          },
        ]
      );
    }
  }

  useEffect(()=>{
    _createTable();
  },[]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create an account</Text>

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
          onPressFunction={_insert}
          width= {323}
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
    backgroundColor: 'white',
    alignItems: 'center'
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    padding: 10,
    textAlign: 'center',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: 15
  },
  input: {
    height: 52,
    borderRadius: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 25,
    borderColor: '#dddddd',
    borderWidth: 1,
    color: PRIMARY,
    backgroundColor: 'white',
    width: 350
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
    fontSize: 16,
    color: PRIMARY,
  },
  back: {
    fontFamily: 'Poppins-Mixed',
    fontWeight: 'bold',
    fontSize: 16,
    color: PRIMARY,
  }
});

export default CreateAccountScreen;