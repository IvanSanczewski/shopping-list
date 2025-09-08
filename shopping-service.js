import { createSupabaseClient } from "./db/supabase.js";

const supabase = createSupabaseClient();

/** 
 * Shopping List DB Service 
 * this file contains all database operations for the shopping list app
 */

//******* S H O P P I N G   L I S T   O P E R A T I O N S *******//

// Get all shopping lists with their items
// this replaces the old SHOPPINGLISTS_DATA array

export async function getAllLists() {
    try {
        const { data, error } = await supabase
            .from('shopping_lists')
            .select(`
                id, title, shop, total, weekday, shopping_items(
                    id, item, bought, units)
                    `)
            .order('id', { ascending: false }); //This keeps the most recent first
                
        if (error) throw error;
        
        // Data transformation to match current format
        return data.map(list => ({
            ...list,
            cart: list.shopping_items || [] //Rename shopping_list to cart
        }));
        
    } catch (error) {
        console.error('Error fetching shopping lists:', error.message);
        throw error;
    }
}


// Get a single shopping list using its ID with all its items

export async function getList(listId) {
    try {
        const { data, error } = await supabase
            .from('shopping_lists')
            .select(`
                id, title, shop, total, weekday, shopping_items(
                    id, item, bought, units)
                    `)
            .eq('id', listId)
            .single(); //Only one result expected
                
        if (error) throw error;
                
        // Data transformation to match current format
        return {
            ...data,
            cart: data.shopping_items || []
        };                

    } catch (error) {
        console.error(`Error fecthing list ${listId}:`, error.message);
        throw error
    }
}


// Create new shopping list

export async function createList(listData) {
    try {
        const { data, error } = await supabase
            .from('shopping_lists')
            .insert([{
                id: listData.id,
                title:listData.title,
                shop:listData.shop,
                weekday:listData.weekday,
            }])
            .select()
            .single();

        if (error) throw error;

        return {
            ...data,
            cart:[]
        };

    } catch (error) {
        console.error('Error creating list:', error.message);
        throw error;
    }
}


// Update a shopping list

export async function updateList(listId, updates) {
    try {
        const { data, error } = await supabase
            .from('shopping_lists')
            .update(updates)
            .eq('id', listId)
            .select()
            .single();

        if (error) throw error;

        return data;

    } catch (error) {
        console.error(`Error updating list ${listId}:`, error.message);
        throw error;
    }
}

// Delete a shopping list

export async function deleteList(listId) {
    try {
        // Delete all items first ???
        await supabase
            .from('shopping_items')
            .delete()
            .eq('list_id', listId);

        // Now, delete the list itself    
        const { error } = await supabase
            .from('shopping_lists')
            .delete()
            .eq('id', listId)

        if (error) throw error;

    } catch (error) {
        console.error(`Error deleting  list ${listId}:`, error.message);
        throw error;
    }
}

//******* S H O P P I N G   I T E M S   O P E R A T I O N S *******//

// Add items to a shopping list

export async function addItem(listId, item) {
    try {
        const { data, error} = await supabase
            .from('shopping_items')
            .insert([{
                list_id: listId,
                item: item.item,
                bought: item.bought || false,
                units: item.units,
            }])
            .select()
            .single();

        if (error) throw error;

        return data;

    } catch (error) {
        console.error(`Error adding ${item} to ${listId} list:`, error.message);
        throw error;        
    }
}

// Update item

export async function updateItem(itemId, updates){
    try {
        const { data, error } = await supabase
            .from('shopping_items')
            .update(updates)
            .eq('id', itemId)
            .select()
            .single();

        if (error) throw error;

        return data;

    } catch (error) {
        console.error('Error updating ${itemId}:', error.message);
        throw error;
    }
}


// Delete item 
export async function deleteItem(itemId) {
    try {
        //TODO: collect data to be able to collect item name
        const { error } = await supabase
            .from('shopping_items')
            .delete()
            .eq('id', itemId)

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error('Error deleting ${itemId}:', error.message); 
    }
}


// Toggle item bought status
export async function toggleBoughtStatus(itemId) {
    try {
        const { data: item, error:fetchError } = await supabase
            .from('shopping_items')
            .select('bought')
            .eq('id', itemId)
            .single();

        if (fetchError) throw fetchError;
        
        // Toggue status
        const toggledStatus = !item.bought;

        const { data, error } = await supabase
            .from('shopping_items')
            .update({bought: newStatus})
            .eq('id', itemId)
            .select()
            .single();

        if (error) throw error;

    } catch (error) {
        console.error('Error toggling ${item} bought status:', error.message);
        throw error;
    }
}


// Check if list exists
 
export async function listExists(listId) {
  try {
    const { data, error } = await supabase
      .from('shopping_lists')
      .select('id')
      .eq('id', listId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error(`Error checking if list exists ${listId}:`, error.message);
    throw error;
  }
}