import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDBConnection, getUsers } from '../database'; // Import your database functions

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch users from the database
  const fetchUsers = async () => {
    try {
      const db = await getDBConnection(); // Get the database connection
      const fetchedUsers = await getUsers(db); // Fetch users from the database
      setUsers(fetchedUsers); // Update state with fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false); // Set loading to false once fetching is done
    }
  };

  // Fetch users when component mounts
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
      <Text style={styles.title}>Welcome to the App!</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Login')}
      />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default OnboardingScreen;