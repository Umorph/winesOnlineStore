let modalWindow = document.querySelector('.manufacturer-modal'),
  modalCloseButton = document.querySelector('.manufacturer-modal__close-button');

openModal = function() {
  document.body.classList.add('lock');
  modalWindow.classList.add('manufacturer-modal--opened');
}

modalCloseButton.addEventListener('click', function() {
  document.body.classList.remove('lock');
  modalWindow.classList.remove('manufacturer-modal--opened');
})
