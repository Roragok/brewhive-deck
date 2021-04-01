const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  init: false,
  centeredSlides: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

$( document ).ready(function() {
  swiper.init();
});
