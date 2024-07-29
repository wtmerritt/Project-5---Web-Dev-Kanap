// console.log("Window Location:", window.location);

const myProd_ID = window.location.search;
const urlParam = new URLSearchParams(myProd_ID);
const prod_ID = urlParam.get("id");
const prodWebSite = "http://localhost:3000/api/products/";
const url = `${prodWebSite}` + "?id=" + `${prod_ID.toString()}`;

// console.log("ID:", prod_ID);
// console.log("URL:", url);

fetch(url, {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
})
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    console.log("Product Page");
    // console.log(products);
    insertProduct(products);
  });

// Get Existing Item
const products = document.getElementById("item__content");

// Calling Function to insert product
function insertProduct(products) {
  // Assign variables
  const productElement = document.createElement("h1");
  const productElement2 = document.createElement("p");
  const productElement3 = document.createElement("p");

  for (let i = 0; i < products.length; i++) {
    const product_ID = products[i]._id;
    const price = products[i].price;
    const name = products[i].name;
    const descr = products[i].description;
    // console.log("Chosen Product = " + product_ID);

    if (prod_ID === product_ID) {
      console.log("Match found ...");
      console.log("Product ID:", product_ID);
      console.log("Name:", name);
      console.log("Price:", price);
      console.log("Description:", descr);
   
      // Insert current Product card in the new DOM element
      productElement.innerHTML = `
          <h1>${name}</h1>
          `;

      productElement2.innerHTML = `        
            <p>${price}</p>        
        `;

         productElement3.innerHTML = `        
            <p>${descr}</p>        
        `;    
    } 

    document.getElementById("title").appendChild(productElement);
    document.getElementById("price").appendChild(productElement2);
    document.getElementById("description").appendChild(productElement3);

  }
}
