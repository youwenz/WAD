
class Profile {
    name: string;
    nation: string;
    imageUrl: any;
    rewardPoints: string;
    travelTrips: string;
    bucketList:string;

    constructor(name: string, nation: string, imageUrl: any, rewardPoints: string, travelTrips:string, bucketList:string) {
        this.name = name;
        this.nation = nation;
        this.imageUrl = imageUrl;
        this.rewardPoints = rewardPoints;
        this.travelTrips = travelTrips;
        this.bucketList = bucketList;
    }
}

export default Profile;
