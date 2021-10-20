const MIN_ARRAY_LENGTH = 1;
const MIN_ARRAY_INDEX = 0;

const getRandom = {
  integer: ( min, max ) => {
    if( min < 0 || max < 0 ) {
      throw new Error( 'values should not be lower than 0' );
    }

    if( max <= min ) {
      throw new Error( 'the max value should not be less than or equal to the min' );
    }

    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  },
  float: ( min, max, fractionDigits ) => {
    if( min < 0 || max < 0 ) {
      throw new Error( 'values should not be lower than 0' );
    }

    if( max <= min ) {
      throw new Error( 'the max value should not be less than or equal to the min' );
    }

    return parseFloat( ( Math.random() * ( max - min ) + min ).toFixed( fractionDigits ) );
  },
  array: ( data ) => {
    if( !Array.isArray( data ) ) {
      throw new Error( 'the data must be an array' );
    } else if( data.length <= 1 ) {
      throw new Error( 'data length must be greater than 1' );
    }

    const maxLength = data.length;
    const arrayLength = getRandom.integer( MIN_ARRAY_LENGTH, maxLength );
    const array = [];

    while( array.length < arrayLength ) {
      const index = getRandom.integer( MIN_ARRAY_INDEX, maxLength - 1 );
      const element = data[ index ];

      if( !array.includes( element ) ) {
        array.push( element );
      }
    }

    return array;
  },
  arrayElement: ( data ) => {
    if( !Array.isArray( data ) ) {
      throw new Error( 'the data must be an array' );
    } else if( data.length <= 1 ) {
      throw new Error( 'data length must be greater than 1' );
    }

    const index = getRandom.integer( MIN_ARRAY_INDEX, data.length - 1 );

    return data[ index ];
  },
};

export { getRandom };
