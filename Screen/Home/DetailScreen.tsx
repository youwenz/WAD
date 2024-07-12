import {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpeg');
const image3 = require('../../assets/images/image3.jpg');
const image4 = require('../../assets/images/image4.jpg');
const coverImage = require('../../assets/images/coverImage.jpg');

function DetailScreen() {
  return (
    <View style={styles.container}>
        <Image source={coverImage} style={styles.coverImage} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    
  },
  heading: {
    marginTop: 30,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: 'black',
  },
  list: {
    marginVertical: 10,
  },
  coverImage:{
    top: 0,
    left: 0,
    right: 0,
    width: 420,
    height: 300,
    resizeMode: 'cover'
  }
});
export default DetailScreen;
