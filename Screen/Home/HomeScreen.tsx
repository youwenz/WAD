import {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TravelCard from './TravelCard';
import Homestay from '../Homestay';
import {PRIMARY, SECONDARY} from '../Style/Color';
import Icon from 'react-native-vector-icons/FontAwesome';

const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpeg');
const image3 = require('../../assets/images/image3.jpg');
const image4 = require('../../assets/images/image4.jpg');
const coverImage = require('../../assets/images/coverImage.webp');

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


const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToDetail = (item: Homestay) => {
    navigation.navigate('DetailScreen', { item });
  };
  return (
    <View style={styles.container}>
        <Image source={coverImage} style={styles.coverImage} /> 
        <Text style={styles.mainHeading}>Explore the world today</Text>
        <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search destination"
        placeholderTextColor="#A9A9A9"
      />
      <Icon name="search" size={20} color="#A9A9A9" style={styles.icon} />
    </View>
      <Text style={styles.heading}>Popular homestay in Selangor</Text>
      <FlatList
        data={homestayList}
        horizontal={true}
        style={styles.list}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToDetail(item)}>
          <TravelCard
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
          />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  heading: {
    marginTop: 30,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: PRIMARY,
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
  },
  mainHeading:{
    position: 'absolute',
    width: 300,
    top: 80,
    left: 30,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 37,
  },
  searchContainer: {
    position: 'absolute',
    top: 200,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', 
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: PRIMARY, 
    fontFamily: 'Poppins-Medium'
  },
  icon: {
    marginRight: 10,
  },
});
export default HomeScreen;
