//? redirect to product page
function productDetails(productId) {
    window.location.href = `html/product1.html?id=${productId}`
}

//? fetch data       
let apiUrl = "api/api.json";

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
            <img src=${item.image} />
            <h5>${item.title}</h5>
            <p>${item.bref}</p>
            <span>$${item.price}</span>
            <div class="product-hover">
            <button onclick="productDetails(${i})">Product Details</button>
            <button class="cart-btn">Add to Cart</button>
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