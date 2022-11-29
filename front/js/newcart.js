
/* Variables to fetch the products and populate the page*/

const items = JSON.parse(localStorage.getItem("cart"));
console.log(items);
const parentElt = document.getElementById("cart__items");
const fetchUrl = "http://localhost:3000/api/products";


/*Variables for the total sum */

const quantitySum = document.getElementById("totalQuantity");
const currencySum = document.getElementById("totalPrice");

let arrayObject = undefined;

/**Function making one API call for every products infos
 * 
 */
const fetchProducts = async () => {
    /*Fetching the json products*/
    let response = await fetch(fetchUrl);
    if (response.ok) { 
    product = await response.json();
    console.log('product ', product);
    arrayObject = product;
    console.log('arrayObject ', arrayObject);
    return product;
    } else {
      /* alert("HTTP-Error: " + response.status);    TO DELETE*/
    }
};

let allProducts = fetchProducts();
console.log(allProducts);
console.log('allProducts.value ', allProducts.value);
console.log('arrayObject ', arrayObject);

/**Function populating the html of the page with every product by iterating over the array 
 * parsed from the localStorage
 */
const fillCart = async () => {
    for(let currentProduct of items) {
        console.log('currentProduct ', currentProduct);
        const arrayAllInfos = await allProducts;
        console.log('arrayAllInfos ', arrayAllInfos);
        console.log('arrayObject ', arrayObject);
        const currentId = currentProduct[0];
        const objectInfos = arrayAllInfos.find(product => product._id === currentId);
        console.log('objectInfos)', objectInfos);



        const newArticle = document.createElement("article");
        parentElt.appendChild(newArticle);
        newArticle.setAttribute("class", "cart__item");
        newArticle.setAttribute("data-id", objectInfos._id);
        newArticle.setAttribute("data-color", currentProduct[1]);

        const newCartItemImg = document.createElement("div");
        newArticle.appendChild(newCartItemImg);
        newCartItemImg.setAttribute("class", "cart__item__img");

        const newImg = document.createElement("img");
        newCartItemImg.appendChild(newImg);
        newImg.setAttribute("src", objectInfos.imageUrl);
        newImg.setAttribute("alt", "Photographie d'un canapé");

        const newCartItemContent = document.createElement("div");
        newArticle.appendChild(newCartItemContent);
        newCartItemContent.setAttribute("class", "cart__item__content");

        const newDescriptionDiv = document.createElement("div");
        newCartItemContent.appendChild(newDescriptionDiv);
        newDescriptionDiv.setAttribute("class", "cart__item__content__description");

        const newDescriptionHeading = document.createElement("h2");
        newDescriptionDiv.appendChild(newDescriptionHeading);
        newDescriptionHeading.innerHTML = objectInfos.name;

        const newDescriptionColor = document.createElement("p");
        newDescriptionDiv.appendChild(newDescriptionColor);
        newDescriptionColor.innerHTML = currentProduct[1];

        const newDescriptionPrice = document.createElement("p");
        newDescriptionDiv.appendChild(newDescriptionPrice);
        newDescriptionPrice.innerHTML = objectInfos.price;

        const newSettings = document.createElement("div");
        newCartItemContent.appendChild(newSettings);
        newSettings.setAttribute("class", "cart__item__content__settings");

        const newSettingsQuantity = document.createElement("div");
        newSettings.appendChild(newSettingsQuantity);
        newSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");

        const newQuantityText = document.createElement("p");
        newSettingsQuantity.appendChild(newQuantityText);
        newQuantityText.innerHTML = "Qté : ";

        const newQuantityInput = document.createElement("input");
        newSettingsQuantity.appendChild(newQuantityInput);
        newQuantityInput.setAttribute("type", "number");
        newQuantityInput.setAttribute("class", "itemQuantity");
        newQuantityInput.setAttribute("name", "ItemQuantity");
        newQuantityInput.setAttribute("min", "1");
        newQuantityInput.setAttribute("max", "100");
        newQuantityInput.setAttribute("value",  currentProduct[2]);

        const newSettingsDelete = document.createElement("div");
        newSettings.appendChild(newSettingsDelete);
        newSettingsDelete.setAttribute("class", "cart__item__content__settings__delete")

        const newDeleteText = document.createElement ("p");
        newSettingsDelete.appendChild(newDeleteText);
        newDeleteText.innerHTML = "Supprimer";
    }
    createChangeListeners();
    createDeleteListeners();
    totalSum();
};

fillCart();

/**Function that calculate the total sum of the cart 
 * and updates the html total element
 * 
 * REMAKE MORE ROBUST WITH A CHECKABLE LAST SUM AND NO ASYNC 
 */         

const totalSum = () => {
    let total = 0;
    let totalPrice = 0;
    let initialValue = 0;
    let sumArray = [];
    let qtyArray = [];
    items.forEach((currentProduct) => {
        productInfos =  arrayObject.find(element => 
            currentProduct[0].includes(element._id)
        );
        qtyArray.push(parseInt(currentProduct[2]));
        sumArray.push(parseInt(currentProduct[2]) * parseInt(productInfos.price));
    });
    totalPrice = sumArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    );
    currencySum.innerHTML = totalPrice;
    total = qtyArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    );
    quantitySum.innerHTML = total;  
};

/** Function that modifies the quantity of a product in the cart when 
 *  the corresponding input is modified
 */

const createChangeListeners = () => {
    const quantityInputs = document.querySelectorAll(".itemQuantity");
    for(let quantityInput of quantityInputs)  {
        quantityInput.addEventListener("click", () => {
            const nodeToChange = quantityInput.closest("article");
            const idToChange = nodeToChange.dataset.id;
            const colorToChange = nodeToChange.dataset.color;
            const indexToChange = items.findIndex(item => item[0] === idToChange && item[1] === colorToChange);
            items[indexToChange][2] = parseInt(quantityInput.value);
            localStorage.setItem("cart", JSON.stringify(items));
            totalSum();
        });
    };
};

/** Function that creates an event that deletes a product when one of the delete 
*   buttons is clicked
*/

const createDeleteListeners = () => {
    const deleteBtns = document.querySelectorAll(".cart__item__content__settings__delete");
    for(let deleteBtn of deleteBtns)  {
        deleteBtn.addEventListener("click", () => {
        const nodeToDelete = deleteBtn.closest("article");
        const idToDelete = nodeToDelete.dataset.id;
        const colorToDelete = nodeToDelete.dataset.color;
        const indexToDelete = items.findIndex(item => item[0] === idToDelete && item[1] === colorToDelete);
        items.splice(indexToDelete, 1);
    if (items.length === 0) {
        localStorage.removeItem("cart");
    } else {
        localStorage.setItem("cart", JSON.stringify(items));
    }
    nodeToDelete.remove();
    totalSum();
        });
    };
};


/**Handling the form with variables declared */

const orderForm = document.getElementsByClassName("cart__order__form");
console.log('orderForm ', orderForm);
const firstNameInput = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameErrorMsg");
const lastNameInput = document.getElementById("lastName");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const adressInput = document.getElementById("adress");
const adressError = document.getElementById("adressErrorMsg");
const locationInput = document.getElementById("city");
const locationError = document.getElementById("cityErrorMsg");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailErrorMsg");
const generalRegex = /azeaze/;

orderForm.addEventListener("submit", () => {
    
});
