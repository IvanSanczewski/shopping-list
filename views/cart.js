const displayCart = (cart, listID, cartIndex) => /*html*/`
    <li class="cart-item ${cart.bought ? 'in-cart' : 'out-cart'}">
        <span id="product-${listID}-${cartIndex}" class="item-product"
            hx-post="/toggle-item-status"
            hx-vals='{"listID": "${listID}", "cartIndex": ${cartIndex}}'
            hx-target="closest li"
            hx-swap="outerHTML"
            style="cursor: pointer;"
        >${cart.item}</span>

        ${cart.units ?
            `<span class="item-units"   
                hx-get="/edit-quantity/${listID}/${cartIndex}/${cart.units}"
                hx-target="this"
                hx-swap="outerHTML"
                style="cursor: pointer;"
                title="Edit quantity"
            >${cart.units}</span>` 
        : 
            `<span class="item-units"
                hx-get="/edit-quantity/${listID}/${cartIndex}/${cart.units}"
                hx-target="this"
                hx-swap="outerHTML"
                style="cursor: pointer;"
                title="Add quantity"
            >-</span>`
        }
        
        <button class="edit-product-btn"
            hx-get="/edit-product/${listID}/${cartIndex}"
            hx-target="#product-${listID}-${cartIndex}"
            hx-swap="outerHTML"
        >Edit Product</button>

        <button class="delete-item"
            hx-delete="/delete-product/${listID}/${cartIndex}"
            hx-target="closest li"
            hx-swap="outerHTML"
        >Delete Product</button>
    </li>
`

export default displayCart;
