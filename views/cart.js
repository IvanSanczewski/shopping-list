// import SHOPPINGLISTS_DATA from "../data/data.js";
// import displayList from "./list.js";

const displayCart = (cart) => /*html*/`
    <div>
        <p>${cart.item}</p>
        <p>${cart.bought}</p>
    </div>
`

export default displayCart;