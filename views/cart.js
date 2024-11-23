const displayCart = (cart) => /*html*/`
    <div>
        <p>${cart.item} ${cart.item ? `X${cart.units}` : ''}</p>
        <p>${cart.bought ? 'YES' : 'no'}</p>
        <p>-</p>
    </div>
`

export default displayCart;