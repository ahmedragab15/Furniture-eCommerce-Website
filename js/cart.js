//? Total calc
let totalCount = document.querySelector(".total")
let result = 0
// result 
function totalCalc(e) {
  totalCount.innerHTML = `$${result += e}`
}


//? render cart items

function getCartItems() {
  return JSON.parse(localStorage.getItem("Cart")) || []
}

let content = document.getElementsByClassName("products")[0]

let cartItem = getCartItems()

function renderCart() {

  cartItem.map((item,i,arr) => {

    let productContainer = document.createElement("div")
    content.append(productContainer)
    productContainer.classList.add("product")
    productContainer.dataset.id = item.id
    let priceIntegar = +item.price.replace("$", "")

    productContainer.innerHTML = `
          <img src=${item.image} alt="product img" />
          <p>${item.Name}</p>
          <p>$${priceIntegar}</p>
          <div class ="quantity">
            <span class="minus"><</span>
            <span>${item.quantity}</span>
            <span class="plus">></span>
          </div>
          <span class="subtotal">$${priceIntegar * item.quantity}</span>
           <i class="fa-solid fa-trash icon" style="color: var(--maincolor)"></i>
`
    totalCalc(priceIntegar)
  })
} renderCart()