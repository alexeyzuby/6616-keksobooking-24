const getRandomInt = ( min, max ) => {
  if( min < 0 || max < 0 ) {
    throw new Error( 'values should not be lower than 0' );
  }

  if( max <= min ) {
    throw new Error( 'the max value should not be lower or equal than the min' );
  }

  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
};

const getRandomFloat = ( min, max, fractionDigits ) => {
  if( min < 0 || max < 0 ) {
    throw new Error( 'values should not be lower than 0' );
  }

  if( max <= min ) {
    throw new Error( 'the max value should not be lower or equal than the min' );
  }

  return parseFloat( ( Math.random() * ( max - min ) + min ).toFixed( fractionDigits ) );
};

getRandomInt( 1, 10 );
getRandomFloat( 1, 10, 5 );
