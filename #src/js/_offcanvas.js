let offcanvasDropdownWindow = document.querySelector('.offcanvas__toggle-inner'),
  offcanvasWindow = document.querySelector('.offcanvas'),
  offcanvasButton = document.querySelector('.user-nav__burger-button')

function toggleOffcanvasDropdown() {
  offcanvasDropdownWindow.classList.toggle('offcanvas__toggle-inner--opened');
}

function toggleOffcanvas() {
  offcanvasWindow.classList.toggle('offcanvas--opened');
  document.body.classList.toggle('lock');
}

offcanvasButton.addEventListener('click', function(elem) {
  elem.stopPropagation();
  toggleOffcanvas();
});

document.addEventListener('click', function (elem) {
  const target = elem.target
  if (target.classList.contains('offcanvas')) {
    toggleOffcanvas();
  }
})

// document.addEventListener('click', function(elem) {
//   const target = elem.target;
//   const its_menu = target == offcanvasWindow || offcanvasWindow.contains(target);
//   const its_button = target == offcanvasButton;
//   const menu_is_active = offcanvasWindow.classList.contains('open');
//
//   if (!its_menu && !its_button && menu_is_active) {
//     toggleOffcanvas();
//   }
// });
