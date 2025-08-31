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
            <button class="edit-product-btn"
                hx-get="/edit-product/${listID}/${cartIndex}"
                hx-target="#product-${listID}-${cartIndex}"
                hx-swap="outerHTML"
                title="Edit Product"
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.439 9.439a.5.5 0 0 1-.168.11l-4 1.5a.5.5 0 0 1-.65-.65l1.5-4a.5.5 0 0 1 .11-.168l9.439-9.439zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 3 10.707V13h2.293l7.5-7.5z"/>
                </svg> 
            </button>

            <button class="delete-item"
                hx-delete="/delete-product/${listID}/${cartIndex}"
                hx-target="closest li"
                hx-swap="outerHTML"
                title="Delete product"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zm3 .5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1H14a1 1 0 0 1 1 1zm-3-1a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5H3.5a.5.5 0 0 0-.5.5V4h10V3.5a.5.5 0 0 0-.5-.5H11.5z"/>
                </svg>
            </button>
        </div>
    </li>
`

export default displayCart;
