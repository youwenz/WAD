import {Alert} from 'react-native';

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]@gmail\.com$/;
    return emailRegex.test(email);
  };
  
const validatePassword = (password: string): boolean => {
return password.length >= 8;
};

const validatePhoneNumber = (phoneNumber: string): boolean => {
const phoneNumberRegex = /^01\d-\d{8}$/;
return phoneNumberRegex.test(phoneNumber);
};

const validateAge = (age: string): boolean => {
const ageInt = parseInt(age, 10);
return Number.isInteger(ageInt) && ageInt >= 0 && ageInt <= 120;
};

const validation = (email : string, password : string, phoneNumber: string, age: string) => {
    if(!validateEmail(email))
        Alert.alert('Please enter a valid Gmail address!')
    else if(!validatePassword(password))
        Alert.alert('Please enter at least 8 digits of password!')
    else if(!validatePhoneNumber(phoneNumber))
        Alert.alert('Phone number must be in the format 01X-12345678!')
    else if(!validateAge(age))
        Alert.alert('Please enter a valid age!')
    return false;
}
export default validation;