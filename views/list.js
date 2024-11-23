// import SHOPPINGLISTS_DATA from "../data/data.js";
// import displayCart from "./cart.js"

const displayList = (list) => /*html*/`
<li data-id="${list.id}"> //?? data-id what type of attribute is it??
    <div class="list-card">
        <h3>${list.title}</h3>
        <p>${list.cart[0].item}</p>
        <p>${list.cart[0].bought}</p>
        
        <p>${list.total}</p>
        <p>${list.weekday}</p>
        <p>${list.shop}</p>
        <form action="insertItem">
            <input type="text" name="newItem" size="20" placeholder="product">
        </form>
    </div>
</li>
`

export default displayList;