class Notification {
    title: string;
    description: string;
    day: string;
    imageUrl: any;

    constructor(title: string, description: string, day: string, imageUrl: any) {
        this.title = title;
        this.description = description;
        this.day = day;
        this.imageUrl = imageUrl;
    }
}

export default Notification;
