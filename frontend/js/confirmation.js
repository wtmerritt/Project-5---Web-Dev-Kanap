
// Get Order ID from local storage
const orderIdNum = localStorage.getItem("orderNum");

const orderItem = document.querySelector(".confirmation");
orderItem.innerHTML = `                  
          <p>Order confirmed! <br>Your order number is: <span id="orderId">${orderIdNum}</span></p>    
          `;
