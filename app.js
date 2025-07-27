import express from 'express';
import createHomepageTemplate from './views/index.js';
import displayLists from './views/cards.js';
import displayCart from './views/cart.js';
import SHOPPINGLISTS_DATA from './data/data.js';
// import displayList from './views/list.js';

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

// Adds shopping items to any card from cards.js
app.post('/cards', (req, res) => {
    const {item, quantity} = req.body;
    // Add logic here to handle new items
})

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





HTMX attributes are special HTML attributes that enable dynamic behavior without writing JavaScript. Here's a comprehensive explanation:

What are HTMX attributes?
HTMX attributes (prefixed with hx-) are HTML attributes that tell the HTMX library what actions to perform when certain events occur.

Core HTMX Attributes Explained:

#### 1. hx-post="/toggle-item"
•  What it does: Makes an HTTP POST request to the specified URL when the element is clicked (default trigger)
•  When to use: When you need to send data to the server to modify something
•  Alternatives: 
•  hx-get: For retrieving data
•  hx-put: For updating resources
•  hx-delete: For deleting resources

#### 2. hx-vals='{"listID": "${listID}", "cartIndex": ${cartIndex}}'
•  What it does: Sends additional data with the request (like form data)
•  Format: JSON object as a string
•  When to use: When you need to send specific data that isn't in a form
•  Alternative: hx-include to include form data from other elements

#### 3. hx-target="this"
•  What it does: Specifies which element should be updated with the server response
•  Options:
•  "this": The element itself
•  "#some-id": Element with specific ID
•  ".some-class": Element with specific class
•  "closest .parent": Nearest parent with class
•  When to use: When you want to update a specific part of the page

#### 4. hx-swap="outerHTML"
•  What it does: Determines HOW the response replaces the target
•  Options:
•  "innerHTML": Replace content inside the element (default)
•  "outerHTML": Replace the entire element
•  "beforebegin": Insert before the element
•  "afterend": Insert after the element
•  "delete": Delete the target element
•  When to use: When you need specific control over how content is updated

How the Flow Works:

1. User clicks the cart item
2. HTMX intercepts the click and prevents default behavior
3. HTMX makes POST request to /toggle-item with the specified values
4. Server processes request, toggles the item, and returns updated HTML
5. HTMX receives response and replaces the entire <li> element (outerHTML)
6. Page updates dynamically without a full reload

When to Use Different HTMX Attributes:

•  hx-get: Loading content, searching, filtering
•  hx-post: Creating new items, toggling states, submitting forms
•  hx-target: When update location differs from trigger location
•  hx-swap: When you need specific replacement behavior
•  hx-trigger: When you want different events (hover, keyup, etc.)

The beauty of HTMX is that it keeps your frontend simple while enabling rich interactions!