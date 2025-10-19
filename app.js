import 'dotenv/config';
import express from 'express';
import { format } from 'date-fns';

import createHomepageTemplate from './views/index.js';
import SHOPPINGLISTS_DATA from './data/data.js';
import { getAllLists, createList, addItem, updateList, updateItem, toggleBoughtStatus, listExists, getList, deleteItem, deleteList, itemInListExists } from './shopping-service.js';
import displayCards from './views/cards.js';
import displayCart from './views/cart.js';
import displayList from './views/list.js';
import displayQuantity from './views/quantity.js';
import displayShop from './views/shop.js';
import displayWeekday from './views/weekday.js';
import displayProduct from './views/product.js';
import displayPrice from './views/price.js';
// import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js';


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
app.get('/cards', async (req, res) => {
    try {
        const lists = await getAllLists();
        res.send(displayCards(lists));
    } catch (error) {
        console.error('Error loading cards:', error.message);
        res.status(500).send('Error loading shopping lists');
    }
});

// Adds shopping items to its cart
app.post('/cart', async (req, res) => {
    try {
        const { listID, product, quantity} = req.body;

        const productExists = await itemInListExists(listID, product);

        if (!productExists){


            // References the obbject in the DATA array according to list.id
            if (product && quantity) {
                const newProduct = {
                    item: product,
                    bought: false,
                    units: quantity
                };

                // Adds item to db
                const addedItem = await addItem(listID, newProduct);

                // list.cart.push(newProduct);
                res.set('HX-Trigger-After-Swap', JSON.stringify({
                "resetForm": { "formId": `form-${listID}` }
            }));
            console.log('71 - New product is :', addedItem);
            
            // Arguments listID & list.cart.length-1 are needed in displayCart function for the toggle-item functionality to be available
            res.send(displayCart(addedItem, listID, addedItem.id));
            
            } else {
                res.status(400).send('Add product & quantity');
            }
        } else {
            console.log('The product is already in the list. Plase update its quantity.');
            res.status(500).send('This product is already in your cart. You can edit it if you want.');
        }

    } catch (error) {
        console.error('Error adding item to cart:', error.message);
        res.status(500).send('Error adding item to cart');

    } 
});

app.post('/cards', async (req, res) => {
    try {
        const { shop, nextWeekList } = req.body;
        
        const now = new Date();
        const actualWeek = format(now, 'ww');
        const actualYear = format(now, 'yy');
        const actualWeekDay = format(now, 'i');
        
        console.log('actualWeekDay:', actualWeekDay);
        
        let isNextWeek = !!nextWeekList; // Double bang coerces a boolean from truthy/falsy values
        let weekId = (actualWeekDay === '7') ? Number(actualWeek -1) : Number(actualWeek);
        
        if (isNextWeek) { 
            weekId+= 1
            console.log('Creating next week list');
        }

        const listId = `${weekId}_${actualYear}`;

        // Check if the list exists in the db
        const exists = await listExists(listId);

        if (!exists) {
            const newList = {
                id: listId,
                title: `Week ${weekId}`,
                shop: shop,
                cart: [],
                total: 10,
                weekday: 'Wednesday'
            };


            // Create new list in db
            await createList(newList);

            // Fetch all lists from db
            
            const allLists = await getAllLists();
            res.send(displayCards(allLists));
            
        } else {
            console.log('list exists');
            res.status(409).send('There is already a shopping list for this week. You can edit it. Or you can delete it, then create a new one.');
        }

    } catch (error) {
        console.error('Error creating shopping list:', error.message);
        res.status(500).send('Error creating shopping list');
    }
});


// Adds price to the cart
app.post('/list', async (req, res) => {
    try {
        const { listID, price } = req.body;
        
        const newPrice = Number(price)
        
        if (price) {
            // Update db with the new price
            await updateList(listID, {total: newPrice});
            
            // Fetch updated list from db
            const updatedList = await getList(listID);
            res.send(displayList(updatedList));
        } else {
            res.status(400).send('New price required');
        }
        
    } catch (error) {
        console.error('Error updating list price', error.message);
        res.status(500).send('Error updating list price');
    }
});


// Toggle item bought status - HTMX endpoint
app.post('/toggle-item-status', async (req, res) => {
    try {
        // Extract the listID and item ID from db
        const { listID, itemId } = req.body;
        console.log('TOGGLE 166 -  itemID:', itemId);

        // Toggle product status in db
        const updatedItem = await toggleBoughtStatus(itemId);

        // Send the updated cart item to generate the HTML
        res.send(displayCart(updatedItem, listID, itemId));

    } catch (error) {
        console.error('Error toggling product status:', error.message);
        res.status(500).send('Error toggling product status');
    }
});

// ***** D E L E T E  *****

// Delete item using URL parameters
app.delete('/delete-product/:listID/:itemID', async (req, res) => {
    try {
        const { listID, itemID } = req.params;
        console.log('DELETE - listID:', listID, typeof listID);
        console.log('DELETE - itemID:', itemID, typeof itemID);
        
        await deleteItem(itemID);
        console.log(`${itemID} deleted successfully!`);
        res.send('');
        
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).send('Error deleting product');
    }
});


// Delete shopping list
app.delete('/delete-list/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        await deleteList(id);
        console.log(`The list ${id} has been successfully deleted!`);
        res.send('');
        
    } catch (error) {
        console.error(`Error deleting the list ${id}`, error.message);
        res.status(500).send(`Error deleting the list ${id}`);
    }
    

});

// ***** U P D A T E  *****

// Update price
app.put('/price/edit/:id/:total', async (req, res) => {
    try {
        // const { price } = req.body;
        const { id, total } = req.params;
        
        const newTotal = Number(total);

        // Update in shopping_lists db
        await updateList(id, { total: newTotal});

        // Fetch updated list from db
        const updatedList = await getList(id);
        console.log('Updated list:', updatedList);


        res.send(displayList(updatedList));
    } catch (error) {
        console.error('Error updating price:', error.messaga);
        res.status(500).send('Error updating price');
    }
});


app.get('/edit-quantity/:listID/:itemId/:quantity', (req, res)=> {
    console.log('EDIT UNITS');
    const { listID, itemId, quantity } = req.params;
    
    res.send(displayQuantity(quantity, listID, itemId));
});


app.put('/edit-quantity/:listID/:itemId', async (req, res)=> {
    try {
        const { listID, itemId } = req.params;
        const { newQuantity } = req.body;

        const updatedQuantity = Number(newQuantity); 

        // Ensure number is a positive-non-0
        if (isNaN(updatedQuantity) || updatedQuantity <= 0) {
            return res.status(400).send('Quantity must be 1 or more')
        }
        
        // Update units in shopping_items db
        const updatedItemQuantity = await updateItem(itemId, { units: updatedQuantity });
    
        res.send(displayCart(updatedItemQuantity, listID, itemId));
    } catch (error) {
        console.error('Error updating item quantity:', error.message);
        res.status(500).send('Error updating item quantity');        
    }
});



app.get('/edit-shop/:listID/:shop', (req, res)=> {
    console.log('EDIT SHOP');
    const { listID, shop } = req.params;
    
    res.send(displayShop(listID, shop));  
});


app.put('/edit-shop/:listID', async (req, res)=> {
    const { listID } = req.params;
    const { newShop } = req.body;
    
    try {
        // Validate newShop is a valid string
        if(!newShop || typeof newShop !== 'string'){
            return res.status(400).send('Enter a valid shop')
        }

        // Update shop in shopping_list db
        await updateList(listID, { shop: newShop });

        // Fetch updated list from shopping_list db
        const updatedList = await getList(listID);
        console.log('Updated list:', updatedList);

        res.send(displayList(updatedList));   
    } catch (error) {
        console.error('Error updating the shop:', error.message);        
        res.status(500).send('Error updating the shop');
    }
});


app.get('/edit-weekday/:listID/:weekday', (req, res)=> {
    console.log('EDIT WEEKDAY');
    const { listID, weekday } = req.params;
    
    res.send(displayWeekday(listID, weekday));  
});


app.put('/edit-weekday/:listID', async (req, res)=> {
    const { listID } = req.params;
    const { newWeekday } = req.body;
    console.log('319 - newWeekday:', newWeekday);

    try {
        // Validate newWeekday is a valid string
        if(!newWeekday || typeof newWeekday !== 'string'){
            return res.status(400).send('Enter a valid day of the week')
        }

        // Update weekday in shopping_list db
        await updateList(listID, { weekday: newWeekday });

        // Fetch updated list from shopping_list db
        const updatedList = await getList(listID);
        console.log('Updated list:', updatedList);

        res.send(displayList(updatedList));   
    } catch (error) {
        console.error('Error updating the shop:', error.message);        
        res.status(500).send('Error updating the shop');
    }
});


app.get('/edit-product/:listID/:itemID', (req, res)=> {
    console.log('EDIT PRODUCT GET');
    const { listID, itemID } = req.params;
    
    console.log('268 - listID:', listID);
    console.log('269 - itemID:', itemID);
    
    res.send(displayProduct(listID, itemID));
});


app.put('/edit-product/:listID/:itemID', async (req, res)=> {
    console.log('EDIT PRODUCT PUT');
    const { listID, itemID } = req.params;
    const { newProduct } = req.body;
    console.log('listID:', listID, typeof listID);
    console.log('newProduct:', newProduct, typeof newProduct);
    
    try {
        // Update the new item name in the DB
        const updatedItem = await updateItem(itemID, { item: newProduct });

        // Send back the updated item name
        res.send(displayCart(updatedItem, listID, itemID));
        
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).send('Error updating product');      
    }
});
    

app.get('/edit-price/:listID/:listTotal', (req, res) => {
    console.log('EDIT PRICE GET');
    const { listID, listTotal } = req.params;
    
    console.log('305 - listID:', listID);
    console.log('306 - listTotal:', listTotal, typeof listTotal);
    
    res.send(displayPrice(listID, listTotal));
});

app.put('/edit-price/:listID', async (req, res) => {
    try {
        console.log('EDIT PRICE PUT');
        const { listID } = req.params;
        const { newPrice } = req.body;
        console.log('316 - listID:', listID);
        console.log('317 - newPrice:', newPrice, typeof newPrice);
        
        const newTotal = Number(newPrice);
        console.log('320 - newTotal:', newTotal, typeof newTotal);
        
        await updateList(listID, { total: newTotal });
        const updatedList = await getList(listID);
        res.send(displayList(updatedList));

    } catch (error) {
        console.error('Error updating shopping list price:', error.message);
        res.status(500).send('Error updating shopping list price');   
    }
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});