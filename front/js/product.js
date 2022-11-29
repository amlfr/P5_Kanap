/*Declaring variables for first function*/
const urlStr = window.location.href;
const url = new URL(urlStr);
const productId = url.searchParams.get("id");
const fetchUrl = "http://localhost:3000/api/products";
const urlId = fetchUrl + "/" + productId;
const imgParent = document.getElementsByClassName("item__img");
const headingElt = document.getElementById("title");
const priceElt = document.getElementById("price");
const descriptionElt = document.getElementById("description");
const colorDropDown = document.getElementById("colors")

/*Declaring variables for second function*/

const cartBtn = document.getElementById("addToCart");
const quantityElt = document.getElementById("quantity");

/** The function fetches the products from the API
 */
const fetchProduct = async () => {
  let response = await fetch(urlId);
  if (response.ok) { 
  product = await response.json();
  return product;
  } else {
    alert("HTTP-Error: " + response.status);
  }
};

const pageProduct = fetchProduct();

/**Function that generates the html elements from
 * the information we got back
 */

const fillPage = async () => {
  const infoProduct = await pageProduct;

  document.title = infoProduct.name + " - Kanap";

  const newImage = document.createElement("img");
  imgParent[0].appendChild(newImage);
  newImage.setAttribute("src", infoProduct.imageUrl);
  newImage.setAttribute("alt", "Photographie d'un canapé");

  headingElt.innerHTML = infoProduct.name;

  priceElt.innerHTML = infoProduct.price;

  descriptionElt.innerHTML = infoProduct.description;

  for (let color of infoProduct.colors) {
    const newColor = document.createElement("option");
    colorDropDown.appendChild(newColor);
    newColor.setAttribute("value", color);
    newColor.innerHTML = color;
  }
};

fillPage();

/** The function saves the curent product to the local storage 
 * when the cart button is clicked
 */

cartBtn.addEventListener("click", () => {
  /*Checking if the quantity selected is positive */
  if (quantityElt.value > 0) {
    /*First case when the cart doesn't exist */
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify([[productId, colorDropDown.value, quantityElt.value]]));
    } else {
      const currentCart = JSON.parse(localStorage.getItem("cart"));
      const currentProduct = currentCart.find(product => product[0] === productId && product[1] === colorDropDown.value);
      console.log('currentProduct ', currentProduct);
      /*Second case when the cart exists but the product isn't already in it */
      if (currentProduct === undefined) {
        currentCart.push([productId, colorDropDown.value, quantityElt.value]);
        localStorage.setItem("cart", JSON.stringify(currentCart));
      /*Last case when the cart exists and the product is in*/
      } else {
        currentProduct[2] = JSON.stringify(parseInt(currentProduct[2]) + parseInt(quantityElt.value));
        localStorage.setItem("cart", JSON.stringify(currentCart));
      }
    }
  }
});
