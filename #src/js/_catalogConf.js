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

Vue.createApp({
  data() {
    return {
      data: catalogData
    }
  },
  methods: {
    addToFavorite: function(item) {
      let output = this._getItemData(item);
      output.type = 'favorite';

      if (localStorage.getItem(output.type + '-' + item.id)) {
        localStorage.removeItem(output.type + '-' + item.id)
      } else {
        localStorage.setItem(output.type + '-' + item.id , JSON.stringify(output));
      }
    },
    addToCart: function(item) {
      let output = this._getItemData(item);
      output.type = 'cart';

      localStorage.setItem(output.type + '-' + item.id + Math.random(), JSON.stringify(output));
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
    }
  }
}).mount('#app')
