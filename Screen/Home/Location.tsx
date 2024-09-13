import React, {useEffect, useState} from 'react';
import {
    Button,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import CustomButton from './CustomButton';

interface HomestayLocationProps {
  homestayId: number;
}

const MapPreview = ({homestayId}: HomestayLocationProps) => {
  const homestayLocation: {
    [key: number]: {longitude: number; latitude: number};
  } = {
    1: {
      longitude: -118.8101,
      latitude: 34.0259,
    },
    2: {
      longitude: -106.8208,
      latitude: 39.1911,
    },
    3: {
      longitude: -3.1883,
      latitude: 55.9533,
    },
    4: {
      longitude: -2.7967,
      latitude: 54.0466,
    },
    5: {
      longitude: 25.3764,
      latitude: 36.4617,
    },
    6: {
      longitude: -106.8239,
      latitude: 39.2083,
    },
    7: {
      longitude: 115.2625,
      latitude: -8.5069,
    },
    8: {
      longitude: -73.9754,
      latitude: 40.787,
    },
    9: {
      longitude: -118.78294,
      latitude: 34.06739,
    },
    10: {
      longitude: -106.9382,
      latitude: 39.213,
    },
  };

  const location = homestayLocation[homestayId];

  useEffect(() => {
    if (!location) {
      ToastAndroid.show('Location data not available', ToastAndroid.SHORT);
    }
  }, [location]);

  const handleOpenMap = () => {
    if (location) {
      openMap({
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 15,
      });
    } else {
      ToastAndroid.show('Location is unknown!', ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <TouchableOpacity onPress={handleOpenMap}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
          </MapView>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width:350,
    height: 200,
  },
});

export default MapPreview;
