import {
    Text,
    View,
    StyleSheet
  } from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import {PRIMARY, SECONDARY} from '../Style/Color';

  interface props{
    star: number,
    text: string
  }
  const Ratings:React.FC<props> = ({star, text}) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= star) {
            stars.push(<Icon key={i} name="star" size={15} color="#FFB23F" />);
          } else if (i - 0.5 === star) {
            stars.push(<Icon key={i} name="star-half-full" size={15} color="#FFB23F" />);
          } else {
            stars.push(<Icon key={i} name="star-o" size={15} color="#FFB23F" />);
          }
        }
        return stars;
      };

    return (
       <View style={styles.review}>
      <View style={styles.ratings}>{renderStars()}</View>
      <Text style={styles.cardReview}>{text}</Text>
    </View>
    );
    }

const styles = StyleSheet.create({
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
})
export default Ratings;
