/*Declaring variables*/
const fetchUrl = "http://localhost:3000/api/products";
let productsArray = [];
const parentElt = document.getElementById("items");
 



/** The function fetches the products from the API then uses the data to create
 * html elements on the page
 */
const fillProducts = async () => {

  /*Fetching the json products*/
  let response = await fetch(fetchUrl);
  if (response.ok) { 
    products = await response.json();
  } else {
    /* alert("HTTP-Error: " + response.status);    TO DELETE*/
  }

  /*Using the products gotten to populate the html page*/
  for (let product of products) {

    const newAnchor = document.createElement('a');
    parentElt.appendChild(newAnchor);
    const hrefId = "./product.html?id=" + product._id;
    newAnchor.setAttribute("href", hrefId);

    const newArticle = document.createElement('article');
    newAnchor.appendChild(newArticle);

    const newImage = document.createElement('img');
    newArticle.appendChild(newImage);
    /* const imgUrl = ".../product01.jpg"      */                                                          /* "../../" + product.imageUrl.match(/k.........../); */
    /* console.log(imgUrl); */
    newImage.setAttribute("src", product.imageUrl);
    newImage.setAttribute("alt", product.altTxt);

    const newHeading = document.createElement('h3');
    newArticle.appendChild(newHeading);
    newHeading.setAttribute("class", "productName");
    newHeading.innerHTML = product.name;

    const newText = document.createElement('p');
    newArticle.appendChild(newText);
    newText.setAttribute("class", "productDescription");
    newText.textContent = product.description; 



  }
};

fillProducts();


/* function fetchJson() {

fetch(fetchUrl)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(products) {
  console.log(products);
})
.catch(function(err) {
  alert("HTTP-Error: " + response.status);
});
}

fetchJson(); */