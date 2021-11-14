const sendData = ( onSuccess, onError, body ) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then( ( response ) => {
    response.ok ? onSuccess() : onError();
  } ).catch( () => {
    onError();
  } );
};

const getData = ( onSuccess, onError ) => {
  fetch( 'https://24.javascript.pages.academy/keksobooking/data' )
    .then( ( response ) => response.json() )
    .then( ( adverts ) => onSuccess( adverts ) )
    .catch( () => {
      onError();
    } );
};

export { sendData, getData };
