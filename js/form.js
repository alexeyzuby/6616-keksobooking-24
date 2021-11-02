const DISABLED_CLASSES = {
  AD: 'ad-form--disabled',
  MAP: 'map__filters--disabled',
};

const adForm = document.querySelector( '.ad-form' );
const mapFilter = document.querySelector( '.map__filters' );
const adFormFields = adForm.querySelectorAll( 'fieldset' );
const mapFilterSelects = mapFilter.querySelectorAll( '.map__filter' );
const mapFilterFeatures = mapFilter.querySelector( '.map__features' );

const toggleDisabledClass = ( isDisabled, selector, disabledClass ) => {
  isDisabled ? selector.classList.add( disabledClass ) : selector.classList.remove( disabledClass );
};

const toggleDisabledAttr = ( isDisabled, selector ) => {
  selector.forEach( ( item ) => {
    item.disabled = isDisabled;
  } );
};

const disableForm = ( isDisabled ) => {
  if( typeof isDisabled !== 'boolean' ) {
    throw new Error( 'isDisabled param must be boolean' );
  }

  toggleDisabledClass( isDisabled, adForm, DISABLED_CLASSES.AD );
  toggleDisabledClass( isDisabled, mapFilter, DISABLED_CLASSES.MAP );
  toggleDisabledAttr( isDisabled, adFormFields );
  toggleDisabledAttr( isDisabled, mapFilterSelects );

  mapFilterFeatures.disabled = isDisabled;
};

export { disableForm };
