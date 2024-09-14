import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PRIMARY } from '../Style/Color';
import Ratings from '../Home/Ratings';
import { WishItem } from '../WishList/wishItemTypes';

interface Props {
  item: WishItem;
  onPress: () => void;
}

const WishListCard: React.FC<Props> = ({ item, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.wishListContainer}>
      <Image style={styles.image} source={typeof item.image === 'string' ? { uri: item.image } : item.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View>
          <Ratings star={item.ratings} textStyle={styles.ratingText} text={`${item.ratings} Ratings`}/>
        </View>
        <Text style={styles.subTitle}>{item.city}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>from ${item.price}</Text>
          <Text style={styles.person}>/person</Text>
        </View>
        <Text style={styles.day}>2 day 1 night</Text>
      </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  wishListContainer: {
    flexDirection: 'row',
    padding: 10,
    margin: 0,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 20,
    marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  title:{
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: PRIMARY,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: PRIMARY,
  },
  priceContainer: {
    flexDirection: 'row',
    color: PRIMARY,
  },
  price: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: PRIMARY,
  },
  person: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: PRIMARY,
  },
  day: {
    fontSize: 13,
    fontFamily: 'Poppins',
    color: PRIMARY,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  ratingText:{
    color: PRIMARY
  }
});

export default WishListCard;
