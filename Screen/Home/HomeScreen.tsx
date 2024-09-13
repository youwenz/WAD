import React, { useState, useEffect, useRef } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import TravelCard from './TravelCard';
import Homestay from '../../models/Homestay';
import { PRIMARY, SECONDARY } from '../Style/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './HomeScreenStyle';
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
  const [homestayList, setHomestayList] = useState<Homestay[]>([]);
  const [filteredHomestays, setFilteredHomestays] = useState<Homestay[]>([]);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [hotDeals, setHotDeals] = useState<Homestay[]>([]);
  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const storedHomestayList = await AsyncStorage.getItem('homestayList');
        if (storedHomestayList !== null) {
          const homestays = JSON.parse(storedHomestayList);
          setHotDeals(homestays);
          setHomestayList(shuffleArray(homestays));
          console.log('Homestay list retrieved successfully');
        }
      } catch (error) {
        console.log('Error retrieving homestay list from AsyncStorage:', error);
      }
    };

    fetchHomestays();
  }, []); 

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      const filtered = homestayList.filter(homestay =>
        homestay.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredHomestays(filtered);
      setSearched(true); 
    } else {
      setFilteredHomestays([]);
      setSearched(false); 
    }
  };

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
    navigation.navigate('DetailScreen', { item });
  };

  const handleFilterPress = (filter: string) => {
    const updatedFilterList = filterList.filter(f => f !== filter);
    updatedFilterList.unshift(filter); 
    setFilterList(updatedFilterList);
    setSelectedFilter(filter === selectedFilter ? '' : filter);

    const shuffledList = shuffleArray(homestayList);
    setHomestayList(shuffledList); 
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
              {filteredHomestays.length === 0
                ? 'No homestay found'
                : `Showing search result for '${searchText}'`}
            </Text>
            <FlatList
              data={filteredHomestays}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateToDetail(item)}>
                  <TravelCard
                    title={item.title}
                    description={item.city}
                    image={item.image}
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
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleFilterPress(item)}>
                    <Animated.View
                      style={[
                        styles.filter,
                        {
                          backgroundColor:
                            item === selectedFilter ? PRIMARY : 'white',
                          transform: [{ translateX }],
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterText,
                          { color: item === selectedFilter ? 'white' : PRIMARY },
                        ]}
                      >
                        {item}
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
              />
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.heading}>
                {selectedFilter === ''
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
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateToDetail(item)}>
                  <TravelCard
                    title={item.title}
                    description={item.city}
                    image={item.image}
                    price={item.price}
                    ratings={item.ratings}
                    listing_id={item.listing_id}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.listing_id.toString()}
            />
            <Text style={[styles.heading, { marginTop: 20 }]}>Hot Deals</Text>
            <FlatList
              data={hotDeals}
              horizontal={true}
              style={styles.list}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateToDetail(item)}>
                  <TravelCard
                    title={item.title}
                    description={item.city}
                    image={item.image}
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

export default HomeScreen;
