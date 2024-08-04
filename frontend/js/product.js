// console.log("Window Location:", window.location);

const myProdId = window.location.search;
const urlParam = new URLSearchParams(myProdId);
const prodId = urlParam.get("id");
const productUrl = `http://localhost:3000/api/products/${prodId}`;

fetch(productUrl)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    console.log("Product Page");
    // console.log(products);
    insertProduct(product);
  });

/**
 * Insert Product Details
 *
 * @param {Object} product - product details
 */
function insertProduct(product) {
  console.log(product);

  // Assign variables
  const imageElement = document.querySelector(".item__img");
  imageElement.innerHTML = `
  <img src="${product.imageUrl}" alt="${product.altTxt}">
  `;

  const titleElement = document.getElementById("title");
  titleElement.innerText = product.name;

  const priceElement = document.getElementById("price");
  priceElement.innerText = product.price;

  const descrElement = document.getElementById("description");
  descrElement.innerText = product.description;

  const choice = document.getElementById("colors");
  const options = product.colors;

  for (let i = 0; i < options.length; i++) {    
    const opt = document.createElement("option");
    opt.value = i;
    opt.text = options[i];
    // console.log("opt.value: " + opt.value);
    // console.log("opt.text: " + opt.text);      
    choice.add(opt, null);   
  }
}
