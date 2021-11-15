const ALERT_SHOW_TIME = 5000;

const showAlert = ( message ) => {
  const alertContainer = document.createElement( 'div' );
  alertContainer.classList.add( 'alert' );
  alertContainer.textContent = message;

  document.body.append( alertContainer );

  setTimeout( () => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME );
};

export { showAlert };
