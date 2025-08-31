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
            title="Delete list"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zm3 .5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1H14a1 1 0 0 1 1 1zm-3-1a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5H3.5a.5.5 0 0 0-.5.5V4h10V3.5a.5.5 0 0 0-.5-.5H11.5z"/>
            </svg>
        </button>
    </div>
</li>`;
}

export default displayList;