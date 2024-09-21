// Read thru all Cart Items in local storage and the Add items to Cart Page
const cartData = localStorage.getItem("cart");
// console.log("cart Items: " + cartData);
const cart = JSON.parse(cartData);
// console.log("cart Data: " + cart);

let productID = "";
let productColor = "";
let productName = "";
let price = 0;
let quantity = 0;
let quantitySubTotal = 0;
let totalQuantity = 0;
let priceSubTotal = 0;
let totalPrice = 0;
let count = 0;
const productCache = [];

// Loop thru local storage
cart.forEach((cartData) => {
  // console.log(cartData);
  productID = cartData.id;
  // console.log("cartData ID = ", cartData.id);
  const productUrl = `http://localhost:3000/api/products/${productID}`;

  // Fetch Product Info from API
  fetch(productUrl)
    .then((data) => {
      return data.json();
    })
    .then((product) => {
      // TODO push product into cache if it not there Use Find method ...
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

      // console.log("cartData ID = ", product._id);

      price = parseInt(product.price);
      // console.log("Price = ", price);
      quantity = parseInt(cartData.quantity);
      quantitySubTotal = quantity;

      priceSubTotal = price * quantitySubTotal;
      // totalPrice = priceSubTotal;
      // count += 1;

      // Call Function to Calculate Total Price
      calculateTotals(priceSubTotal, quantitySubTotal);

      // Call Function to Display Total Price
      // displayTotals(totalPrice);

      document.getElementById("cart__items").appendChild(articleElement);

      // Assign Delete Item variable
      const deleteCartItem = articleElement.querySelector(".deleteItem");
      //  console.log("Delete Color is ", deleteCartItem);


      // Trigger Delete Product Item Listener Function
      deleteCartItem.addEventListener("click", function (event) {
        let oldSubTotal = priceSubTotal;

        // Call Remove Item From Cart function
        const delPriceItem = price * changeQuantity.value;
        // console.log("Deleted Sub Total", delPriceItem);
        
        const color = articleElement.dataset.color;
        console.log("Delete Color is ", color);
       
        // removeItemFromCart(product._id);
        removeItemFromCart(product._id, color);
        event.target.closest("article").remove();

        // Get Fresh Data from LocalStorage
        const cartData = localStorage.getItem("cart");
        const cart = JSON.parse(cartData);

        priceSubTotal = totalPrice - delPriceItem;
        quantitySubTotal -= changeQuantity.value;
        
        // count -= changeQuantity.value;
        // totalPrice = priceSubTotal;

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
        // console.log("Article Element = ", articleElement);

        const id = String(articleElement.dataset.id);
        const color = articleElement.dataset.color;
        // console.log("Changing quantity", id, color);

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        itemFound = cart.find(
          (cartItem) => cartItem.id === id && cartItem.color === color
        );

        // console.log("Item found = ", itemFound);

        if (itemFound != 0) {
          oldQuantity = itemFound.quantity;
          // console.log("old Quantity", oldQuantity);
        }

        const currentQuantity = parseInt($event.target.value);
        // console.log("Current Quantity = ", currentQuantity);

        itemFound.quantity = currentQuantity;
        // console.log("Update quantity = ", itemFound.quantity);

        let currentTotalQuantity = totalQuantity;
        let currentTotalPrice = totalPrice;

        console.log("Current Total Quantity = ", currentTotalQuantity);
        console.log("Current Total Price = ", currentTotalPrice);

        const changeInQuantity = currentQuantity - oldQuantity;
        // console.log("change In Quantity = ", changeInQuantity);

        price = parseInt(product.price);
        // console.log("Price = ", price);

        const newTotalQuantity = currentTotalQuantity + changeInQuantity;
        console.log(" New Total Quantity = ", newTotalQuantity);

        const newTotalPrice = currentTotalPrice + changeInQuantity * price;
        console.log(" New Total Price = ", newTotalPrice);

        // localStorage.setItem("cart", cart);
        // console.log("Cart Before ", cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        // console.log("Cart After ", cart);

        displayTotals(newTotalPrice, newTotalQuantity);
      });
    });

  // Remove Product from Cart
  function removeItemFromCart(cartId, cartColor) {
    const cartData = localStorage.getItem("cart");
    console.log("Cart Data Before Deletion = ", cartData);
    const cart = JSON.parse(cartData);

    console.log("Cart info = ", cartId, " ", cartColor);

    // let temp = cart.filter((item) => item.id != cartId);
    let temp = cart.filter((item) => item.id != cartId || item.color != cartColor);
    console.log("temp = ", temp);
    localStorage.setItem("cart", JSON.stringify(temp));
    // window.location.reload(true);
  }

  // Calculate Total Price
  function calculateTotals(priceSubTotal, quantitySubTotal) {
    // console.log("Total Quantity Before Calc= ", totalQuantity);
    // console.log("Total Price Before Calc = ", totalPrice);

    totalPrice += priceSubTotal;
    totalQuantity += quantitySubTotal;

    // console.log("Total Quantity After Calc= ", totalQuantity);
    // console.log("Total Price After Calc = ", totalPrice);

    displayTotals(totalPrice, totalQuantity);
  }

  // Display Total Price
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

    console.log("Error msg = ", errorMsg);

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
          console.log("data is ", data);

          // TODO Clear out the cart
          // Call the Confirmation Page
          //TODO Add confirmation order from (data.orderID)
          // window.location.href = "./confirmation.html";
        });

      // TODO Clear out the cart
      // Call the Confirmation Page
      // window.location.href = "http://127.0.0.1:5500/frontend/html/confirmation.html";
    }
  });

  // Validate User Input Fields
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
});
