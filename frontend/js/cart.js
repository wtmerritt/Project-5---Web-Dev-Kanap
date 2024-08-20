// TODO - Read thru cart items and to add  cards to this page.
const cartData = localStorage.getItem("cart");
// console.log("cart Items: " + cartData);
const cart = JSON.parse(cartData);
// console.log("cart Data: " + cart);

let productID = "";
let productColor = "";
let productName = "";
let price = "";
let quantity = ";"

cart.forEach((cartData) => {
  productID = cartData.id;
  // productColor = cartData.color;
  // quantity = cartData.quantity;
  // console.log("Color: ", productColor);

  //   console.log("Prod ID: ", productId);
  //   console.log("Product ID: ", cartData.id);
  //   console.log("Quantity: ", cartData.quantity);
  //   console.log("Color: ", cartData.color);
  const productUrl = `http://localhost:3000/api/products/${productID}`;
  // console.log("productUrl ", productUrl);

  // let colorChoices = "";
  // let productName = "";
  // let colorOptions = "";

  fetch(productUrl)
    .then((data) => {
      return data.json();
    })
    .then((product) => {
      productColor = cartData.color;
      productName = product.name;
      price = product.price;
      quantity = cartData.quantity;
      // console.log("productName: ", productName);

      //  console.log("Cart Product: ", productColor);
      // const cartElement = document.createElement("p");
      const cartElement = document.createElement("div");
      // div.id = "div_id";
      cartElement.className = "cart__item__content__description";
      cartElement.style.marginLeft = "650px";
      // div.style = "background-color: red;";
      // div.style.width = "100px";
      // div.style.height = "100px";

      // cartElement.innerText = productColor;
      // console.log("Cart Color: ", cartElement.innerText);

      // cartElement.innerText = productName;
      // console.log("Cart Product: ", cartElement.innerText);

       cartElement.innerHTML = `
        <article>          
          <h2>${productName}</h2>
          <p>${productColor}</p>
          <p>€${price}</p>
          <p>Quantity: ${quantity}</p>
        </article>
          `;

      // const div = document.createElement("div");

      // div.id = "div_id";
      // div.className = "div_class";
      // div.style = "background-color: red;";
      // div.style.width = "100px";
      // div.style.height = "100px";
      // document.body.appendChild(div);

      // Create New Product Card from DOM element to insert on the Home Page
      // const productElement = document.createElement("a");

      //  productElement.innerHTML = `
      //   <article>
      //     <img src="${product.imageUrl}" alt="${product.altTxt}">
      //     <h3>${product.name}</h3>
      //     <p>${product.description}</p>
      //   </article>
      //     `;

      // Append child Products to Cart Page
      // document.body.appendChild(cartElement);
      document.getElementById("cart__items").appendChild(cartElement);

      // console.log("Color: ", product.color);
      // insertCart(product, productColor);
      // insertCart(product, productID, productColor);
    });

  /**
   * Insert Product Details
   *
   * @param {Object} product - product details
   */
  function insertCart(product, productColor) {
    // console.log("Cart Product: ", productColor);
    // const colorElement = document.createElement("p");
    // colorElement.innerText = productColor;

    // const titleElement = document.getElementById("title");
    // titleElement.innerText = product;
    // productName = product.name;
    // const priceElement = document.getElementById("price");
    // priceElement.innerText = product.price;

    // const descrElement = document.getElementById("description");
    // descrElement.innerText = product.description;

    // Assign variables
    // const imageElement = document.querySelector(".cart__item__img");
    // imageElement.innerHTML = `
    // <img src="${product.imageUrl}" alt="${product.altTxt}">
    // `;

    // const titleElement = document.getElementById("title");
    // titleElement.innerText = product.name;
    // productName = product.name;
    // const priceElement = document.getElementById("price");
    // priceElement.innerText = product.price;

    //  <h2>Name of the product</h2>
    //                 <p>Green</p>
    //                 <p>€42.00</p>

    // const descrElement = document.querySelector(
    //   ".cart__item__content__description"
    // );
    // descrElement.innerText = product.description;

    // colorChoices = document.getElementById("colors");
    // colorOptions = product.colors;

    // for (let i = 0; i < colorOptions.length; i++) {
    //   const opt = document.createElement("option");
    //   opt.value = colorOptions[i];
    //   opt.text = colorOptions[i];
    //   colorChoices.add(opt, null);
    // }

    // <section id="cart__items">
    // <article
    //   class="cart__item"
    //   data-id="{productID}"
    //   data-color="{productColor}"
    // ></article>;
    // </section id="cart__items">

    // // Append child Products to Cart Page
    // document.getElementById("cart__items").appendChild(colorElement);
  }

  // TODO - for each cart item ProdId - get Product info from backend (i.e. includes price) (Get Product Info if it was not cached then ).
  const productCache = [];
  // TODO Insert cart item card in the page.
  // TODO Update totals.
});
