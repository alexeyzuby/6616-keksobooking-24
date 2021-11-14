import { resetMapHandler } from './map.js';
import { sendData } from './api.js';

const MIN_TITLE_LENGTH = 30;
const MAX_PRICE_VALUE = 1000000;
const ERROR_CLASS = 'has-error';

const NOT_FOR_GUESTS_VALUES = {
  CAPACITY: 0,
  ROOMS: 100,
};

const TYPES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const adForm = document.querySelector( '.ad-form' );
const mapFilters = document.querySelector( '.map__filters' );
const adFormTitle = adForm.querySelector( '#title' );
const adFormType = adForm.querySelector( '#type' );
const adFormPrice = adForm.querySelector( '#price' );
const adFormRooms = adForm.querySelector( '#room_number' );
const adFormCapacity = adForm.querySelector( '#capacity' );
const adFormTimeIn = adForm.querySelector( '#timein' );
const adFormTimeOut = adForm.querySelector( '#timeout' );
const adFormSubmit = adForm.querySelector( '.ad-form__submit' );
const adFormReset = adForm.querySelector( '.ad-form__reset' );

const messageSuccessTemplate = document.querySelector( '#success' ).content.querySelector( '.success' );
const messageSuccess = messageSuccessTemplate.cloneNode( true );
const messageErrorTemplate = document.querySelector( '#error' ).content.querySelector( '.error' );
const messageError = messageErrorTemplate.cloneNode( true );

const setPriceValue = ( value ) => {
  adFormPrice.placeholder = `от ${ TYPES[ value ] }`;
  adFormPrice.setAttribute( 'min', TYPES[ value ] );
};

const titleValidateHandler = () => {
  const valueLength = adFormTitle.value.length;

  if( valueLength < MIN_TITLE_LENGTH ) {
    adFormTitle.setCustomValidity( `Ещё ${ MIN_TITLE_LENGTH - valueLength } символов` );
    adFormTitle.classList.add( ERROR_CLASS );
  } else {
    adFormTitle.setCustomValidity( '' );
    adFormTitle.classList.remove( ERROR_CLASS );
  }

  adFormTitle.reportValidity();
};

const priceValidateHandler = () => {
  const type = adFormType.value;
  const value = adFormPrice.value;

  if( value < TYPES[ type ] ) {
    adFormPrice.setCustomValidity( `Минимальная цена начинается от ${ TYPES[ type ] }` );
    adFormPrice.classList.add( ERROR_CLASS );
  } else if( value > MAX_PRICE_VALUE ) {
    adFormPrice.setCustomValidity( 'Цена должна быть меньше или равна 1000000' );
    adFormPrice.classList.add( ERROR_CLASS );
  } else {
    adFormPrice.setCustomValidity( '' );
    adFormPrice.classList.remove( ERROR_CLASS );
  }

  adFormPrice.reportValidity();
};

const typeChangePriceHandler = ( evt ) => {
  setPriceValue( evt.target.value );

  const type = adFormType.value;
  const price = adFormPrice.value;

  if( price && price < TYPES[ type ] ) {
    adFormPrice.setCustomValidity( `Минимальная цена начинается от ${ TYPES[ type ] }` );
    adFormPrice.classList.add( ERROR_CLASS );
  } else {
    adFormPrice.setCustomValidity( '' );
    adFormPrice.classList.remove( ERROR_CLASS );
  }

  adFormPrice.reportValidity();
};

const roomsValidateHandler = () => {
  const rooms = Number( adFormRooms.value );
  const capacity = Number( adFormCapacity.value );

  if( rooms === NOT_FOR_GUESTS_VALUES.ROOMS && capacity !== NOT_FOR_GUESTS_VALUES.CAPACITY ) {
    adFormRooms.setCustomValidity( 'Не подходит для гостей' );
    adFormRooms.classList.add( ERROR_CLASS );
  } else if( rooms !== NOT_FOR_GUESTS_VALUES.ROOMS && capacity === NOT_FOR_GUESTS_VALUES.CAPACITY ) {
    adFormRooms.setCustomValidity( 'Подходят только 100 комнат' );
    adFormRooms.classList.add( ERROR_CLASS );
  } else if( rooms < capacity ) {
    adFormRooms.setCustomValidity( 'Количество комнат не должно превышать количество гостей' );
    adFormRooms.classList.add( ERROR_CLASS );
  } else {
    adFormRooms.setCustomValidity( '' );
    adFormRooms.classList.remove( ERROR_CLASS );
  }

  adFormRooms.reportValidity();
};

const timeInValidateHandler = ( evt ) => {
  adFormTimeOut.value = evt.target.value;
};

const timeOutValidateHandler = ( evt ) => {
  adFormTimeIn.value = evt.target.value;
};

const resetFormHandler = () => {
  adForm.reset();
  mapFilters.reset();
  setPriceValue( adFormType.value );
};

const initMessages = () => {
  messageSuccess.classList.add('hidden');
  messageError.classList.add( 'hidden' );

  document.body.appendChild( messageSuccess );
  document.body.appendChild( messageError );

  document.addEventListener( 'keydown', ( evt ) => {
    if( evt.key === 'Escape' ) {
      messageSuccess.classList.add('hidden');
      messageError.classList.add( 'hidden' );
    }
  } );

  messageSuccess.addEventListener( 'click', () => {
    messageSuccess.classList.add( 'hidden' );
  } );

  messageError.addEventListener( 'click', () => {
    messageError.classList.add( 'hidden' );
  } );
};

const validateForm = () => {
  initMessages();
  setPriceValue( adFormType.value );
  adFormTitle.addEventListener( 'input', titleValidateHandler );
  adFormPrice.addEventListener( 'input', priceValidateHandler );
  adFormType.addEventListener( 'change', typeChangePriceHandler );
  adFormRooms.addEventListener( 'change', roomsValidateHandler );
  adFormCapacity.addEventListener( 'change', roomsValidateHandler );
  adFormTimeIn.addEventListener( 'change', timeInValidateHandler );
  adFormTimeOut.addEventListener( 'change', timeOutValidateHandler );
};

adFormSubmit.addEventListener( 'click', ( evt ) => {
  evt.preventDefault();
  adForm.reportValidity();

  if( adForm.checkValidity() ) {
    const data = new FormData( adForm );

    sendData(
      () => {
        resetFormHandler();
        resetMapHandler();
        messageSuccess.classList.remove( 'hidden' );
      },
      () => {
        messageError.classList.remove( 'hidden' );
      },
      data,
    );
  }
} );

adFormReset.addEventListener( 'click', ( evt ) => {
  evt.preventDefault();
  resetFormHandler();
  resetMapHandler();
} );

export { validateForm };
