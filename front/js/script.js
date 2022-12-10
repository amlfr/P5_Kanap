/*Declaring variables*/
const fetchUrl = "http://localhost:3000/api/products";
const parentElt = document.getElementById("items");


/** Function that fetches the products from the API
 */
const fetchProducts = async () => {
  let response = await fetch(fetchUrl);
  if (response.ok) { 
    products = await response.json();
    return products
  } else {  
    alert("HTTP-Error: " + response.status);
  };
};

let allProducts = fetchProducts();

/**Function that generates the html elements with
 * the information we got back
 */


const fillPage = async () => {
  const arrayProducts = await allProducts;
  for (let product of arrayProducts) {
    parentElt.insertAdjacentHTML("afterbegin", `<a href="./product.html?id=${product._id}">`);
    const newAnchor = document.querySelector(`a[href="./product.html?id=${product._id}"]`);
    newAnchor.insertAdjacentHTML("afterbegin", `<article>`)
    const newArticle = document.querySelector(`a[href="./product.html?id=${product._id}"] article`);
    newArticle.insertAdjacentHTML("afterbegin", `<img src="${product.imageUrl}" alt="${product.altTxt}">`);
    newArticle.insertAdjacentHTML("beforeend", `<h3 class="productName">${product.name}</h3>`);
    newArticle.insertAdjacentHTML("beforeend", `<p class="productDescription">${product.description}</p>`);
  };
};

fillPage();
