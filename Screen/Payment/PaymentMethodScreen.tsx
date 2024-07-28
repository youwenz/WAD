import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomBar from '../Home/BottomBar';
import { PRIMARY } from '../Style/Color';

const PAYMENT_METHODS = [
  {
    id: '1',
    label: 'Credit Card / Debit Card',
    imageSource: require('../../assets/images/mastercardIcon.png'),
  },
  {
    id: '2',
    label: 'Credit Card / Debit Card',
    imageSource: require('../../assets/images/visaIcon.jpeg'),
  },
  {
    id: '3',
    label: 'Touch \'n Go E-Wallet',
    imageSource: require('../../assets/images/tngoIcon.png'),
  },
];

const PaymentMethodScreen: React.FC = () => {
  const navigation = useNavigation();
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const renderPaymentOption = ({ item }: { item: typeof PAYMENT_METHODS[0] }) => (
    <View
      style={[
        styles.paymentOption,
        {
          borderColor: selectedId === item.id || hoveredId === item.id ? '#776B5D' : '#C4C4C4',
          backgroundColor: '#fff', // Always white
          shadowColor: selectedId === item.id ? '#776B5D' : 'transparent', // Shadow color when selected
          shadowOffset: { width: 0, height: 4 }, // Shadow offset
          shadowOpacity: selectedId === item.id ? 0.3 : 0, // Shadow opacity when selected
          shadowRadius: 8, // Shadow radius
          elevation: selectedId === item.id ? 8 : 0, // Elevation for Android shadow
        },
      ]}
      onTouchStart={() => setHoveredId(item.id)}
      onTouchEnd={() => setHoveredId(null)}
    >
      <Image source={item.imageSource} style={styles.paymentImage} />
      <Text style={[styles.paymentLabel, { color: selectedId === item.id ? '#776B5D' : '#000' }]}>
        {item.label}
      </Text>
      <TouchableOpacity
        style={[
          styles.selectButton,
          {
            borderColor: selectedId === item.id ? '#776B5D' : '#C4C4C4',
            backgroundColor: selectedId === item.id ? '#fff' : 'transparent', // Fill color when not selected
          }
        ]}
        onPress={() => setSelectedId(item.id)}
      >
        {selectedId === item.id && (
          <View style={styles.innerCircle} />
        )}
      </TouchableOpacity>
    </View>
  );

  const handleSubmit = () => {
    if (selectedId === '1' || selectedId === '2') {
      navigation.navigate('CreditDebitCardScreen');
    } else if (selectedId === '3') {
      navigation.navigate('TngoScreen');
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.hotelSection}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.hotelImage} />
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName}>Hotel Name</Text>
            <Text style={styles.orderNumber}>Order #: 123456</Text>
          </View>
        </View>

        <View style={styles.priceSection}>
          <View style={styles.priceLeft}>
            <Text style={styles.priceTitle}>Total Price</Text>
            <Text style={styles.taxText}>(include tax)</Text>
          </View>
          <Text style={styles.priceAmount}>$100</Text>
        </View>

        <FlatList
          data={PAYMENT_METHODS}
          renderItem={renderPaymentOption}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.paymentOptions}
        />
      </View>

      <BottomBar style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Proceed Payment</Text>
        </TouchableOpacity>
      </BottomBar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight || 0,
  },
  scrollContainer: {
    padding: 16,
  },
  hotelSection: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  hotelImage: {
    width: 120,
    height: 120,
    marginRight: 20,
    marginLeft: 30,
  },
  hotelInfo: {
    flex: 1,
  },
  hotelName: {
    fontSize: 23,
    fontWeight: 'bold',
    color:'#776B5D',
  },
  orderNumber: {
    fontSize: 14,
    color: '#B0A695',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    borderTopWidth: 1, 
    borderBottomWidth: 1, 
    borderColor: '#C4C4C4',
    paddingVertical: 10, // Padding for vertical spacing
  },
  priceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10, // Space between title and tax text
  },
  taxText: {
    fontSize: 16,
    color: '#B0A695',
  },
  priceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentOptions: {
    marginBottom: 20,
  },
  paymentOption: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  paymentImage: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  paymentLabel: {
    fontSize: 16,
    flex: 1,
  },
  selectButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: 'transparent', // Initially transparent
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#776B5D',
  },
 button: {
      width: 375,
      height: 52,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor:PRIMARY,
    },
    buttonText: {
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
      color: 'white',
    },
});

export default PaymentMethodScreen;
