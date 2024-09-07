import AsyncStorage from '@react-native-async-storage/async-storage';
import Homestay from '../../models/Homestay';

const FAVOURITES_KEY = '@favourites';

export const getFavourites = async (): Promise<Homestay[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(FAVOURITES_KEY);
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error fetching favourites: ', e);
        return [];
    }
};

const setFavourites = async (favourites: Homestay[]) => {
    try {
        const jsonValue = JSON.stringify(favourites);
        await AsyncStorage.setItem(FAVOURITES_KEY, jsonValue);
    } catch (e) {
        console.error('Error saving favourites: ', e);
    }
};

export const addFavouriteToDB = async (homestay: Homestay) => {
    try {
        const favourites = await getFavourites();
        const updatedFavourites = [...favourites, homestay];
        await setFavourites(updatedFavourites);
        return true;
    } catch (e) {
        console.error('Error to add favourites: ', e);
        return false;
    }
};

export const removeFavouriteFromDB = async (listing_id: number) => {
    try {
        const favourites = await getFavourites();
        const updatedFavourites = favourites.filter(item => item.listing_id !== listing_id);
        await setFavourites(updatedFavourites);
        return true;
    } catch (e) {
        console.error('Error to remove favourites: ', e);
        return false;
    }
};

export const getBucketListCount = async (): Promise<number> => {
    try {
        const favourites = await getFavourites();
        return favourites.length;
    } catch (e) {
        console.error('Failed to get bucket list count: ', e);
        return 0;
    }
}
