/*Declaring variables for fetch function*/
const urlStr = window.location.href;
const url = new URL(urlStr);
const productId = url.searchParams.get("id");
const fetchUrl = "http://localhost:3000/api/products/" + productId;

/*Declaring variable for the fill function */

const imgParent = document.getElementsByClassName("item__img");
const headingElt = document.getElementById("title");
const priceElt = document.getElementById("price");
const descriptionElt = document.getElementById("description");
const colorDropDown = document.getElementById("colors")

/*Declaring variables for the cart storage function*/

const cartBtn = document.getElementById("addToCart");
const quantityElt = document.getElementById("quantity");

/** Function that fetches the products from the API
 */

const fetchProduct = async () => {
  let response = await fetch(fetchUrl);
  if (response.ok) { 
  product = await response.json();
  return product;
  } else {
    alert("HTTP-Error: " + response.status);
  };
};

const pageProduct = fetchProduct();

/**Function that generates/modifies the html elements with
 * the information we got back
 */

const fillPage = async () => {
  const infoProduct = await pageProduct;
  document.title = infoProduct.name + " - Kanap";
  imgParent[0].insertAdjacentHTML("afterbegin", `<img src="${infoProduct.imageUrl}" alt="Photographie d'un canapé">`);
  headingElt.innerHTML = infoProduct.name;
  priceElt.innerHTML = infoProduct.price;
  descriptionElt.innerHTML = infoProduct.description;
  for (let color of infoProduct.colors) {
    colorDropDown.insertAdjacentHTML("beforeend", `<option value="${color}">${color}</option>`);
  };
};

fillPage();

/** Add a listener event that saves the curent product to the local storage 
 * when the cart button is clicked
 */

cartBtn.addEventListener("click", () => {
  /*Checking if the quantity selected is positive and if the color is chosen*/
  if (1< quantityElt.value && quantityElt.value <101 && colorDropDown.value != "") {
    /*First case when the cart doesn't exist */
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify([[productId, colorDropDown.value, quantityElt.value]]));
    } else {
      const currentCart = JSON.parse(localStorage.getItem("cart"));
      const currentProduct = currentCart.find(product => product[0] === productId && product[1] === colorDropDown.value);
      /*Second case when the cart exists but the product isn't already in it */
      if (currentProduct === undefined) {
        currentCart.push([productId, colorDropDown.value, quantityElt.value]);
        localStorage.setItem("cart", JSON.stringify(currentCart));
      /*Last case when the cart exists and the product is in the cart already*/
      } else {
        currentProduct[2] = JSON.stringify(parseInt(currentProduct[2]) + parseInt(quantityElt.value));
        localStorage.setItem("cart", JSON.stringify(currentCart));
      };
    };
    alert("Le produit choisi a bien été ajouté à votre panier.")
  } else {
    alert("Veuillez sélectionner une couleur et renseigner une quantité comprise entre 1 et 100.")
  }
});