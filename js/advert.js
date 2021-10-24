import { declension } from './utils/declension.js';
import { generateAdvertData } from './data.js';

const ADS_COUNT = 10;

const OFFER_TYPES_NAMES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const ROOMS_DECLENSIONS = [
  'комната',
  'комнаты',
  'комнат',
];

const GUESTS_DECLENSIONS = [
  'гостя',
  'гостей',
  'гостей',
];

const similarAdverts = Array.from( { length: ADS_COUNT }, generateAdvertData );
const mapCanvas = document.querySelector( '#map-canvas' );
const advertTemplate = document.querySelector( '#card' ).content.querySelector( '.popup' );
const advertListFragment = document.createDocumentFragment();

const addAdvertTextContent = ( element, selector, content ) => {
  if( content ) {
    element.querySelector( selector ).textContent = content;
  } else {
    element.querySelector( selector ).remove();
  }
};

const createAdvert = ( { author, offer } ) => {
  const advert = advertTemplate.cloneNode( true );

  advert.querySelector( '.popup__avatar' ).src = author.avatar ? author.avatar : 'img/avatars/default.png';

  addAdvertTextContent( advert, '.popup__title', offer.title );
  addAdvertTextContent( advert, '.popup__text--address', offer.address );
  addAdvertTextContent( advert, '.popup__description', offer.description );
  addAdvertTextContent( advert, '.popup__type', OFFER_TYPES_NAMES[ offer.type ] );

  if( offer.price ) {
    advert.querySelector( '.popup__text--price' ).textContent = `${ offer.price } ₽/ночь`;
  } else {
    advert.querySelector( '.popup__text--price' ).remove();
  }

  if( offer.rooms && offer.guests ) {
    const roomsDeclension = declension( offer.rooms, ROOMS_DECLENSIONS );
    const guestsDeclension = declension( offer.guests, GUESTS_DECLENSIONS );

    advert.querySelector( '.popup__text--capacity' ).textContent = `${ offer.rooms } ${ roomsDeclension } для ${ offer.guests } ${ guestsDeclension }`;
  } else {
    advert.querySelector( '.popup__text--capacity' ).remove();
  }

  if( offer.checkin && offer.checkout ) {
    advert.querySelector( '.popup__text--time' ).textContent = `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout }`;
  } else {
    advert.querySelector( '.popup__text--time' ).remove();
  }

  advert.querySelectorAll( '.popup__feature' ).forEach( ( feature ) => {
    const isChecked = offer.features.some(
      ( offerFeature ) => feature.classList.contains( `popup__feature--${ offerFeature }` ),
    );

    if( !isChecked ) {
      feature.remove();
    }
  } );

  if( offer.photos ) {
    offer.photos.forEach( ( url, index ) => {
      if( index === 0 ) {
        advert.querySelector( '.popup__photo' ).src = url;
      } else {
        const clonedPhoto = advert.querySelector( '.popup__photo' ).cloneNode();
        clonedPhoto.src = url;
        advert.querySelector( '.popup__photos' ).appendChild( clonedPhoto );
      }
    } );
  } else {
    advert.querySelector( '.popup__photos' ).remove();
  }

  advertListFragment.appendChild( advert );
};

const renderAdvert = ( index ) => {
  createAdvert( similarAdverts[ index ] );
  mapCanvas.appendChild( advertListFragment );
};

export { renderAdvert };
