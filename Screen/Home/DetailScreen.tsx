import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import ArrowIcon from 'react-native-vector-icons/FontAwesome6';
import DollarIcon from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY, SECONDARY} from '../Style/Color';
import ReviewCard from './ReviewCard';
import BottomBar from './BottomBar';
import {
  RootStackParamList,
  RootStackNavigationProp,
} from '../Type/NavigationParamList';
import CustomButton from './CustomButton';
import {RouteProp} from '@react-navigation/native';
import Ratings from './Ratings';
import {useFavourites} from '../WishList/FavouriteContext';
import MapPreview from './Location';
import { TextInput} from 'react-native-gesture-handler';
import {Review, getReviewsByHomestayId, addReview} from './ReviewSection';
import { format } from 'date-fns';


type Props = {
  route: RouteProp<RootStackParamList, 'DetailScreen'>;
};

const DetailScreen: React.FC<Props> = ({route}) => {
  const {item} = route.params;
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation<RootStackNavigationProp<'DetailScreen'>>();

  const {addFavourite, removeFavourite, isFavourite} = useFavourites();
  const [favourite, setFavourite] = useState(false);
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [homestayReviews, setHomestayReviews] = useState<Review[]>([]);

  const handleStarPress = (star: number) => {
    setRating(star);
  };

  async function addNewReview(newReview: Review) {
    try {
      await addReview(newReview.homestayId, newReview);
      console.log('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return format(date, 'd MMMM yyyy');
  }
  

  const submitReview = () => {
    const newReview: Review = {
      homestayId: item.listing_id,
      name: 'You',
      title: title,
      text: review,
      ratings: rating,
      date: formatDate(new Date().toISOString())
    }
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

  useEffect(() => {
    setFavourite(isFavourite(item.listing_id));
  }, [item.listing_id, isFavourite]);

  const toggleFavourite = () => {
    if (favourite) {
      removeFavourite(item.listing_id);
    } else {
      addFavourite(item);
    }
    setFavourite(!favourite);
  };

  const navigateToCalendar = () => {
    navigation.navigate('CalendarScreen', {
      hotelName: item.title,
      hotelImage: item.imageUrl,
      price: item.price,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom: 100}}>
        <ImageBackground
          source={item.imageUrl}
          style={[styles.coverImage, {width: screenWidth}]}>
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
  addButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: 360,
    height: 500,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 180,
    textAlignVertical: 'top',
    fontSize: 18,
    margin: 10,
  },
  titleInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 50,
    textAlignVertical: 'top',
    fontSize: 18,
    margin: 10,
  },
  buttonContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    color: PRIMARY,
    fontSize: 16,
    padding: 10,
    paddingRight: 20,
  },
});
export default DetailScreen;
