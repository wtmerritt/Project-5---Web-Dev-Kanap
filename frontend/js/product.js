// console.log("Window Location:", window.location);

const myProdId = window.location.search;
const urlParam = new URLSearchParams(myProdId);
const prodId = urlParam.get("id");
const productUrl = `http://localhost:3000/api/products/${prodId}`;

let colorSelected = "";
let colorChoices = "";
let productName = "";
let productQuantity = "";
let prodQuantity = "";
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
    opt.value = i;
    opt.text = colorOptions[i];
    // console.log("opt.value: " + opt.value);
    // console.log("opt.text: " + opt.text);
    colorChoices.add(opt, null);
  }

  // Get Color Selection
  colorChoices.addEventListener("change", function () {
    console.log("color selected value: " + colorChoices.value);
    var i = Number(colorChoices.value) + 1;
    console.log("i: " + i);
    colorSelected = colorChoices[i].text;
    console.log("color selected text: " + colorSelected);
  });
  // console.log("After loop for color selected text: " + colorSelected);

  productQuantity = document.getElementById("quantity");
  // console.log("Quantity: " + productQuantity);

  // Get Quantity Amount 
  productQuantity.addEventListener("change", function () {    
    prodQuantity = productQuantity.value;
    console.log("quantity: " + prodQuantity);    
  });
  // console.log("quantity: " + prodQuantity);
}

// Clicked Add to cart button ...
const cartAddItem = document.getElementById("addToCart");
// cartAddItem.addEventListener(
//   "click",
//   addItemToCart(prodId, productName, "blue")
// );

cartAddItem.addEventListener(
  "click",
  addItemToCart(prodId, prodQuantity, colorSelected)
);

/**
 * Clicked to Add to cart button
 *
 * @param {text} id - Product Id
 * @param {number} quantity - Product Quantity
 * @param {text} colorChoice - Product Color
 */
function addItemToCart(id, quantity, colorChoice) {
  // alert("Hello -> Add Cart Item ...");
  console.log("id: " + id);
  console.log("quantity: " + quantity);
  console.log("color: " + colorChoice);

  let myCartObj = {
    id: prodId,
    quantity: quantity,
    color: colorChoice,
  };

  let myCartObj_serialized = JSON.stringify(myCartObj);
  // console.log(myCartObj_serialized);

  localStorage.setItem("myCartObj", myCartObj_serialized);
  // console.log(localStorage);
  let myCartObj_deserialized = JSON.parse(localStorage.getItem("myCartObj"));

  // console.log(myCartObj_deserialized);
}
