import express from 'express';
import { format } from 'date-fns';

import createHomepageTemplate from './views/index.js';
import displayCards from './views/cards.js';
import displayCart from './views/cart.js';
import SHOPPINGLISTS_DATA from './data/data.js';
import displayList from './views/list.js';


// import exp from 'constants';
// import { urlencoded } from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
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

// Toggle item bought status - HTMX endpoint
app.post('/toggle-item', (req, res) => {
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

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});