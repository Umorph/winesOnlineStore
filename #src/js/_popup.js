let popup = document.getElementById('popup');
let popupToggle = document.querySelector('.btnPopup');
let popupClose = document.querySelector('.close-popup');

popupToggle.onclick = function() {
    popup.classList.add('popup--opened');
    document.body.classList.add('lock');
};

popupClose.onclick = function() {
    popup.classList.remove('popup--opened');
    document.body.classList.remove('lock');
};

window.onclick = function(e) {
    if(e.target == popup) {
        popup.classList.remove('popup--opened');
        document.body.classList.remove('lock');
    }
}