let productsGird = document.getElementById('products-gird');
let productsArray = [];
let xhr = new XMLHttpRequest();
let url = 'https://my-json-server.typicode.com/RobocodeSchool/marketplace';

xhr.open('GET', url + '/products');
xhr.responseType = 'json';
xhr.onload = function(){
    productsArray = xhr.response;
    let products = xhr.response;
    productsGird.innerHTML = null;
    products.forEach(element => {
        productsArray.push(element);
        let pElem = document.createElement('div');
        pElem.classList.add('products');
        pElem.innerHTML = `
        
            <h2 class="product-name">${element.name}</h2>
            <img src="${element.photo_url}" alt="${element.name}" class="product-photo">
            <p class="product-price"><b>Price: </b>${element.price}</p>
            <p class="product-description"><b>Description: </b>${element.description}</p>
            <a href="userProfile.html?id=${element.author_id}">Seller profile</a>
            <button onclick="addProductToCart(${element.id})">Buy</button>
        `;
        productsGird.append(pElem);
    });
}
xhr.send();

let cartProd = document.getElementById('cart-products');
let cart = [];

if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCartProducts();
}

function addProductToCart(id){
    let product = productsArray.find(function(p){
        return p.id == id;
    });
    cart.push(product);
    drawCartProducts();
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById('cart-button').classList.add('active');
    setTimeout(function(){
        document.getElementById("cart-button").classList.remove('active');

    }, 500);
}
function drawCartProducts(){
    if(cart.length === 0) return cartProd.innerHTML = 'Cart is empty';
    cartProd.innerHTML = null;
    let sum = 0;
    cart.forEach(function(p){
        cartProd.innerHTML +=`
            <p><img src="${p.photo_url}" style="width: 50px; height: 50px;">${p.name} | ${p.price} $</p>
            <hr>
            `;
            sum += p.price;
    });
    cartProd.innerHTML+= `
    <p> Total Prise: ${sum}$</p>
    <button onclick="buyAll()">Buy All</button>
    `;
}

function buyAll(){
    cart = [];
    cartProd.innerHTML = 'not any money in you card';
    localStorage.setItem("cart", '[]');
    
}

function openCart(){
    cartProd.classList.toggle('hide');
}