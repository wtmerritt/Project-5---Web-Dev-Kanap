// Read thru all Cart Items in local storage and the Add items to Cart Page
const cartData = localStorage.getItem("cart");
// console.log("cart Items: " + cartData);
const cart = JSON.parse(cartData);
// console.log("cart Data: " + cart);

let productID = "";
let productColor = "";
let productName = "";
let price = "";
let quantity = "";
let subTotal = 0;
let totalPrice = 0;
let count = 0;

// Loop thru local storage
cart.forEach((cartData) => {
  // console.log(cartData);
  productID = cartData.id;
  const productUrl = `http://localhost:3000/api/products/${productID}`;

  // Fetch Product Info from API
  fetch(productUrl)
    .then((data) => {
      return data.json();
    })
    .then((product) => {
      const articleElement = document.createElement("article");
      articleElement.classList.add("cart__item");
      articleElement.innerHTML = `<div class="cart__item__img">      
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${cartData.color}</p>
                    <p>€${product.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantity : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cartData.quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>`;

      price = parseFloat(product.price);
      // console.log("Price = ", price);
      quantity = parseInt(cartData.quantity);
      // console.log("Quantity = ", quantity);
      subTotal = parseFloat(price * quantity);
      totalPrice = subTotal + totalPrice;
      // console.log("Sub Total = ", subTotal);
      // console.log("Total Price = ", totalPrice);
      count += 1;

      document.getElementById("cart__items").appendChild(articleElement);

      // Display Total Price
      const cartPrice = document.querySelector(".cart__price");
      cartPrice.innerHTML = `
        <article>
          <p>Total (${count} articles): €${totalPrice}</p>
        </article>
          `;
      document.getElementById("cart__items").appendChild(cartPrice);
    });
});
