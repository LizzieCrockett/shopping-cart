"use strict";

let cart = [];
//creates empty array for the cart
const cartDOM = document.querySelector(".cart");
//creates constant for the first instance of class="cart"
//(which is the cart div right at the bottom of the page)
const addToCartButtonsDOM = document.querySelectorAll(
  '[data-action="ADD_TO_CART"]'
);
//creates constant for all instances containing "ADD_TO_CART"

addToCartButtonsDOM.forEach(addToCartButtonDOM => {
  //iterates over the above buttons and performs the following function on each
  addToCartButtonDOM.addEventListener("click", () => {
    //sets the function to execute when the button is clicked
    const productDOM = addToCartButtonDOM.parentNode;
    //creates constant for the parent node of the add to cart button (ie the product)
    const product = {
      image: productDOM.querySelector(".product__image").getAttribute("src"),
      name: productDOM.querySelector(".product__name").innerText,
      price: productDOM.querySelector(".product__price").innerText,
      quantity: 1
      //creates object "product" with the following key/values
      //image, pulled from source attribute of first item with class "product__image"
      //name, pulled from text within class "product__name"
      //price, pulled from text withing class "product__price"
    }; // closes line 19

    const isInCart =
      cart.filter(cartItem => cartItem.name === product.name).length > 0;
    //creates a new array (filter method) from the initial (empty) array "cart"
    //picks up each item name in cart equal to product name and with length greater than 0
    if (!isInCart) {
      cartDOM.insertAdjacentHTML(
        "beforeend",
        //if these conditions don't apply, insert the following html
        //after the last child of the cart (at the bottom of the page, see line 7)
        `
        <div class="cart__item">
          <img class="cart__item__image" src="${product.image}" alt="${product.name}">
          <h3 class="cart__item__name">${product.name}</h3>
          <h3 class="cart__item__price">${product.price}</h3>
          <button class="btn btn--primary btn--small btn--danger" data-action="DECREASE_ITEM">&minus;</button>
          <h3 class="cart__item__quantity">${product.quantity}</h3>
          <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
          <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&times;</button>
        </div>
      `
      );
      //we are still within the scope of if (!isinCart)
      cart.push(product);
      addToCartButtonDOM.innerText = "In Cart";
      addToCartButtonDOM.disabled = true;
      //pushes product to cart array (since the condition is that it is not in the cart)
      //changes text in the "Add To Cart" button to "In Cart"
      //disables "add to cart" button

      const cartItemsDOM = cartDOM.querySelectorAll(".cart__item");
      //creates constant for all instances of "cart__item" in the cart div
      cartItemsDOM.forEach(cartItemDOM => {
        //iterates over the contents of the above constant and performs the following function
        if (
          cartItemDOM.querySelector(".cart__item__name").innerText ===
          product.name
        ) {
          // if "cart__item__name" text is identical to product name being pushed to cart (line 52)...
          cartItemDOM
            .querySelector('[data-action="INCREASE_ITEM"]')
            .addEventListener("click", () => {
              //..finds the first instance of "INCREASE_ITEM", and adds a function on click...
              cart.forEach(cartItem => {
                if (cartItem.name === product.name) {
                  //..iterates through the cart and determines if the cart item name is identical to a product name (line 65)...
                  cartItemDOM.querySelector(
                    ".cart__item__quantity"
                  ).innerText = ++cartItem.quantity;
                  //..finds the first instance of class "cart_item_quantity" and increases the number on the text it displays...
                  cartItemDOM
                    .querySelector('[data-action="DECREASE_ITEM"]')
                    .classList.remove("btn--danger");
                  //..and removes the red x button from the CSS classes associated with the item
                } //closes line 71
              }); //closes line 72
            }); //closes line 70

          //we are still within the scope of "if (!isinCart)" but outside the if statement on line 63

          cartItemDOM
            .querySelector('[data-action="DECREASE_ITEM"]')
            .addEventListener("click", () => {
              //finds the first instance of "DECREASE_ITEM" and adds a function on click
              cart.forEach(cartItem => {
                if (cartItem.name === product.name) {
                  //iterates through the cart and determines if item name is identical to product name (NB this is identical to line 69)
                  if (cartItem.quantity > 1) {
                    //if the quantity of the item in the cart is greater than 1
                    cartItemDOM.querySelector(
                      ".cart__item__quantity"
                    ).innerText = --cartItem.quantity;
                    //finds the first instance of "cart__item__quantity" and decreases the number on the text it displays (NB opposite action to line 71)
                  } else {
                    // if the quantity is 1 (or less), closing line 96
                    cartItemDOM.classList.add("cart__item--removed");
                    //add the class "cart__item--removed" to the CSS classes associated with the item
                    setTimeout(() => cartItemDOM.remove(), 250);
                    //sets a function to the action of removing an item from the cart, making it last 250ms (a quarter of a second)
                    cart = cart.filter(
                      //changes "cart" variable to a new array based on the following conditions...
                      cartItem => cartItem.name !== product.name
                    );
                    //..if the item name in cart is not identical to the product name...
                    addToCartButtonDOM.innerText = "Add To Cart";
                    addToCartButtonDOM.disabled = false;
                    //..change the text in the "add to cart" button to "Add to Cart" (reverts from "In Cart" line 53)
                    // re-enable the "add to cart" button
                  } // closes line 102
                  if (cartItem.quantity === 1) {
                    cartItemDOM
                      .querySelector('[data-action="DECREASE_ITEM"]')
                      .classList.add("btn--danger");
                  } // closes line 117
                  //if the quantity of the item in the cart is exactly 1
                  //select the first instance of "DECREASE_ITEM" and add "btn--danger" to its CSS class list
                } // closes line 94
              }); // closes "cart.forEach(cartItem =>" on line 93
            }); // closes "cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener("click", () =>" on line 91

          //we are still within the scope of if (!isinCart)

          cartItemDOM
            .querySelector('[data-action="REMOVE_ITEM"]')
            .addEventListener("click", () => {
              //searches for the first instance of "REMOVE_ITEM" and adds a function on click
              cart.forEach(cartItem => {
                //iterates through each item in the cart
                if (cartItem.name === product.name) {
                  //if cart item name is not identical to product name...
                  cartItemDOM.classList.add("cart__item--removed");
                  //add the class "cart__item--removed" to the CSS classes associated with the item
                  setTimeout(() => cartItemDOM.remove(), 250);
                  //sets a function to the action of removing an item from the cart, making it last 250ms (a quarter of a second)(NB identical to line 106)
                  cart = cart.filter(
                    //changes "cart" variable to a new array based on the following conditions... (NB identical to line 108)
                    cartItem => cartItem.name !== product.name
                  );
                  //..if the item name in cart is not identical to the product name...
                  addToCartButtonDOM.innerText = "Add To Cart";
                  addToCartButtonDOM.disabled = false;
                  //..change the text in the "add to cart" button to "Add to Cart" (reverts from "In Cart" line 53)
                  // re-enable the "add to cart" button
                } //closes line 137
              }); //closes line 134
            }); // closes line 133
        } // closes if statement on line 66
      }); //closes cartItemsDOM.forEach(cartItemDOM => on line 61
    } // closes "if (!isInCart)" on line 34
  }); //closes "addToCartButtonDOM.addEventListener("click", () =>" on line 15
}); // closes "addToCartButtonsDOM.forEach(addToCartButtonDOM => " on line 13
