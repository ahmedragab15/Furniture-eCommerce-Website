//? redirect to product page
function productDetails(productId) {
    window.location.href = `product1.html?id=${productId}`;
}


//? fetch data       
let apiUrl = "../api/api.json";

async function fetchProducts() {
    try {
        let res = await fetch(apiUrl)
        let data = await res.json()
        displayProduct(data)
    } catch (error) {
        let errorFetch = document.createElement("h1")
        errorFetch.innerHTML = `failed to fetch the data Refresh the page`
        productList.append(errorFetch)
    }
}
fetchProducts()


//? display products
let productList = document.getElementById("products")
let i = 1

function displayProduct(products) {     //* data = products
    productList.innerHTML = "";
    products.map((item) => {
        let product = document.createElement("div");
        product.classList.add("product", `${item.category}`);
        product.dataset.id = item.id
        product.innerHTML = `
            <img src=${item.image} />
            <h5 class="product-name">${item.title.toLowerCase()}</h5>
            <p>${item.bref}</p>
            <span>$${item.price}</span>
            <div class="product-hover">
            <button onclick="productDetails(${i})">Product Details</button>
            <button class="cart-btn">Add to Cart</button>
            <div>
                <span class="share"><i class="fa-regular fa-share-from-square"></i> share</span>
                <span><i class="fa-solid fa-right-left"></i> Compare</span>
            <span class="like"><i class="fa-solid fa-heart"></i> Like</span>
            </div>
            </div>
`;

        productList.append(product)
        i++
    });
}


//?display filtered products
window.onload = () => {
    filterProduct("all")
}

//* buttons
function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value")
    buttons.forEach((button) => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active")
        } else {
            button.classList.remove("active")
        }
    })

    //* products
    let elements = document.querySelectorAll(".product")
    elements.forEach((element) => {
        if (value == "all") {
            element.classList.remove("hide")
        } else if (element.classList.contains(value)) {
            element.classList.remove("hide")
        } else {
            element.classList.add("hide")
        }
    })

}

//? search
let searchCont = document.querySelector(".search-box")
let searchInput = document.getElementById("search-input")

searchCont.addEventListener("keyup", (e) => {

    let elements = document.querySelectorAll(".product-name")
    let products = document.querySelectorAll(".product")
    elements.forEach((element, index) => {
        if (element.innerHTML.includes(searchInput.value.trim().toLowerCase())) {
            products[index].classList.remove("hide")
        } else {
            products[index].classList.add("hide")
        }
    })

})


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
productList.addEventListener("click", (e) => {
    let favBtn = e.target
    if (favBtn.classList.contains("like")) {
        //* target product info
        let productElememts = favBtn.closest(".product")
        let productName = productElememts.querySelector("h5").textContent
        let productPrice = productElememts.querySelector("span").textContent
        let productImg = productElememts.querySelector("img").src
        //* add to fav
        fav.push({
            Name: productName,
            price: productPrice,
            image: productImg
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


//? share
let sharePopup = document.querySelector('.share-popup')
let closeBtn = document.querySelector('.close')
let copyBtn = document.getElementById('btn')
let linlInput = document.getElementById('input')

linlInput.value = `http://127.0.0.1:5503/html/product1.html?id=1`


productList.addEventListener("click", (e) => {
    let shareBtn = e.target
    if (shareBtn.classList.contains("share")) {
        sharePopup.classList.add('active-popup')
    }
})

closeBtn.addEventListener('click', () => {
    sharePopup.classList.remove('active-popup')
})

copyBtn.addEventListener('click', () => {
    linlInput.select();
    document.execCommand('copy')
})