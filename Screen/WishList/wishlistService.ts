import { WishItem } from '../WishList/wishItemTypes';

const API_URL = 'http://172.20.10.6:5000/api/wishlist';

// Add item to wishlist
export const addToWishlist = async (item: WishItem) => {
    try {
        const response = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to add item to wishlist: ${errorData.message}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error adding to wishlist:', error.message || error);
        throw error;
    }
};

// Get all wishlist items 
export const getWishlist = async (): Promise<WishItem[]> => {
    try {
        const response = await fetch(`${API_URL}/get`, {  
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch wishlist');
        }
        const data = await response.json();
        return data.map((item: any) => ({
            listing_id: item.listing_id,
            title: item.title,
            image: item.image,
            ratings: item.ratings,
            city: item.city,
            address: item.address,
            price: item.price,
            description: item.description,
            bedroomNo: item.bedroomNo,
            washroomNo: item.washroomNo,
        })) as WishItem[];
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }
};


// Remove item from wishlist
export const removeFromWishlist = async (listing_id: number) => {
    try {
      const response = await fetch(`${API_URL}/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listing_id }),
      });
      
      const responseBody = await response.text(); // Or response.json() if the API returns JSON
      if (!response.ok) {
        console.error('Response Body:', responseBody); // Log response body
        throw new Error('Failed to remove item from wishlist');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      throw error;
    }
  };   

// Clear wishlist
export const clearWishlist = async () => {
    try {
        const response = await fetch(`${API_URL}/clear`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to clear wishlist');
        }
    } catch (error) {
        console.error('Error clearing wishlist:', error);
        throw error;
    }
};
