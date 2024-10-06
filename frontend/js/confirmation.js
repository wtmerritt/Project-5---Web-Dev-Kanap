
// Get Order Id using URL Parameter Search
const urlParameter = new URLSearchParams(window.location.search);
const orderIdNum = urlParameter.get('orderId');
const orderItem = document.getElementById("orderId");
orderItem.innerText = orderIdNum;
