import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ArrowIcon from 'react-native-vector-icons/FontAwesome6';
import DollarIcon from 'react-native-vector-icons/FontAwesome5';
import { PRIMARY } from '../Style/Color';
import ReviewCard from './ReviewCard';
import BottomBar from './BottomBar';
import CustomButton from './CustomButton';
import { RouteProp } from '@react-navigation/native';
import Ratings from './Ratings';
import { addToWishlist, getWishlist, removeFromWishlist } from '../WishList/wishlistService';
import MapPreview from './Location';
import { WishItem } from '../WishList/wishItemTypes';
import { Review, getReviewsByHomestayId, addReview } from './ReviewSection';
import { format } from 'date-fns';
import { styles } from './DetailScreenStyle';
import { RootStackParamList, RootStackNavigationProp } from '../Type/NavigationParamList';

type Props = {
  route: RouteProp<RootStackParamList, 'DetailScreen'>;
};

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { item } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation<RootStackNavigationProp<'DetailScreen'>>();

  const [favourite, setFavourite] = useState(false);
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [homestayReviews, setHomestayReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (item) {
      const fetchWishlist = async () => {
        try {
          const wishlist = await getWishlist();
          const isFavorited = wishlist.some(wishItem => wishItem.listing_id === item.listing_id);
          setFavourite(isFavorited);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };

      fetchWishlist();
    }
  }, [item]);

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
      setFavourite(prev => !prev);
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  const handleStarPress = (star: number) => setRating(star);

  const addNewReview = async (newReview: Review) => {
    try {
      await addReview(newReview.homestayId, newReview);
      console.log('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const formatDate = (dateString: string) => format(new Date(dateString), 'd MMMM yyyy');

  const submitReview = () => {
    const newReview: Review = {
      homestayId: item.listing_id,
      name: 'You',
      title,
      text: review,
      ratings: rating,
      date: formatDate(new Date().toISOString())
    };
    setTitle('');
    setRating(0);
    setReview('');
    addNewReview(newReview);
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getReviewsByHomestayId(item.listing_id);
        setHomestayReviews(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [item.listing_id]);

  const navigateToCalendar = () => {
    navigation.navigate('CalendarScreen', {
      hotelName: item.title,
      hotelImage: item.image,
      price: item.price,
    });
  };


  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom: 100}}>
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

        <View style={{alignItems: 'center'}}>
          <View style={styles.featureList}>
            <View style={styles.features}>
              <ArrowIcon
                name="map-location-dot"
                size={20}
                color={PRIMARY}
                style={[styles.icon, {position: 'absolute', left: 25}]}
              />
              <Text style={[styles.featureText, {paddingLeft: 15}]}>
                {item.city}
              </Text>
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
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionHeading}>Address</Text>
            <Text style={styles.descriptionText}>{item.address}</Text>
          </View>
          <MapPreview homestayId={item.listing_id} />
          <View style={styles.description}>
            <Text style={styles.descriptionHeading}>Reviews</Text>
            <Text style={styles.reviewText}>100 reviews</Text>
            {homestayReviews.map((review, index) => (
              <ReviewCard
                key={index}
                name={review.name}
                text={review.text}
                title={review.title}
                ratings={review.ratings}
                date={review.date}
              />
            ))}
          </View>
        </View>
        <View style={{alignItems: 'center', padding: 20}}>
          <CustomButton
            onPressFunction={() => setModalVisible(true)}
            text="Add Review"
            width={323}></CustomButton>
        </View>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Rate and Review</Text>

              {/* Star rating system */}
              <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleStarPress(star)}>
                    <Icon
                      name={star <= rating ? 'star' : 'star-o'}
                      size={30}
                      color="#FFB23F"
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.titleInput}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Write your review here..."
                multiline
                numberOfLines={4}
                value={review}
                onChangeText={setReview}
              />

              <View style={styles.buttonContainer}>
                <CustomButton
                  onPressFunction={submitReview}
                  text="Submit"
                  width={120}
                />
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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

export default DetailScreen;
