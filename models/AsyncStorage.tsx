import AsyncStorage from '@react-native-async-storage/async-storage';
import homestayList from './HomeStayList';
export const saveHomestayList = async () => {
  try {
    console.log('Homestay list:', homestayList);  // Debug log

    const homestayListJson = JSON.stringify(homestayList);
    await AsyncStorage.setItem('homestayList', homestayListJson);

    console.log('Homestay list saved successfully.');
  } catch (error) {
    console.error('Failed to save homestay list:', error);
  }
};

