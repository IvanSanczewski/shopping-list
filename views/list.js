import displayCart from "./cart.js"


const displayList = (list) => /*html*/`

<li class="card" data-id="${list.id}">
    <div class="card-title">
        <h3>${list.title}</h3>
        <p>${list.total} EUR</p>
    </div>
    
    <div class="card-list">
        <ul>
            ${list.cart.map(cart => displayCart(cart)).join('')}
        </ul>
        <p>${list.weekday}</p>
        <p>${list.shop}</p>
        <form>
            <input 
            type="text"
            name="item"
            placeholder="product"
            size="25"
            />
            <input 
            type="number"
            name="quantity"
            placeholder="x"
            size="1"
            />
            <button hx-post="/lists">+</button>
        </form>
    </div>
</li>`

export default displayList;