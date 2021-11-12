const ALERT_SHOW_TIME = 5000;

const ALERT_STYLE = {
  Z_INDEX: 999,
  POSITION: 'fixed',
  LEFT: 0,
  TOP: 0,
  RIGHT: 0,
  PADDING: '5px',
  FONT_SIZE: '18px',
  TEXT_ALIGN: 'center',
  COLOR: '#ffffff',
  BACKGROUND_COLOR: 'rgba(255, 86, 53, 0.8)',
};

const showAlert = ( message ) => {
  const alertContainer = document.createElement( 'div' );
  alertContainer.style.zIndex = ALERT_STYLE.Z_INDEX;
  alertContainer.style.position = ALERT_STYLE.POSITION;
  alertContainer.style.left = ALERT_STYLE.LEFT;
  alertContainer.style.top = ALERT_STYLE.TOP;
  alertContainer.style.right = ALERT_STYLE.RIGHT;
  alertContainer.style.padding = ALERT_STYLE.PADDING;
  alertContainer.style.fontSize = ALERT_STYLE.FONT_SIZE;
  alertContainer.style.textAlign = ALERT_STYLE.TEXT_ALIGN;
  alertContainer.style.color = ALERT_STYLE.COLOR;
  alertContainer.style.backgroundColor = ALERT_STYLE.BACKGROUND_COLOR;

  alertContainer.textContent = message;

  document.body.append( alertContainer );

  setTimeout( () => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME );
};

export { showAlert };
