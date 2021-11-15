import { adForm, mapFilters } from './data.js';

const DISABLED_CLASSES = {
  AD: 'ad-form--disabled',
  MAP: 'map__filters--disabled',
};

const adFormFields = adForm.querySelectorAll( 'fieldset' );
const mapFilterSelects = mapFilters.querySelectorAll( '.map__filter' );
const mapFilterFeatures = mapFilters.querySelector( '.map__features' );

const toggleDisabledClass = ( isActive, selector, disabledClass ) => {
  isActive
    ? selector.classList.remove( disabledClass )
    : selector.classList.add( disabledClass );
};

const toggleDisabledAttr = ( isActive, selector ) => {
  selector.forEach( ( item ) => {
    item.disabled = !isActive;
  } );
};

const setFilterActivity = ( isActive ) => {
  if( typeof isActive !== 'boolean' ) {
    throw new Error( 'isActive param must be boolean' );
  }

  toggleDisabledClass( isActive, mapFilters, DISABLED_CLASSES.MAP );
  toggleDisabledAttr( isActive, mapFilterSelects );

  mapFilterFeatures.disabled = !isActive;
};

const setFormActivity = ( isActive ) => {
  if( typeof isActive !== 'boolean' ) {
    throw new Error( 'isActive param must be boolean' );
  }

  toggleDisabledClass( isActive, adForm, DISABLED_CLASSES.AD );
  toggleDisabledAttr( isActive, adFormFields );
};

export { setFilterActivity, setFormActivity };
