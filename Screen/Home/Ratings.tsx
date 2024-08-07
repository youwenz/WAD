// Ratings.tsx
import React from 'react';
import { Text, View, StyleSheet, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface RatingsProps {
  star: number; // Rating value (e.g., 3.7)
  text: string;
  textStyle?: TextStyle;
}

const Ratings: React.FC<RatingsProps> = ({ star, text, textStyle }) => {
  // Calculate the number of full stars and whether a half star is needed
  const fullStars = Math.floor(star);
  const hasHalfStar = star % 1 >= 0.5;
  const totalStars = 5; // Total number of stars to display

  return (
    <View style={styles.container}>
      {Array.from({ length: totalStars }).map((_, index) => {
        if (index < fullStars) {
          return <Icon key={index} name="star" size={17} color="#FFB23F" />;
        } else if (index === fullStars && hasHalfStar) {
          return <Icon key={index} name="star-half-o" size={17} color="#FFB23F" />;
        } else {
          return <Icon key={index} name="star-o" size={17} color="#FFB23F" />;
        }
      })}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFB23F',
    marginLeft: 6,
  },
});

export default Ratings;
