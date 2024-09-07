import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getDBConnection, getUsers, createTableUsers} from './database'; // Import your database functions
import { PRIMARY } from '../Style/Color';
const coverImage = require('../../assets/images/onboarding.png');

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const db = await getDBConnection(); // Get the database connection
      await createTableUsers(db);
      const fetchedUsers = await getUsers(db); // Fetch users from the database
      setUsers(fetchedUsers); // Update state with fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false); // Set loading to false once fetching is done
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={coverImage} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.smallTitle}>Plan your</Text>
        <Text style={styles.title}>Luxurious Vacation</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>
        {/* <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.userContainer}>
              <Text style={{color: 'red'}}>Name: {item.name}</Text>
              <Text style={{color: 'red'}}>Email: {item.email}</Text>
              <Text style={{color: 'red'}}>Password: {item.password}</Text>
              <Text style={{color: 'red'}}>Age: {item.age}</Text>
              <Text style={{color: 'red'}}>Phone: {item.phone_number}</Text>
              <Text style={{color: 'red'}}>Profile Picture: {item.profile_picture}</Text>
              <Text style={{color: 'red'}}>Created At: {item.created_at}</Text>
              <Text style={{color: 'red'}}>Updated At: {item.updated_at}</Text>
            </View>
          )}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  coverImage: {
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100, // Adjust padding to your preference
  },
  smallTitle: {
    position: 'absolute',
    top: 80,
    left: 30,
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 30,
  },
  title: {
    position: 'absolute',
    width: 300,
    top: 120,
    left: 30,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 48,
  },
  button: {
    backgroundColor: PRIMARY,
    width: 300,
    borderRadius: 15,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    top: 50
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 20,
  },
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default OnboardingScreen;
