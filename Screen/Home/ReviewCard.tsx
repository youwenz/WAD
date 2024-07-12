import {View, Text, StyleSheet} from 'react-native';
import Ratings from './Ratings';
import { PRIMARY, SECONDARY } from '../Style/Color';

const ReviewCard = () => {
    return(
        <View style={styles.reviewCard}>
              <View style={{marginLeft: 20, marginRight:20, marginTop: 10}}>
                <Text
                  style={styles.name}>
                  Amber Heard
                </Text>
                <Ratings star={3.5} text="12 Dec 2022" />
                <Text
                  style={styles.title}>
                  Good Place
                </Text>
                <Text
                  style={styles.reviewText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Convallis condimentum morbi non egestas enim amet sagittis.
                  Proin sed aliquet
                </Text>
              </View>
            </View>
    );
}

const styles = StyleSheet.create({
    reviewCard: {
        borderRadius: 10,
        width: 330,
        height: 200,
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
      }

})

export default ReviewCard;