// TODO - Read thru cart items and to add  cards to this page.

// const urlParam = new URLSearchParams(location.search);
// const productId = urlParam.get("id");
const cartItems = localStorage.getItem("cart");
// console.log("cart Items: " + cartItems);
insertCart(cartItems);

function insertCart(cartItems) {
  console.log(cartItems);
}

// Assign variables
// const imageElement = document.querySelector(".cart__items");
// console.log("imageElement = " + imageElement);


// for (let i = 0; i < oldCartData.length; i++) {
//     console.log("Local Storage: " + oldCartData);
// //   const product = oldCartData[i];
// //   console.log(product);
//   const key = localStorage.key(i);
//   console.log(`${key}: ${localStorage.getItem(key)}`);
// //   imageElement.innerHTML = `
// //   <img src="${oldCartData.imageUrl}" alt="${oldCartData.altTxt}">
// //   `;
// }

//  <!-- <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//             <div class="cart__item__img">
//               <img src="../images/product01.jpg" alt="Photo of a sofa">
//             </div>
//             <div class="cart__item__content">
//               <div class="cart__item__content__description">
//                 <h2>Name of the product</h2>
//                 <p>Green</p>
//                 <p>€42.00</p>
//               </div>
//               <div class="cart__item__content__settings">
//                 <div class="cart__item__content__settings__quantity">
//                   <p>Quantity : </p>
//                   <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                 </div>
//                 <div class="cart__item__content__settings__delete">
//                   <p class="deleteItem">Delete</p>
//                 </div>
//               </div>
//             </div>
//           </article> -->

// TODO - for each cart item ProdId - get Product info from backend (i.e. includes price) (Get Product Info if it was not cached then ).
const productCache = [];
// TODO Insert cart item card in the page.
// TODO Update totals.
