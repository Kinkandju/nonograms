'use strict';

//* Checks the user's operating system
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  webOS: function () {
    return navigator.userAgent.match(/webOS/i);
  },
  iPhone: function () {
    return navigator.userAgent.match(/iPhone/i);
  },
  iPad: function () {
    return navigator.userAgent.match(/iPad/i);
  },
  iPod: function () {
    return navigator.userAgent.match(/iPod/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  WindowsPhone: function () {
    return navigator.userAgent.match(/Windows Phone/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.webOS() ||
      isMobile.iPhone() ||
      isMobile.iPad() ||
      isMobile.iPod() ||
      isMobile.BlackBerry() ||
      isMobile.WindowsPhone() ||
      isMobile.Windows()
    );
  }
}

export { isMobile };
