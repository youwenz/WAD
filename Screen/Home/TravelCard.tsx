import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PRIMARY, SECONDARY} from '../Style/Color';

interface props {
  title: string;
  description: string;
  imageUrl: ImageSourcePropType;
}
const TravelCard: React.FC<props> = ({title, description, imageUrl}) => {
  const [favourite, setFavourite] = useState(false);
  return (
    <View style={styles.cardBackground}>
      <View style={styles.cardImage}>
        <Image
          source={imageUrl}
          resizeMode="cover"
          style={styles.image}></Image>
        <View style={styles.overlay}>
          <TouchableOpacity
            onPress={() => setFavourite(prevState => !prevState)}>
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
      <Text style={styles.description}>{description}</Text>
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
    marginRight: 20,
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
    height: 35,
    width: 35,
    borderRadius: 30,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    backgroundColor: 'transparent', // Set background color to transparent if needed
  },
  cardReview: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: PRIMARY,
    marginLeft: 6,
  },
  review: {
    flexDirection: 'row',
    marginTop: 3,
  },
  ratings: {
    flexDirection: 'row',
    width: 85,
    height: 15,
    justifyContent: 'space-around',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: PRIMARY,
    fontSize: 12,
    marginTop: 3,
  },
});
export default TravelCard;
