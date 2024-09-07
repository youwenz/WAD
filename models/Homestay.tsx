class Homestay {
    listing_id: number;
    title: string;
    city: string;
    address: string;
    price: number;
    imageUrl: string;
    ratings: number;
    description: string;
    bedroomNo: number;
    washroomNo: number;

    constructor(
        listing_id: number,
        title: string,
        city: string,
        address: string,
        price: number,
        imageUrl: string,
        ratings: number,
        description: string,
        bedroomNo: number,
        washroomNo: number
    ) {
        this.listing_id = listing_id;
        this.title = title;
        this.city = city;
        this.address = address;
        this.price = price;
        this.imageUrl = imageUrl;
        this.ratings = ratings;
        this.description = description;
        this.bedroomNo= bedroomNo;
        this.washroomNo=washroomNo
    }
}

export default Homestay;
