import express from 'express';
import { format } from 'date-fns';

import createHomepageTemplate from './views/index.js';
import displayCards from './views/cards.js';
import displayCart from './views/cart.js';
import SHOPPINGLISTS_DATA from './data/data.js';
import displayList from './views/list.js';
import displayQuantity from './views/quantity.js';


// import exp from 'constants';
// import { urlencoded } from 'body-parser';

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Calls the homepage from index.js
app.get('/', (req, res) => {
    res.send(createHomepageTemplate());
});

// Loads all the shopping lists from cards.js
app.get('/cards', (req, res) => {
    res.send(displayCards());
});

// Adds shopping items its cart
app.post('/cart', (req, res) => {
    const {listID, product, quantity} = req.body;

    // References the obbject in the DATA array according to list.id
    const list = SHOPPINGLISTS_DATA.find(list => list.id === listID);

    if (product && quantity) {
        const newProduct = {
            item: product,
            bought: false,
            units: quantity
        };
        list.cart.push(newProduct);
        // SHOPPINGLISTS_DATA.cart.push(newProduct);

        // Params listID & list.cart.length-1 are needed in displayCart function for the toggle-item functionality to be available
        res.send(displayCart(newProduct, listID, list.cart.length -1));

    } else {
        res.status(404).send('Add product & quantity');
    }
    
});

app.post('/cards', (req, res) => {
    const {shop, nextWeekList} = req.body;
    const lists = SHOPPINGLISTS_DATA
    
    const now = new Date();
    const actualWeek = format(now, 'ww');
    const actualYear = format(now, 'yy');
    const actualWeekDay = format(now, 'i');
    
    console.log('65 actualWeekDay:', actualWeekDay);

    let isNextWeek;
    (nextWeekList)? isNextWeek = true : isNextWeek = false ;
    
    let weekId = (actualWeekDay === '7') ? Number(actualWeek -1) : Number(actualWeek);
    console.log('71 weekId:', weekId, typeof weekId);    
    
    if (isNextWeek) { 
        weekId+= 1
        console.log('IF HAPPENS');
    }
    
    console.log('75 nextWeekList:', nextWeekList, typeof nextWeekList);    
    console.log('76 isNextWeek:', isNextWeek, typeof isNextWeek);    
    console.log('77 weekId:', weekId, typeof weekId);    

    if (!lists.find(list => list.id === `${weekId}_${actualYear}`)) {
        const newList = {
            id: `${weekId}_${actualYear}`,
            title: `Week ${weekId}`,
            shop: shop,
            cart: [],
            total: 20.69,
            weekday: 'Wednesday'
        };
        
        lists.push(newList);
        
        res.send(displayCards(newList));
        
    } else {
        console.log('list exists');
        res.status(404).send('There is already a shopping list for this week. You can edit it or delete it and then create a new one.');
    }
});


// Adds price to the cart
app.post('/list', (req, res) => {
    const {listID, price} = req.body;
    console.log('104 - listID:', listID, typeof listID );
    console.log('106 - price:', price, typeof price );

    const newPrice = Number(price)
    
    // References the obbject in the DATA array according to list.id
    const list = SHOPPINGLISTS_DATA.find(list => list.id === listID);
    
    if (price) {
        list.total = newPrice
    }
    console.log('118 - ', list);

    res.send(displayList(list));
});


// Toggle item bought status - HTMX endpoint
app.post('/toggle-item-status', (req, res) => {
    // Extract the listID and cartIndex from the request body
    const { listID, cartIndex } = req.body;

    // Find the specific shopping list by ID
    const list = SHOPPINGLISTS_DATA.find(list => list.id === listID);
    
    if (list && list.cart[cartIndex]) {
        // Toggle the bought status of the specific item
        list.cart[cartIndex].bought = !list.cart[cartIndex].bought;
        
        // Send back the updated cart item HTML
        res.send(displayCart(list.cart[cartIndex], listID, cartIndex));
    } else {
        // Send error response if item not found
        res.status(404).send('Item not found');
    }
});

// ***** D E L E T E  *****

// Delete item using URL parameters
app.delete('/delete-product/:listID/:cartIndex', (req, res) => {
    const { listID, cartIndex } = req.params;
    console.log('DELETE - listID:', listID, typeof listID);
    console.log('DELETE - cartIndex:', cartIndex, typeof cartIndex);
    
    const list = SHOPPINGLISTS_DATA.find(list => list.id === listID);
    console.log('DELETE - list found:', list);
    
    const indexNumber = parseInt(cartIndex);
    
    if (list && list.cart[indexNumber] !== undefined) {
        console.log('Before deletion:', list.cart);
        list.cart.splice(indexNumber, 1);
        console.log('After deletion:', list.cart);
        res.send('');
    } else {
        console.log('Error: List or item not found');
        res.status(404).send('Item not found');
    }
});


// Delete shopping list
app.delete('/delete-list/:id', (req, res) => {
    const { id } = req.params;
    
    const list = SHOPPINGLISTS_DATA;
    const index = SHOPPINGLISTS_DATA.findIndex(list => list.id === id);
    list.splice(index, 1)
    
    res.send('');
});

// ***** U P D A T E  *****

// Update price
app.put('/price/edit/:id', (req, res) => {
    const { price } = req.body;
    const { id } = req.params;
    
    console.log('187', price, id);
    
    const list = SHOPPINGLISTS_DATA;
    const index = SHOPPINGLISTS_DATA.findIndex(list => list.id === id);
    
    list[index].total = price;

    console.log('194 OBJECT - ', list[index]);
    console.log('195 ARRAY - ', list);

    res.send(displayList(list[index]))
});


app.get('/edit-quantity/:listID/:cartIndex/:quantity', (req, res)=> {
    console.log('EDIT UNITS');
    const { listID, cartIndex, quantity } = req.params;

    console.log('207 - index: ', cartIndex);
    console.log('208 - ID: ', listID);
    console.log('209 - quantity: ', quantity);

    res.send(displayQuantity(quantity));
});
   


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});