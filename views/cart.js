const displayCart = (cart, listID, cartIndex) => /*html*/`
    <li class="cart-item ${cart.bought ? 'in-cart' : 'out-cart'}">
        <div class="item-details">
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
                >Add</span>`
            }
        </div>

        <div class="item-buttons">
            <svg
                class="edit-product-btn icon-action"
                hx-get="/edit-product/${listID}/${cartIndex}"
                hx-target="#product-${listID}-${cartIndex}"
                hx-swap="outerHTML"
                tabindex="0"
                width="26" height="26" viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-dark-edit-primary)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                title="Edit product"
            >
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>

            <svg
                class="delete-item icon-action"
                hx-delete="/delete-product/${listID}/${cartIndex}"
                hx-target="closest li"
                hx-swap="outerHTML"
                tabindex="0"
                width="26" height="26" viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-dark-edit-primary)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                title="Delete product"
            >
                <path d="M3 6h18"/>
                <path d="M19 6l-1 17H6L5 6"/>
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
                <path d="M9 6V4h6v2"/>
            </svg>
        </div>
    </li>
`

export default displayCart;
