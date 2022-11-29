
/* Variables to fetch the products and populate the page*/

const items = JSON.parse(localStorage.getItem("cart"));
console.log(items);
const parentElt = document.getElementById("cart__items");
const fetchUrl = "http://localhost:3000/api/products";

/* Variables for the quantity change function */


/*Variables for the total sum */

const quantitySum = document.getElementById("totalQuantity");
const currencySum = document.getElementById("totalPrice");



/**Function making one API call for every products in the cart
 * 
 */
const fetchProducts = async () => {
    /*Fetching the json products*/

    /**  
     *    
     */ 

    let response = await fetch(fetchUrl);
    if (response.ok) { 
    product = await response.json();
    console.log('product ', product);
    
    return product;
    
    } else {
      /* alert("HTTP-Error: " + response.status);    TO DELETE*/
    }
};

let allProducts = fetchProducts();
console.log(allProducts);
/**Function populating the html of the page with every product by iterating over the array 
 * parsed from the localStorage
 */
const fillCart = async (currentProduct) => {
    let response = await fetch(fetchUrl + "/" + currentProduct[0]);
    if (response.ok) { 
    product = await response.json();
    console.log(product);
    
    }
    else {
        /* alert("HTTP-Error: " + response.status);    TO DELETE*/
    }

    const newArticle = document.createElement("article");
    parentElt.appendChild(newArticle);
    newArticle.setAttribute("class", "cart__item");
    newArticle.setAttribute("data-id", product._id);
    newArticle.setAttribute("data-color", currentProduct[1]);

    const newCartItemImg = document.createElement("div");
    newArticle.appendChild(newCartItemImg);
    newCartItemImg.setAttribute("class", "cart__item__img");

    const newImg = document.createElement("img");
    newCartItemImg.appendChild(newImg);
    newImg.setAttribute("src", product.imageUrl);
    newImg.setAttribute("alt", "Photographie d'un canapé");

    const newCartItemContent = document.createElement("div");
    newArticle.appendChild(newCartItemContent);
    newCartItemContent.setAttribute("class", "cart__item__content");

    const newDescriptionDiv = document.createElement("div");
    newCartItemContent.appendChild(newDescriptionDiv);
    newDescriptionDiv.setAttribute("class", "cart__item__content__description");

    const newDescriptionHeading = document.createElement("h2");
    newDescriptionDiv.appendChild(newDescriptionHeading);
    newDescriptionHeading.innerHTML = product.name;

    const newDescriptionColor = document.createElement("p");
    newDescriptionDiv.appendChild(newDescriptionColor);
    newDescriptionColor.innerHTML = currentProduct[1];

    const newDescriptionPrice = document.createElement("p");
    newDescriptionDiv.appendChild(newDescriptionPrice);
    newDescriptionPrice.innerHTML = product.price;

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

    /*Variables for the delete function */

    const deleteBtns = document.querySelectorAll(".cart__item__content__settings__delete");
    console.log('deleteBtns ', deleteBtns);


    /** Function that deletes a product when a delete button is clicked
    * 
    */

    for(let deleteBtn of deleteBtns)  {
        deleteBtn.addEventListener("click", () => {
        const nodeToDelete = deleteBtn.closest("article");
        
        const idToDelete = nodeToDelete.dataset.id;
        const colorToDelete = nodeToDelete.dataset.color;
        
        const indexToDelete = items.findIndex(item => item[0] === idToDelete && item[1] === colorToDelete);
        console.log('itemToDelete ', indexToDelete);
        items.splice(indexToDelete, 1);
        if (items.length === 0) {
            localStorage.removeItem("cart")
        } else {
            localStorage.setItem("cart", JSON.stringify(items));
        }
        nodeToDelete.remove();
        totalSum();
        });
    };
};

items.forEach((currentProduct) => fillCart(currentProduct));

/**Function that calculate the total sum of the cart 
 * and updates the html total element
 */

const totalSum = () => {
    let total = 0;
    let totalPrice = 0;
    items.forEach( async (currentProduct) => {
        total += parseInt(currentProduct[2]);
        arrayProducts = await allProducts;
        productInfos =  arrayProducts.find(element => 
            currentProduct[0].includes(element._id)
        );
        totalPrice += parseInt(currentProduct[2]) * parseInt(productInfos.price);
        currencySum.innerHTML = totalPrice; /*WARNING INNEFICIENT  IT CHANGES  EACH ITERATION */
    });
    quantitySum.innerHTML = total;  
};

totalSum();

/*Variables used to modify the quantity of a product when the input is used */

 


/** Function that modifies the quantity of a product in the cart when 
 *  the corresponding input is modified
 */







