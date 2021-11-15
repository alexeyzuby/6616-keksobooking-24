import { mapFilters } from './data.js';

const FILTER_DEFAULT_VALUE = 'any';

const housingTypeSelect = mapFilters.querySelector( '#housing-type' );
const housingPriceSelect = mapFilters.querySelector( '#housing-price' );
const housingRoomsSelect = mapFilters.querySelector( '#housing-rooms' );
const housingGuestsSelect = mapFilters.querySelector( '#housing-guests' );

const housingPriceValues = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 1000000,
  },
};

const compareAdvertsType = ( data ) => housingTypeSelect.value === FILTER_DEFAULT_VALUE || data.offer.type === housingTypeSelect.value;
const compareAdvertsPrice = ( data ) => housingPriceSelect.value === FILTER_DEFAULT_VALUE || data.offer.price >= housingPriceValues[ housingPriceSelect.value ].min && data.offer.price < housingPriceValues[ housingPriceSelect.value ].max;
const compareAdvertsRooms = ( data ) => housingRoomsSelect.value === FILTER_DEFAULT_VALUE || data.offer.rooms.toString() === housingRoomsSelect.value;
const compareAdvertsGuests = ( data ) => housingGuestsSelect.value === FILTER_DEFAULT_VALUE || data.offer.guests.toString() === housingGuestsSelect.value;

const compareAdvertsFeatures = ( data ) => {
  const selectedFeatures = document.querySelectorAll( '[name="features"]:checked' );

  let isChecked = true;

  selectedFeatures.forEach( ( item, index ) => {
    if( !data.offer.features || data.offer.features.indexOf( selectedFeatures[ index ].value ) === -1 ) {
      isChecked = false;
    }
  } );

  return isChecked;
};

const compareAdvertData = ( data ) => compareAdvertsType( data ) && compareAdvertsPrice( data ) && compareAdvertsRooms( data ) && compareAdvertsGuests( data ) && compareAdvertsFeatures( data );

export { compareAdvertData };
