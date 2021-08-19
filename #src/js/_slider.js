new Swiper('.same-vine__slider', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  slidesPerView: 1,
  spaceBetween: 24,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    720: {
      slidesPerView: 2,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
    },
    1200: {
      slidesPerView: 4
    }
  }
});

