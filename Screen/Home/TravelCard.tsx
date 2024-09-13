import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PRIMARY, SECONDARY } from '../Style/Color';
import Ratings from './Ratings';
import { addToWishlist, getWishlist, removeFromWishlist  } from '../WishList/wishlistService';
import { WishItem } from '../WishList/wishItemTypes';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
  title: string;
  description: string;
  image: ImageSourcePropType;
  ratings: number;
  city: string;
  price: number;
  address: string;
  bedroomNo: number;
  washroomNo: number;
  listing_id: number;
}

const TravelCard: React.FC<Props> = ({ title, description, image, ratings, city, price, address, bedroomNo, washroomNo,listing_id }) => {
  const [favourite, setFavourite] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchWishlist = async () => {
        try {
          const wishlist = await getWishlist();
          const isFavorited = wishlist.some(item => item.listing_id === listing_id);
          setFavourite(isFavorited);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };
  
      fetchWishlist();
    }, [listing_id])
  ); 

  const toggleFavourite = async () => {
    if (listing_id === undefined) {
      console.error('Listing ID is undefined');
      return;
    }
    const item: WishItem = {
      listing_id: listing_id,
      title: title,
      image: image, 
      ratings: ratings,
      city: city,
      address: address,
      price: price,
      description: description,
      bedroomNo: bedroomNo,
      washroomNo: washroomNo,
    };
    try {
      if (!favourite) {
        await addToWishlist(item);
      } else {
        await removeFromWishlist(listing_id);
      }
      setFavourite(prev => !prev);
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };
  


  return (
    <View style={styles.cardBackground}>
      <View style={styles.cardImage}>
        <Image
          source={image}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.overlay}>
          <TouchableOpacity onPress={toggleFavourite}>
            <Icon
              name={favourite ? 'heart' : 'heart-o'}
              size={20}
              color={PRIMARY}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Ratings star={ratings} text={`${ratings} Ratings`} textStyle={styles.ratingText} />
      <Text style={styles.description}>RM {price}/night</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    height: 230,
    width: 230,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardBackground: {
    marginLeft: 20,
    height: 320,
    width: 232,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: SECONDARY,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: PRIMARY,
    alignSelf: 'center',
    marginTop: 6,
  },
  overlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 30,
    justifyContent: 'center',
    elevation: 15,
  },
  icon: {
    alignSelf: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: PRIMARY,
    fontSize: 14,
    marginTop: 3,
  },
  ratingText: {
    color: PRIMARY,
  },
});

export default TravelCard;
