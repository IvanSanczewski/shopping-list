import express from 'express';
import { format } from 'date-fns';

import createHomepageTemplate from './views/index.js';
import displayLists from './views/cards.js';
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
    res.send(displayLists());
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
        const now = new Date();
        
        const actualWeek = format(now, 'ww');
        console.log(actualWeek);

        // Params listID & list.cart.length-1 are needed in displayCart function for the toggle-item functionality to be available
        res.send(displayCart(newProduct, listID, list.cart.length -1));

    } else {
        res.status(404).send('Add product & quantity');
    }
    
});

// app.post('/cards', (req, res) => {
// });

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