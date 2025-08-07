import displayCart from "./cart.js"


const displayList = (list) => /*html*/`

<li class="card" data-id="${list.id}">
    <div class="card-title">
        <h3>${list.title}</h3>
        <form class="price">
            <input 
                type="number"
                name="price"
            >
            <button class="add-price"
                hx-post="/list"
                hx-target=".card"
                hx-vals='{"listID": "${list.id}"}'
            >Add Price
            </button>
        </form>
        <p>EUR</p>
    </div>
    
    <div class="card-list">
        <ul>
            ${list.cart.map((cart, index) => displayCart(cart, list.id, index)).join('')}
        </ul>
        <p>${list.weekday} - ${list.shop}</p>
        <form class="new-product">
            <input 
                type="text"
                name="product"
                placeholder="product"
                size="25"
            />
            <input 
                type="number"
                name="quantity"
                placeholder="x"
                size="1"
            />
            <button class="add-product"
                hx-post="/cart"
                hx-vals='{"listID": "${list.id}"}'
                hx-target="[data-id='${list.id}'] ul"
                hx-swap="beforeend"
            >Add Product
            </button>
        </form>
    </div>
</li>`

export default displayList;