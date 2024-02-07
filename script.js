let productsGird = document.getElementById('products-gird');
let productsArray = [];
let xhr = new XMLHttpRequest();


xhr.open("GET", "https://market-23f4.restdb.io/rest/product");

xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "659ec3e8907ee92516da4f05");
xhr.setRequestHeader("cache-control", "no-cache");


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
            <button onclick="addProductToCart('${element._id}')">Buy</button>
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
        return p._id == id;
    });
    cart.push(product);
    drawCartProducts();
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById('cart-button').classList.add('active');
    setTimeout(function(){
        document.getElementById('cart-button').classList.remove('active');

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
let orderBlock = document.getElementById('order-block');
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName('close')[0];

span.onclick = function(){
    modal.style.display = "none";
}
window.onclick = function(event){
    if(event.target == modal){
            modal.style.display = "none";
    }
}

function buyAll(){
    modal.style.display = "block";
    let sum = 0;
    orderBlock.innerHTML = null;

    cart.forEach(function(p){
        orderBlock.innerHTML += `
        <div class="item">
            <img width="100px" src="${p.photo_url}"
            <h2>${p.name} | ${p.price}$</h2>
        </div>
        `;
        sum += p.price;
    });
    document.getElementById('price').innerHTML = sum + "$";
}

function openCart(){
     cartProd.classList.toggle('hide');
}

// 659ec3e8907ee92516da4f05

document.getElementById('order-form').addEventListener('submit', function(e){
    e.preventDefault();
    let data = JSON.stringify({
        "name": e.target['name'].value,
        "address": e.target['address'].value,
        "post_number": e.target['post_number'].value,
        "status": "New",
        "products": localStorage.getItem('cart')
    });

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "https://market-23f4.restdb.io/rest/orders");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "659ec3e8907ee92516da4f05");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

    modal.style.display = "none";
    cart = [];
    cartProd.innerHTML = 'cart is empty';
    localStorage.setItem("cart", '[]');

})

