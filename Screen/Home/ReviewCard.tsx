import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Ratings from './Ratings';
import { PRIMARY, SECONDARY } from '../Style/Color';

interface props{
  name: string,
  title: string,
  text: string,
  date: string,
  ratings: number
}
const ReviewCard:React.FC<props> = ({name, title, text, date, ratings}) => {
    return(
        <View style={styles.reviewCard}>
              <View style={{marginLeft: 20, marginRight:20, marginTop: 10}}>
                <Text
                  style={styles.name}>
                  {name}
                </Text>
                <Ratings star={ratings} text={date} textStyle={styles.ratingStyle}/>
                <Text
                  style={styles.title}>
                  {title}
                </Text>
                <Text
                  style={styles.reviewText}>
                 {text}
                </Text>
              </View>
            </View>
    );
}

const styles = StyleSheet.create({
    reviewCard: {
        borderRadius: 10,
        width: 330,
        height: 170,
        borderWidth: 1,
        borderColor: SECONDARY,
        marginTop: 20,
      },
      name:{
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: PRIMARY,
      },
      title:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: PRIMARY,
        marginTop: 6,
      },
      reviewText:{
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: PRIMARY,
        marginTop: 5,
      },
      ratingStyle:{
        color: PRIMARY
      }

})

export default ReviewCard;