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
import Ratings from './Ratings';
interface props {
  title: string;
  description: string;
  imageUrl: ImageSourcePropType;
  ratings: number;
  price: number
}
const TravelCard: React.FC<props> = ({title, description, imageUrl, ratings, price}) => {
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
      <Ratings star={ratings} text={`${ratings} Ratings`} textStyle={styles.ratingText}/>
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
    elevation: 15
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
  ratingText:{
    color: PRIMARY
  }
});
export default TravelCard;
