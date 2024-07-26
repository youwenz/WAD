import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App!</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    marginBottom: 20
  }
});

export default OnboardingScreen;