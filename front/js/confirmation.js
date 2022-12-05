const orderIdText = document.getElementById("orderId");
const urlStr = window.location.href;
const url = new URL(urlStr);
const orderIdParam = url.searchParams.get("order-id");
console.log('orderIdParam ', orderIdParam);
orderIdText.innerHTML = orderIdParam;