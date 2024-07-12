class Homestay {
    title: string;
    imageUrl: string;
    ratings: number;
    description: string;

    constructor(title:string, imageUrl: any, ratings: number, description: string){
        this.title = title,
        this.imageUrl = imageUrl,
        this.ratings = ratings,
        this.description = description
    }
}

export default Homestay;