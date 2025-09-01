import displayCart from "./cart.js"

const displayList = (list) => {

    console.log('5 - list.id: ', list.id, typeof list.id);
    console.log('6 - ', list.total);
return /*html*/`
<li class="card" data-id="${list.id}">
    <div class="card-title">
        <h3>${list.title}</h3>
        ${list.total ? 
            /*html*/`
            <span class="list-price"
                hx-get="/edit-price/${list.id}/${list.total}"
                hx-target="this"
                hx-swap="outerHTML"
                style="cursor: pointer"
                title="Edit price"
            >${list.total} EUR
            </span>`
        :
            /*html*/`
            <span class="list-price"
                hx-get="/edit-price/${list.id}/${list.total}"   
                hx-target="this"
                hx-swap="outerHTML"
                style="cursor: pointer"
                title="Add price"
            >- EUR</span>`
        }
    </div>
    
    <div class="card-list">
        <ul>
            ${list.cart.map((cart, index) => displayCart(cart, list.id, index)).join('')}
        </ul>
        <form class="new-product" id="form-${list.id}">
            <input 
                type="text"
                name="product"
                placeholder="add product"
                size="15"
            />
            <input 
                type="number"
                name="quantity"
                placeholder="x"
            />
            <button class="add-product"
                hx-post="/cart"
                hx-vals='{"listID": "${list.id}"}'
                hx-target="[data-id='${list.id}'] ul"
                hx-swap="beforeend"
                hx-on::after-request="this.closest('form').reset()"
                >Add Product
            </button>
            
        </form>
        <p>
            <span class="weekday">${list.weekday}</span>        
            <span class="shop"
                hx-get="/edit-shop/${list.id}/${list.shop}"
                hx-target="this"
                hx-swap="outerHTML"
                style="cursor: pointer;"
                title="Edit shop"
            >${list.shop}</span>        
        </p>
        <button class="delete-list"
            hx-delete="/delete-list/${list.id}"
            hx-target="closest li"
            hx-swap="outerHTML"
        >Delete List
        </button>
    </div>
</li>`;
}

export default displayList;