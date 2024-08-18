
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
    insertProduct(product);
  });

/**
 * Insert Product Details
 *
 * @param {Object} product - product details
 */
function insertProduct(product) {
  // Assign variables
  const imageElement = document.querySelector(".item__img");
  imageElement.innerHTML = `
  <img src="${product.imageUrl}" alt="${product.altTxt}">
  `;

  const titleElement = document.getElementById("title");
  titleElement.innerText = product.name;
  productName = product.name;  
  const priceElement = document.getElementById("price");
  priceElement.innerText = product.price;

  const descrElement = document.getElementById("description");
  descrElement.innerText = product.description;

  colorChoices = document.getElementById("colors");
  colorOptions = product.colors;
  
  for (let i = 0; i < colorOptions.length; i++) {
    const opt = document.createElement("option");
    opt.value = colorOptions[i];
    opt.text = colorOptions[i];  
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
  // Getting current cart and setting to cart variable
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");  
  const quantity = parseInt(document.getElementById("quantity").value); 
  const color = document.getElementById("colors").value;

  const cartItem = {
    id: productId,
    quantity,
    color,
  };

  // Check for Empty Local Storage
  if (cart.length === 0) {
    cart.push(cartItem);       
    alert("Empty Local Storage -- New item added to cart!");
  } else {    
    let cartJson = JSON.stringify(cartItem);
    // Check if cartItem exist with cart Color & ProductId match 
    const existing = cart.find(
      (cartItem) => cartItem.id === productId && cartItem.color === color
    );

    // If match found then increase quantity
    if (existing) {
      existing.quantity += quantity;
      alert("Match Found -- Increase cart quantity!");
    }
    // Insert cartItem
    else {
      cart.push(cartItem);
       alert("No Match Found -- New item added to cart!");
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart)); 
}
