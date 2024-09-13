import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getFavourites, addFavouriteToDB, removeFavouriteFromDB } from './favouriteDatabase';
import Homestay from '../../models/Homestay';

type FavouritesContextType = {
    favourites: Homestay[];
    addFavourite: (homestay: Homestay) => void;
    removeFavourite: (listing_id: number) => void;
    clearFavourites: () => void;
    isFavourite: (listing_id: number) => boolean;
    bucketListCount: number;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
    const [favourites, setFavourites] = useState<Homestay[]>([]);
    const [bucketListCount, setBucketListCount] = useState<number>(0);

    useEffect(() => {
        const loadFavourites = async () => {
            const data = await getFavourites();
            setFavourites(data);
            setBucketListCount(data.length);
        };
        loadFavourites();
    }, []);

    const addFavourite = async (homestay: Homestay) => {
        await addFavouriteToDB(homestay);
        const updatedFavourites = await getFavourites();
        setFavourites(updatedFavourites);
        setBucketListCount(updatedFavourites.length);
    };

    const removeFavourite = async (listing_id: number) => {
        await removeFavouriteFromDB(listing_id);
        const updatedFavourites = await getFavourites();
        setFavourites(updatedFavourites);
        setBucketListCount(updatedFavourites.length);
    };

    const clearFavourites = () => {
        setFavourites([]);
        setBucketListCount(0);
    };

    const isFavourite = (listing_id: number) => {
        return favourites.some(item => item.listing_id === listing_id);
    };

    return (
        <FavouritesContext.Provider
            value={{ favourites, addFavourite, removeFavourite, clearFavourites, isFavourite, bucketListCount }}
        >
            {children}
        </FavouritesContext.Provider>
    );
};

export const useFavourites = () => {
    const context = useContext(FavouritesContext);
    if (!context) {
        throw new Error('useFavourites must be used within a FavouritesProvider');
    }
    return context;
};
