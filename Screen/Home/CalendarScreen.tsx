import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { PRIMARY, SECONDARY } from '../Style/Color';
import CustomButton from './CustomButton';
import moment from 'moment';
import BottomBar from './BottomBar';
import { useNavigation, useRoute } from '@react-navigation/native';


const CalendarScreen: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null,
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { hotelName, hotelImage, price } = route.params;

  const handleDayPress = (day: {dateString: string}) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(day.dateString);
    }
  };

    const handleConfirm = () => {
    if (selectedStartDate && selectedEndDate) {
      navigation.navigate('BookingDetailsScreen', {
        hotelName,
        hotelImage,
        price,
        checkInDate: selectedStartDate,
        checkOutDate: selectedEndDate,
      });
    } else {
      Alert.alert('Please select both start and end dates.');
    }
  };
  
  
  
  const getMarkedDates = () => {
    const markedDates: {[key: string]: any} = {};

    if (selectedStartDate) {
      markedDates[selectedStartDate] = {
        startingDay: true,
        customStyles: {
          container: {
            backgroundColor: PRIMARY,
            borderRadius: 10,
            height: 35,
            width: 35,
            zIndex: 2,
          },
          text: {
            color: 'white',
          },
        },
      };
    }

    if (selectedEndDate) {
      markedDates[selectedEndDate] = {
        endingDay: true,
        customStyles: {
          container: {
            backgroundColor: PRIMARY,
            borderRadius: 10,
            height: 35,
            width: 35,
            zIndex: 2,
          },
          text: {
            color: 'white',
          },
        },
      };

      // Highlight dates in between
      let currentDate = moment(selectedStartDate).add(1, 'days');
      const endDate = moment(selectedEndDate);

      while (currentDate.isBefore(endDate)) {
        markedDates[currentDate.format('YYYY-MM-DD')] = {
          customStyles: {
            container: {
              backgroundColor: '#B0A695',
              height: 35,
              width: 95,
              borderRadius: 10,
              zIndex: 1,
            },
            text: {
              color: 'white',
            },
          },
        };
        currentDate = currentDate.add(1, 'days');
      }
    }

    return markedDates;
  };

  return (
    <View style={styles.container}>
      <View style={{height: 720}}>
        <CalendarList
          calendarStyle={{}}
          onDayPress={handleDayPress}
          markingType={'custom'}
          pastScrollRange={1}
          futureScrollRange={5}
          markedDates={getMarkedDates()}
        />
      </View>
      <BottomBar>
        <CustomButton
          backgroundColor="#F3F3F3"
          textColor={PRIMARY}
          text="Cancel"
          onPressFunction={() => {
            navigation.goBack();
          }}
        />
        <CustomButton text="Select Date" onPressFunction={handleConfirm} />

      </BottomBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default CalendarScreen;
