import Homestay from './Homestay';
import { images } from './assets';

const homestayList: Homestay[] = [
  new Homestay(
    1, // listing_id
    'Sunset Beach Resort',
    'Malibu',
    '123 Sunset Blvd, Malibu, CA 90265, USA',
    250,
    images.image1,
    4.0,
    'Nestled on the golden sands of Malibu, Sunset Beach Resort offers an unparalleled seaside experience. Enjoy panoramic views of the Pacific Ocean as you unwind in our elegantly appointed rooms. Our resort features a private beach, infinity pool, and a world-class spa to ensure your stay is both luxurious and rejuvenating. Don’t miss our sunset cocktail hours on the terrace, where you can soak in the breathtaking hues of the California sky while savoring exquisite local cuisine.',
    2,
    1,
  ),
  new Homestay(
    2, // listing_id
    'Mountain Retreat',
    'Aspen',
    '456 Mountain Rd, Aspen, CO 81611, USA',
    186,
    images.image2,
    4.7,
    'Escape to the serene landscapes of Aspen with a stay at Mountain Retreat. Our cozy cabins are nestled in the heart of the mountains, offering you breathtaking views of the snow-capped peaks and lush forests. The retreat features a range of outdoor activities including hiking trails, ski slopes, and guided mountain tours. After a day of adventure, relax in our charming lodge with a hot cup of cocoa by the fireplace. The Mountain Retreat is the perfect destination for those seeking tranquility and natural beauty.',
    3,
    1,
  ),
  new Homestay(
    3, // listing_id
    'Historic Castle Stay',
    'Edinburgh',
    '789 Castle St, Edinburgh EH1 2NG, Scotland, UK',
    350,
    images.image3,
    3.0,
    'Step back in time with a stay at the Historic Castle Stay in Edinburgh. This exquisitely restored castle blends medieval charm with modern comfort, offering you a unique experience in one of Scotland’s most iconic landmarks. Explore the castle’s grand halls, majestic towers, and beautifully manicured gardens. Each room is elegantly furnished with period pieces, and our attentive staff ensures a regal experience. Enjoy gourmet dining in the castle’s opulent dining room, and immerse yourself in the rich history of this magnificent estate.',
    3,
    2,
  ),
  new Homestay(
    4, // listing_id
    'Countryside Farmhouse',
    'Lancaster',
    '101 Farm Lane, Lancaster, LA1 4XQ, England, UK',
    155,
    images.image4,
    3.5,
    'Experience the charm of rural life at Countryside Farmhouse in Lancaster. Our traditional farmhouse offers a peaceful retreat with stunning views of the rolling countryside. Enjoy fresh, farm-to-table meals prepared with ingredients sourced directly from our gardens and local farms. Engage in hands-on activities like animal feeding and gardening, or simply relax on our porch and take in the picturesque surroundings. Whether you’re exploring the scenic trails or savoring homemade treats, the Countryside Farmhouse promises an authentic and tranquil countryside escape.',
    3,
    3,
  ),
  new Homestay(
    5, // listing_id
    'Azure Heights',
    'Santorini',
    '22 Sunset Blvd, Thira, 847 00, Santorini, Greece',
    200,
    images.image5,
    4.7,
    "Nestled atop the cliffs of Santorini, Azure Heights offers breathtaking views of the Aegean Sea and the island’s iconic sunsets. This luxurious retreat combines modern elegance with traditional Cycladic architecture. Guests can unwind in spacious suites with private balconies, relax by the infinity pool, or indulge in gourmet dining featuring fresh local seafood. Whether you're exploring the charming village of Oia or enjoying a romantic evening on your terrace, Azure Heights promises an unforgettable island getaway.",
    4,
    5,
  ),

  new Homestay(
    6, // listing_id
    'Mountain Serenity Chalet',
    'Aspen',
    '789 Alpine Drive, Aspen, CO 81611, USA',
    329,
    images.image6,
    4.7,
    'Escape to the tranquility of Mountain Serenity Chalet in Aspen. Surrounded by towering pines and snow-capped peaks, this cozy chalet offers a perfect blend of rustic charm and modern comfort. Enjoy panoramic mountain views from your private hot tub, warm up by the stone fireplace, or hit the slopes with easy access to world-class skiing. After a day of adventure, relax with a gourmet meal prepared in the fully-equipped kitchen or unwind with a glass of wine on the spacious deck. Mountain Serenity Chalet is your ideal retreat for a luxurious mountain escape.',
    3,
    4,
  ),

  new Homestay(
    7, // listing_id
    'Tropical Oasis Villa',
    'Bali',
    '456 Jungle Path, Ubud, Bali 80571, Indonesia',
    189,
    images.image7,
    4.3,
    'Immerse yourself in the lush beauty of Bali at Tropical Oasis Villa in Ubud. This serene villa is surrounded by vibrant greenery and offers a private pool, open-air living spaces, and traditional Balinese decor. Wake up to the sounds of nature, enjoy a yoga session on the terrace, or explore the nearby rice terraces and cultural sites. With personalized service, including in-villa spa treatments and gourmet dining options, Tropical Oasis Villa provides a rejuvenating retreat in the heart of Bali’s natural paradise.',
    5,
    3,
  ),

  new Homestay(
    8, // listing_id
    'Urban Loft Retreat',
    'New York',
    '101 Manhattan Avenue, New York, NY 10025, USA',
    479,
    images.image8,
    4.3,
    'Discover the vibrant energy of New York City from the comfort of Urban Loft Retreat. Located in the heart of Manhattan, this chic loft offers stylish, contemporary accommodations with sweeping city views. Enjoy modern amenities like a fully-equipped kitchen, high-speed internet, and a rooftop terrace perfect for cityscape photography. Step outside and find yourself within walking distance of iconic attractions, gourmet restaurants, and bustling nightlife. Urban Loft Retreat is your perfect base for experiencing the excitement and culture of the Big Apple.',
    2,
    2,
  ),
  new Homestay(
    9, // listing_id
    'Seaside Serenity',
    'Malibu',
    '300 Pacific Coast Highway, Malibu, CA 90265, USA',
    490,
    images.image9,
    4.7,
    'Escape to Seaside Serenity, a luxurious beachfront homestay in Malibu. Enjoy breathtaking ocean views, direct beach access, and modern amenities such as a gourmet kitchen, spacious living areas, and a private deck. Perfect for surfing, sunbathing, or simply relaxing by the waves. Nearby attractions include scenic hiking trails, upscale shopping, and world-class dining options. Seaside Serenity offers the ultimate coastal retreat for a memorable vacation.',
    3,
    2,
  ),
  new Homestay(
    10, 
    'Mountain Hideaway',
    'Aspen',
    '200 Snowmass Road, Aspen, CO 81611, USA',
    385,
    images.image10,
    4.8,
    'Retreat to Mountain Hideaway, a charming homestay nestled in the picturesque mountains of Aspen. This cozy cabin features rustic decor, a fully-equipped kitchen, and a fireplace perfect for chilly evenings. Enjoy stunning mountain views, easy access to ski slopes, and nearby hiking trails. Ideal for outdoor enthusiasts, this hideaway is also close to quaint shops, local restaurants, and cultural attractions in Aspen. Experience the serene beauty and adventure of the Rockies at Mountain Hideaway.',
    2,
    1,
  ),
];

export default homestayList;
