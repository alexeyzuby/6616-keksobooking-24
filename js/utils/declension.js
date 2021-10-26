const declension = ( num, words ) => {
  if( !Array.isArray( words ) ) {
    throw new Error( 'words must be an array' );
  }

  const cases = [ 2, 0, 1, 1, 1, 2 ];
  return words[ ( num % 100 > 4 && num % 100 < 20 ) ? 2 : cases[ ( num % 10 < 5 ) ? num % 10 : 5 ] ];
};

export { declension };
