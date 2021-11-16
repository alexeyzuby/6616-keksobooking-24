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

const compareTypes = ( data ) => housingTypeSelect.value === FILTER_DEFAULT_VALUE || data.offer.type === housingTypeSelect.value;
const comparePrices = ( data ) => housingPriceSelect.value === FILTER_DEFAULT_VALUE || data.offer.price >= housingPriceValues[ housingPriceSelect.value ].min && data.offer.price < housingPriceValues[ housingPriceSelect.value ].max;
const compareRooms = ( data ) => housingRoomsSelect.value === FILTER_DEFAULT_VALUE || data.offer.rooms.toString() === housingRoomsSelect.value;
const compareGuests = ( data ) => housingGuestsSelect.value === FILTER_DEFAULT_VALUE || data.offer.guests.toString() === housingGuestsSelect.value;

const compareFeatures = ( data ) => {
  const selectedFeatures = mapFilters.querySelectorAll( '[name="features"]:checked' );
  return !data.offer.features ? false : Array.from( selectedFeatures ).every( ( feature ) => data.offer.features.includes( feature.value ) );
};

const compareAdvertsData = ( data ) => [ compareTypes, comparePrices, compareRooms, compareGuests, compareFeatures ].every( ( callback ) => callback( data ) );

export { compareAdvertsData };
