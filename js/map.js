import { adForm, mapFilters } from './data.js';
import { createAdvert } from './advert.js';
import { compareAdvertsData } from './filter.js';
import { getData } from './api.js';
import { setFilterActivity, setFormActivity } from './page.js';
import { showAlert } from './alert.js';
import { debounce } from './utils/debounce.js';
import { validateForm } from './form.js';

const FRACTION_DIGITS = 5;
const RERENDER_DELAY = 500;
const ADS_COUNT = 10;

const DEFAULT_COORDINATES = {
  LAT: 35.68090,
  LNG: 139.76895,
  ZOOM: 10,
};

const MAIN_PIN = {
  URL: 'img/main-pin.svg',
  ICON_SIZES: [ 52, 52 ],
  ANCHOR_SIZES: [ 26, 52 ],
};

const ADVERT_PIN = {
  URL: 'img/pin.svg',
  ICON_SIZES: [ 40, 40 ],
  ANCHOR_SIZES: [ 20, 40 ],
};

const addressField = adForm.querySelector( '#address' );

const map = L.map( 'map-canvas' );

const mainPin = L.icon( {
  iconUrl: MAIN_PIN.URL,
  iconSize: MAIN_PIN.ICON_SIZES,
  iconAnchor: MAIN_PIN.ANCHOR_SIZES,
} );

const mainMarker = L.marker(
  {
    lat: DEFAULT_COORDINATES.LAT,
    lng: DEFAULT_COORDINATES.LNG,
  },
  {
    draggable: true,
    icon: mainPin,
  },
);

const markerGroup = L.layerGroup().addTo( map );

const advertPin = L.icon( {
  iconUrl: ADVERT_PIN.URL,
  iconSize: ADVERT_PIN.ICON_SIZES,
  iconAnchor: ADVERT_PIN.ANCHOR_SIZES,
} );

const createPin = ( advert ) => {
  const marker = L.marker(
    {
      lat: advert.location.lat,
      lng: advert.location.lng,
    },
    {
      icon: advertPin,
    },
  );

  marker
    .addTo( markerGroup )
    .bindPopup( createAdvert( advert ) );
};

const createAdvertsPins = ( adverts ) => {
  adverts.filter( compareAdvertsData )
    .slice( 0, ADS_COUNT )
    .forEach( ( advert ) => {
      createPin( advert );
    } );
};

let advertsElements = [];

getData( ( adverts ) => {
  advertsElements = adverts.slice();
  createAdvertsPins( advertsElements );
  setFilterActivity( true );
}, () => showAlert( 'При загрузке данных с сервера произошла ошибка' ) );

const filterChangeHandler = debounce( () => {
  markerGroup.clearLayers();
  createAdvertsPins( advertsElements );
}, RERENDER_DELAY );

mapFilters.addEventListener( 'change', filterChangeHandler );

const initializeMainPinCoordinates = () => {
  mainMarker.setLatLng( {
    lat: DEFAULT_COORDINATES.LAT,
    lng: DEFAULT_COORDINATES.LNG,
  } );

  addressField.value = `${ DEFAULT_COORDINATES.LAT }, ${ DEFAULT_COORDINATES.LNG }`;
};

const initializeMap = () => {
  const mapLayout = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  );

  map.on( 'load', () => {
    setFormActivity( true );
    validateForm();
    addressField.value = `${ DEFAULT_COORDINATES.LAT }, ${ DEFAULT_COORDINATES.LNG }`;
  } ).setView( {
    lat: DEFAULT_COORDINATES.LAT,
    lng: DEFAULT_COORDINATES.LNG,
  }, DEFAULT_COORDINATES.ZOOM );

  mapLayout.addTo( map );
  mainMarker.addTo( map );

  mainMarker.on( 'moveend', ( evt ) => {
    addressField.value = `${ evt.target.getLatLng().lat.toFixed( FRACTION_DIGITS ) }, ${ evt.target.getLatLng().lng.toFixed( FRACTION_DIGITS ) }`;
  } );
};

const resetMapHandler = () => {
  initializeMainPinCoordinates();
  createAdvertsPins( advertsElements );

  markerGroup.eachLayer( ( layer ) => {
    layer.closePopup();
  } );
};

export { initializeMap, resetMapHandler };
