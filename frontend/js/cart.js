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
  productID = cartData.id;
  const productUrl = `http://localhost:3000/api/products/${productID}`;

  // Fetch Product Info from API
  fetch(productUrl)
    .then((data) => {
      return data.json();
    })
    .then((product) => {
      productColor = cartData.color;
      productName = product.name;
      price = parseFloat(product.price);
      // console.log("Price = ", price);
      quantity = parseInt(cartData.quantity);
      // console.log("Quantity = ", quantity);
      subTotal = parseInt(price * quantity);
      totalPrice = subTotal + totalPrice;
      console.log("Sub Total = ", subTotal);
      console.log("Total Price = ", totalPrice);
      count += 1;

      // Display Image
      const cartImage = document.createElement("div");
      cartImage.className = "cart__item__img";

      cartImage.innerHTML = `
        <article>          
          <img src="${product.imageUrl}" alt="${product.altTxt}" width=\"200px\" height=\"200px\">
        </article>
          `;
      document.getElementById("cart__items").appendChild(cartImage);

      // Display Cart Info
      const cartElement = document.createElement("div");
      cartElement.className = "cart__item__content__description";
      cartElement.style.marginLeft = "650px";

      cartElement.innerHTML = `
        <article>  
          <h2>${productName}</h2>
          <p>${productColor}</p>
          <p>€${price}</p>
          <p>Quantity: ${quantity}</p>
        </article>
          `;

      document.getElementById("cart__items").appendChild(cartElement);

      // Display Delete Option
      const cartDelete = document.createElement("div");
      cartDelete.className = "cart__item__content__settings__delete";
      cartDelete.style.marginLeft = "650px";

      cartDelete.innerHTML = `
        <article>          
          <p>Delete</p>
        </article>
          `;
      document.getElementById("cart__items").appendChild(cartDelete);

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
