cartBagde = document.querySelector('.user-nav__cart-counter');
favoriteBadge = document.querySelector('.user-nav__favorite-counter');

function parseLocalStorage() {
  let cartCouner = 0,
    favoriteCounter = 0;

  for (let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i),
      value = JSON.parse(localStorage.getItem(key))

    if (value.type === 'cart') {
      cartCouner++
    } else if (value.type === 'favorite') {
      favoriteCounter++
    }
  }

  cartBagde.innerText = cartCouner;
  favoriteBadge.innerText = favoriteCounter;
}

document.addEventListener('DOMContentLoaded', parseLocalStorage);

window.addEventListener('storage', function(e) {
  console.log('qwe');
})
