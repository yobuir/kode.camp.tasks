// Product constructor
function Product(name, price) {
  // Private properties
  var _name = name;
  var _price = price;

  // Getter methods
  this.getName = function () {
    return _name;
  };

  this.getPrice = function () {
    return _price;
  };
}

// ShoppingCart constructor
function ShoppingCart() {
  // Private property
  var _items = [];

  // Method to add an item to the cart
  this.addItem = function (product) {
    _items.push(product);
  };

  // Method to remove an item from the cart
  this.removeItem = function (product) {
    var index = _items.indexOf(product);
    if (index !== -1) {
      _items.splice(index, 1);
    }
  };

  // Method to get the total price of items in the cart
  this.getTotal = function () {
    var total = 0;
    _items.forEach(function (item) {
      total += item.getPrice();
    });
    return total;
  };

  // Method to get cart items with their names and prices
  this.getCartItems = function () {
    var cartItems = [];
    _items.forEach(function (item) {
      cartItems.push({
        name: item.getName(),
        price: item.getPrice(),
      });
    });
    return cartItems;
  };
}
 
var product1 = new Product("tomato", 10);
var product2 = new Product("rice", 20);

var cart = new ShoppingCart();

cart.addItem(product1);
cart.addItem(product2);

console.log("Cart Items:", cart.getCartItems());
console.log("Total Price:", cart.getTotal());

cart.removeItem(product1);

console.log("Cart Items:", cart.getCartItems());
console.log("Total Price:", cart.getTotal());
