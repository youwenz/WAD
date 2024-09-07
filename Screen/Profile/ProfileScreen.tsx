import React , {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useFavourites} from '../WishList/FavouriteContext';
import {getDBConnection, getUsers } from '../Login/database.ts';
import {PRIMARY} from '../Style/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate } from '../NavigationService';

const profile1 = require('../../assets/images/profile1.jpg');

interface ProfileScreenProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({setIsLoggedIn}) => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState<any>(null);
  const {favourites, bucketListCount} = useFavourites();

  const fetchUserProfile = async () => {
    try {
      const db = await getDBConnection();
      const users = await getUsers(db);

      if (users.length > 0) {
        setProfile(users[0]);
      } else {
        Alert.alert('No users found');
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
      Alert.alert('Error fetching profile');
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.personContainer}>
        <Image style={styles.image} source={profile.profile_picture ? {uri: profile.profile_picture } : require('../../assets/images/profile1.jpg')} />
        <View style={styles.personDetailsContainer}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.description}>Email: {profile.email}</Text>
        </View>
      </View>
      <View style={styles.travelDetailsContainer}>
        <View style={styles.travelDetailsInnerContainer}>
          <Text style={styles.travelDetailsTitle}>Age</Text>
          <Text style={styles.travelDetailsText}>{profile.age}</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.travelDetailsInnerContainer}>
          <Text style={styles.travelDetailsTitle}>Phone</Text>
          <Text style={styles.travelDetailsText}>{profile.phone_number}</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.travelDetailsInnerContainer}>
          <Text style={styles.travelDetailsTitle}>Bucket List</Text>
          <Text style={styles.travelDetailsText}>{bucketListCount}</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.accountSettingContainer}>
        <Text style={styles.profileTitle}>Account Setting</Text>
        <TouchableOpacity onPress={()=> navigate('ChangePassword')}>
          <View style={styles.accountSettingInnerContainer}>
            <Icon name="person-circle" size={20} color="#776B5D" />
            <Text style={styles.accountSettingSubTitle}>Edit profile</Text>
            <Icon name="chevron-forward-outline" size={20} color="#776B5D" />
          </View>
        </TouchableOpacity>
        <View style={styles.accountSettingInnerContainer}>
          <Icon name="language" size={20} color="#776B5D" />
          <Text style={styles.accountSettingSubTitle}>Change language</Text>
          <TouchableOpacity>
            <Icon name="chevron-forward-outline" size={20} color="#776B5D" />
          </TouchableOpacity>
        </View>
        <View style={styles.accountSettingInnerContainer}>
          <Icon name="moon" size={20} color="#776B5D" />
          <Text style={styles.accountSettingSubTitle}>Color mode</Text>
          <TouchableOpacity>
            <Icon name="chevron-forward-outline" size={20} color="#776B5D" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileTitle}>Legal</Text>
        <View style={styles.accountSettingInnerContainer}>
          <Icon name="document-text" size={20} color="#776B5D" />
          <Text style={styles.accountSettingSubTitle}>Terms and Condition</Text>
          <Icon name="open-outline" size={20} color="#776B5D" />
        </View>
        <View style={styles.accountSettingInnerContainer}>
          <Icon name="shield-half-outline" size={20} color="#776B5D" />
          <Text style={styles.accountSettingSubTitle}>Privacy policy</Text>
          <Icon name="open-outline" size={20} color="#776B5D" />
        </View>
        <TouchableOpacity onPress={()=>setIsLoggedIn(false)}>
        <View style={styles.logoutContainer}>
          <Text style={styles.logout}>Logout</Text>
        </View>
        </TouchableOpacity>
        <Text style={styles.version}>Version 3.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  personContainer: {
    flexDirection: 'row',
    paddingLeft: 18,
    paddingRight: 18,
    margin: 15,
    marginTop: 100,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 20,
  },
  personDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    color: PRIMARY,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
  description: {
    fontSize: 11,
    color: PRIMARY,
    fontFamily: 'Poppins',
    marginBottom: 5,
  },
  travelDetailsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: -10,
    marginBottom: -20,
  },
  travelDetailsInnerContainer: {
    margin: 18,
    padding: 10,
    alignItems: 'center',
  },
  travelDetailsTitle: {
    fontSize: 13,
    color: PRIMARY,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
  travelDetailsText: {
    fontSize: 14,
    color: PRIMARY,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  horizontalLine: {
    width: '90%',
    height: 1,
    backgroundColor: 'rgba(119, 107, 93, 0.2)',
    marginVertical: 10,
  },
  verticalLine: {
    width: 1,
    height: '70%',
    backgroundColor: 'rgba(119, 107, 93, 0.1)',
    marginVertical: 5,
  },
  accountSettingContainer: {
    width: '90%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  profileTitle: {
    fontSize: 18,
    color: PRIMARY,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  accountSettingInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  accountSettingSubTitle: {
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 30,
    width: '100%',
  },
  logout: {
    fontSize: 16,
    color: PRIMARY,
    fontFamily: 'Poppins',
    textDecorationLine: 'underline',
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
  },
  version: {
    textAlign: 'center',
    marginBottom: 60,
    marginTop: 5,
  },
});

export default ProfileScreen;
