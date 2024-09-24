// Read thru all Cart Items in local storage and the Add items to Cart Page
const cartData = localStorage.getItem("cart");
// console.log("cart Items: " + cartData);
const cart = JSON.parse(cartData);
// console.log("cart Data: " + cart);

let productID = "";
// let productColor = "";
// let productName = "";
let price = 0;
let quantity = 0;
let quantitySubTotal = 0;
let totalQuantity = 0;
let priceSubTotal = 0;
let totalPrice = 0;

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
      const articleElement = document.createElement("article");

      articleElement.classList.add("cart__item");
      articleElement.dataset.id = product._id;
      articleElement.dataset.color = cartData.color;
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
      
      price = parseInt(product.price);      
      quantity = parseInt(cartData.quantity);
      quantitySubTotal = quantity;

      priceSubTotal = price * quantitySubTotal;      

      // Call Function to Calculate Total Price
      calculateTotals(priceSubTotal, quantitySubTotal);      

      document.getElementById("cart__items").appendChild(articleElement);

      // Assign Delete Item variable
      const deleteCartItem = articleElement.querySelector(".deleteItem");      

      // Trigger Delete Product Item Listener Function
      deleteCartItem.addEventListener("click", function (event) {
        let oldSubTotal = priceSubTotal;

        // Call Remove Item From Cart function
        const delPriceItem = price * changeQuantity.value;      
        const color = articleElement.dataset.color;

        // removeItemFromCart(product._id);
        removeItemFromCart(product._id, color);
        event.target.closest("article").remove();

        // Get Fresh Data from LocalStorage
        const cartData = localStorage.getItem("cart");
        const cart = JSON.parse(cartData);

        priceSubTotal = totalPrice - delPriceItem;
        quantitySubTotal -= changeQuantity.value;

        // Call Function to Calculate Total Price
        calculateTotals(priceSubTotal, quantitySubTotal);

        // Call Function to Display Total Price
        displayTotals(totalPrice);
        window.location.reload(true);
      });

      // Assign Change Quantity variable
      const changeQuantity = articleElement.querySelector(".itemQuantity");
      cartData = localStorage.getItem("cart");

      // Trigger Change Quantity Function
      changeQuantity.addEventListener("change", function ($event) {
        let oldQuantity = 0;
        let itemFound = 0;
        const articleElement = $event.target.closest("article");        

        const id = String(articleElement.dataset.id);
        const color = articleElement.dataset.color;        

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        itemFound = cart.find(
          (cartItem) => cartItem.id === id && cartItem.color === color
        );       

        if (itemFound != 0) {
          oldQuantity = itemFound.quantity;          
        }

        const currentQuantity = parseInt($event.target.value);        

        itemFound.quantity = currentQuantity;        

        let currentTotalQuantity = totalQuantity;
        let currentTotalPrice = totalPrice;
        
        const changeInQuantity = currentQuantity - oldQuantity;

        price = parseInt(product.price);
        const newTotalQuantity = currentTotalQuantity + changeInQuantity;
        
        const newTotalPrice = currentTotalPrice + changeInQuantity * price;
        
        localStorage.setItem("cart", JSON.stringify(cart));        

        displayTotals(newTotalPrice, newTotalQuantity);
      });
    });

  /**
   * Remove Product from Cart
   *
   * @param {string} cartId Product Cart Id
   * @param {string} cartColor Product Cart Color
   */
  function removeItemFromCart(cartId, cartColor) {
    const cartData = localStorage.getItem("cart");
    const cart = JSON.parse(cartData);

    let temp = cart.filter(
      (item) => item.id != cartId || item.color != cartColor
    );
    localStorage.setItem("cart", JSON.stringify(temp));
    // window.location.reload(true);
  }

  /**
   * Calculate Total Price
   *
   * @param {number} priceSubTotal Cart Price SubTotal
   * @param {number} quantitySubTotal Cart Quantity SubTotal
   */
  function calculateTotals(priceSubTotal, quantitySubTotal) {
    totalPrice += priceSubTotal;
    totalQuantity += quantitySubTotal;

    displayTotals(totalPrice, totalQuantity);
  }

  /**
   * Display Total Price
   *
   * @param {number} totalPrice Cart Total Price
   * @param {number} totalQuantity Cart Total Articles
   */
  function displayTotals(totalPrice, totalQuantity) {
    const cartPrice = document.querySelector(".cart__price");
    cartPrice.innerHTML = `        
          <p>Total (<span id="totalQuantity">${totalQuantity}</span> articles): €<span id="totalPrice">${totalPrice}</span></p>       
          `;
  }

  // Assign Submit Button variable
  const orderItem = document.querySelector(".cart__order__form__submit");
  let errorMsg = "";

  // Trigger Order Listener Function
  orderItem.addEventListener("click", function (event) {
    const validateFirstName = document.getElementById("firstName").value;
    const validateLastName = document.getElementById("lastName").value;
    const validateAddress = document.getElementById("address").value;
    const validateCity = document.getElementById("city").value;
    const validateEmail = document.getElementById("email").value;

    event.preventDefault();
    validateOrder(
      validateFirstName,
      validateLastName,
      validateAddress,
      validateCity,
      validateEmail
    );   

    // If No Errors with User Input Fields call Fetch Post command
    if (errorMsg === "") {
      console.log("Processed order ...");

      //FIXME Convert cart array to Product array of Products using array.map method
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify({
          contact: {
            firstName: validateFirstName,
            lastName: validateLastName,
            address: validateAddress,
            city: validateCity,
            email: validateEmail,
          },

          products: [productID],
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // Clear Product Cart
          clearCart(cart);

          // Save Order ID to local storage
          localStorage.setItem("orderNum", data.orderId);

          // Call Confirmation Page and display Order Number
          window.location.assign("./confirmation.html");
        });
    }
  });

  // Validate User Input Fields
  /**
   *
   * @param {*} validateFirstName
   * @param {*} validateLastName
   * @param {*} validateAddress
   * @param {*} validateCity
   * @param {*} validateEmail
   */
  function validateOrder(
    validateFirstName,
    validateLastName,
    validateAddress,
    validateCity,
    validateEmail
  ) {
    // Regex Expressions
    const regUser = /^[A-Za-z- .]{2,25}$/;
    const regAddress = /^[A-Za-z0-9- .]{2,50}$/;
    const regCity = /^[A-Za-z- .]{2,50}$/;
    const regEmail = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/;

    const fName = document.getElementById("firstNameErrorMsg");
    if (regUser.test(validateFirstName)) {
      fName.innerHTML = `        
          <p></p>       
          `;

      errorMsg = "";
    } else {
      errorMsg = "First Name is invalid";
      fName.innerHTML = `        
          <p>${errorMsg}</p>       
          `;
    }

    const lName = document.getElementById("lastNameErrorMsg");
    if (regUser.test(validateLastName)) {
      lName.innerHTML = `        
          <p></p>       
          `;

      errorMsg += "";
    } else {
      errorMsg = "Last Name is invalid";
      lName.innerHTML = `        
          <p>${errorMsg}</p>       
          `;
    }

    const addrMsg = document.getElementById("addressErrorMsg");
    if (regAddress.test(validateAddress)) {
      addrMsg.innerHTML = `        
          <p></p>       
          `;

      errorMsg += "";
    } else {
      errorMsg = "Address is invalid";
      addrMsg.innerHTML = `        
          <p>${errorMsg}</p>       
          `;
    }

    const cityMsg = document.getElementById("cityErrorMsg");
    if (regCity.test(validateCity)) {
      cityMsg.innerHTML = `        
          <p></p>       
          `;

      errorMsg += "";
    } else {
      errorMsg = "City is invalid";
      cityMsg.innerHTML = `        
          <p>${errorMsg}</p>       
          `;
    }

    const emailMsg = document.getElementById("emailErrorMsg");
    if (regEmail.test(validateEmail)) {
      emailMsg.innerHTML = `        
          <p></p>       
          `;

      errorMsg += "";
    } else {
      errorMsg = "Email is invalid";
      emailMsg.innerHTML = `        
          <p>${errorMsg}</p>       
          `;
    }
  }

  /**
   * Clear Items from Shopping Cart
   * 
   * @param {cart} cartItems Product Items in Cart
   */
  function clearCart(cartItems) {    
    cartItems = [];
    
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
});
