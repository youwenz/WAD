
class Profile {
    name: string;
    nation: string;
    imageUrl: any;
    rewardPoints: string;
    travelTrips: string;
    bucketList:string;
    userId: number;

    constructor(name: string, nation: string, imageUrl: any, rewardPoints: string, travelTrips:string, bucketList:string, userId:number) {
        this.name = name;
        this.nation = nation;
        this.imageUrl = imageUrl;
        this.rewardPoints = rewardPoints;
        this.travelTrips = travelTrips;
        this.bucketList = bucketList;
        this.userId = userId;
    }
}

export default Profile;
