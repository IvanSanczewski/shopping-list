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
                    <p>${e.item} ${e.units ? `X${e.units}` : ''}</p>
                </li>`
                ).join('')}
        </ul> -->
        <p>${list.weekday}</p>
        <p>${list.shop}</p>
        <form action="insertItem">
            <input type="text" name="newItem" size="20" placeholder="product">
        </form>
    </div>
</li>
`

export default displayList;