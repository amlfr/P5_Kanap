
/*Variables to fetch the products and populate the page*/

const items = JSON.parse(localStorage.getItem("cart"));
console.log(items);
const parentElt = document.getElementById("cart__items");
const fetchUrl = "http://localhost:3000/api/products";


/*Variables for the total sum */

const quantitySum = document.getElementById("totalQuantity");
const currencySum = document.getElementById("totalPrice");

/**Variables to handle the form validation and it's submit event */

const orderForm = document.querySelector(".cart__order__form");
const firstNameInput = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameErrorMsg");
const lastNameInput = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameErrorMsg");
const adressInput = document.getElementById("address");
const adressError = document.getElementById("addressErrorMsg");
const cityInput = document.getElementById("city");
const cityError = document.getElementById("cityErrorMsg");
const mailInput = document.getElementById("email");
const mailError = document.getElementById("emailErrorMsg");
const generalRegex = /^[a-zA-Z-]+$/;
const adressRegex = /^[a-zA-Z0-9- ]+$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_"`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

/** Function making one API call for every products infos
 */
const fetchProducts = async () => {
    let response = await fetch(fetchUrl);
    if (response.ok) { 
    product = await response.json();
    return product;
    } else {
      /* alert("HTTP-Error: " + response.status);    */
    };
};

let allProducts = fetchProducts();

/** Function populating the html of the page with every product by iterating over the array 
 *  parsed from the localStorage
 */
const fillCart = async () => {
    for(let currentProduct of items) {
        const arrayAllInfos = await allProducts;
        const currentId = currentProduct[0];
        const objectInfos = arrayAllInfos.find(product => product._id === currentId);

        parentElt.insertAdjacentHTML("afterbegin", `<article class="cart__item" data-id="${objectInfos._id}" data-color="${currentProduct[1]}">`);
        const newArticle = document.querySelector(`article[data-id="${objectInfos._id}"]`);
        newArticle.insertAdjacentHTML("afterbegin", `<div class="cart__item__img">`)
        const newCartItemImg = document.querySelector(`article[data-id="${objectInfos._id}"] div`);
        newCartItemImg.insertAdjacentHTML("afterbegin", `<img src="${objectInfos.imageUrl}" alt="${objectInfos.altTxt}">`);
        newArticle.insertAdjacentHTML("beforeend", `<div class="cart__item__content">`);
        const newCartItemContent = document.querySelector(`article[data-id="${objectInfos._id}"] div[class="cart__item__content"]`);
        newCartItemContent.insertAdjacentHTML("afterbegin", `<div class="cart__item__content__description">`);
        const newDescriptionDiv = document.querySelector(`article[data-id="${objectInfos._id}"] div[class="cart__item__content"] div`);
        newDescriptionDiv.insertAdjacentHTML("afterbegin", `<h2>${objectInfos.name}</h2>`);
        newDescriptionDiv.insertAdjacentHTML("beforeend", `<p>${currentProduct[1]}</p>`);
        newDescriptionDiv.insertAdjacentHTML("beforeend", `<p>${objectInfos.price}</p>`);
        newCartItemContent.insertAdjacentHTML("beforeend", `<div class="cart__item__content__settings">`);
        const newSettings = document.querySelector(`article[data-id="${objectInfos._id}"] div[class="cart__item__content"] div[class="cart__item__content__settings"]`);
        newSettings.insertAdjacentHTML("afterbegin", `<div class="cart__item__content__settings__quantity">`);
        const newSettingsQuantity = document.querySelector(`article[data-id="${objectInfos._id}"] div[class="cart__item__content"] div[class=cart__item__content__settings] div`);
        newSettingsQuantity.insertAdjacentHTML("afterbegin", `<p>Qté : </p>`);
        newSettingsQuantity.insertAdjacentHTML("beforeend", `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${currentProduct[2]}">`);
        newSettings.insertAdjacentHTML("beforeend", `<div class="cart__item__content__settings__delete">`);
        const newSettingsDelete = document.querySelector(`article[data-id="${objectInfos._id}"] div[class="cart__item__content"] div[class="cart__item__content__settings"] div[class="cart__item__content__settings__delete"]`);
        newSettingsDelete.insertAdjacentHTML("afterbegin", `<p class="deleteItem">Supprimer</p>`);
    };
    createChangeListeners();
    createDeleteListeners();
    totalSum();
};

fillCart();

/** Function that calculate the total sum of the cart 
 *  and updates the html total element
 */         

const totalSum = async () => {
    const arrayAllInfos = await allProducts;
    let total = 0;
    let totalPrice = 0;
    let initialValue = 0;
    let sumArray = [];
    let qtyArray = [];
    items.forEach((currentProduct) => {
        productInfos =  arrayAllInfos.find(element => 
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

/*Function that validates the name input against the general regex which accepts any letters*/

const firstNameValidate = () => {
    if (generalRegex.test(firstNameInput.value)) {
        firstNameError.innerHTML = "";
        return true
    } else {
        firstNameError.innerHTML = "Erreur sur le champ du prénom. Veuillez n'utiliser que des lettres ainsi que -.";
    }
};

/*Function that validates the name input against the general regex which accepts any letters*/

const lastNameValidate = () => {
    if (generalRegex.test(lastNameInput.value)) {
        lastNameError.innerHTML = "";
        return true
    } else {
        lastNameError.innerHTML = "Erreur sur le champ du nom de famille. Veuillez n'utiliser que des lettres ainsi que -.";
    }
};

/*Function that validates the name input against the adress regex which accepts any letters and numbers*/

const adressValidate = () => {
    if (adressRegex.test(adressInput.value)) {
        adressError.innerHTML = "";
        return true
    } else {
        adressError.innerHTML = "Erreur sur le champ de l'adresse. Veuillez n'utiliser que des lettres, des chiffres, des espaces ainsi que -.";
    }
};


/*Function that validates the name input against the general regex which accepts any letters*/

const cityValidate = () => {
    if (generalRegex.test(cityInput.value)) {
        cityError.innerHTML = "";
        return true
    } else {
        cityError.innerHTML = "Erreur sur le champ de la ville. Veuillez n'utiliser que des lettres ainsi que -.";
    }
};


/*Function that validates the name input against the mail regex which accepts a valid email adress*/

const mailValidate = () => {
    if (emailRegex.test(mailInput.value)) {
        mailError.innerHTML = "";
        return true
    } else {
        mailError.innerHTML = "Erreur sur le champ de l'adresse email. Veuillez renseigner une adresse au format valide. Exemple: Jean.Dupont@adresse.com";
    }
};

/** Creates a submit function that checks every input then
 *  constructs a POST request before getting back an order ID 
 *  and redirecting the client to the confirmation page  
 */

orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (firstNameValidate() && lastNameValidate() && adressValidate() && cityValidate() && mailValidate()) {
        const contactObject = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            address: adressInput.value,
            city: cityInput.value,
            email: mailInput.value
        };
        const arrayProduct = [];
        items.forEach((currentProduct) => {
            arrayProduct.push(currentProduct[0]);
        });
        const requestBody = {
            contact: contactObject,
            products: arrayProduct
        };
        let response = await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(requestBody)
          });
        let result = await response.json();
        window.location.href = `./confirmation.html?order-id=${result.orderId}`;
    };
});