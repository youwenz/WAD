import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PRIMARY, SECONDARY } from '../Style/Color';
import Ratings from '../Home/Ratings';
import Homestay from '../Homestay';

interface Props {
  homestay: Homestay;
  onPress: () => void;
}
interface Props {
  ratings: Ratings;
  onPress: () => void;
}

const WishListCard: React.FC<Props> = ({ homestay, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.wishListContainer}>
      <Image style={styles.image} source={homestay.imageUrl} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{homestay.title}</Text>
        <View style={styles.rate}>
          <Ratings star={homestay.ratings} text={`${homestay.ratings} reviews`}/>
        </View>
        <Text style={styles.subTitle}>{homestay.subTitle}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>from $100</Text>
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
    color: 'PRIMARY',
  },
  subTitle: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: 'PRIMARY',
  },
  rate: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: 'PRIMARY',
  },
  priceContainer: {
    flexDirection: 'row',
    color: 'PRIMARY',
  },
  price: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: 'PRIMARY',
  },
  person: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: 'PRIMARY',
  },
  day: {
    fontSize: 13,
    fontFamily: 'Poppins',
    color: 'PRIMARY',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default WishListCard;
