const DISABLED_CLASSES = {
  AD: 'ad-form--disabled',
  MAP: 'map__filters--disabled',
};

const adForm = document.querySelector( '.ad-form' );
const mapFilter = document.querySelector( '.map__filters' );
const adFormFields = adForm.querySelectorAll( 'fieldset' );
const mapFilterSelects = mapFilter.querySelectorAll( '.map__filter' );
const mapFilterFeatures = mapFilter.querySelector( '.map__features' );

const toggleDisabledClass = ( isActive, selector, disabledClass ) => {
  isActive ? selector.classList.remove( disabledClass ) : selector.classList.add( disabledClass );
};

const toggleDisabledAttr = ( isActive, selector ) => {
  selector.forEach( ( item ) => {
    item.disabled = !isActive;
  } );
};

const setPageActivity = ( isActive ) => {
  if( typeof isActive !== 'boolean' ) {
    throw new Error( 'isActive param must be boolean' );
  }

  toggleDisabledClass( isActive, adForm, DISABLED_CLASSES.AD );
  toggleDisabledClass( isActive, mapFilter, DISABLED_CLASSES.MAP );
  toggleDisabledAttr( isActive, adFormFields );
  toggleDisabledAttr( isActive, mapFilterSelects );

  mapFilterFeatures.disabled = !isActive;
};

export { setPageActivity };
