const displayCart = (cart, listID, cartIndex) => /*html*/`
    <li 
        class="cart-item ${cart.bought ? 'in-cart' : 'out-cart'}"
            hx-post="/toggle-item-status"
            hx-vals='{"listID": "${listID}", "cartIndex": ${cartIndex}}'
            hx-target="this"
            hx-swap="outerHTML"
            style="cursor: pointer;"
        FIXME: implement toggle function on item name only (in spam vs this.span) WHAT IS THIS
        >
        <span class="item-name">${cart.item}</span>
        ${cart.units ? `<span class="item-units">${cart.units}</span>` : ''}
       
        <button class="delete-item"
            hx-delete="/delete-product/${listID}/${cartIndex}"
            hx-target="closest li"
            hx-swap="outerHTML"
        >Delete Product
        </button>
    </li>
`

export default displayCart;