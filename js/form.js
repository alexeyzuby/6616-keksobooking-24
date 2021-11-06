const MIN_TITLE_LENGTH = 30;
const MAX_PRICE_VALUE = 1000000;
const ERROR_CLASS = 'has-error';

const NOT_FOR_GUESTS_VALUES = {
  CAPACITY: 0,
  ROOMS: 100,
};

const adForm = document.querySelector( '.ad-form' );
const adFormTitle = adForm.querySelector( '#title' );
const adFormPrice = adForm.querySelector( '#price' );
const adFormRooms = adForm.querySelector( '#room_number' );
const adFormCapacity = adForm.querySelector( '#capacity' );

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
  const value = adFormPrice.value;

  if( value > MAX_PRICE_VALUE ) {
    adFormPrice.setCustomValidity( 'Цена должна быть меньше или равна 1000000' );
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

const validateForm = () => {
  adFormTitle.addEventListener( 'input', titleValidateHandler );
  adFormPrice.addEventListener( 'input', priceValidateHandler );
  adFormRooms.addEventListener( 'change', roomsValidateHandler );
  adFormCapacity.addEventListener( 'change', roomsValidateHandler );
};

export { validateForm };
