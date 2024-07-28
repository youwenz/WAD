class Homestay {
    title: string;
    subTitle:string;
    imageUrl: string;
    ratings: number;
    description: string;

    constructor(title:string, subTitle:string, imageUrl: any, ratings: number, description: string){
        this.title = title,
        this.subTitle = subTitle,
        this.imageUrl = imageUrl,
        this.ratings = ratings,
        this.description = description
    }
}

export default Homestay;