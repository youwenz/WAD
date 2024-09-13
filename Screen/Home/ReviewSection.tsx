import RNFS from 'react-native-fs';

// Path to the reviews.json file
const reviewsFilePath = `${RNFS.DocumentDirectoryPath}/reviews.json`;

export interface Review {
  homestayId: number;
  name: string;
  text: string;
  title: string;
  ratings: number;
  date: string;
}

export async function getReviews(): Promise<Review[]> {
  try {
    const fileExists = await RNFS.exists(reviewsFilePath);
    if (fileExists) {
      const data = await RNFS.readFile(reviewsFilePath, 'utf8');
      return JSON.parse(data);
    } else {
      console.log(reviewsFilePath);
      return [];
    }
  } catch (error) {
    console.error('Error reading reviews file:', error);
    throw error;
  }
}

export async function getReviewsByHomestayId(
  homestayId: number,
): Promise<Review[]> {
  const allReviews = await getReviews();
  return allReviews.filter(review => review.homestayId === homestayId);
}

export async function addReview(homestayId: number, newReview: Review) {
  try {
    const reviews = await getReviews();
    newReview.homestayId = homestayId;
    reviews.push(newReview);
    await RNFS.writeFile(
      reviewsFilePath,
      JSON.stringify(reviews, null, 2),
      'utf8',
    );
    console.log('Review added successfully!');
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
}
