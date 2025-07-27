const displayCart = (cart, listID, cartIndex) => /*html*/`
    <div>
       <span
            class="item ${cart.bought} ? 'in-cart' : 'out-cart'"
            hx-post="/toggle-item"
            hx-vals='{"myVal$": "My Value"}'
       >

       </span>
    </div>
`

export default displayCart;