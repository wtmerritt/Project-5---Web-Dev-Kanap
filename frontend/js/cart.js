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
      count += 1;

      // Call Function to Calculate Total Price
      calculateTotalPrice(subTotal);

      document.getElementById("cart__items").appendChild(articleElement);

      // Assign Delete Item variable
      const deleteCartItem = document.querySelector(".deleteItem");      

      // Call Delete Product Item Listener
      deleteCartItem.addEventListener("click", function () {              
        console.log("cartData ID = ", cartData.id);          
        removeItemFromCart(cartData.id);

        let oldSubTotal = subTotal;
        // console.log("Old SubTotal = ", oldSubTotal);

        subTotal = parseFloat(price * changeQuantity.value) - oldSubTotal;
        // console.log("subTotal = ", subTotal);

        // Call Function to Calculate Total Price
        calculateTotalPrice(subTotal);
      });

      // Assign Change Quantity variable
      const changeQuantity = document.querySelector(".itemQuantity");    

      // Change Quantity Function
      changeQuantity.addEventListener("input", function () {
        let oldSubTotal = subTotal;
        // console.log("Old SubTotal = ", oldSubTotal);

        subTotal = parseFloat(price * changeQuantity.value) - oldSubTotal;
        // console.log("subTotal = ", subTotal);

        // Call Function to Calculate Total Price
        calculateTotalPrice(subTotal);
      });

      // Remove Product from Cart
      function removeItemFromCart(cartId) {
        let temp = cart.filter((item) => item.id != cartId);
        // console.log("temp = ", temp);
        localStorage.setItem("cart", JSON.stringify(temp));
      }

      function calculateTotalPrice(subTotal) {        
        totalPrice = subTotal + totalPrice;

        displayTotalPice(totalPrice);
      }

      // Display Total Price
      function displayTotalPice(totalPrice) {
        const cartPrice = document.querySelector(".cart__price");
        cartPrice.innerHTML = `
        <article>
          <p>Total (${count} articles): €${totalPrice}</p>
        </article>
          `;        
      }
    });
});
