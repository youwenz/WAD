import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { PRIMARY } from '../Style/Color';
import CustomButton from '../Home/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { getDBConnection, updateUser} from './database';
import validatePassword from './Validation';

type ChangePasswordScreenProps = {
  navigation: StackNavigationProp<any, 'ChangePassword'>; 
};

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handlePassword = async() => {
    if(newPassword.length <8 ){
      Alert.alert('Please enter at least 8 digits of password!')
    }else if (newPassword == confirmPassword){
      await updateUser(await getDBConnection(), email, newPassword);
      navigation.goBack();
    }else{
      Alert.alert('Password is not same !!!');
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Change Password</Text>
      </View>
      <View>
        <Text style={styles.label}>Your email:</Text>
        <TextInput
          style={styles.input}
          placeholder="abc@gmail.com"
          secureTextEntry
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.label}>New Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          onChangeText={(text) => setNewPassword(text)}
          value={newPassword}
        />
        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
      </View>
      <View style={styles.button}>
        <CustomButton
          text="Confirm"
          onPressFunction={handlePassword}
        />
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
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: PRIMARY,
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
});

export default ChangePasswordScreen;
