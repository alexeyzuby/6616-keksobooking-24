const sendData = ( onSuccess, onError, body ) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then( ( response ) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  } ).catch( () => {
    onError();
  } );
};

const getData = ( onSuccess, onError ) => {
  fetch( 'https://24.javascript.pages.academy/keksobooking/data' )
    .then( ( response ) => response.json() )
    .then( ( adverts ) => onSuccess( adverts ) )
    .catch( ( err ) => {
      onError( err );
    } );
};

export { sendData, getData };
