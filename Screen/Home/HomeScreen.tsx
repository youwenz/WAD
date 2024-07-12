import {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TravelCard from './TravelCard';
import Homestay from '../Homestay';
import {PRIMARY, SECONDARY} from '../Style/Color';
import Icon from 'react-native-vector-icons/FontAwesome';

const image1 = require('../../assets/images/image1.jpg');
const image2 = require('../../assets/images/image2.jpeg');
const image3 = require('../../assets/images/image3.jpg');
const image4 = require('../../assets/images/image4.jpg');
const coverImage = require('../../assets/images/coverImage.webp');

const filterList: string[] = [
  'Countryside',
  'Beachfront',
  'Cabins',
  'Popular',
  'Castle',
  'Uptown',
];

const homestayList: Homestay[] = [
  new Homestay(
    'Koh Rong Samloem',
    image1,
    5,
    'This place is great for people...',
  ),
  new Homestay('Another Place', image2, 4.5, 'Another description...'),
  new Homestay('Another Place', image3, 4.5, 'Another description...'),
  new Homestay('Another Place', image4, 4.5, 'Another description...'),
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState("");
  const navigateToDetail = (item: Homestay) => {
    navigation.navigate('DetailScreen', {item});
  };
  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter === selectedFilter ? "" : filter);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
      <Image source={coverImage} style={styles.coverImage} />
      <Text style={styles.mainHeading}>Explore the world today</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search destination"
          placeholderTextColor="#A9A9A9"
        />
        <Icon name="search" size={20} color="#A9A9A9" style={styles.icon} />
      </View>
      <View style={styles.filterList}>
      <FlatList
        data={filterList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleFilterPress(item)}>
            <View
              style={[styles.filter, {backgroundColor: item === selectedFilter ? PRIMARY : 'white',}]}>
              <Text
                style={[styles.filterText, {color: item === selectedFilter ? 'white' : PRIMARY},]}>
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.heading}>Featured Places</Text>
      <Text style={styles.seeAll}>See all</Text>
      </View>
      <FlatList
        data={homestayList}
        horizontal={true}
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToDetail(item)}>
            <TravelCard
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          </TouchableOpacity>
        )}
      />
      <Text style={[styles.heading, {marginTop: 20}]}>Hot Deals</Text>
      <FlatList
        data={homestayList}
        horizontal={true}
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToDetail(item)}>
            <TravelCard
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          </TouchableOpacity>
        )}
      />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: PRIMARY,
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginTop: 10
  },
  list: {
    marginVertical: 10,
  },
  coverImage: {
    top: 0,
    left: 0,
    right: 0,
    width: 420,
    height: 300,
    resizeMode: 'cover',
  },
  mainHeading: {
    position: 'absolute',
    width: 300,
    top: 80,
    left: 30,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 36,
  },
  searchContainer: {
    position: 'absolute',
    top: 200,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: PRIMARY,
    fontFamily: 'Poppins-Medium',
  },
  icon: {
    marginRight: 10,
  },
  filterList: {
    marginTop: 20,
    height: 50,
  },
  filter:{
    height: 36,
    width: 110,
    borderWidth: 1,
    borderColor: SECONDARY,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  filterText:{
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: PRIMARY,
  },
  seeAll:{
    fontFamily: 'poppins-light',
    fontSize: 16,
    color: PRIMARY,
    textDecorationLine: 'underline',
    textDecorationColor: PRIMARY,
    marginRight: 30,
    marginTop: 14
  }
});
export default HomeScreen;
