import {ImageSourcePropType} from 'react-native';

export type WishItem = {
  listing_id: number;
  title: string;
  city: string;
  address: string;
  price: number;
  image: ImageSourcePropType;
  ratings: number;
  description: string;
  bedroomNo: number;
  washroomNo: number;
};