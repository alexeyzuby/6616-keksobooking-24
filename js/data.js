import { getRandom } from './utils/random.js';

const TITLES = [
  'Лучшее предложение!',
  'Уютная квартира в центре',
  'Вы никогда не видели так прекрасной недвижимости',
];

const DESCRIPTIONS = [
  'Лучшее предложение, которое вы когда-либо видели',
  'Небольшая квартира, подходящая для домашних животных',
  'Шикарный особняк для вечеринок',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const PRICE = {
  MIN: 0,
  MAX: 1000000,
};

const ROOMS = {
  MIN: 1,
  MAX: 10,
};

const GUESTS = {
  MIN: 1,
  MAX: 10,
};

const LOCATION = {
  DIGITS: 5,
  LAT: {
    MIN: 35.65000,
    MAX: 35.70000,
  },
  LNG: {
    MIN: 139.70000,
    MAX: 139.80000,
  },
};

const generateAdvertData = ( ad, id ) => {
  const randomLat = getRandom.float( LOCATION.LAT.MIN, LOCATION.LAT.MAX, LOCATION.DIGITS );
  const randomLng = getRandom.float( LOCATION.LNG.MIN, LOCATION.LNG.MAX, LOCATION.DIGITS );

  return {
    author: {
      avatar: `img/avatars/user${ String( id + 1 ).padStart( 2, '0' ) }.png`,
    },
    offer: {
      title: getRandom.arrayElement( TITLES ),
      address: `${ randomLat }, ${ randomLng }`,
      price: getRandom.integer( PRICE.MIN, PRICE.MAX ),
      type: getRandom.arrayElement( TYPES ),
      rooms: getRandom.integer( ROOMS.MIN, ROOMS.MAX ),
      guests: getRandom.integer( GUESTS.MIN, GUESTS.MAX ),
      checkin: getRandom.arrayElement( TIME ),
      checkout: getRandom.arrayElement( TIME ),
      features: getRandom.array( FEATURES ),
      description: getRandom.arrayElement( DESCRIPTIONS ),
      photos: getRandom.array( PHOTOS ),
    },
    location: {
      lat: randomLat,
      lng: randomLng,
    },
  };
};

export { generateAdvertData };
