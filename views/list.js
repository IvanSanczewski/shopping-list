import displayCart from "./cart.js"


const displayList = (list) => /*html*/`
<li data-id="${list.id}"> //?? data-id what type of attribute is it??
    <div class="list-card">
        <h3>${list.title}</h3>
        <p>${list.total}</p>
        <ul>
            ${list.cart.map(cart => displayCart(cart)).join('')}
        </ul>
        <!-- <ul>
            ${list.cart.map((e) =>`
                <li>
                    <p>${e.bought ? 'YES' : 'NO'}</p> // substitute YES/NO by an icon or class defining colour
                    <p>${e.item} ${e.units ? `x${e.units}` : ''}</p>
                </li>`
                ).join('')}
        </ul> -->
        <p>${list.weekday}</p>
        <p>${list.shop}</p>
        <form>
            <input 
                type="text"
                name="item"
                placeholder="product"
                size="25"
            />
            <input 
                type="number"
                name="quantity"
                placeholder="x"
                size="1"
            />
            <button hx-post="/lists">+</button>
        </form>
    </div>
</li>
`

export default displayList;