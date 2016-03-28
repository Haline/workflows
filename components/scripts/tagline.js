var $, fill;

$ = require('jquery');

(fill = function(item) {
  return $('.tagline').append("" + item);
})('hoho Creative minds in Art');

fill;
