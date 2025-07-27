const displayCart = (cart, listID, cartIndex) => /*html*/`
    <li 
        class="cart-item ${cart.bought ? 'in-cart' : 'out-cart'}"
        hx-post="/toggle-item"
        hx-vals='{"listID": "${listID}", "cartIndex": ${cartIndex}}'
        hx-target="this"
        hx-swap="outerHTML"
        style="cursor: pointer;"
    >
        <span class="item-name">${cart.item}</span>
        ${cart.units ? `<span class="item-units">(${cart.units})</span>` : ''}
    </li>
`

export default displayCart;