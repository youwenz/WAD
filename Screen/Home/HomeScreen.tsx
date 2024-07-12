import {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import TravelCard from './TravelCard';
import Homestay from '../Homestay';
const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpeg');
const image3 = require('../../assets/images/image3.jpg');
const image4 = require('../../assets/images/image4.jpg');
const coverImage = require('../../assets/images/coverImage.jpg');
const homestayList: Homestay[] = [
  new Homestay(
    'Koh Rong Samloem',
    image1,
    5,
    'This place is great for people...',
  ),
  new Homestay('Another Place', image2, 4.5, 'Another description...'),
  new Homestay('Another Place', image3, 4.5, 'Another description...'),
  new Homestay('Another Place', image4, 4.5, 'Another description...'),
];
function HomeScreen() {
  return (
    <View style={styles.container}>
        <Image source={coverImage} style={styles.coverImage} /> 
      <Text style={styles.heading}>Popular homestay in Selangor</Text>
      <FlatList
        data={homestayList}
        horizontal={true}
        style={styles.list}
        renderItem={({item}) => (
          <TravelCard
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        )}
      />
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
export default HomeScreen;
