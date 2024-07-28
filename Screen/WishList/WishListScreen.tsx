// WishListScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WishListCard from './WishListCard';
import Homestay from '../Homestay';
import { PRIMARY, SECONDARY } from '../Style/Color';

const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpeg');
const image3 = require('../../assets/images/image3.jpg');
const image4 = require('../../assets/images/image4.jpg');

const homestayList: Homestay[] = [
  new Homestay('Koh Rong Samloem', 'Camping 1 night at chongkranroy', image1, 5, 'This place is great for people...'),
  new Homestay('Another Place', '2 day 1 night Siem Reap', image2, 4.5, 'Another description...'),
  new Homestay('Another Place', '2 day Bangkok, Thailand', image3, 4.5, 'Another description...'),
  new Homestay('Another Place', 'Camping 2 day at chongkranroy', image4, 4.5, 'Another description...'),
];

const WishListScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToDetail = (item: Homestay) => {
    navigation.navigate('DetailScreen', { item });
  };

  const renderItem = ({ item }: { item: Homestay }) => (
    <View>
      <WishListCard homestay={item} onPress={() => navigateToDetail(item)} />
      <View style={styles.horizontalLine} />
    </View>
  );

  return (
    <View style={styles.backgroundContainer}>
      <Text style={styles.title}>Wishlist</Text>
      <FlatList
        data={homestayList}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 30,
    color: PRIMARY,
    fontFamily: 'Poppins-SemiBold',
    padding: 10,
    paddingTop: 70,
  },
  horizontalLine: {
    width: '95%',
    height: 1,
    backgroundColor: 'rgba(119, 107, 93, 0.2)',
    marginVertical: 10,
  },
});

export default WishListScreen;
