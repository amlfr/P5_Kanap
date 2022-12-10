/*Variables used to get the orderID from the parameters of the url and targeting the html element of the page */
const urlStr = window.location.href;
const url = new URL(urlStr);
const orderIdParam = url.searchParams.get("order-id");
const orderIdText = document.getElementById("orderId");

/*Modifying the html element to show the order id*/
orderIdText.innerHTML = orderIdParam;