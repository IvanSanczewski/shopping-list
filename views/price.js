const displayPrice = (listID, total) => /*html*/ `
    <form class="edit-price">
        <input 
            type="number"
            name="newPrice"
            value="${total}"
            placeholder="${total}"
        >
        <button class="edit-price-btn"
            hx-put="/edit-price/${listID}"
            hx-target="closest li"
            hx-swap="outerHTML"
        >Edit Price
        </button>
    </form>

`
export default displayPrice;