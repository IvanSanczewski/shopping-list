const displayQuantity = (quantity, listID, cartIndex) => /*html*/`
    <form class="edit-quantity">
        <input 
            type="number"
            name="newQuantity"
            value="${quantity}"
            placeholder="${quantity}"// FIXME: change colour to a lightgray - CSS cannot change it
        >
        <button class="edit-quantity-btn"
            hx-put="/edit-quantity/${listID}/${cartIndex}"
            hx-target="closest li"
            hx-swap="outerHTML"
        >Edit quantity
        </button>
    </form>

`
export default displayQuantity;