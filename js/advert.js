import { declension } from './utils/declension.js';

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

const advertTemplate = document.querySelector( '#card' ).content.querySelector( '.popup' );

const addAdvertTextContent = ( element, selector, content ) => {
  content ? element.querySelector( selector ).textContent = content : element.querySelector( selector ).remove();
};

const createAdvert = ( { author, offer } ) => {
  const advert = advertTemplate.cloneNode( true );
  const priceElement = advert.querySelector( '.popup__text--price' );
  const timeElement = advert.querySelector( '.popup__text--time' );
  const capacityElement = advert.querySelector( '.popup__text--capacity' );
  const photoElement = advert.querySelector( '.popup__photo' );
  const photosElement = advert.querySelector( '.popup__photos' );
  const roomsDeclension = declension( offer.rooms, ROOMS_DECLENSIONS );
  const guestsDeclension = declension( offer.guests, GUESTS_DECLENSIONS );

  advert.querySelector( '.popup__avatar' ).src = author.avatar ? author.avatar : 'img/avatars/default.png';

  addAdvertTextContent( advert, '.popup__title', offer.title );
  addAdvertTextContent( advert, '.popup__text--address', offer.address );
  addAdvertTextContent( advert, '.popup__description', offer.description );
  addAdvertTextContent( advert, '.popup__type', OFFER_TYPES_NAMES[ offer.type ] );

  offer.price ? priceElement.textContent = `${ offer.price } ₽/ночь` : priceElement.remove();
  offer.checkin && offer.checkout ? timeElement.textContent = `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout }` : timeElement.remove();
  offer.rooms && offer.guests ? capacityElement.textContent = `${ offer.rooms } ${ roomsDeclension } для ${ offer.guests } ${ guestsDeclension }` :
    capacityElement.remove();


  advert.querySelectorAll( '.popup__feature' ).forEach( ( feature ) => {
    if( offer.features ) {
      const isChecked = offer.features.some(
        ( offerFeature ) => feature.classList.contains( `popup__feature--${ offerFeature }` ),
      );

      if( !isChecked ) {
        feature.remove();
      }
    } else {
      feature.remove();
    }
  } );

  if( offer.photos ) {
    offer.photos.forEach( ( url, index ) => {
      if( index === 0 ) {
        photoElement.src = url;
      } else {
        const clonedPhoto = photoElement.cloneNode();
        clonedPhoto.src = url;
        photosElement.appendChild( clonedPhoto );
      }
    } );
  } else {
    photosElement.remove();
  }

  return advert;
};

export { createAdvert };
