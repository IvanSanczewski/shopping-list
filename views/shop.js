const displayShop = (shop, id) => /*html*/`
    <form class="edit-shop">
        <input
            type="text"
            name="newShop"
            value="${shop}"
            placeholder="${shop}"
        >
        <button class="edit-shop-btn"
            hx-put="/edit-shop/${id}"
            hx-target="closest li"
            hx-swap="outerHTML"
        >Edit shop

        </button>
    </form> 

`

export default displayShop;