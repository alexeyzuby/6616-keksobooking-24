const ADS_COUNT = 10;
const MIN_ARRAY_LENGTH = 1;
const MIN_ARRAY_INDEX = 0;
const MAX_PRICE = 10000;
const MAX_ROOMS = 10;
const MAX_GUESTS = 10;
const LOCATION_DIGITS = 5;
const OFFER = {
  TITLES: [
    'Best offer ever!',
    'Cozy apartment in the center',
    'You\'ve never seen such real estate',
  ],
  TYPES: [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel',
  ],
  TIME: [
    '12:00',
    '13:00',
    '14:00',
  ],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ],
  DESCRIPTIONS: [
    'The best deal you\'ve ever seen',
    'Small apartment suitable for pets',
    'Chic mansions for parties',
  ],
  PHOTOS: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
};
const LOCATION = {
  LAT: {
    MIN: 35.65000,
    MAX: 35.70000,
  },
  LNG: {
    MIN: 139.70000,
    MAX: 139.80000,
  },
};

const getRandomInt = ( min, max ) => {
  if( min < 0 || max < 0 ) {
    throw new Error( 'values should not be lower than 0' );
  }

  if( max <= min ) {
    throw new Error( 'the max value should not be lower or equal than the min' );
  }

  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
};

const getRandomFloat = ( min, max, fractionDigits ) => {
  if( min < 0 || max < 0 ) {
    throw new Error( 'values should not be lower than 0' );
  }

  if( max <= min ) {
    throw new Error( 'the max value should not be lower or equal than the min' );
  }

  return parseFloat( ( Math.random() * ( max - min ) + min ).toFixed( fractionDigits ) );
};

const getRandomArray = ( data ) => {
  const maxLength = data.length;
  const arrayLength = getRandomInt( MIN_ARRAY_LENGTH, maxLength );
  const array = [];

  while( array.length < arrayLength ) {
    const index = getRandomInt( MIN_ARRAY_INDEX, maxLength - 1 );
    const element = data[ index ];

    if( !array.includes( element ) ) {
      array.push( element );
    }
  }

  return array;
};

const getRandomArrayElement = ( data ) => {
  const index = getRandomInt( MIN_ARRAY_INDEX, data.length - 1 );

  return data[ index ];
};

const createRandomAd = ( ad, id ) => {
  const randomLat = getRandomFloat( LOCATION.LAT.MIN, LOCATION.LAT.MAX, LOCATION_DIGITS );
  const randomLng = getRandomFloat( LOCATION.LNG.MIN, LOCATION.LNG.MAX, LOCATION_DIGITS );

  return {
    author: {
      avatar: `img/avatars/user${ String( id + 1 ).padStart( 2, '0' ) }.png`,
    },
    offer: {
      title: getRandomArrayElement( OFFER.TITLES ),
      address: `${ randomLat }, ${ randomLng }`,
      price: getRandomInt( MIN_ARRAY_INDEX, MAX_PRICE ),
      type: getRandomArrayElement( OFFER.TYPES ),
      rooms: getRandomInt( MIN_ARRAY_INDEX, MAX_ROOMS ),
      guests: getRandomInt( MIN_ARRAY_INDEX, MAX_GUESTS ),
      checkin: getRandomArrayElement( OFFER.TIME ),
      checkout: getRandomArrayElement( OFFER.TIME ),
      features: getRandomArray( OFFER.FEATURES ),
      description: getRandomArrayElement( OFFER.DESCRIPTIONS ),
      photos: getRandomArray( OFFER.PHOTOS ),
    },
    location: {
      lat: randomLat,
      lng: randomLng,
    },
  };
};

Array.from( { length: ADS_COUNT }, createRandomAd );
