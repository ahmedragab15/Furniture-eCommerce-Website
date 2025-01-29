//? params
//* http://127.0.0.1:5501/html/product1.html?     id=1 >> params
let urlParrams = new URLSearchParams(window.location.search)
let productId = urlParrams.get("id")

let apiUrl = "../api/api.json"
fetch(apiUrl)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        data.map(() => {
            let product = data[productId - 1]
            if (product) {
                document.querySelector(".product-name").innerHTML = product.title
                document.querySelector(".product-price").innerHTML = `$${product.price}`
                document.querySelector(".product-description").innerHTML = product.description
                document.querySelector(".product-discount del").innerHTML = `$${product.discount}`
                document.querySelector(".product-image").src = product.image
                document.querySelector(".fImage").src = product.image
            }

        })
    })
    .catch((error) => {
        console.log(error)
    })



//? tabs

let tabs = document.querySelectorAll(".product-description h4")
let tabsArr = Array.from(tabs)
let content = document.querySelectorAll(".title-description> div")
let contentArr = Array.from(content)

//*loop on tabs
tabsArr.forEach((ele) => {

    //* every element add event
    ele.addEventListener("click", (e) => {

        //* remove active class from all tabs
        tabsArr.forEach((v) => {
            v.classList.remove("active")
        })

        //*and add on clicked element
        e.currentTarget.classList.add("active")

        //* hide all content
        contentArr.forEach((div) => {
            div.style.display = "none"
        })

        //* show content linked to tab by dataset
        document.querySelector(e.target.dataset.content).style.display = "block"
    })
})
