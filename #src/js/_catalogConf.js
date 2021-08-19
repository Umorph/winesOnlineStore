catalogData = [
  {
    "id": "1",
    "name": "Крымское лето",
    "shortDescription": "Красное, полусладкое",
    "description": {
      "color": "Красное",
      "sugar": "Полусладкое",
      "region": "Крым",
      "sort": "Бастардо",
      "alcohol": "12%",
    },
    "price": "1200",
    "volume": "0.7",
    "img": "img/item-krim-summer.jpg"
  },
  {
    "id": "2",
    "name": "Ренессанс",
    "shortDescription": "Белое, полусладкое",
    "description": {
      "color": "Белое",
      "sugar": "Полусладкое",
      "region": "Крым",
      "sort": "Красные Сорта Винограда",
      "alcohol": "12%",
    },
    "price": "900",
    "volume": "0.72",
    "img": "img/item-renessans.jpg"
  },
  {
    "id": "3",
    "name": "Солярис",
    "shortDescription": "Белое, сухое",
    "description": {
      "color": "Белое",
      "sugar": "Сухое",
      "region": "Крым",
      "sort": "Каберне Совиньон, Каберне Фран, Красные Сорта Винограда",
      "alcohol": "12%",
    },
    "price": "1350",
    "volume": "0.65",
    "img": "img/item-solaris.jpg"
  },
  {
    "id": "4",
    "name": "Крымский сомелье",
    "shortDescription": "Красное, сухое",
    "description": {
      "color": "Красное",
      "sugar": "Сухое",
      "region": "Крым",
      "sort": "Красные Сорта Винограда",
      "alcohol": "12%",
    },
    "price": "1100",
    "volume": "0.6",
    "img": "img/item-krim-somelie.jpg"
  },
  {
    "id": "5",
    "name": "Южная столица",
    "shortDescription": "Игристое, полусладкое",
    "description": {
      "color": "Игристое",
      "sugar": "Полусладкое",
      "region": "Крым",
      "sort": "Красные Сорта Винограда",
      "alcohol": "12%",
    },
    "price": "680",
    "volume": "0.7",
    "img": "img/item-south-capital.jpg"
  }
]

let cartModal = document.querySelector('.cart-popup'),
  cartModalButton = document.querySelector('.cart-close-button'),
  favoriteAddModal = document.querySelector('.favorite-add-popup'),
  favoriteAddCloseButton = document.querySelector('.favorite-add-close-button'),
  favoriteRemoveModal = document.querySelector('.favorite-remove-popup'),
  favoriteRemoveCloseButton = document.querySelector('.favorite-remove-close-button');

function togglePopup (popup) {
  popup.classList.add('popup--opened');
  setTimeout(function() {
    popup.classList.remove('popup--opened');
  }, 4000);
}

cartModalButton.addEventListener('click', function() {
  cartModal.classList.remove('popup--opened');
});

favoriteAddCloseButton.addEventListener('click', function() {
  favoriteAddModal.classList.remove('popup--opened');
});

favoriteRemoveCloseButton.addEventListener('click', function() {
  favoriteRemoveModal.classList.remove('popup--opened');
});

const catalogApp = Vue.createApp({
  data() {
    return {
      data: catalogData,
      favoriteItems: [],
      cartItems: [],
      totalPrice: 0
    }
  },
  methods: {
    addToFavorite: function(item) {
      let output = this._getItemData(item);
      output.type = 'favorite';

      if (localStorage.getItem(output.type + '-' + item.id)) {
        localStorage.removeItem(output.type + '-' + item.id);
        togglePopup(favoriteRemoveModal);
        this.checkFavorites();
      } else {
        localStorage.setItem(output.type + '-' + item.id , JSON.stringify(output));
        togglePopup(favoriteAddModal);
        this.checkFavorites();
      }
    },
    addToCart: function(item) {
      let output = this._getItemData(item);
      output.type = 'cart';

      localStorage.setItem(output.type + '-' + item.id + Math.random(), JSON.stringify(output));
      togglePopup(cartModal);
    },
    _getItemData: function(item) {
      return {
        "id": item.id,
        "name": item.name,
        "shortDescription": item.shortDescription,
        "description": {
          "color": item.description.color,
          "sugar": item.description.sugar,
          "region": item.description.region,
          "sort": item.description.sort,
          "alcohol": item.description.alcohol,
        },
        "price": item.price,
        "volume": item.volume,
        "img": item.img
      }
    },
    checkFavorites: function () {
      for (let k=0; k<this.data.length; k++) {
        let itemId = this.data[k].id;
        this.data[k].inFavorite = false;

        for (let i=0; i<localStorage.length; i++) {
          let key = localStorage.key(i),
            value = JSON.parse(localStorage.getItem(key));

          if (value.id === itemId) {
            if (value.type === 'favorite') {
              this.data[k].inFavorite = true;
              break
            }
          }
        }
      }
    },
    getFavoriteData: function () {
      this.favoriteItems = [];
      for (let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i),
          value = JSON.parse(localStorage.getItem(key));

        if (value.type === 'favorite') {
          value.visible = true;
          this.favoriteItems.push(value);
        }
      }
    },
    removeFromFavorite: function (item) {
      item.visible = false;
      localStorage.removeItem('favorite-' + item.id);
    },
    returnToFavorite: function (item) {
      item.visible = true;
      localStorage.setItem('favorite-' + item.id, JSON.stringify(item));
    },
    getCartData: function () {
      this.cartItems = [];

      for (let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i),
          value = JSON.parse(localStorage.getItem(key));

        if (value.type === 'cart') {
          let itemExistInData = false
          value.count = 1

          for (let k=0; k < this.cartItems.length; k++) {
            if (this.cartItems[k].id === value.id) {
              this.cartItems[k].count++
              itemExistInData = true;
              this.countTotalPrice();
              break
            }
          }
          if (!itemExistInData) {
            this.cartItems.push(value);
            this.countTotalPrice();
          }
        }
      }
    },
    addMoreToCart: function (item) {
      item.count++
      localStorage.setItem(item.type + '-' + item.id + Math.random(), JSON.stringify(item));
      this.getCartData();
      this.countTotalPrice();
    },
    removeItemFromCart: function (item) {
      if (item.count > 1) {
        item.count--
        for (let i=0; i<localStorage.length; i++) {
          let key = localStorage.key(i),
            value = JSON.parse(localStorage.getItem(key));

          if (value.type === 'cart') {
            if (value.name === item.name) {
              localStorage.removeItem(key);
              this.getCartData();
              this.countTotalPrice();
              break
            }
          }
        }
      } else {
        console.log('Осталась одна позиция товара');
      }
    },
    countTotalPrice: function () {
      let counter = 0;

      for (let i=0; i<this.cartItems.length; i++) {
        counter += Number(this.cartItems[i].price * this.cartItems[i].count);
      }

      this.totalPrice = counter;
    }
  }
}).mount('#app');

document.addEventListener('DOMContentLoaded', catalogApp.checkFavorites);
document.addEventListener('DOMContentLoaded', catalogApp.getFavoriteData);
document.addEventListener('DOMContentLoaded', catalogApp.getCartData);
