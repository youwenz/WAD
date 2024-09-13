import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation , useFocusEffect } from '@react-navigation/native';
import WishListCard from './WishListCard';
import { WishItem } from '../WishList/wishItemTypes';
import { PRIMARY } from '../Style/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getWishlist, clearWishlist } from './wishlistService';

const WishListScreen: React.FC = () => {
  const [favourites, setFavourites] = useState<WishItem[]>([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchWishlist = async () => {
        try {
          const wishlistItems = await getWishlist();
          console.log('Fetched wishlist items:', wishlistItems);
  
          const validItems = wishlistItems.filter(item => item.listing_id !== undefined);
          setFavourites(validItems);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };
  
      fetchWishlist();
    }, [])
  );

  const clearFavouritesHandler = async () => {
    try {
      await clearWishlist();
      setFavourites([]);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  };

  const navigateToDetail = (item: WishItem) => {
    navigation.navigate('DetailScreen', { item });
  };

  const renderItem = ({ item }: { item: WishItem }) => (
    <View>
      {item.listing_id !== undefined && (
        <>
          <WishListCard item={item} onPress={() => navigateToDetail(item)} />
          <View style={styles.horizontalLine} />
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.backgroundContainer}>
      <StatusBar barStyle='dark-content' />
      <Text style={styles.title}>Wishlist</Text>
      {favourites.length === 0 ? (
        <Text style={styles.emptyMessage}>No items in your wishlist.</Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.listing_id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <TouchableOpacity style={styles.clearButton} onPress={clearFavouritesHandler}>
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
