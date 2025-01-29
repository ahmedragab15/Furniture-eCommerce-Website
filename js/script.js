//? search box

let searchBtn = document.querySelector(".searchbtn")
let closesearchBtn = document.querySelector(".closesearchbtn1")
let searchBox = document.querySelector(".search-box")

searchBtn.addEventListener("click", (e) => {
    searchBox.style.left = "0"
})
closesearchBtn.addEventListener("click", (e) => {
    searchBox.style.left = "-100%"
})


//? cart & Favorite
//* button , counter , local storage

let cart = []
let fav = []
let cartCounter = document.getElementById("counter");
let favCounter = document.getElementById("fav-counter");
let cartBtn = document.querySelectorAll(".product .cart-btn");
let favBtn = document.querySelectorAll(".product .like")


//* prepare local storage
document.addEventListener("DOMContentLoaded", () => {
    let cartItems = JSON.parse(localStorage.getItem("Cart")) || []     //* turn string to array /recive data from storge
    cart = cartItems

    let favItems = JSON.parse(localStorage.getItem("Favorite")) || []
    fav = favItems
    updateCounter()
    favCount()
})

//* update cart counter
function updateCounter() {
    cartCounter.textContent = cart.length
    if (cartCounter.textContent == 0) {
        cartCounter.style.display = "none"
    } else {
        cartCounter.style.display = "inline-block"
    }

}

//* update favorite counter
function favCount() {
    favCounter.textContent = fav.length
    if (favCounter.textContent == 0) {
        favCounter.style.display = "none"
    } else {
        favCounter.style.display = "inline-block"
    }
}
