const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');





let profile = document.getElementById('profile');
let productsGrid = document.getElementById('user-products-grid');
let url = 'https://my-json-server.typicode.com/RobocodeSchool/marketplace';

let userRequest = new XMLHttpRequest();

userRequest.open('GET', `${url}/users/${id}`);
userRequest.responseType = 'json';



userRequest.onload = function(){
    let user = userRequest.response;
        profile.innerHTML = `
            <h1>${user.name}</h1>
            <h2>${user.sirname}</h2>
            <img src="${user.photo_url}" class="profile-img">
            <p>Balance: ${user.balance}$</p>
        `;
    }
userRequest.send();

let productsRequest = new XMLHttpRequest();

productsRequest.open('GET', `${url}/products?author_id=${id}`);

productsRequest.responseType = 'json';
productsRequest.onload = function(){
    let products = productsRequest.response;
    productsGrid.innerHTML = null;
    products.forEach(p => {
        productsGrid.innerHTML += `
        <div class="product">
    <h2 class="product-photo">${p.name}</h2>
        <img src="${p.photo_url}" alt="" class="product-photo">
        <p class="product-price"><b>Price: </b>${p.price}</p>
        <p class="product-description"><b>Description:</b>${p.description}</p>
    </div>
        `;
    });
}

productsRequest.send();