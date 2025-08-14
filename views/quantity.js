const displayQuantity = (quantity, listID, cartIndex) => /*html*/`
    <form class="quantity">
        <input 
            type="number"
            name="newQuantity"
            placeholder="${quantity}"// FIXME: change colour to a lightgray - CSS cannot change it
        >
        <button class="edit-quantity"
            hx-put="/edit-quantity/${listID}/${cartIndex}"
            hx-target="closest li"
            hx-swap="outerHTML"
        >Edit quantity
        </button>
    </form>

`
export default displayQuantity;