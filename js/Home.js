//? redirect to product page
function productDetails(productId) {
    window.location.href = `html/product1.html?id=${productId}`
}

//? fetch data       
let apiUrl = "http://127.0.0.1:5503/api/api.json";

let fetchProducts = () => {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            displayProduct(data)
        })
}
fetchProducts()


//? display products 
let productList = document.getElementById("products")
let i = 1

function displayProduct(products) {     //* data = products
    productList.innerHTML = "";
    products.slice(0, 8).map((item) => {
        let product = document.createElement("div");
        product.classList.add("product");
        product.dataset.id = item.id
        product.innerHTML = `
            <img src="${item.image}" />
            <h5>${item.title}</h5>
            <p>${item.bref}</p>
            <span>$${item.price}</span>
            <div class="product-hover">
            <button onclick="productDetails(${i})">Product Details</button>
            <button class="cart-btn">
                <span class="IconContainer"> 
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                </span>
                <p class="text">Add to Cart</p>
            </button>
            <div>
                <span><i class="fa-regular fa-share-from-square"></i> share</span>
                <span><i class="fa-solid fa-right-left"></i> Compare</span>
            <span class="like"><i class="fa-solid fa-heart"></i> Like</span>
            </div>
            </div>
`;

        productList.append(product)
        i++
    });
}
/*

*/

//? cart btn

productList.addEventListener("click", (e) => {
    let cartBtn = e.target
    if (cartBtn.classList.contains("cart-btn")) {
        //* target product info
        let productElememts = cartBtn.closest(".product")
        let productName = productElememts.querySelector("h5").textContent
        let productPrice = productElememts.querySelector("span").textContent
        let productImg = productElememts.querySelector("img").src
        let productId = productElememts.dataset.id

        //* add to cart
        cart.push({
            id: productId,
            Name: productName,
            price: productPrice,
            image: productImg,
            quantity: 1
        })

        //*cart animation 
        let aniCart = document.querySelector(".fa-cart-shopping")
        aniCart.classList.add("animated")

        //* add cart to local storage
        localStorage.setItem("Cart", JSON.stringify(cart))      //* turn array to string   / send data to storge
        updateCounter()
    }
})


//? favorite btn
//* loop on buttons

productList.addEventListener("click", (e) => {
    let favBtn = e.target
    if (favBtn.classList.contains("like")) {
        //* target product info
        let productElememts = favBtn.closest(".product")
        let productName = productElememts.querySelector("h5").textContent
        let productPrice = productElememts.querySelector("span").textContent
        let productImg = productElememts.querySelector("img").src
        let productId = productElememts.dataset.id
        //* add to fav
        fav.push({
            id: productId,
            Name: productName,
            price: productPrice,
            image: productImg,
            quantity: 1
        })

        //*cart animation 
        let aniFav = document.querySelector(".fa-heart")
        aniFav.classList.add("animate")

        //*change heart color
        favBtn.children[0].style.color = "red"

        //* add fav to local storage
        localStorage.setItem("Favorite", JSON.stringify(fav))      //* turn array to string   / send data to storge
        favCount()
    }
})