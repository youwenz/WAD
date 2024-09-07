import React, { createContext, useState, useContext, ReactNode } from 'react';
import Homestay from '../../models/Homestay';

type FavouritesContextType = {
    favourites: Homestay[];
    addFavourite: (homestay: Homestay) => void;
    removeFavourite: (listing_id: number) => void;
    clearFavourites: () => void;
    isFavourite: (listing_id: number) => boolean;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(
    undefined
);

export const FavouritesProvider = ({ children }: { children: ReactNode}) => {
    const [favourites, setFavourites] = useState<Homestay[]>([]);

    const addFavourite = (homestay: Homestay) => {
        setFavourites([...favourites, homestay]);
    };

    const removeFavourite = (listing_id: number) => {
        setFavourites(prevFavourites =>
            prevFavourites.filter(item => item.listing_id !== listing_id)
        );
    };

    const clearFavourites = () => {
        setFavourites([]);
    };

    const isFavourite = (listing_id: number) => {
        return favourites.some(item => item.listing_id === listing_id);
    };

    return (
        <FavouritesContext.Provider
            value={{ favourites, addFavourite, removeFavourite, clearFavourites, isFavourite }}
        >
            {children}
        </FavouritesContext.Provider>
    );
};

export const useFavourites = () => {
    const context = useContext(FavouritesContext);
    if (!context) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
