// console.log("Window Location:", window.location);

// const myProdId = window.location.search;
const urlParam = new URLSearchParams(location.search);
const productId = urlParam.get("id");
const productUrl = `http://localhost:3000/api/products/${productId}`;

let colorChoices = "";
let productName = "";
let colorOptions = "";

fetch(productUrl)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    // console.log("Product Page");
    // console.log(products);
    insertProduct(product);
  });

/**
 * Insert Product Details
 *
 * @param {Object} product - product details
 */
function insertProduct(product) {
  // console.log(product);

  // Assign variables
  const imageElement = document.querySelector(".item__img");
  imageElement.innerHTML = `
  <img src="${product.imageUrl}" alt="${product.altTxt}">
  `;

  const titleElement = document.getElementById("title");
  titleElement.innerText = product.name;
  productName = product.name;
  // console.log(productName);

  const priceElement = document.getElementById("price");
  priceElement.innerText = product.price;

  const descrElement = document.getElementById("description");
  descrElement.innerText = product.description;

  colorChoices = document.getElementById("colors");
  // console.log("color Choices: " + colorChoices);

  colorOptions = product.colors;
  // console.log("color Options: " + colorOptions);

  for (let i = 0; i < colorOptions.length; i++) {
    const opt = document.createElement("option");
    opt.value = colorOptions[i];
    opt.text = colorOptions[i];
    // console.log("opt.value: " + opt.value);
    // console.log("opt.text: " + opt.text);
    colorChoices.add(opt, null);
  }
}

// When clicked add to cart button ...
const cartAddItem = document.getElementById("addToCart");
cartAddItem.addEventListener("click", addItemToCart);

/**
 * Clicked to Add to cart button
 */
function addItemToCart() {
  let cartArray = [];

  const quantity = document.getElementById("quantity").value;
  const color = document.getElementById("colors").value;
  // console.log("id: " + productId);
  // console.log("quantity: " + quantity);
  // console.log("color: " + color);

  const myCartObj = {
    id: productId,
    quantity: quantity,
    color: color,
  };

  // Assign Cart Object
  let cartJson = JSON.stringify(myCartObj);

  // Check for Empty Local Storage
  if (localStorage.length === 0) {
    for (key in myCartObj) {
      let entry = [];
      entry.push(key);
      entry.push(myCartObj[key]);
      cartArray.push(entry);
    }
    console.log("Cart Array: " + cartArray);

    // localStorage.setItem("cart", cartArray);
    localStorage.setItem("cart", JSON.stringify(cartArray));
    // localStorage.setItem("cart", cartJson);
    console.log(localStorage);
    alert("Empty Local Storage -- New item added to cart!");
  } else {
    // Assign Cart Object
    let cartJson = JSON.stringify(myCartObj);

    for (key in myCartObj) {
      let entry = [];
      entry.push(key);
      entry.push(myCartObj[key]);
      cartArray.push(entry);
    }

    // Appending New Data to Old Data
    let oldCartData = localStorage.getItem("cart");
    // console.log("Cart array: " + cartArray);
    // let oldCartData = JSON.parse(localStorage.getItem("cart"));

    // Call Function to Append item
    appendToStorage("cart", oldCartData + JSON.stringify(cartArray));

    // console.log("local storage: " + localStorage.length);
    // // for (let i = 0; i < localStorage.length; i++) {
    // //   const key = localStorage.key(i);
    // //   console.log("Cart Items: " + `${key}: ${localStorage.getItem(key)}`);

    // //   let myCartObj_deserialized = JSON.parse(localStorage.getItem("cart"));
    // //   console.log(myCartObj_deserialized);
    // //   console.log("productID: " + myCartObj_deserialized.id);
    // //   console.log("productID: " + myCartObj_deserialized.color);

    //   // Checking for match in localStorage
    //   if (
    //     productId === myCartObj_deserialized.id &&
    //     color === myCartObj_deserialized.color
    //   ) {
    //     console.log("Match Found Update Item in Local Storage ...");
    //   }
    // }
  }

  /**
   * No match found Append to localStorage
   *
   * @param {*} cartData - new cart data
   * @param {*} localStorageData - localStorage data
   */
  function appendToStorage(cartData, localStorageData) {
    // var currentData = localStorage.getItem(cartData);
    // if (currentData === null) currentData = "";
    localStorage.setItem(cartData, localStorageData);
    alert("Existing Local Storage -- New item added to cart!");
  }
}
