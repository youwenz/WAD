import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WishListCard from './WishListCard';
import Homestay from '../../models/Homestay';
import { PRIMARY, SECONDARY } from '../Style/Color';
import { useFavourites } from '../WishList/FavouriteContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const WishListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { favourites, clearFavourites } = useFavourites();

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
    <SafeAreaView style={styles.backgroundContainer}>
      <StatusBar barStyle='dark-content'/>
      <Text style={styles.title}>Wishlist</Text>
      {favourites.length === 0 ? (
        <Text style={styles.emptyMessage}>No items in your wishlist.</Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.listing_id ? item.listing_id.toString() : Math.random().toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <TouchableOpacity style={styles.clearButton} onPress={clearFavourites}>
              <Text style={styles.clearButtonText}>Clear Wishlist</Text>
            </TouchableOpacity>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 30,
    color: PRIMARY,
    fontFamily: 'Poppins-SemiBold',
    padding: 10,
  },
  horizontalLine: {
    width: '95%',
    height: 1,
    backgroundColor: 'rgba(119, 107, 93, 0.2)',
    marginVertical: 10,
  },
  emptyMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: PRIMARY,
    textAlign: 'center',
    marginTop: 20,
  },
  clearButton: {
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  clearButtonText: {
    color: PRIMARY,
    fontSize: 16,
  },
});

export default WishListScreen;
