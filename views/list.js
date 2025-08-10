import displayCart from "./cart.js"

const displayList = (list) => {

    console.log('5 - list.id: ', list.id, typeof list.id);
return /*html*/`
<li class="card" data-id="${list.id}">
    <div class="card-title">
        <h3>${list.title}</h3>
        ${list.total ? 
            /*html*/`
            <div class="price-display">
                <span class="price-value">${list.total}</span>
                <p>EUR</p>
                <button class="edit-price"
                    hx-post="/edit-price"
                    hx-target=".price-display"
                    hx-vals='{"listID": "${list.id}"}'>
                    Edit
                </button>
            </div>`
        :
            /*html*/`
            <form class="price">
                <input 
                    type="number"
                    name="price"
                    step="0.25"
                    placeholder="0.00"
                >
                <button class="add-price"
                    hx-post="/list"
                    hx-target="[data-id='${list.id}']"
                    hx-vals='{"listID": "${list.id}"}'>
                    Add Price
                </button>
            </form>`
        }
    </div>
    
    <div class="card-list">
        <ul>
            ${list.cart.map((cart, index) => displayCart(cart, list.id, index)).join('')}
        </ul>
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
            FIXME: Delete product & quantity after add button
            <button class="add-product"
                hx-post="/cart"
                hx-vals='{"listID": "${list.id}"}'
                hx-target="[data-id='${list.id}'] ul"
                hx-swap="beforeend"
            >Add Product
            </button>
            
        </form>
        <p>${list.weekday} - ${list.shop}</p>
        <button class="delete-list"
            hx-delete="/delete-list/${list.id}"
            hx-target="closest li"
            hx-swap="outerHTML"
        >Delete list
        </button>
    </div>
</li>`;
}

export default displayList;