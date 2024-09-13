import React, { useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ArrowIcon from 'react-native-vector-icons/FontAwesome6';
import DollarIcon from 'react-native-vector-icons/FontAwesome5';
import { PRIMARY, SECONDARY } from '../Style/Color';
import ReviewCard from './ReviewCard';
import BottomBar from './BottomBar';
import { RootStackParamList, RootStackNavigationProp } from '../Type/NavigationParamList';
import CustomButton from './CustomButton';
import { RouteProp } from '@react-navigation/native';
import Ratings from './Ratings';
import { addToWishlist, getWishlist, removeFromWishlist } from '../WishList/wishlistService';
import MapPreview  from './Location'
import { WishItem } from '../WishList/wishItemTypes';
import Homestay from '../../models/Homestay';

type Props = {
  route: RouteProp<RootStackParamList, 'DetailScreen'>;
};

const isWishItem = (item: any): item is WishItem => {
  return (item as WishItem).listing_id !== undefined;
};

const isHomestay = (item: any): item is Homestay => {
  return (item as Homestay).listing_id !== undefined; 
};

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { item } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation<RootStackNavigationProp<'DetailScreen'>>();
  
  const [favourite, setFavourite] = useState(false);
  const [currentItem, setCurrentItem] = useState(item);

  useEffect(() => {
    if (item) {
      setCurrentItem(item);
    }
  }, [item]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchWishlist = async () => {
        try {
          const wishlist = await getWishlist();
          const isFavorited = wishlist.some((wishItem) => wishItem.listing_id === item.listing_id);
          setFavourite(isFavorited);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };
  
      fetchWishlist();
    }, [item.listing_id])
  );

  const toggleFavourite = async () => {
    if (item.listing_id === undefined) {
      console.error('Listing ID is undefined');
      return;
    }
    
    const itemToAdd: WishItem = {
      listing_id: item.listing_id,
      title: item.title,
      image: item.image, 
      ratings: item.ratings,
      city: item.city,
      address: item.address,
      price: item.price,
      description: item.description,
      bedroomNo: item.bedroomNo,
      washroomNo: item.washroomNo,
    };

    try {
      if (favourite) {
        await removeFromWishlist(item.listing_id);
      } else {
        await addToWishlist(itemToAdd);
      }
      setFavourite(!favourite);
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  const navigateToCalendar = () => {
    navigation.navigate('CalendarScreen', {
      hotelName: item.title,  
      hotelImage: item.image,  
      price: item.price  
  });
};

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 100 }}>
        <ImageBackground
          source={item.image}
          style={[styles.coverImage, { width: screenWidth }]}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}>
            <Text style={styles.overlayText}>{item.title}</Text>
            <View style={styles.review}>
            <Ratings 
                star={item.ratings} 
                text={`${item.ratings} Ratings`}
                textStyle={styles.cardReview} 
              />
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={{ alignItems: 'center' }}>
          <View style={styles.featureList}>
            <View style={styles.features}>
              <ArrowIcon name="map-location-dot" size={20} color={PRIMARY} style={[styles.icon, {position: 'absolute', left: 25}]} />
              <Text style={[styles.featureText, {paddingLeft: 15}]}>{item.city}</Text>
            </View>
            <View style={styles.features}>
              <DollarIcon name="dollar-sign" size={20} color={PRIMARY} />
              <Text style={styles.featureText}>RM {item.price}/Room</Text>
            </View>
          </View>
          <View style={styles.featureList}>
            <View style={styles.features}>
              <DollarIcon name="bed" size={20} color={PRIMARY} />
              <Text style={styles.featureText}>{item.bedroomNo} Bedrooms</Text>
            </View>
            <View style={styles.features}>
              <DollarIcon name="bath" size={20} color={PRIMARY} />
              <Text style={styles.featureText}>{item.washroomNo} Washroom</Text>
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionHeading}>About</Text>
            <Text style={styles.descriptionText}>
             {item.description}
            </Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionHeading}>Address</Text>
            <Text style={styles.descriptionText}>
             {item.address}
            </Text>
          </View>
          <MapPreview homestayId={item.listing_id} />
          <View style={styles.description}>
            <Text style={styles.descriptionHeading}>Reviews</Text>
            <Text style={styles.reviewText}>100 reviews</Text>
            <ReviewCard
              name="Amber Heard"
              text="Recommend for anyone looking for a comfort place."
              title="Good Experience"
              ratings={4.5}
              date="12 June 2023"
            />
            <ReviewCard
              name="Johnny Depp"
              text="The room service was nice! Views are amazing! The price is reasonable for this stay."
              title="Great Service"
              ratings={3.5}
              date="14 May 2023"
            />
            <ReviewCard
              name="Kim Kardashian"
              text="The host was welcoming, good place to stay."
              title="Cool Place"
              ratings={4}
              date="22 April 2023"
            />
          </View>
        </View>
      </ScrollView>
      <BottomBar>
        <Text style={styles.priceText}>RM{item.price}/Room</Text>
        <CustomButton text="Book Now" onPressFunction={navigateToCalendar} />
      </BottomBar>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <ArrowIcon name="arrow-left" size={16} color="#776B5D" />
      </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  coverImage: {
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  gradient: {
    position: 'absolute',
    top: 300,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-end',
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 30,
  },
  cardReview: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
  review: {
    flexDirection: 'row',
    marginTop: 0,
    marginLeft: 30,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  overlay: {
    position: 'absolute',
    top: 30,
    left: 340,
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  icon: {
    alignSelf: 'center',
  },
  features: {
    height: 45,
    width: 170,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: SECONDARY,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  featureList: {
    width: '87%',
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around',
  },
  featureText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: PRIMARY,
    marginLeft: 10,
    marginTop: 4,
  },
  descriptionHeading: {
    fontFamily: 'Poppins-SemiBold',
    color: PRIMARY,
    fontSize: 22,
    marginBottom: 6,
  },
  description: {
    width: 330,
    marginTop: 20,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: PRIMARY,
    marginTop: -10,
  },
  priceText: {
    fontFamily: 'Poppins-SemiBold',
    color: PRIMARY,
    fontSize: 18,
  },

  reviewText: {
    marginTop: -15,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: PRIMARY,
  },
});
export default DetailScreen;
