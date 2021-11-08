import { setPageActivity } from './page.js';
import { generateAdvertData } from './data.js';
import { createAdvert } from './advert.js';

const FRACTION_DIGITS = 5;
const ADS_COUNT = 10;

const DEFAULT_COORDINATES = {
  LAT: 35.65283,
  LNG: 139.83947,
  ZOOM: 10,
};

const MAIN_PIN = {
  URL: '../img/main-pin.svg',
  SIZE: [ 52, 52 ],
  ANCHOR: [ 26, 52 ],
};

const ADVERT_PIN = {
  URL: '../img/pin.svg',
  SIZE: [ 40, 40 ],
  ANCHOR: [ 20, 40 ],
};

const initMap = () => {
  const adForm = document.querySelector( '.ad-form' );
  const addressField = adForm.querySelector( '#address' );

  const map = L.map( 'map-canvas' )
    .on( 'load', () => {
      setPageActivity( true );
      addressField.value = `${ DEFAULT_COORDINATES.LAT }, ${ DEFAULT_COORDINATES.LNG }`;
    } )
    .setView( {
      lat: DEFAULT_COORDINATES.LAT,
      lng: DEFAULT_COORDINATES.LNG,
    }, DEFAULT_COORDINATES.ZOOM );

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo( map );

  const mainPin = L.icon( {
    iconUrl: MAIN_PIN.URL,
    iconSize: MAIN_PIN.SIZE,
    iconAnchor: MAIN_PIN.ANCHOR,
  } );

  const advertPin = L.icon( {
    iconUrl: ADVERT_PIN.URL,
    iconSize: ADVERT_PIN.SIZE,
    iconAnchor: ADVERT_PIN.ANCHOR,
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

  mainMarker.addTo( map );

  mainMarker.on( 'moveend', ( evt ) => {
    addressField.value = `${ evt.target.getLatLng().lat.toFixed( FRACTION_DIGITS ) }, ${ evt.target.getLatLng().lng.toFixed( FRACTION_DIGITS ) }`;
  } );

  const adverts = Array.from( { length: ADS_COUNT }, generateAdvertData );

  const markerGroup = L.layerGroup().addTo( map );

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

  adverts.forEach( ( advert ) => {
    createPin( advert );
  } );
};

export { initMap };
