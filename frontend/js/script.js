
// Get Products from backend
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })
  .then((products) => {    
    insertProducts(products);    
  });

// Get Existing Items
const products = document.getElementById("items");

/**
 * This function inserts products
 *
 * @param {Object[]} products - list of products to display
 */
function insertProducts(products) {
  // Read each product in the array
  for (let i = 0; i < products.length; i++) {
    const product = products[i];    

    // Create New Product Card from DOM element to insert on the Home Page
    const productElement = document.createElement("a");
    productElement.setAttribute("href", `./product.html?id=${product._id}`);     

    // Insert current Product card in the new DOM element
    productElement.innerHTML = `
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3>${product.name}</h3>            
      <p>${product.description}</p>
    </article>
      `;

    // Append child Products to Home Page
    document.getElementById("items").appendChild(productElement);
  }
}
