const displayProduct = (listID, itemID) => /*html*/ `
    <form class="edit-product">
        <input 
            type="text"
            name="newProduct"
        >
        <svg
            class="edit-product-btn icon-action"
            hx-put="/edit-product/${listID}/${itemID}"
            hx-target="closest .cart-item"
            hx-swap="outerHTML"
            tabindex="0"
            width="26" height="26" viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-dark-edit-primary)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            title="Confirm"
            style="vertical-align: middle;"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
        
    </form>

`

export default displayProduct;