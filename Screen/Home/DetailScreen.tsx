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
import BottomBar from './BottomBar';
import {
  RootStackParamList,
  RootStackNavigationProp,
} from '../Type/NavigationParamList';
import CustomButton from './CustomButton';
import {RouteProp} from '@react-navigation/native';

type Props = {
  route: RouteProp<RootStackParamList, 'DetailScreen'>;
};
const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpeg');
const image3 = require('../../assets/images/image3.jpg');
const image4 = require('../../assets/images/image4.jpg');
const coverImage = require('../../assets/images/coverImage.jpg');

const DetailScreen: React.FC<Props> = ({route}) => {
  const [favourite, setFavourite] = useState(false);
  const {item} = route.params;
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation<RootStackNavigationProp<'DetailScreen'>>();
  const navigateToCalendar = () => {
    navigation.navigate('CalendarScreen');
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
        <Text style={styles.priceText}>RM129/Room</Text>
        <CustomButton text="Book Now" onPressFunction={navigateToCalendar} />
      </BottomBar>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <ArrowIcon name="arrow-left" size={16} color="#776B5D" />
      </TouchableOpacity>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => setFavourite(prevState => !prevState)}>
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
    elevation: 5,
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
    elevation: 5,
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
