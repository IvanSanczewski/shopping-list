const displayProduct = (listID, cartIndex) => /*html*/ `
    <form class="edit-product">
        <input 
            type="text"
            name="newProduct"
        >
        <button class="edit-product-btn"
            hx-put="/edit-product/${listID}/${cartIndex}"
            hx-target="closest .cart-item"
            hx-swap="outerHTML"
        >Confirm New Product
        </button>
    </form>

`

export default displayProduct;