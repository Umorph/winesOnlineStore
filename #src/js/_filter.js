let filterWindow = document.querySelector('.filter'),
  toggleButton = document.querySelector('.catalog-layout__filter-button'),
  modalClose = document.querySelector('.filter__close-button')

toggleButton.addEventListener('click', function() {
  filterWindow.classList.toggle('filter--opened');
});

modalClose.addEventListener('click', function() {
  filterWindow.classList.toggle('filter--opened');
});
