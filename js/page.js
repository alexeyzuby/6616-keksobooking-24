import { adForm, mapFilters } from './data.js';

const DISABLED_CLASSES = {
  AD: 'ad-form--disabled',
  MAP: 'map__filters--disabled',
};

const adFormFields = adForm.querySelectorAll( 'fieldset' );
const mapFilterSelects = mapFilters.querySelectorAll( '.map__filter' );
const mapFilterFeatures = mapFilters.querySelector( '.map__features' );

const switchDisabledClass = ( isActive, selector, disabledClass ) => {
  isActive
    ? selector.classList.remove( disabledClass )
    : selector.classList.add( disabledClass );
};

const switchDisabledAttr = ( isActive, selector ) => {
  selector.forEach( ( item ) => {
    item.disabled = !isActive;
  } );
};

const setFilterActivity = ( isActive ) => {
  if( typeof isActive !== 'boolean' ) {
    throw new Error( 'isActive param must be boolean' );
  }

  switchDisabledClass( isActive, mapFilters, DISABLED_CLASSES.MAP );
  switchDisabledAttr( isActive, mapFilterSelects );

  mapFilterFeatures.disabled = !isActive;
};

const setFormActivity = ( isActive ) => {
  if( typeof isActive !== 'boolean' ) {
    throw new Error( 'isActive param must be boolean' );
  }

  switchDisabledClass( isActive, adForm, DISABLED_CLASSES.AD );
  switchDisabledAttr( isActive, adFormFields );
};

export { setFilterActivity, setFormActivity };
