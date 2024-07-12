import {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import ArrowIcon from 'react-native-vector-icons/FontAwesome6';
import DollarIcon from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY, SECONDARY} from '../Style/Color';
import ReviewCard from './ReviewCard';

const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpeg');
const image3 = require('../../assets/images/image3.jpg');
const image4 = require('../../assets/images/image4.jpg');
const coverImage = require('../../assets/images/coverImage.jpg');

function DetailScreen({route}) {
  const screenWidth = Dimensions.get('window').width;
  const {item} = route.params;
  const navigation = useNavigation();

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
              <View style={styles.ratings}>
                <Icon name="star" size={15} color="#FFB23F"></Icon>
                <Icon name="star" size={15} color="#FFB23F"></Icon>
                <Icon name="star" size={15} color="#FFB23F"></Icon>
                <Icon name="star" size={15} color="#FFB23F"></Icon>
                <Icon name="star" size={15} color="#FFB23F"></Icon>
              </View>
              <Text style={styles.cardReview}>100 reviews</Text>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={{alignItems: 'center'}}>
          <View style={styles.featureList}>
            <View style={styles.features}>
              <ArrowIcon name="map-location-dot" size={20} color={PRIMARY} />
              <Text style={styles.featureText}>Sungai Long</Text>
            </View>
            <View style={styles.features}>
              <DollarIcon name="dollar-sign" size={20} color={PRIMARY} />
              <Text style={styles.featureText}>RM 129/Room</Text>
            </View>
          </View>
          <View style={styles.featureList}>
            <View style={styles.features}>
              <DollarIcon name="bed" size={20} color={PRIMARY} />
              <Text style={styles.featureText}>2 Bedrooms</Text>
            </View>
            <View style={styles.features}>
              <DollarIcon name="bath" size={20} color={PRIMARY} />
              <Text style={styles.featureText}>1 Washroom</Text>
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionHeading}>About</Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis
              condimentum morbi non egestas enim amet sagittis. Proin sed
              aliquet rhoncus ut pellentesque ullamcorper sit eget ac.Sit nisi,
              cras amet varius eget egestas pellentesque. Cursus gravida euismod
              non...
            </Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionHeading}>Reviews</Text>
            <Text style={styles.reviewText}>100 reviews</Text>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </View>
        </View>
      </ScrollView>
      <View style={[{width: screenWidth, marginTop: 20}, styles.bottom]}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.05)']}
          style={[styles.shadowGradient, {width: screenWidth}]}
        />
        <View style={styles.bottomBar}>
          <Text style={styles.priceText}>RM129/Room</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ArrowIcon name="arrow-left" size={16} color="#776B5D" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favouriteIcon} onPress={() => {}}>
            <Icon name={'heart'} size={18} color="#776B5D" />
          </TouchableOpacity>
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
  coverImage: {
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent', // Initial overlay is transparent
    justifyContent: 'flex-end', // Align content at the bottom
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
    // You can adjust the position of text as per your design
  },
  cardReview: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'white',
    marginLeft: 6,
  },
  review: {
    flexDirection: 'row',
    marginTop: 0,
    marginLeft: 30,
    marginBottom: 20,
  },
  ratings: {
    flexDirection: 'row',
    width: 85,
    height: 15,
    justifyContent: 'space-around',
    marginTop: 3,
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
    elevation: 5
  },
  favouriteIcon: {
    position: 'absolute',
    top: 30,
    left: 340,
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
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
    marginBottom: 8,
  },
  description: {
    width: 330,
    marginTop: 20,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: PRIMARY,
  },
  button: {
    width: 175,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'white',
  },
  bottomBar: {
    height: 52,
    marginTop: 30,
    marginLeft: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  priceText: {
    fontFamily: 'Poppins-SemiBold',
    color: PRIMARY,
    fontSize: 18,
  },
  shadowGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 20,
    zIndex: 0, // Ensure gradient is behind the content
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 92,
  },
  reviewText: {
    marginTop: -15,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: PRIMARY,
  },
  
});
export default DetailScreen;
