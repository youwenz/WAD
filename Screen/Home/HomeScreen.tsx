import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TravelCard from './TravelCard';
import Homestay from '../../models/Homestay';
import {PRIMARY, SECONDARY} from '../Style/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import initialHomestayList from '../../models/HomeStayList';

const coverImage = require('../../assets/images/coverImage.webp');

const initialFilterList: string[] = [
  'Countryside',
  'Beachfront',
  'Cabins',
  'Popular',
  'Castle',
  'Uptown',
];

const shuffleArray = (array: any[]) => {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const HomeScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const [filterList, setFilterList] = useState<string[]>(initialFilterList);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isSearched, setSearched] = useState(false);
  const [homestayList, setHomestayList] = useState(() =>
    shuffleArray(initialHomestayList),
  );
  const [filteredHomestays, setFilteredHomestays] = useState<Homestay[]>();

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      const filtered = initialHomestayList.filter(homestay =>
        homestay.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredHomestays(filtered);
      setSearched(true); // Set searched to true whenever there is text in the search bar
    } else {
      setFilteredHomestays([]);
      setSearched(false); // Reset search state when the search bar is cleared
    }
  };

  // Animated value for FlatList
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the filter list when the selected filter changes
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      // Reset the animated value after the animation completes
      animatedValue.setValue(0);
    });
  }, [filterList]);

  const navigateToDetail = (item: Homestay) => {
    navigation.navigate('DetailScreen', {item});
  };

  const handleFilterPress = (filter: string) => {
    const updatedFilterList = filterList.filter(f => f !== filter);
    updatedFilterList.unshift(filter); // Move selected filter to the start
    setFilterList(updatedFilterList);
    setSelectedFilter(filter === selectedFilter ? '' : filter);

    // Shuffle homestayList when a filter is selected
    const shuffledList = shuffleArray(homestayList);
    setHomestayList(shuffledList); // Update state with shuffled list
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30], // Adjust this value to suit the desired animation effect
  });

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
            onChangeText={handleSearch}
            
          />
          <Icon name="search" size={20} color="#A9A9A9" style={styles.icon} />
        </View>
        {isSearched && (
          <View>
          <Text style={styles.heading}>
                {filteredHomestays && filteredHomestays.length === 0
                  ? 'No homestay found'
                  : `Showing search result for '${searchText}'`}
              </Text>
            <FlatList
              data={filteredHomestays}
              horizontal={true}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigateToDetail(item)}>
                  <TravelCard
                    title={item.title}
                    description={item.city}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    ratings={item.ratings}
                    listing_id={item.listing_id}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.listing_id.toString()}
              contentContainerStyle={styles.list}
            />
          </View>
        )}
        {!isSearched && (
          <View>
            <View style={styles.filterList}>
              <Animated.FlatList
                data={filterList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => handleFilterPress(item)}>
                    <Animated.View
                      style={[
                        styles.filter,
                        {
                          backgroundColor:
                            item === selectedFilter ? PRIMARY : 'white',
                          transform: [{translateX}],
                        },
                      ]}>
                      <Text
                        style={[
                          styles.filterText,
                          {color: item === selectedFilter ? 'white' : PRIMARY},
                        ]}>
                        {item}
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.heading}>
                {selectedFilter == ''
                  ? 'Featured Places'
                  : `${selectedFilter} Places`}
              </Text>
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
                    description={item.city}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    ratings={item.ratings}
                    listing_id={item.listing_id}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.listing_id.toString()}
            />
            <Text style={[styles.heading, {marginTop: 20}]}>Hot Deals</Text>
            <FlatList
              data={initialHomestayList}
              horizontal={true}
              style={styles.list}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigateToDetail(item)}>
                  <TravelCard
                    title={item.title}
                    description={item.city}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    ratings={item.ratings}
                    listing_id={item.listing_id}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.listing_id.toString()}
            />
          </View>
        )}
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
    marginTop: 10,
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
  filter: {
    height: 36,
    width: 110,
    borderWidth: 1,
    borderColor: SECONDARY,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  filterText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: PRIMARY,
  },
  seeAll: {
    fontFamily: 'poppins-light',
    fontSize: 16,
    color: PRIMARY,
    textDecorationLine: 'underline',
    textDecorationColor: PRIMARY,
    marginRight: 30,
    marginTop: 14,
  },
  searchResult: {
    height: 100,
    width: 300,
    flexDirection: 'row',
    margin: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: PRIMARY,
  },
});

export default HomeScreen;
